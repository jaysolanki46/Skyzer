import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../config/Colors';
import { FlatGrid } from 'react-native-super-grid';

export default AllCodeList = () => {
    const [items, setItems] = React.useState([
        { tag: 'FUNCTION', name:'Tetra Reference Guide1', ans:'Tetra ans1'},
        { tag: 'FUNCTION', name:'Tetra Reference Guide2', ans:'Tetra ans2'},
        { tag: 'MENU', name:'Tetra Reference Guide3', ans:'Tetra ans3'},
        { tag: 'FUNCTION', name:'Tetra Reference Guide4', ans:'Tetra ans4'},
    ]);

    return (
    <View style={styles.container}>
        <View style={styles.bodySubView}>
            <FlatGrid itemDimension={130} data={items} style={styles.gridView} spacing={10}
                renderItem={({ item }) => (
                    <View style={[styles.gridViewContainer, { 
                            backgroundColor: item.tag == 'MENU' ? Colors.white : Colors.darkFont
                        }]}>
                        <View style={[styles.itemContainer]}>
                            <Text style={styles.itemTag}>{item.tag}</Text>
                            <Text style={styles.itemName}>{item.name}</Text>
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
      paddingBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.background,
    },
    bodySubView: {
        flex: 1, 
        marginTop: 10,
        backgroundColor: Colors.background,
    },
    gridViewContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        borderRadius: 5,
        padding: 10,
    },
    itemContainer: {
        flex:2,
    },
    itemTag: {
        fontSize: 12,
        color: '#A7AABD',
        fontWeight: '600',
        margin: 5,
    },
    itemName: {
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold',
        margin: 5,
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
        margin: 5,
    },
});