import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Badge } from 'react-native-paper'; 
import SearchBar from 'react-native-dynamic-search-bar';
import Colors from '../config/Colors';

export default AllCodeList = () => {

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    const initList = () => {

        /** SESSION VALUE */
        const userId = 1;

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        fetch("http://192.168.20.12:8080/skyzer-guide/referenceGuideFunctions/user/" + userId, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
          setFilteredDataSource(responseJson);
          setMasterDataSource(responseJson);
        })
        .catch(error => console.log('error', error));
    }

    const updateFavouriteItem = (itemId) => {
        
        /** SESSION VALUE */
        const userId = 1;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "user": {
                "id": userId
            },
            "favorite_reference_guide_function": {
                "id": itemId
            }
        });
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://192.168.20.12:8080/skyzer-guide/userFavorites", requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
          setFilteredDataSource(responseJson);
          setMasterDataSource(responseJson);
        })
        .catch(error => console.log('error', error));
    }  

    useEffect(() => {
        initList();
    }, []);

    const searchFilterFunction = (text) => {
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
                    <TouchableOpacity onPress={() => updateFavouriteItem(item.id)}>
                    <View style={styles.itemBodyRight}>
                        {
                            item.is_favorite ? 
                                <Image style={styles.itemCardImage} source={require('../assets/images/star.png')} /> :
                                <Image style={styles.itemCardImage} source={require('../assets/images/star-outline.png')} />
                        }
                        
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
      };

    return (
    <View style={styles.container}>
        <View style={styles.bodySubView}>
            <SearchBar
                style={styles.searchInputText}
                fontColor="#c6c6c6"
                iconColor="#c6c6c6"
                cancelIconColor="#c6c6c6"
                placeholder="Search here"
                onChangeText={(text) => searchFilterFunction(text)}
                onClearPress={() => searchFilterFunction("")}
            />
            <FlatList style={styles.gridView}
                data={filteredDataSource} 
                keyExtractor={(item, index) => index.toString()}
                renderItem={ItemView}
            />
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