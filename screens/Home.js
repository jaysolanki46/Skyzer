import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import Headertext from '../config/Headertext';
import { FlatGrid } from 'react-native-super-grid';
import Colors from '../config/Colors';
import { LinearGradient } from 'expo-linear-gradient';

export default Home = ({navigation}) => {
    const [items, setItems] = React.useState([
        { id: 1, tag: 'CODE GUIDE', name:'Tetra', desc:'Provide you the complete guide for your knowledge', color1: Colors.colorType1_1, color2: Colors.colorType1_2, color3: Colors.colorType1_3, image:require('../assets/images/tetra-guide.png') },
        { id: 2, tag: 'CODE GUIDE', name: 'Telium', desc: 'Provide you the complete guide for your knowledge', color1: Colors.colorType2_1, color2: Colors.colorType2_2, color3: Colors.colorType2_3, image:require('../assets/images/telium-guide.png') },
        { id: 3, tag: 'SKYZER', name: 'About', desc: 'Provide you the complete guide for your knowledge', color1: Colors.colorType3_1, color2: Colors.colorType3_2, color3: Colors.colorType3_3, image:require('../assets/images/about-us.png') },
        { id: 4, tag: 'SUPPORT', name:'Conatct',  desc:'Provide you the complete guide for your knowledge', color1: Colors.colorType4_1, color2: Colors.colorType4_2, color3: Colors.colorType4_3, image:require('../assets/images/contact-us.png') },

      ]);

    var hours = new Date().getHours(); // Current hour
    var currentMsg = "";
    if(hours > 0 && hours < 12) {
        currentMsg = "Good morning, what are you up to?";
    } else if (hours >= 12 && hours < 17) {
        currentMsg = "Good afternoon, what are you up to?";
    } else if (hours >= 17 && hours < 24) {
        currentMsg = "Good evening, what are you up to?";
    } 

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" translucent = {true}></StatusBar>
            <View style={styles.header}>
            <View style={styles.headerSubView}>
                <View style={{flex: 5,}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[Headertext.h4, {fontWeight: '300'}]}>Hello,</Text><Text style={[Headertext.h4, {fontWeight: 'bold', color: Colors.fontColorBluest}]}> Jay!</Text>
                    </View>
                    <Text style={Headertext.h5}>
                    {currentMsg}
                    </Text>
                </View>

                <View style={{flex: 1,}}>
                <View style={[styles.headerRight]}>
                        <TouchableOpacity style={{borderWidth: 0.5, borderRadius: 10,}}  
                        onPress={() => navigation.navigate('Profile')}>
                        <Image
                            style={styles.profile}
                            source={require('../assets/images/profile.png')}
                        />
                        </TouchableOpacity>
                </View>
                </View>
            </View>
            </View>
            <View style={styles.bodyTop}>
                <Text style={[Headertext.h1, {marginRight: 10, color: Colors.fontColorBluest}]}>Your</Text>
                <Text style={[Headertext.h1, {color: Colors.fontColorPurplest,}]}>Home</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.bodySubView}>
                    <FlatGrid itemDimension={130} data={items} style={styles.gridView} spacing={10}
                        renderItem={({ item }) => (
                          
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        if(item.id == 1) {
                                            navigation.navigate('TetraGuide')
                                        } else if (item.id == 2) {
                                            navigation.navigate('TeliumGuide')
                                        } else if (item.id == 3) {
                                            navigation.navigate('TetraCodeList')
                                        } else if (item.id == 4) {
                                            navigation.navigate('TetraCodeList')
                                        }
                                    }}>
                            <LinearGradient colors={[item.color1, item.color2, item.color3]} style={{ borderRadius: 35,}}>
                            <View style={[styles.gridViewContainer,]}>
                                <View style={[styles.itemContainer]}>
                                    <Text style={styles.itemTag}>{item.tag}</Text>
                                    <Image style={styles.itemCardImage} source={item.image} />
                                </View>
                                <View style={[styles.footerContainer,]}>
                                    <Text style={[Headertext.h3, {color: Colors.fontColorWhite}]}>{item.name}</Text>
                                    <Text style={[Headertext.h5, {color: Colors.fontColorWhite, }]}>
                                                {item.desc}
                                    </Text>
                                </View>
                            </View>
                            </LinearGradient>
                            </TouchableOpacity>
                        )}
                        />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.bodyColor,
      paddingTop: Platform.OS === 'ios'? null : 20,
    },
    header: {
        flex: 1,
        width: '100%',
    },
    headerSubView: {
        flex: 1, 
        flexDirection: 'row',
        marginLeft: 10, 
        marginRight: 10,
        backgroundColor: Colors.bodyColor,
        alignItems: 'center',
    },
    headerRight: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyTop: {
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'baseline',
        width: '100%',
        marginLeft: 10, 
    },
    body: {
        flex: 4.5,
        width: '100%',
        flexDirection: "row",
        alignContent: "space-between",
    },
    profile: {
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: Colors.profilBackground,
    },
    bodySubView: {
        flex: 1, 
        marginTop: 10,
        backgroundColor: Colors.bodyColor,
    },
    gridView: {
        flex: 1,
    },
    gridViewContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 10,
        height: 200,
    },
    itemContainer: {
        flex:2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerContainer: {
        flex: 4,
        justifyContent: 'center',
    },
    itemTag: {
        fontSize: 12,
        color: Colors.lightFont,
        fontWeight: 'bold',
        margin: 5,
        alignSelf: 'center',
        letterSpacing: 1,
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: Colors.lightFont,
        margin: 5,
    },
    itemCardImage: {
        width: 30,
        height: 30,
        alignSelf: 'center',
    },
});
