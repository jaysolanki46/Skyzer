import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, ImageBackground, Dimensions, ScrollView } from 'react-native';
import Headertext from '../config/Headertext';
import Colors from '../config/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import BackgroundImage from "../assets/images/background-main.jpg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DefaultProfileImage from '../assets/images/profile/profile.png';
import { useFocusEffect } from '@react-navigation/native';
import TetraGuideImage from '../assets/images/home/tetra-card-book.png';
import TeliumGuideImage from '../assets/images/home/telium-card-book.png';
import SupportImage from '../assets/images/home/contact-card-book.png'
import AboutImage from '../assets/images/home/about-card-book.png';
import NitroImage from '../assets/images/home/nitro-card-book.png';
import TopStatusBar from '../components/TopStatusBar';

export default Home = ({ navigation }) => {
    const [items, setItems] = useState([
        {
            id: 1, name: 'TETRA',
            desc: 'Complete Guide',
            image: TetraGuideImage,
            subItems: [{ id: 1, name: 'DESK3200' }, { id: 2, name: 'DESK5000' }, { id: 3, name: 'MOVE2500' }, { id: 4, name: 'MOVE5000' }],
            color1: Colors.colorType1_1, color2: Colors.colorType1_2, color3: Colors.colorType1_3
        },
        {
            id: 2, name: 'TELIUM',
            desc: 'Complete Guide',
            image: TeliumGuideImage,
            subItems: [{ id: 5, name: 'ICT220' }, { id: 6, name: 'ICT250' }, { id: 7, name: 'IWL255' }, { id: 8, name: 'IWL252' }],
            color1: Colors.colorType2_1, color2: Colors.colorType2_2, color3: Colors.colorType2_3
        },
        {
            id: 3, name: 'SUPPORT',
            desc: 'Happy to help',
            image: SupportImage,
            subItems: [{ id: 9, name: 'CALL' }, { id: 10, name: 'EMAIL' },],
            color1: Colors.colorType3_1, color2: Colors.colorType3_2, color3: Colors.colorType3_3
        },
        {
            id: 4, name: 'NITRO',
            desc: 'Get your package',
            image: NitroImage,
            subItems: [{ id: 11, name: 'SEND ON EMAIL' }, ,],
            color1: Colors.colorType2_1, color2: Colors.colorType2_2, color3: Colors.colorType2_3
        },
        {
            id: 5,name: 'ABOUT US',
            desc: 'Explore the Skyzer',
            image: AboutImage,
            subItems: [{ id: 12, name: 'WHO WE ARE' }, { id: 13, name: 'VALUES' }, { id: 14, name: 'LOCATION' }, { id: 16, name: 'SOCIAL HANDLES' },],
            color1: Colors.colorType4_1, color2: Colors.colorType4_2, color3: Colors.colorType4_3
        },
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
    if (hours > 0 && hours < 12) {
        currentMsg = "Good morning, what are you up to?";
    } else if (hours >= 12 && hours < 17) {
        currentMsg = "Good afternoon, what are you up to?";
    } else if (hours >= 17 && hours < 24) {
        currentMsg = "Good evening, what are you up to?";
    }

    return (
        <SafeAreaView style={styles.container}>
            <TopStatusBar />
            <View style={styles.header}>
                <View style={styles.headerSubView}>
                    <View style={{ flex: 5, }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[Headertext.h4, { fontWeight: '300' }]}>Hello,</Text><Text style={[Headertext.h4, { fontWeight: 'bold', color: Colors.fontColorBluest }]}> {sessionUsername}!</Text>
                        </View>
                        <Text style={Headertext.h5}>
                            {currentMsg}
                        </Text>
                    </View>

                    <View style={{ flex: 1, }}>
                        <View style={[styles.headerRight]}>
                            <TouchableOpacity style={{ borderRadius: 10, borderColor: Colors.bodyColor }}
                                onPress={() => navigation.navigate('Profile')}>
                                {
                                    sessionUserProfile == null ?
                                        <Image
                                            style={styles.profile}
                                            source={DefaultProfileImage}
                                        />
                                        :
                                        <Image
                                            style={styles.profile}
                                            source={{ uri: sessionUserProfile }}
                                        />
                                }

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.bodyTop}>
                <Text style={[Headertext.h1, { marginRight: 10, color: Colors.fontColorBluest }]}>Your</Text>
                <Text style={[Headertext.h1, { color: Colors.fontColorPurplest, }]}>Home</Text>
            </View>
            <View style={styles.body}>
                <ImageBackground source={BackgroundImage} style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.45)',
                    width: Dimensions.get("window").width,
                    height: Dimensions.get("window").height
                }}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingBottom: 60, }}>

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
                                <TouchableOpacity style={{ flex: 1, }} onPress={() => { navigation.navigate('TetraGuide') }}>
                                    {/* TETRA BLOCK */}
                                    <View style={{ flex: 1, }}>
                                        <View style={{ flex: 2, justifyContent: 'center' }}>
                                            <Text style={[Headertext.h3, { color: Colors.fontColorWhite, alignSelf: 'center', }]}>{items[0].name}</Text>
                                            <Text style={[Headertext.h5, { color: Colors.fontColorWhite, alignSelf: 'center', }]}>{items[0].desc}</Text>
                                        </View>
                                        <View style={{ flex: 4, justifyContent: 'center', overflow: 'hidden', }}>
                                            <Image style={{
                                                width: 100,
                                                height: 100,
                                                marginLeft: -20,
                                            }} source={items[0].image} />
                                        </View>
                                        <View style={{
                                            flex: 1, flexDirection: 'row', flexWrap: 'wrap',
                                            padding: 5,
                                            justifyContent: Platform.OS === 'ios' ? 'space-around' : null
                                        }}>
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
                                </TouchableOpacity>
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
                                    <TouchableOpacity style={{ flex: 1, }} onPress={() => { navigation.navigate('TeliumGuide') }}>
                                        {/* TELIUM BLOCK */}
                                        <View style={{ flex: 1, }}>
                                            <View style={{ flex: 4, }} >
                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                    <View style={{ flex: 4, padding: 10, justifyContent: 'center' }}>
                                                        <Text style={[Headertext.h4, { color: Colors.fontColorWhite, }]}>{items[1].name}</Text>
                                                        <Text style={[{ color: Colors.fontColorWhite, fontSize: 13 }]}>{items[1].desc}</Text>
                                                    </View>
                                                    <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', }}>
                                                        <Image style={{
                                                            width: 50,
                                                            height: 50,
                                                            marginLeft: 20,
                                                        }} source={items[1].image} />
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{
                                                flex: 2, flexDirection: 'row', flexWrap: 'wrap',
                                                paddingLeft: Platform.OS === 'ios' ? 25 : 5,
                                                paddingRight: Platform.OS === 'ios' ? 25 : 5,
                                                justifyContent: 'space-between'
                                            }} >
                                                {
                                                    items[1].subItems.map(subItem => {
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
                                    </TouchableOpacity>
                                </LinearGradient>

                                <LinearGradient colors={[items[2].color1, items[2].color2, items[2].color3]} style={{
                                    flex: 3, marginTop: 5,
                                    borderRadius: 10,
                                }}>
                                    <TouchableOpacity style={{ flex: 1, }} onPress={() => { navigation.navigate('Support') }}>
                                        {/* SUPPORT BLOCK */}
                                        <View style={{ flex: 1 }} >
                                            <View style={{ flex: 4.5, }} >
                                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                                    <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', }}>
                                                        <Image style={{
                                                            width: 60,
                                                            height: 60,
                                                            marginLeft: -26,
                                                        }} source={items[2].image} />
                                                    </View>
                                                    <View style={{ flex: 4, padding: 5, justifyContent: 'center' }}>
                                                        <Text style={[Headertext.h4, { color: Colors.fontColorWhite, }]}>{items[2].name}</Text>
                                                        <Text style={[{ color: Colors.fontColorWhite, fontSize: 13, }]}>{items[2].desc}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{
                                                flex: 1.5, flexDirection: 'row', flexWrap: 'wrap',
                                                paddingLeft: Platform.OS === 'ios' ? 30 : 5,
                                                paddingRight: Platform.OS === 'ios' ? 30 : 5,
                                                justifyContent: 'space-around'
                                            }} >
                                                {
                                                    items[2].subItems.map(subItem => {
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
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </View>
                        {/* END BLOCK 1 - 3 COMPONENTS */}

                        {/* BLOCK 2 - 2 COMPONENTS */}
                        <View style={{
                            width: Dimensions.get("window").width,
                            height: 150,
                            flexDirection: 'row',
                            padding: 10,
                        }}>
                            <LinearGradient colors={[items[3].color1, items[3].color2, items[3].color3]} style={{
                                width: '50%',
                                height: '98%',
                                borderRadius: 10,
                            }}>
                                <TouchableOpacity style={{ flex: 1, }} onPress={() => { navigation.navigate('Nitro') }}>
                                    {/* NITRO BLOCK */}
                                    <View style={{ flex: 1, }}>
                                        <View style={{ flex: 4, }} >
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <View style={{ flex: 4, padding: 10, justifyContent: 'center' }}>
                                                    <Text style={[Headertext.h4, { color: Colors.fontColorWhite, }]}>{items[3].name}</Text>
                                                    <Text style={[{ color: Colors.fontColorWhite, fontSize: 13 }]}>{items[3].desc}</Text>
                                                </View>
                                                <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', }}>
                                                    <Image style={{
                                                        width: 50,
                                                        height: 50,
                                                        marginLeft: 25,
                                                    }} source={items[3].image} />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{
                                            flex: 2, flexDirection: 'row', flexWrap: 'wrap',
                                            paddingLeft: Platform.OS === 'ios' ? 10: 5,
                                        }} >
                                            {
                                                items[3].subItems.map(subItem => {
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
                                </TouchableOpacity>
                            </LinearGradient>

                        </View>
                        {/* END BLOCK 2 - 2 COMPONENTS */}

                        {/* BLOCK 3 - 1 COMPONENT */}
                        <View style={{
                            width: Dimensions.get("window").width,
                            height: 30,
                            paddingLeft: 15,
                            paddingRight: 10,
                        }}>
                            <Text style={[Headertext.h5, { fontWeight: 'bold' }]}>
                                SKYZER TECHNOLOGIES
                            </Text>
                        </View>

                        <View style={{
                            width: Dimensions.get("window").width,
                            height: 170,
                            paddingLeft: 10,
                            paddingRight: 10,
                        }}>

                            <LinearGradient colors={[items[4].color1, items[4].color2, items[4].color3]} style={{
                                flex: 1, borderRadius: 10,
                            }}>
                                <TouchableOpacity style={{ flex: 1, }} onPress={() => { navigation.navigate('About') }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 4, }}>
                                            <View style={{ flex: 1, }}>
                                                <View style={{ flex: 4, padding: 10, justifyContent: 'center' }}>
                                                    <Text style={[Headertext.h3, { color: Colors.fontColorWhite, }]}>{items[4].name}</Text>
                                                    <Text style={[Headertext.h5, { color: Colors.fontColorWhite, }]}>{items[4].desc}</Text>
                                                </View>
                                                <View style={{ flex: 2, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', paddingLeft: 10, }}>
                                                    {
                                                        items[4].subItems.map(subItem => {
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
                                        </View>
                                        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden' }}>
                                            <Image style={{
                                                width: 120,
                                                height: 120,
                                                marginLeft: 50,
                                            }} source={items[4].image} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
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
        paddingTop: Platform.OS === 'ios' ? null : 20,
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
    bottomTags: {
        fontSize: 10,
        fontWeight: 'bold',
        justifyContent: 'center',
        color: Colors.fontColorWhite,
        margin: 1,
    },
});
