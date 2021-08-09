import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Badge } from 'react-native-paper'; 
import SearchBar from 'react-native-dynamic-search-bar';
import Colors from '../config/Colors';

export default AllCodeList = () => {
    /*const items = [
        { id: '1', telium: '1', tetra: '1', function: '1', menu: '0', question:'Tetra Reference Guide1?', answer:'FUNC 3428', favourite: '1'},
        { id: '2', telium: '0', tetra: '1', function: '0', menu: '1', question:'Tetra Reference Guide1?', answer:'Tetra ans1', favourite: '1'},
        { id: '3', telium: '0', tetra: '1', function: '0', menu: '1', question:'Tetra Reference Guide1?', answer:'Tetra ans1', favourite: '1'},
        { id: '4', telium: '0', tetra: '1', function: '0', menu: '1', question:'Tetra Reference Guide1?', answer:'Tetra ans1', favourite: '1'},
        { id: '5', telium: '0', tetra: '1', function: '0', menu: '1', question:'Tetra Reference Guide1?', answer:'Tetra ans1', favourite: '1'},
        { id: '6', telium: '0', tetra: '1', function: '0', menu: '1', question:'Tetra Reference Guide1?', answer:'Tetra ans1', favourite: '1'},
        { id: '7', telium: '0', tetra: '1', function: '0', menu: '1', question:'Tetra Reference Guide1?', answer:'Tetra ans1', favourite: '1'},
        { id: '8', telium: '0', tetra: '1', function: '0', menu: '1', question:'Tetra Reference Guide1?', answer:'Tetra ans1', favourite: '1'},
        { id: '9', telium: '0', tetra: '1', function: '0', menu: '1', question:'Tetra Reference Guide1?', answer:'Tetra ans1', favourite: '1'},
        { id: '10', telium: '0', tetra: '1', function: '0', menu: '1', question:'Tetra Reference Guide1?', answer:'Tetra ans1', favourite: '1'},
        { id: '11', telium: '0', tetra: '1', function: '0', menu: '1', question:'Tetra Reference Guide1?', answer:'Tetra ans1', favourite: '1'},
        { id: '12', telium: '0', tetra: '1', function: '0', menu: '1', question:'Tetra Reference Guide1?', answer:'Tetra ans1', favourite: '1'},
        { id: '13', telium: '0', tetra: '1', function: '0', menu: '1', question:'Tetra Reference Guide1?', answer:'Tetra ans1', favourite: '1'},
        { id: '14', telium: '0', tetra: '1', function: '0', menu: '1', question:'Tetra Reference Guide1?', answer:'Tetra ans1', favourite: '1'},

    ];*/

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        fetch('http://10.63.192.145:8080/skyzer-guide/referenceGuideFunctions')
          .then((response) => response.json())
          .then((responseJson) => {
            setFilteredDataSource(responseJson);
            setMasterDataSource(responseJson);
          })
          .catch((error) => {
            console.error(error);
          });
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
                <TouchableOpacity onPress={() => alert(item.id)}>
                <View style={[styles.itemHeader]}>
                    <View style={styles.itemHeaderLeft}>
                        {
                            item.is_tetra ? <Badge style={[styles.badge, {backgroundColor: Colors.green}]}>TETRA</Badge>: null
                        }
                        {
                            item.is_telium ? <Badge style={[styles.badge, {backgroundColor: Colors.yellow}]}>TELIUM</Badge> : null
                        }
                    </View>
                    <View style={styles.itemHeaderRight}>
                        {
                            item.is_function ? <Image style={styles.itemCardImage} source={require('../assets/images/function.png')} /> : null
                        }
                        {
                            item.is_menu ? <Image style={styles.itemCardImage} source={require('../assets/images/menu.png')} /> : null
                        }
                    </View>
                </View>
                <View style={[styles.itemBody]}>
                    <View style={styles.itemBodyLeft}>
                        <Text style={styles.itemQuestion}>{item.name}</Text>
                        <Text style={styles.itemAnswer}>{item.short_solution}</Text>
                    </View>
                    <View style={styles.itemBodyRight}>
                        <Image style={styles.itemCardImage} source={require('../assets/images/star-outline.png')} />
                    </View>
                </View>
                </TouchableOpacity>
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
                onPressCancel={(text) => searchFilterFunction("")}
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