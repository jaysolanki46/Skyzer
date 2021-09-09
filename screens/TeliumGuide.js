import React, { useState, useEffect } from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator, RefreshControl, SafeAreaView } from 'react-native';
import { Badge } from 'react-native-paper'; 
import SearchBar from 'react-native-dynamic-search-bar';
import Colors from '../config/Colors';
import Configurations from '../config/Configurations';
import Headertext from '../config/Headertext';

export default TeliumGuide = () => {

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
        
        fetch(Configurations.host + "/referenceGuideFunctions/tetra/user/" + userId, requestOptions)
        .then((response) =>  {
            if(response.status == 204) {
                setIsLoading(false);
                setRefreshing(false);
                setFilteredDataSource(null);
                setMasterDataSource(null);
                throw new Error('204 - No Content');
            } else {
                setIsLoading(false);
                setRefreshing(false);
                return response.json();
            }
        })
        .then((responseJson) => {
          setFilteredDataSource(responseJson);
          setMasterDataSource(responseJson);
        })
        .catch(error => console.log('Tetra Guide Error: ', error));
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

        fetch(Configurations.host + "/userFavorites/all", requestOptions)
        .then((response) =>  {
            if(response.status == 204) {
                setIsLoading(false);
                setRefreshing(false);
                setFilteredDataSource(null);
                setMasterDataSource(null);
                throw new Error('204 - No Content');
            } else {
                return response.json();
            }
        })
        .then((responseJson) => {
          setFilteredDataSource(responseJson);
          setMasterDataSource(responseJson);
        })
        .catch(error => console.log('Tetra', error));
    }

    useEffect(() => {
        let isMounted = true;    
        wait(1000).then(() => {
                if (isMounted) InitList()
            });
        return () => { isMounted = false };
    }, []);

    const SearchFilterFunction = (text) => {
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
                <View style={[styles.itemHeader]}>
                    <View style={styles.itemHeaderLeft}>
                        {
                            item.is_tetra ? <Badge style={[styles.badge, {backgroundColor: Colors.colorType3_2}]}>TETRA</Badge>: null
                        }
                        {
                            item.is_telium ? <Badge style={[styles.badge, {backgroundColor: Colors.colorType4_2}]}>TELIUM</Badge> : null
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
        wait(1000).then(() => InitList());
    }, []);

    function Loader() {
        return (
            <View style={{flex:1,}}>
                <Image style={styles.loader} 
                        source={require('../assets/images/list-loader.gif')} />
                <Image style={styles.loader} 
                        source={require('../assets/images/list-loader.gif')} />
            </View>
        );
    }

    function renderEmptyContainer() {
        return (
            <View style={{alignItems:'center', justifyContent:'center'}}>
                <Image style={styles.noContent} source={require('../assets/images/no-content.gif')} />
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
                  //ListEmptyComponent={renderEmptyContainer()}
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
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" animated></StatusBar>

            <View style={styles.header}>
                <View style={styles.headerSubView}>
                    <Text style={[Headertext.h1, { marginRight: 10, color: Colors.fontColorBluest }]}>Telium</Text>
                    <Text style={[Headertext.h1, { color: Colors.fontColorPurplest, }]}>Guide</Text>
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
    },
    header: {
        flex: .5,
        width: '100%',
    },
    body: {
        flex: 5.5,
    },
    headerSubView: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor: Colors.bodyColor,
    },
    bodySubView: {
        flex: 1, 
        backgroundColor: Colors.bodyColor,
    },
    listContainer: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        margin: 5,
        backgroundColor: Colors.colorType4_1,
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
        letterSpacing: 1,
        fontWeight: '500',
        color: Colors.fontColorWhite,
    },
    itemQuestion: {
        fontSize: 17,
        color: Colors.white,
        fontWeight: '700',
        margin: 5,
    },
    itemAnswer: {
        fontSize: 12,
        color: Colors.lightFont,
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
        shadowOpacity: 0,
    },
    gridView: {
        width: '100%',
        height: '90%',
    },
    noContent: {
        flex:1,
        resizeMode: 'contain',
        width: '80%',
      },
    loader: {
      width: Dimensions.get('window').width,
      height: 100,
      marginTop: 10,
    },
});