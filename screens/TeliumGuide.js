import React, { useState, useEffect } from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, RefreshControl, SafeAreaView } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import Colors from '../config/Colors';
import Configurations from '../config/Configurations';
import Headertext from '../config/Headertext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default TeliumGuide = () => {

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [sessionId, setSessionId] = useState(null);

    const settingSession = async () => {
        await AsyncStorage.getItem('userId').then(val => setSessionId(val));
    }

    useEffect(() => {
        settingSession();
    }, []);

    useEffect(() => {
        let isMounted = true;
        wait(1000).then(() => {
            if (isMounted) InitList()
        });
        return () => { isMounted = false };
    }, [sessionId]);

    const InitList = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            const response = await fetch(Configurations.host + "/referenceGuideFunctions/telium/user/" + sessionId, requestOptions)
            const status = await response.status;
            const responseJson = await response.json();
            if (status == 204) {
                setIsLoading(false);
                setRefreshing(false);
                setFilteredDataSource(null);
                setMasterDataSource(null);
                throw new Error('204 - No Content');
            } else {
                setIsLoading(false);
                setRefreshing(false);
                setFilteredDataSource(responseJson);
                setMasterDataSource(responseJson);
            }

        } catch (error) {
            console.log('Telium Guide Error', error);
            return false;
        }
    }

    const UpdateFavouriteItem = async (itemId, isCreate) => {

        var myHeaders = new Headers();
        var methodType = "";
        myHeaders.append("Content-Type", "application/json");

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
            const responseJson = await response.json();

            if (status == 204) {
                setIsLoading(false);
                setRefreshing(false);
                setFilteredDataSource(null);
                setMasterDataSource(null);
                throw new Error('204 - No Content');
            } else {
                setFilteredDataSource(responseJson);
                setMasterDataSource(responseJson);
            }

        } catch (error) {
            console.log('Telium Guide Fav Error', error);
            return false;
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
                    flex: 1, justifyContent: 'center', alignItems: 'center',
                    backgroundColor: Colors.colorType2_1, borderRadius: 5
                }}>
                    <Text style={{ color: Colors.fontColorWhite, letterSpacing: 1, fontWeight: '500' }}>TELIUM</Text>
                </View>
                <View style={{ flex: 5 }}>
                    <View style={[styles.itemBody]}>
                        <View style={styles.itemBodyLeft}>
                            <Text style={styles.itemQuestion}>{item.name}</Text>
                            <Text style={styles.itemAnswer}>{item.short_solution}</Text>
                        </View>

                        <View style={styles.itemBodyRight}>
                            {
                                item.is_favorite ?
                                    <View>
                                        <TouchableOpacity onPress={() => UpdateFavouriteItem(item.id, false)}>
                                            <Image style={styles.itemCardImage} source={require('../assets/images/telium-star.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View>
                                        <TouchableOpacity onPress={() => UpdateFavouriteItem(item.id, true)}>
                                            <Image style={styles.itemCardImage} source={require('../assets/images/telium-star-outline.png')} />
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
        wait(1000).then(() => InitList());
    }, [sessionId]);

    function Loader() {
        return (
            <View style={{ flex: 1, }}>
                <Image style={styles.loader}
                    source={require('../assets/images/list-loader.gif')} />
                <Image style={styles.loader}
                    source={require('../assets/images/list-loader.gif')} />
                <Image style={styles.loader}
                    source={require('../assets/images/list-loader.gif')} />
            </View>
        );
    }

    function renderEmptyContainer() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image style={styles.noContent} source={require('../assets/images/no-content.gif')} />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[Headertext.h4, { fontWeight: 'bold' }]}>NO ITEMS,</Text>
                    <Text style={[Headertext.h4, { fontWeight: 'bold', color: Colors.fontColorBluest }]}>SORRY!</Text>
                </View>
            </View>
        );
    }

    function Content() {
        return (
            <View>
                <SearchBar
                    style={styles.searchInputText}
                    fontColor="#c6c6c6"
                    iconColor="#c6c6c6"
                    cancelIconColor="#c6c6c6"
                    placeholder="Search here"
                    onChangeText={(text) => SearchFilterFunction(text)}
                    onClearPress={() => SearchFilterFunction("")}
                />
                <FlatList style={styles.gridView}
                    data={filteredDataSource}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={ItemView}
                    ListEmptyComponent={renderEmptyContainer()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={OnRefresh}
                            tintColor={Colors.colorType2_1}
                            colors={[Colors.colorType2_1]}
                            title="Pull to refresh"
                        />
                    }
                />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" animated></StatusBar>

            <View style={styles.body}>

                {
                    isLoading ? Loader() : Content()
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
    },
    body: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        margin: 5,
        backgroundColor: Colors.colorType5_1,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
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
        color: Colors.fontColorLightBlack,
        fontWeight: '700',
        margin: 5,
    },
    itemAnswer: {
        fontSize: 13,
        color: Colors.fontColorLightBlack,
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
        borderColor: '#009688',
        borderRadius: 10,
        backgroundColor: Colors.colorType5_1,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
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
    loader: {
        width: Dimensions.get('window').width,
        height: 100,
        marginTop: 10,
    },
});