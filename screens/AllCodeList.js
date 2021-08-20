import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { Badge } from 'react-native-paper'; 
import SearchBar from 'react-native-dynamic-search-bar';
import Colors from '../config/Colors';

export default AllCodeList = () => {

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const InitList = () => {

        /** SESSION VALUE */
        const userId = 1;

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        fetch("http://192.168.20.12:8080/skyzer-guide/referenceGuideFunctions/user/" + userId, requestOptions)
        .then((response) =>  {
            if(response.status == 204) {
                setIsLoading(false);
                setRefreshing(false);
                throw new Error('204 - No Content');
            } else {
                return response.json();
            }
        })
        .then((responseJson) => {
          setFilteredDataSource(responseJson);
          setMasterDataSource(responseJson);
          setIsLoading(false);
          setRefreshing(false);
        })
        .catch(error => console.log('InitList error', error));
    }

    const UpdateFavouriteItem = (itemId, isCreate) => {
        
        /** SESSION VALUE */
        const userId = 1;

        var myHeaders = new Headers();
        var methodType = "";
        myHeaders.append("Content-Type", "application/json");

        isCreate ? methodType= 'POST' : methodType= 'DELETE'
        
        var raw = JSON.stringify({
            "user": {
                "id": userId
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

        fetch("http://192.168.20.12:8080/skyzer-guide/userFavorites/all", requestOptions)
        .then((response) =>  {
            if(response.status == 204) {
                setIsLoading(false);
                setRefreshing(false);
                throw new Error('204 - No Content');
            } else {
                return response.json();
            }
        })
        .then((responseJson) => {
          setFilteredDataSource(responseJson);
          setMasterDataSource(responseJson);
        })
        .catch(error => console.log('UpdateFavouriteItem error', error));
    }

    useEffect(() => {
        InitList();
    }, []);

    const SearchFilterFunction = (text) => {
            if (text) {
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
            <View style={[styles.listContainer, { backgroundColor: '#496AA9' }]}>
                <View style={[styles.itemHeader]}>
                    <View style={styles.itemHeaderLeft}>
                        {
                            item.is_tetra ? <Badge style={[styles.badge, {backgroundColor: Colors.green}]}>TETRA</Badge>: null
                        }
                        {
                            item.is_telium ? <Badge style={[styles.badge, {backgroundColor: Colors.yellow}]}>TELIUM</Badge> : null
                        }
                    </View>
                    {/* <View style={styles.itemHeaderRight}>
                        {
                            item.is_function ? <Image style={styles.itemCardImage} source={require('../assets/images/function.png')} /> : null
                        }
                        {
                            item.is_menu ? <Image style={styles.itemCardImage} source={require('../assets/images/menu.png')} /> : null
                        }
                    </View> */}
                </View>
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
                                    <Image style={styles.itemCardImage} source={require('../assets/images/star.png')} />
                                </TouchableOpacity>
                                </View>
                                :
                                <View>
                                <TouchableOpacity onPress={() => UpdateFavouriteItem(item.id, true)}>
                                    <Image style={styles.itemCardImage} source={require('../assets/images/star-outline.png')} />
                                </TouchableOpacity>
                                </View>
                        }
                        
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
        wait(1500).then(() => InitList());
    }, []);

    function Spinner() {
        return (
            <View style={{alignItems:'center', justifyContent:'center', flex:1,}}>
                <ActivityIndicator size="large" color={Colors.white} />
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
                    refreshControl={
                       <RefreshControl
                            refreshing={refreshing}
                            onRefresh={OnRefresh}
                        />
                       }
                />
            </View>
        );
    }

    return (
    <View style={styles.container}>
        <View style={styles.bodySubView}>
            {
                isLoading ? Spinner() : Content()
           }
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    bodySubView: {
        flex: 1, 
        backgroundColor: Colors.background,
    },
    listContainer: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        margin: 5,
    },
    itemHeader: {
        flex: 1,
        flexDirection: 'row',
    },
    itemHeaderLeft: {
        flex: 4.5,
        flexDirection: 'row',
    },
    itemHeaderRight: {
        flex: 1.5,
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
    badge: {
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 5,
    },
    itemQuestion: {
        fontSize: 17,
        color: Colors.white,
        fontWeight: '600',
        margin: 5,
    },
    itemAnswer: {
        fontSize: 12,
        color: Colors.lightFont,
        fontWeight: 'bold',
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
        backgroundColor: '#FFFFFF',
    },
});