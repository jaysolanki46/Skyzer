import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, RefreshControl, SafeAreaView, Alert } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import Colors from '../config/Colors';
import Configurations from '../config/Configurations';
import Headertext from '../config/Headertext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import StarImage from '../assets/images/mutual/star.png';
import StarOutlineImage from '../assets/images/mutual/star-outline.png';
import NoContentImage from '../assets/images/mutual/no-content.png';
import TopStatusBar from '../components/TopStatusBar';
import { Badge } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../components/AuthContext';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Loader from '../utils/Loader';

export default TeliumGuide = () => {

    const route = useRoute();
    const [userToken, setUserToken] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [sessionId, setSessionId] = useState(null);

    const { logOut } = React.useContext(AuthContext);

    const settingSession = async () => {
        await AsyncStorage.getItem('userId').then(val => setSessionId(val));
        await SecureStore.getItemAsync('token').then(val => setUserToken(val));
    }

    useEffect(() => {
        settingSession();
    }, []);

    /** REFRESH THE PAGE ON EVERY VISIT */
    useFocusEffect(
        React.useCallback(() => {
            let isMounted = true;
                if (isMounted && sessionId != null && userToken != null) InitList()
            return () => { isMounted = false };
        }, [sessionId, userToken])
    );

    const InitList = async () => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", userToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            const response = await fetch(Configurations.host + "/referenceGuideFunctions/telium/user/" + sessionId, requestOptions)
            const status = await response.status;

            if(status == 200) {
                const responseJson = await response.json();
                setIsLoading(false);
                setRefreshing(false);
                setFilteredDataSource(responseJson);
                setMasterDataSource(responseJson);
            } else if (status == 401) {
                Alert.alert(
                    "Security Alert",
                    "Please login again!",
                    [
                        { text: "OK", onPress: () => logOut() }
                    ]
                );
                throw new Error(status);
            } else {
                Alert.alert(
                    "Error",
                    "Something went wrong!"
                );
                throw new Error(status);
            }

        } catch (error) {

            var myErrorHeaders = new Headers();
            var errorMethodType = "POST";
            myErrorHeaders.append("Content-Type", "application/json");

            var erroRaw = JSON.stringify({
                "screen": route.name,
                "module": "NA",
                "user": await SecureStore.getItemAsync("email"),
                "status": error.message
            });

            var errorRequestOptions = {
                method: errorMethodType,
                headers: myErrorHeaders,
                body: erroRaw,
                redirect: 'follow'
            };

            await fetch(Configurations.host + "/logs/error", errorRequestOptions);
        }
    }

    const UpdateFavouriteItem = async (itemId, isCreate) => {

        var myHeaders = new Headers();
        var methodType = "";
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", userToken);

        isCreate ? methodType = 'POST' : methodType = 'DELETE'

        var raw = JSON.stringify({
            "user": {
                "id": sessionId
            },
            "favorite_reference_guide_function": {
                "id": itemId
            }
        });

        var requestOptions = {
            method: methodType,
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            const response = await fetch(Configurations.host + "/userFavorites/telium/user/", requestOptions);
            const status = await response.status;

            if (status == 200) {
                const responseJson = await response.json();
                setFilteredDataSource(responseJson);
                setMasterDataSource(responseJson);

            } else if (status == 401) {
                Alert.alert(
                    "Security Alert",
                    "Please login again!",
                    [
                        { text: "OK", onPress: () => logOut() }
                    ]
                );
                throw new Error(status);

            } else {
                Alert.alert(
                    "Error",
                    "Something went wrong!"
                );
                throw new Error(status);
            }

        } catch (error) {

            var myErrorHeaders = new Headers();
            var errorMethodType = "POST";
            myErrorHeaders.append("Content-Type", "application/json");

            var erroRaw = JSON.stringify({
                "screen": route.name,
                "module": "UpdateFavouriteItem",
                "user": await SecureStore.getItemAsync("email"),
                "status": error.message
            });

            var errorRequestOptions = {
                method: errorMethodType,
                headers: myErrorHeaders,
                body: erroRaw,
                redirect: 'follow'
            };

            await fetch(Configurations.host + "/logs/error", errorRequestOptions);
        }
    }

    function SearchFilterFunction(text) {
        if (text && Array.isArray(masterDataSource)) {
            const excludeColumns = ["id"];
            const newData = masterDataSource.filter(function (item) {

                /** ONLY SEARCH ON NAMES
                const itemData = item.name ? item.name : '';
                const textData = text;

                return itemData.indexOf(textData) > -1;*/

                /** SEARCH ON ALL THE FIELDS */
                return Object.keys(item).some(key =>
                    excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(text.toLowerCase())
                );
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    const ItemView = ({ item }) => {
        return (
            <View style={[styles.listContainer]}>
                <View style={{
                    flex: 1.1, justifyContent: 'center', alignItems: 'center',
                    backgroundColor: Colors.block2Color1of3, borderRadius: 5
                }}>
                    <Text style={{ color: Colors.fontWhite, letterSpacing: 1, fontWeight: '500' }}>TELIUM</Text>
                </View>
                <View style={{ flex: 4.9 }}>
                    <View style={[styles.itemBody]}>
                        <View style={styles.itemBodyLeft}>
                            <Text style={styles.itemQuestion}>{item.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {
                                    item.is_function ? <Badge style={styles.badge}>FUNCTION</Badge> : null
                                }
                                {
                                    item.is_menu ? <Badge style={styles.badge}>MENU</Badge> : null
                                }
                                <Text style={styles.itemAnswer}>{item.short_solution}</Text>
                            </View>
                        </View>

                        <View style={styles.itemBodyRight}>
                            {
                                item.is_favorite ?
                                    <View>
                                        <TouchableOpacity onPress={() => UpdateFavouriteItem(item.id, false)}>
                                            <Image style={styles.itemCardImage} source={StarImage} />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View>
                                        <TouchableOpacity onPress={() => UpdateFavouriteItem(item.id, true)}>
                                            <Image style={styles.itemCardImage} source={StarOutlineImage} />
                                        </TouchableOpacity>
                                    </View>
                            }

                        </View>
                    </View>
                </View>
            </View>
        );
    };

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const OnRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => {
            if (sessionId != null && userToken != null) InitList()
        });
    }, [sessionId, userToken]);

    function renderEmptyContainer() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image style={styles.noContent} source={NoContentImage} />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[Headertext.h4, { fontWeight: 'bold' }]}>No Result Found</Text>
                </View>
            </View>
        );
    }

    function Content() {
        return (
            <View>
                <SearchBar
                    darkMode={true}
                    style={styles.searchInputText}
                    placeholder="Search here"
                    onChangeText={(text) => SearchFilterFunction(text)}
                    onClearPress={() => SearchFilterFunction("")}
                />
                <FlatList style={styles.gridView}
                    darkMode={true}
                    data={filteredDataSource}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={ItemView}
                    ListEmptyComponent={renderEmptyContainer()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={OnRefresh}
                            tintColor={Colors.white}
                            title="Pull to refresh"
                            titleColor={Colors.white}
                        />
                    }
                />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <TopStatusBar />
            <LinearGradient colors={[Colors.backgroundColor1of3, Colors.backgroundColor2of3, Colors.backgroundColor3of3]} style={{ flex: 1, }} >
            <View style={styles.body}>

                {
                    isLoading ? <Loader/> : Content()
                }
            </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: Colors.white,
        flexDirection: 'row',
    },
    itemBody: {
        flex: 1,
        flexDirection: 'row',
    },
    itemBodyLeft: {
        flex: 5.5,
    },
    itemBodyRight: {
        flex: .5,
        justifyContent: 'flex-end'
    },
    itemQuestion: {
        fontSize: 15,
        color: Colors.fontWhite,
        fontWeight: '700',
        margin: 5,
    },
    badge: {
        margin: 5,
        borderRadius: 5,
        color: Colors.fontWhite,
        borderWidth: 1,
        backgroundColor: Colors.block2Color1of3,
        fontWeight: '700',
    },
    itemAnswer: {
        fontSize: 13,
        color: Colors.fontWhite,
        fontWeight: '700',
        margin: 5,
    },
    itemCardImage: {
        width: 25,
        height: 25,
        alignSelf: 'flex-end',
    },
    searchInputText: {
        height: 40,
        width: '97%',
        margin: 5,
        borderWidth: 1,
        borderColor: Colors.fontWhite,
        borderRadius: 10,
    },
    gridView: {
        width: '100%',
        height: '90%',
    },
    noContent: {
        resizeMode: 'contain',
        width: 200,
        height: 300,
    },
});