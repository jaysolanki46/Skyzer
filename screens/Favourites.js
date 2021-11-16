import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, RefreshControl, SafeAreaView, Alert } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import Colors from '../config/Colors';
import Configurations from '../config/Configurations';
import Headertext from '../config/Headertext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import { Badge } from 'react-native-paper';
import NoContentImage from '../assets/images/mutual/no-content.png';
import TopStatusBar from '../components/TopStatusBar';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../components/AuthContext';
import { useRoute } from '@react-navigation/native';
import StarImage from '../assets/images/mutual/star.png';
import Loader from '../utils/Loader';

export default Favourites = () => {

    const route = useRoute();
    const [userToken, setUserToken] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [hideSearchBar, setHideSearchBar] = useState(false);

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
            const response = await fetch(Configurations.host + "/userFavorites/user/" + sessionId, requestOptions)
            const status = await response.status;

            if (status == 200) {
                const responseJson = await response.json();
                setIsLoading(false);
                setRefreshing(false);
                setFilteredDataSource(responseJson);
                setMasterDataSource(responseJson);
                setHideSearchBar(false);

            } else if (status == 204) {
                setIsLoading(false);
                setRefreshing(false);
                setFilteredDataSource(null);
                setMasterDataSource(null);
                setHideSearchBar(true);
                
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
                setIsLoading(false);
                setRefreshing(false);
                setFilteredDataSource(null);
                setMasterDataSource(null);
                setHideSearchBar(true);
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
            const response = await fetch(Configurations.host + "/userFavorites/user/", requestOptions);
            const status = await response.status;
            
            if(status == 200) {
                const responseJson = await response.json();
                setFilteredDataSource(responseJson);
                setMasterDataSource(responseJson);
                setHideSearchBar(false);

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
                setIsLoading(false);
                setRefreshing(false);
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
                <View style={{ flex: 1, flexDirection: 'row', margin: 5, alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, fontWeight: '500', color: Colors.fontWhite }}>SUPPORTED BY: </Text>
                    {
                        item.is_tetra ? <Badge style={[styles.badge, { backgroundColor: Colors.block1Color1of3 }]}>TETRA</Badge> : null
                    }
                    {
                        item.is_telium ? <Badge style={[styles.badge, { backgroundColor: Colors.block2Color1of3 }]}>TELIUM</Badge> : null
                    }
                </View>
                <View style={{ flex: 5 }}>
                    <View style={[styles.itemBody]}>
                    <View style={styles.itemBodyLeft}>
                        <Text style={styles.itemQuestion}>{item.name}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                {
                                    item.is_function ? <Badge style={styles.badgeType}>FUNCTION</Badge> : null
                                }
                                {
                                    item.is_menu ? <Badge style={styles.badgeType}>MENU</Badge> : null
                                }
                                <Text style={styles.itemAnswer}>{item.short_solution}</Text>
                        </View>
                    </View>

                    <View style={styles.itemBodyRight}>
                        {
                                <View>
                                    <TouchableOpacity onPress={() => UpdateFavouriteItem(item.id, false)}>
                                        <Image style={styles.itemCardImage} source={StarImage} />
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[Headertext.h4, { fontWeight: 'bold',}]}> NO FAVOURITES!</Text>
                </View>
            </View>
        );
    }

    function Content() {
        return (
            <View>
                {
                    !hideSearchBar ? 
                        <SearchBar
                            style={styles.searchInputText}
                            darkMode={true}
                            placeholder="Search here"
                            onChangeText={(text) => SearchFilterFunction(text)}
                            onClearPress={() => SearchFilterFunction("")}
                        /> : null
                }
                
                <FlatList style={styles.gridView}
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

            <View style={styles.header}>
                <View style={styles.headerSubView}>
                    <Text style={[Headertext.h1, { marginRight: 10, color: Colors.fontWhite }]}>Favourites</Text>
                </View>
            </View>

            <View style={styles.body}>

                {
                    isLoading ? <Loader/> : Content()
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor1of3,
        paddingTop: Platform.OS === 'ios' ? 0 : 20,
    },
    header: {
        flex: .5,
        width: '100%',
    },
    headerSubView: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    body: {
        flex: 5.5,
    },
    listContainer: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: Colors.white,
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
    badgeType: {
        margin: 5,
        borderRadius: 5,
        color: Colors.fontWhite,
        fontWeight: '700',
        borderWidth: 1,
        borderColor: Colors.white,
        backgroundColor: Colors.transparent,
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
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.white,
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
    badge: {
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 5,
        letterSpacing: 1,
        fontWeight: '500',
        color: Colors.fontWhite,
    },
});