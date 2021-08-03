import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import Headertext from '../config/Headertext';
import { FlatGrid } from 'react-native-super-grid';
import Colors from '../config/Colors';


export default Home = () => {
    const [items, setItems] = React.useState([
        { tag: 'GUIDE', name:'Tetra Reference Guide', color: Colors.skyzerCard1, image:require('../assets/images/tetra-guide.png') },
        { tag: 'GUIDE', name:'Telium Reference Guide', color: Colors.skyzerCard2, image:require('../assets/images/telium-guide.png') },
        { tag: 'SUPPORT', name:'Conatct Us', color: Colors.skyzerCard3, image:require('../assets/images/contact-us.png') },
        { tag: 'SKYZER', name:'About Us', color: Colors.skyzerCard4, image:require('../assets/images/about-us.png') },

      ]);

    return (
        <View style={styles.container}>
            {Platform.OS === 'ios' && <>
            <StatusBar barStyle="light-content" hidden = {false} translucent = {true}></StatusBar>
            </>}
            <View style={styles.header}>
            <View style={styles.headerSubView}>
                <Text style={Headertext.h2}>Hi Jay</Text>
            </View>
            </View>
            <View style={styles.bodyTop}>
            <View style={styles.bodyTopSubView}>
                    <View style={styles.bodyTopLeft}>
                        <Text style={Headertext.h4}>1248</Text>
                        <Text style={Headertext.h5}>Skyzer Technologies</Text>
                    </View>
                    <View style={styles.bodyTopRight}>
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
                                    <Image style={styles.itemCardImage} source={item.image} />
                                </View>
                                <View style={[styles.footerContainer, { backgroundColor: item.color }]}>
                                    <Text style={styles.itemName}>{item.name}</Text>
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
      paddingTop: Platform.OS === 'ios'? 10 : 20,
      flexDirection: 'column',
      backgroundColor: Colors.background,
    },
    header: {
        flex: .5,
        width: '100%',
        marginTop: 20, 
        marginBottom: 10,
    },
    headerSubView: {
        flex: 1, 
        flexDirection: 'row',
        marginLeft: 10, 
        marginRight: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor: Colors.background,
    },
    bodyTop: {
        flex: 0.5,
        alignItems: 'baseline',
        width: '100%',
    },
    body: {
        flex: 5,
        width: '100%',
        flexDirection: "row",
        alignContent: "space-between",
    },
    bodyTopSubView: {
        flex: 1, 
        flexDirection: 'row',
        marginLeft: 10, 
        marginRight: 10,
        backgroundColor: Colors.background,
    },
    bodyTopLeft: {
        flex: 4,
        width: '20%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    bodyTopRight: {
        flex: 2,
        width: '20%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    tinyLogo: {
        width: 75,
        height: 75,
        borderRadius: 50,
    },
    bodySubView: {
        flex: 1, 
        marginTop: 10,
        backgroundColor: Colors.background,
    },
    gridView: {
        flex: 1,
    },
    gridViewContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        borderRadius: 5,
        padding: 10,
        height: 170,
    },
    itemContainer: {
        flex:2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerContainer: {
        flex: 4,
        justifyContent: 'flex-end',
    },
    itemTag: {
        fontSize: 12,
        color: Colors.lightFont,
        fontWeight: '600',
        margin: 5,
        alignSelf: 'center',
    },
    itemName: {
        fontSize: 25,
        color: Colors.lightFont,
        fontWeight: 'bold',
        margin: 5,
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: Colors.lightFont,
        margin: 5,
    },
    itemCardImage: {
        width: 50,
        height: 50,
        alignSelf: 'flex-end',
    },
});
