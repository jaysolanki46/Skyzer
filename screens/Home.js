import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, SafeAreaView, TouchableOpacity, ImageBackground, Dimensions, ScrollView } from 'react-native';
import Headertext from '../config/Headertext';
import { FlatGrid } from 'react-native-super-grid';
import Colors from '../config/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import backgroundImage from "../assets/images/background-main.jpg";
import { Badge } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultProfile from '../assets/images/profile.png';
import { useFocusEffect } from '@react-navigation/native';

export default Home = ({navigation}) => {
    const [items, setItems] = useState([
        { id: 1, tag: 'CODE GUIDE', name:'TETRA',
            desc: 'Tetra complete guide',
            image: require('../assets/images/tetra-card-book.png'),
            subItems: [{ id: 1, name: 'DESK3200' }, { id: 2, name: 'DESK5000' }, { id: 3, name: 'MOVE2500' }, { id: 4, name: 'MOVE5000' }],
            color1: Colors.colorType1_1, color2: Colors.colorType1_2, color3: Colors.colorType1_3, icon:require('../assets/images/tetra-guide.png') },
        { id: 2, tag: 'CODE GUIDE', name: 'Telium', 
            desc: 'Telium complete guide',
            subItems: [{ id: 5, name: 'ICT220' }, { id: 6, name: 'ICT250' }, { id: 7, name: 'IWL255' }, { id: 8, name: 'IWL252' }],
            color1: Colors.colorType2_1, color2: Colors.colorType2_2, color3: Colors.colorType2_3, icon:require('../assets/images/telium-guide.png') },
        { id: 3, tag: 'SKYZER', name: 'About', 
            desc: 'Know more about us',
            subItems: [{ id: 9, name: 'VISION' },],
            color1: Colors.colorType3_1, color2: Colors.colorType3_2, color3: Colors.colorType3_3, icon:require('../assets/images/about-us.png') },
        { id: 4, tag: 'SUPPORT', name:'Contact',  
            desc: 'Always happy to help you',
            subItems: [{ id: 10, name: 'CALL' }, { id: 11, name: 'EMAIL' }, ],
            color1: Colors.colorType4_1, color2: Colors.colorType4_2, color3: Colors.colorType4_3, icon:require('../assets/images/contact-us.png') },

      ]);
    
    const [sessionUsername, setSessionUsername] = useState(null);
    const [sessionUserProfile, setSessionUserProfile] = useState(null);

    const settingSession = async () => {
        setSessionUsername(await AsyncStorage.getItem('username'));
        setSessionUserProfile(await AsyncStorage.getItem('profile'));
    }

    /** REFRESH THE PAGE ON EVERY VISIT */
    useFocusEffect(
        React.useCallback(() => {
            settingSession();
        }, [])
    );

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
                            <Text style={[Headertext.h4, { fontWeight: '300' }]}>Hello,</Text><Text style={[Headertext.h4, { fontWeight: 'bold', color: Colors.fontColorBluest }]}> {sessionUsername}!</Text>
                    </View>
                    <Text style={Headertext.h5}>
                    {currentMsg}
                    </Text>
                </View>

                <View style={{flex: 1,}}>
                <View style={[styles.headerRight]}>
                        <TouchableOpacity style={{borderWidth: 0.5, borderRadius: 10, borderColor: Colors.colorType1_1}}  
                        onPress={() => navigation.navigate('Profile')}>
                        {
                            sessionUserProfile == null ?
                                        <Image
                                            style={styles.profile}
                                            source={defaultProfile}
                                        /> 
                                        :
                                        <Image
                                            style={styles.profile}
                                            source={{ uri: sessionUserProfile}}
                                        />
                        }
                        
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
                    <ImageBackground source={backgroundImage} resizeMode="cover" style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.45)',
                        width: Dimensions.get("window").width,
                        height: Dimensions.get("window").height
                    }}>
                    {/* <FlatGrid itemDimension={130} data={items} style={styles.gridView} spacing={10}
                        renderItem={({ item }) => (
                          
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        if(item.id == 1) {
                                            navigation.navigate('TetraGuide')
                                        } else if (item.id == 2) {
                                            navigation.navigate('TeliumGuide')
                                        } else if (item.id == 3) {
                                            navigation.navigate('About')
                                        } else if (item.id == 4) {
                                            navigation.navigate('Contact')
                                        }
                                    }}>
                            <LinearGradient colors={[item.color1, item.color2, item.color3]} style={{ borderRadius: 35,}}>
                            <View style={[styles.gridViewContainer,]}>
                                <View style={[styles.itemContainer]}>
                                    <Text style={styles.itemTag}>{item.tag}</Text>
                                    <Image style={styles.itemCardIcon} source={item.image} />
                                </View>
                                <View style={styles.itemNameContainer}>
                                    <Text style={[Headertext.h3, { color: Colors.fontColorWhite }]}>{item.name}</Text>
                                </View>
                                <View style={[styles.footerContainer,]}>
                                    <View style={{flexDirection: 'row', flexWrap: 'wrap', 
                                    borderTopWidth: 1, borderTopColor: Colors.white,
                                     paddingTop: 5}}>
                                        {
                                            item.subItems.map(subItem => {
                                                return  (
                                                    <View key={subItem.id} style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', margin: 1,}}>
                                                        <Text style={[styles.bottomTags, {fontSize: 5,}]}>{'\u2B24'}</Text>
                                                        <Text style={styles.bottomTags}>{subItem.name}</Text>
                                                    </View>
                                                )
                                            })
                                        }
                                                
                                    </View>
                                </View>
                            </View>
                            </LinearGradient>
                            </TouchableOpacity>
                        )}
                        /> */}
                        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, paddingBottom: 60,}}>
                            
                            {/* BLOCK 1 - 3 COMPONENTS */}
                            <View style={{
                                width: Dimensions.get("window").width,
                                height: 300,
                                flexDirection: 'row',
                                padding: 10,
                                }}>

                                <LinearGradient colors={[items[0].color1, items[0].color2, items[0].color3]} style={{
                                    width: '50%',
                                    height: '98%',
                                    borderRadius: 10,
                                }}>
                                    <View style={{flex: 1,}}>
                                        {/* TETRA BLOCK */}
                                        <View style={{flex: 1,}}>
                                            <Image style={styles.itemCardIcon} source={items[0].icon} />
                                        </View>
                                        <View style={{ flex: 1,  }}>
                                            <Text style={[Headertext.h3, { color: Colors.fontColorWhite, alignSelf: 'center',}]}>{items[0].name}</Text>
                                            <Text style={[Headertext.h5, { color: Colors.fontColorWhite, alignSelf: 'center', }]}>{items[0].desc}</Text>
                                        </View>
                                        <View style={{ flex: 4, justifyContent: 'center', }}>
                                            <Image style={styles.itemCardImage} source={items[0].image} />
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', padding: 5, justifyContent: 'space-around', }}>
                                        {
                                            items[0].subItems.map(subItem => {
                                                return (
                                                    <View key={subItem.id} style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', margin: 1, }}>
                                                        <Text style={[styles.bottomTags, { fontSize: 5, }]}>{'\u2B24'}</Text>
                                                        <Text style={styles.bottomTags}>{subItem.name}</Text>
                                                    </View>
                                                )
                                            })
                                        }
                                        </View>
                                    </View>
                                </LinearGradient>

                                 <View style={{
                                    width: '50%',
                                    height: '98%',
                                    paddingLeft: 10,
                                    flex: 1,
                                }}>

                                    <LinearGradient colors={[items[1].color1, items[1].color2, items[1].color3]} style={{
                                        flex: 3, marginBottom: 5,
                                        borderRadius: 10,
                                    }}>
                                        <View >
                                            {/* TELIUM BLOCK */}
                                        </View>
                                    </LinearGradient>

                                    <LinearGradient colors={[items[2].color1, items[2].color2, items[2].color3]} style={{
                                        flex: 3, marginTop: 5,
                                        borderRadius: 10,
                                    }}>
                                        <View >
                                            {/* ABOUT BLOCK */}
                                        </View>
                                    </LinearGradient>
                                </View>
                            </View>
                            {/* END BLOCK 1 - 3 COMPONENTS */}  

                            {/* BLOCK 2 - 1 COMPONENT */}
                            <View style={{
                                width: Dimensions.get("window").width,
                                height: 170,
                                paddingLeft: 10,
                                paddingRight: 10,
                            }}>

                                <LinearGradient colors={[items[3].color1, items[3].color2, items[3].color3]} style={{
                                     flex: 1,borderRadius: 10, paddingRight: 10,
                                }}>
                                    <View>

                                    </View>
                                </LinearGradient>

                            </View>
                            {/* END BLOCK 2 - 1 COMPONENT */}

                        </ScrollView>


                        </ImageBackground>
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
    },
    profile: {
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: Colors.profilBackground,
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
    itemNameContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    footerContainer: {
        flex: 3,
        justifyContent: 'flex-end',
    },
    itemTag: {
        fontSize: 12,
        color: Colors.fontColorWhite,
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
    itemCardIcon: {
        width: 30,
        height: 30,
        marginLeft: 'auto',
        margin: 5,
    },
    itemCardImage: {
        width: 100,
        height: 100,
        marginLeft: -20,
    },
    bottomTags: {
        fontSize: 10,
        justifyContent: 'center',
        color: Colors.fontColorWhite,
        margin: 1,
    },
});
