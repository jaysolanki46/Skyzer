import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, RefreshControl, SafeAreaView } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import Colors from '../config/Colors';
import Configurations from '../config/Configurations';
import Headertext from '../config/Headertext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import { Badge } from 'react-native-paper';
import StarImage from '../assets/images/tetra/tetra-star.png';
import LoaderImage from '../assets/images/list-loader.gif';
import NoContentImage from '../assets/images/tetra/no-content.png';
import TopStatusBar from '../components/TopStatusBar';

export default Favourites = () => {

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [hideSearchBar, setHideSearchBar] = useState(false);

    const settingSession = async () => {
        await AsyncStorage.getItem('userId').then(val => setSessionId(val));
    }

    useEffect(() => {
        settingSession();
    }, []);

    /** REFRESH THE PAGE ON EVERY VISIT */
    useFocusEffect(
        React.useCallback(() => {
            let isMounted = true;
            wait(1000).then(() => {
                if (isMounted) InitList()
            });
            return () => { isMounted = false };
        }, [sessionId])
    );

    const InitList = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            const response = await fetch(Configurations.host + "/userFavorites/user/" + sessionId, requestOptions)
            const status = await response.status;

            if (status == 204) {
                setIsLoading(false);
                setRefreshing(false);
                setFilteredDataSource(null);
                setMasterDataSource(null);
                setHideSearchBar(true);
                throw new Error('No Content');
            } else {
                const responseJson = await response.json();
                setIsLoading(false);
                setRefreshing(false);
                setFilteredDataSource(responseJson);
                setMasterDataSource(responseJson);
                setHideSearchBar(false);
            }

        } catch (error) {
            console.log('Favourites Error', error);
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
            const response = await fetch(Configurations.host + "/userFavorites/user/", requestOptions);
            const status = await response.status;
           
            if (status == 204) {
                setIsLoading(false);
                setRefreshing(false);
                setFilteredDataSource(null);
                setMasterDataSource(null);
                setHideSearchBar(true);
                throw new Error('No Content');
            } else {
                const responseJson = await response.json();
                setFilteredDataSource(responseJson);
                setMasterDataSource(responseJson);
                setHideSearchBar(false);
            }

        } catch (error) {
            
            console.log('Favourites Update Error', error);
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
                <View style={{ flex: 1, flexDirection: 'row', margin: 5, alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, fontWeight: '500', color: Colors.fontColorLightBlack }}>SUPPORTED BY: </Text>
                    {
                        item.is_tetra ? <Badge style={[styles.badge, { backgroundColor: Colors.colorType1_1 }]}>TETRA</Badge> : null
                    }
                    {
                        item.is_telium ? <Badge style={[styles.badge, { backgroundColor: Colors.colorType2_1 }]}>TELIUM</Badge> : null
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
        wait(1000).then(() => InitList());
    }, [sessionId]);

    function Loader() {
        return (
            <View style={{ flex: 1, }}>
                <Image style={styles.loader}
                    source={LoaderImage} />
                <Image style={styles.loader}
                    source={LoaderImage} />
                <Image style={styles.loader}
                    source={LoaderImage} />
            </View>
        );
    }

    function renderEmptyContainer() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image style={styles.noContent} source={NoContentImage} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[Headertext.h4, { fontWeight: 'bold', color: Colors.fontColorBluest }]}> NO FAVOURITES!</Text>
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
                            fontColor="#c6c6c6"
                            iconColor="#c6c6c6"
                            cancelIconColor="#c6c6c6"
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
                            tintColor={Colors.colorType1_1}
                            colors={[Colors.colorType1_1]}
                            title="Pull to refresh"
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
                    <Text style={[Headertext.h1, { marginRight: 10, color: Colors.fontColorBluest }]}>Favourites</Text>
                </View>
            </View>

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
        backgroundColor: Colors.bodyColor,
    },
    body: {
        flex: 5.5,
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
    badgeType: {
        margin: 5,
        borderRadius: 5,
        color: Colors.fontColorWhite,
        backgroundColor: Colors.grey,
        fontWeight: '700',
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
    badge: {
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 5,
        letterSpacing: 1,
        fontWeight: '500',
        color: Colors.fontColorWhite,
    },
});