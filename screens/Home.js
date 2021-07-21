import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import Headertext from '../config/Headertext';
import { FlatGrid } from 'react-native-super-grid';


export default Home = () => {
    const [items, setItems] = React.useState([
        { tag: 'GUIDE', name:'Tetra Reference Guide', color: '#0066CB', image:require('../assets/images/tetra-guide.png') },
        { tag: 'GUIDE', name:'Telium Reference Guide', color: '#754DD3', image:require('../assets/images/telium-guide.png') },
        { tag: 'SUPPORT', name:'Conatct Us', color: '#D5004D', image:require('../assets/images/contact-us.png') },
        { tag: 'SKYZER', name:'About Us', color: '#0066CB', image:require('../assets/images/about-us.png') },

      ]);

    return (
        <View style={styles.container}>
            {Platform.OS === 'ios' && <>
            <StatusBar barStyle="dark-content" hidden = {false} translucent = {true}></StatusBar>
            </>}
            <View style={styles.header}>
            <View style={styles.headerSubView}>
                    <View style={styles.headerLeft}>
                        <Text style={Headertext.h1}>Hey,</Text>
                        <Text style={Headertext.h4}>Welcome back, Margi!</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../assets/images/profile.png')}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.bodySubView}>
                    <FlatGrid itemDimension={130} data={items} style={styles.gridView} spacing={10}
                        renderItem={({ item }) => (
                            <View style={[styles.gridViewContainer, { backgroundColor: item.color }]}>
                                <View style={[styles.itemContainer]}>
                                    <Text style={styles.itemTag}>{item.tag}</Text>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                </View>
                                <View style={[styles.footerContainer, { backgroundColor: item.color }]}>
                                    <Image style={styles.itemCardLogo} source={item.image} />
                                </View>
                            </View>
                        )}
                        />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'ios'? 10 : 60,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "white",
      flexDirection: 'column',
    },
    header: {
        flex: 1,
        alignItems: 'baseline',
        width: '100%',
        marginTop: 20, 
    },
    body: {
        flex: 5,
        alignItems: 'center',
        backgroundColor: "white",
        width: '100%',
        flexDirection: "row",
        alignContent: "space-between",
    },
    headerSubView: {
        flex: 1, 
        flexDirection: 'row',
        marginLeft: 10, 
        marginRight: 10,
    },
    headerLeft: {
        flex: 4,
        width: '20%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    headerRight: {
        flex: 2,
        width: '20%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    tinyLogo: {
        width: 75,
        height: 75,
        borderWidth: 1,
        borderRadius: 50,
    },
    bodySubView: {
        flex: 1, 
        marginTop: 10,
    },
    gridView: {
        flex: 1,
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
    footerContainer: {
        flex: 4,
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
    itemCardLogo: {
        width: 100,
        height: 150,
        alignSelf: 'flex-end',
    },
});
