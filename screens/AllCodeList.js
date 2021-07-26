import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, } from 'react-native';
import { Badge } from 'react-native-paper'; 
import Colors from '../config/Colors';

export default AllCodeList = () => {
    const [items, setItems] = React.useState([
        { id: '1', telium: '1', tetra: '1', function: '1', menu: '0', question:'Tetra Reference Guide1?', answer:'FUNC 3428', favourite: '1'},
        { id: '2', telium: '0', tetra: '1', function: '0', menu: '1', question:'Tetra Reference Guide1?', answer:'Tetra ans1', favourite: '1'},

    ]);

    return (
    <View style={styles.container}>
        <View style={styles.bodySubView}>
            <FlatList style={styles.gridView}
                data={items} 
                keyExtractor={items => items.id}
                renderItem={({ item }) => (
                    <View style={[styles.listContainer, { backgroundColor: '#496AA9' }]}>
                        <View style={[styles.itemHeader]}>
                            <View style={styles.itemHeaderLeft}>
                                {
                                    item.tetra === '1' ? <Badge style={[styles.badge, {backgroundColor: Colors.green}]}>TETRA</Badge>: null
                                }
                                {
                                    item.telium === '1' ? <Badge style={[styles.badge, {backgroundColor: Colors.yellow}]}>TELIUM</Badge> : null
                                }
                            </View>
                            <View style={styles.itemHeaderRight}>
                                {
                                    item.function === '1' ? <Image style={styles.itemCardImage} source={require('../assets/images/function.png')} /> : null
                                }
                                {
                                    item.menu === '1' ? <Image style={styles.itemCardImage} source={require('../assets/images/menu.png')} /> : null
                                }
                            </View>
                        </View>
                        <View style={[styles.itemBody]}>
                            <View style={styles.itemBodyLeft}>
                                <Text style={styles.itemQuestion}>{item.question}</Text>
                                <Text style={styles.itemAnswer}>{item.answer}</Text>
                            </View>
                            <View style={styles.itemBodyRight}>
                                <Image style={styles.itemCardImage} source={require('../assets/images/star-outline.png')} />
                            </View>
                        </View>
                    </View>
                )}
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
        margin: 15,
        backgroundColor: Colors.background,
    },
    listContainer: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
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
});