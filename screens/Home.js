import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Dimensions, ScrollView, Alert, Modal, Pressable, Linking } from 'react-native';
import Headertext from '../config/Headertext';
import Colors from '../config/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DefaultProfileImage from '../assets/images/profile/profile.png';
import { useFocusEffect } from '@react-navigation/native';
import TetraGuideImage from '../assets/images/home/tetra-card-book.png';
import TeliumGuideImage from '../assets/images/home/telium-card-book.png';
import SupportImage from '../assets/images/home/contact-card-book.png'
import AboutImage from '../assets/images/home/about-card-book.png';
import NitroImage from '../assets/images/home/nitro-card-book.png';
import BulletinImage from '../assets/images/home/bulletin-card-book.png';
import TopStatusBar from '../components/TopStatusBar';
import Configurations from '../config/Configurations';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../components/AuthContext';
import LoadOneLineImage from '../assets/images/loaders/one-line-loader.gif';
import LoadBlockImage from '../assets/images/loaders/blocks-loader.gif';
import {useRoute} from '@react-navigation/native';
import CloseImage from '../assets/images/home/close.png'
import SupportBannerImage from '../assets/images/home/support-banner.png'
import SupportEmailButtonImage from '../assets/images/home/support-email-button.png'
import SupportPhoneButtonImage from '../assets/images/home/support-phone-button.png'

export default Home = ({ navigation }) => {

    const route = useRoute();

    const [items, setItems] = useState([
        {
            id: 1, name: 'TETRA',
            desc: 'Complete Guide',
            image: TetraGuideImage,
            subItems: [{ id: 1, name: 'DESK3200' }, { id: 2, name: 'DESK5000' }, { id: 3, name: 'MOVE2500' }, { id: 4, name: 'MOVE5000' }],
            color1: Colors.block1Color1of3, color2: Colors.block1Color2of3, color3: Colors.block1Color3of3
        },
        {
            id: 2, name: 'TELIUM',
            desc: 'Complete Guide',
            image: TeliumGuideImage,
            subItems: [{ id: 5, name: 'ICT220' }, { id: 6, name: 'ICT250' }, { id: 7, name: 'IWL255' }, { id: 8, name: 'IWL252' }],
            color1: Colors.block2Color1of3, color2: Colors.block2Color2of3, color3: Colors.block2Color3of3
        },
        {
            id: 3, name: 'SUPPORT',
            desc: 'Happy to help',
            image: SupportImage,
            subItems: [{ id: 9, name: 'CALL' }, { id: 10, name: 'EMAIL' },],
            color1: Colors.block3Color1of3, color2: Colors.block3Color2of3, color3: Colors.block3Color3of3
        },
        {
            id: 4, name: 'NITRO',
            desc: 'Get your package',
            image: NitroImage,
            subItems: [{ id: 11, name: 'SEND ON EMAIL' }, ,],
            color1: Colors.block4Color1of3, color2: Colors.block4Color2of3, color3: Colors.block4Color3of3
        },
        {
            id: 5, name: 'BULLETINS',
            desc: 'Get update yourself',
            image: BulletinImage,
            subItems: [{ id: 12, name: 'TECHNICAL BULLETIN' },],
            color1: Colors.block5Color1of3, color2: Colors.block5Color2of3, color3: Colors.block5Color3of3
        },
        {
            id: 6,name: 'ABOUT US',
            desc: 'Explore the Skyzer',
            image: AboutImage,
            subItems: [{ id: 13, name: 'WHO WE ARE' }, { id: 14, name: 'VALUES' }, { id: 15, name: 'LOCATION' }, { id: 16, name: 'SOCIAL HANDLES' },],
            color1: Colors.block6Color1of3, color2: Colors.block6Color2of3, color3: Colors.block6Color3of3
        },
    ]);

    const [userEmail, setUserEmail] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [modalSupportVisible, setModalSupportVisible] = useState(false);

    const { logOut } = React.useContext(AuthContext);

    const initStates = async () => {
        await SecureStore.getItemAsync("email").then(val => setUserEmail(val));
        await SecureStore.getItemAsync("token").then(val => setUserToken(val));
    }

    useEffect(() => {
        initStates();
    }, []);

    useEffect(() => {
        if (userToken != null) {
            InitUser()
        }
    }, [userEmail, userToken]);

    const InitUser = async () => {
        
        var myHeaders = new Headers();
        myHeaders.append("Authorization", userToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            const response = await fetch(Configurations.host + "/users/user/" + userEmail, requestOptions)
            const status = await response.status;

            if (status == 200) {
                const responseJson = await response.json();
                const userArray = JSON.parse(JSON.stringify(responseJson));
                setUserName(userArray.username);
                setUserProfile(userArray.image);
                await AsyncStorage.setItem('userId', userArray.id.toString());
                if (userProfile != null) {
                    await AsyncStorage.setItem('profile', userProfile);
                }
                setIsLoading(false);

            } else if (status == 401) {
                Alert.alert(
                    "Security Alert",
                    "Please login again!",
                    [
                        { text: "OK", onPress: () => logOut() }
                    ]
                );
                throw new Error(status);
            } else {
                setIsLoading(false);
                Alert.alert(
                    "Error",
                    "Something went wrong!"
                );
                throw new Error(status);
            }

        } catch (error) {
            
            var myErrorHeaders = new Headers();
            var errorMethodType = "POST";
            myErrorHeaders.append("Content-Type", "application/json");

            var erroRaw = JSON.stringify({
                "screen": route.name,
                "module": "NA",
                "user": await SecureStore.getItemAsync("email"),
                "status": error.message
            });

            var errorRequestOptions = {
                method: errorMethodType,
                headers: myErrorHeaders,
                body: erroRaw,
                redirect: 'follow'
            };
            
            await fetch(Configurations.host + "/logs/error", errorRequestOptions);
        }
    }

    const InitProfile = async () => {
        await AsyncStorage.getItem('profile').then(val => setUserProfile(val));
    }
    /** REFRESH THE PROFILE ON EVERY VISIT */
    useFocusEffect(
        React.useCallback(() => {
                InitProfile()
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


    function Loader() {
        return (
            <View style={{ flex: 1, }}>
                <View style={{ marginTop: 40, }}>
                    <Image style={styles.oneLineLoader} source={LoadOneLineImage} />
                    <Image style={styles.oneLineLoader} source={LoadOneLineImage} />
                </View>
                <View style={{ marginTop: 20, }}>
                    <Image style={[styles.oneLineLoader, {width: 250}]} source={LoadOneLineImage} />
                </View>
                <View style={{ marginTop: 20, }}>
                    <Image style={styles.blockLoader} source={LoadBlockImage} />
                </View>
            </View>
        );
    }

    function Content() {
        return (
            <View style={{ flex: 1, }}>
            <View style={styles.header}>
                <View style={styles.headerSubView}>
                    <View style={{ flex: 5, }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[Headertext.h4, { fontWeight: '300' }]}>Hello,</Text>
                            <Text style={[Headertext.h4, { fontWeight: 'bold', color: Colors.fontWhite }]}> {userName}!</Text>
                        </View>
                        <Text style={Headertext.h5}>
                            {currentMsg}
                        </Text>
                    </View>

                    <View style={{ flex: 1, }}>
                        <View style={[styles.headerRight]}>
                            <TouchableOpacity style={{ borderRadius: 10, borderColor: Colors.bodyColor }}
                                    onPress={() => navigation.navigate('ProfileTabs')}>
                                {
                                    userProfile == null ?
                                        <Image
                                            style={styles.profile}
                                            source={DefaultProfileImage}
                                        />
                                        :
                                        <Image
                                            style={styles.profile}
                                            source={{ uri: userProfile }}
                                        />
                                }

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.bodyTop}>
                <Text style={[Headertext.h1, { marginRight: 10, color: Colors.fontWhite }]}>Your</Text>
                <Text style={[Headertext.h1, { color: Colors.fontWhite, }]}>Home</Text>
            </View>
            <View style={styles.body}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingBottom: 60, }}>

                        {/* BLOCK 1 - 3 COMPONENTS */}
                        <View style={{
                            width: Dimensions.get("window").width,
                            height: 300,
                            flexDirection: 'row',
                            paddingLeft: 10,
                            paddingTop: 10,
                            paddingRight: 10,
                        }}>

                            <View style={{
                                width: '50%',
                                height: '98%',
                                flex: 1,
                                paddingRight: 10,
                            }}>
                                <LinearGradient colors={[items[0].color1, items[0].color2, items[0].color3]} style={{
                                    borderRadius: 10,
                                    flex:1,
                                }}>
                                    <TouchableOpacity style={{ flex: 1, }} onPress={() => { navigation.navigate('TetraGuide') }}>
                                        {/* TETRA BLOCK */}
                                        <View style={{ flex: 1, }}>
                                            <View style={{ flex: 2, justifyContent: 'center' }}>
                                                <Text style={[Headertext.h3, { color: Colors.fontWhite, alignSelf: 'center', }]}>{items[0].name}</Text>
                                                <Text style={[Headertext.h5, { color: Colors.fontWhite, alignSelf: 'center', }]}>{items[0].desc}</Text>
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
                                                justifyContent: 'center'
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
                            </View>

                            <View style={{
                                width: '50%',
                                height: '98%',
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
                                                    <View style={{ flex: 4, paddingLeft: 16, paddingTop: 16,}}>
                                                        <Text style={[Headertext.h4, { color: Colors.fontWhite, }]}>{items[1].name}</Text>
                                                        <Text style={[{ color: Colors.fontWhite, fontSize: 13 }]}>{items[1].desc}</Text>
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
                                                paddingLeft: Platform.OS === 'ios' ? 10 : 5,
                                                paddingRight: Platform.OS === 'ios' ? 10 : 5,
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
                                        <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={modalSupportVisible}>

                                            <View style={styles.modelViewBody}>
                                                <View style={styles.modalView}>
                                                    <View style={{width: 300, height: 400}}>
                                                        <View style={{ flex: 1, padding: 10 }}>
                                                        <View style={{ flex: 1, marginLeft: 'auto',}}>
                                                                <Pressable onPress={() => setModalSupportVisible(false)}>
                                                                <Image style={{
                                                                    width: 20,
                                                                    height: 20,
                                                                }} source={CloseImage} />
                                                                </Pressable>
                                                            </View>
                                                            <View style={{ flex: 4.5, }}>
                                                                <View style={{ flex: 1 }}>
                                                                    <View style={{ flex: 3, alignItems: 'center'}}>
                                                                        <Image style={{
                                                                            width: 120,
                                                                            height: 120,
                                                                        }} source={SupportBannerImage} />
                                                                    </View>
                                                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                                                        <Text style={Headertext.h4}>Technical Support</Text>
                                                                    </View>
                                                                    <View style={{ flex: 2,  flexDirection:'row', alignItems: 'center',
                                                                            justifyContent: 'space-around', borderTopWidth: 1, borderBottomWidth: 1, 
                                                                            borderColor: Colors.block3Color1of3, margin: -10, borderRadius: 10,}}>
                                                                        <View style={{ alignItems: 'center' }}>
                                                                            <Pressable onPress={() => { Linking.openURL(`tel:092590322`) }}>
                                                                            <Image style={{
                                                                                width: 50,
                                                                                height: 50,
                                                                            }} source={SupportPhoneButtonImage} />
                                                                            </Pressable>
                                                                            <Text style={Headertext.h5}>Call Us</Text>
                                                                        </View>

                                                                        <View style={{ alignItems: 'center' }}>
                                                                            <Pressable onPress={() => { Linking.openURL(`mailto:support@skyzer.co.nz`) }}>
                                                                            <Image style={{
                                                                                width: 50,
                                                                                height: 50,
                                                                            }} source={SupportEmailButtonImage} />
                                                                            </Pressable>
                                                                            <Text style={Headertext.h5}>Email Us</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                            <View style={{ flex: .5, alignItems: 'center', justifyContent: 'flex-end'}}>
                                                                <Text style={[Headertext.h5, { fontSize: 10 }]}>MON - FRI | 8:00 AM - 5:00 PM</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </Modal>

                                    <TouchableOpacity style={{ flex: 1, }} onPress={() => setModalSupportVisible(true) }>
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
                                                    <View style={{ flex: 4, paddingTop: 16, }}>
                                                        <Text style={[Headertext.h4, { color: Colors.fontWhite, }]}>{items[2].name}</Text>
                                                        <Text style={[{ color: Colors.fontWhite, fontSize: 13, }]}>{items[2].desc}</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={{
                                                flex: 1.5,
                                            }}>
                                                <View style={{flex: 1, flexDirection: 'row'}}>
                                                    <View style={{ flex: 2, }}/>
                                                    <View style={{ flex: 4, flexDirection: 'row', flexWrap: 'wrap',}}>
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
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 5,
                            paddingBottom: 10,
                        }}> 
                            {/* LEFT BLOCK */}
                            <View style={{
                                flex: 3,
                                borderRadius: 10,
                                paddingRight: 10,
                            }}>
                                <LinearGradient colors={[items[3].color1, items[3].color2, items[3].color3]} style={{
                                    borderRadius: 10,
                                    flex: 1,
                                }}>
                                    <TouchableOpacity style={{ flex: 1, }} onPress={() => { navigation.navigate('Nitro') }}>
                                        {/* NITRO BLOCK */}
                                        <View style={{ flex: 1, }}>
                                            <View style={{ flex: 4, }} >
                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                    <View style={{ flex: 4, padding: 10, justifyContent: 'center' }}>
                                                        <Text style={[Headertext.h4, { color: Colors.fontWhite, }]}>{items[3].name}</Text>
                                                        <Text style={[{ color: Colors.fontWhite, fontSize: 13 }]}>{items[3].desc}</Text>
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
                                                paddingLeft: Platform.OS === 'ios' ? 10 : 5,
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

                            {/* RIGHT BLOCK */}
                            <View style={{
                                flex: 3,
                                borderRadius: 10,
                            }}>

                                <LinearGradient colors={[items[4].color1, items[4].color2, items[4].color3]} style={{
                                    borderRadius: 10,
                                    flex: 1,
                                }}>
                                    <TouchableOpacity style={{ flex: 1, }} onPress={() => { navigation.navigate('Bulletins') }}>
                                        {/* BULLETIN BLOCK */}
                                        <View style={{ flex: 1, }}>
                                            <View style={{ flex: 4, }} >
                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                    <View style={{ flex: 4.1, padding: 10, justifyContent: 'center', }}>
                                                        <Text style={[Headertext.h4, { color: Colors.fontWhite, }]}>{items[4].name}</Text>
                                                        <Text style={[{ color: Colors.fontWhite, fontSize: 13 }]}>{items[4].desc}</Text>
                                                    </View>
                                                    <View style={{ flex: 1.9, justifyContent: 'center', overflow: 'hidden', }}>
                                                        <Image style={{
                                                            width: 50,
                                                            height: 50,
                                                            marginLeft: 20,
                                                        }} source={items[4].image} />
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{
                                                flex: 2, flexDirection: 'row', flexWrap: 'wrap',
                                                paddingLeft: Platform.OS === 'ios' ? 10 : 5,
                                            }} >
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
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
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

                            <LinearGradient colors={[items[5].color1, items[5].color2, items[5].color3]} style={{
                                flex: 1, borderRadius: 10,
                            }}>
                                <TouchableOpacity style={{ flex: 1, }} onPress={() => { navigation.navigate('About') }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 4, }}>
                                            <View style={{ flex: 1, }}>
                                                <View style={{ flex: 4, padding: 10, justifyContent: 'center' }}>
                                                    <Text style={[Headertext.h3, { color: Colors.fontWhite, }]}>{items[5].name}</Text>
                                                    <Text style={[Headertext.h5, { color: Colors.fontWhite, }]}>{items[5].desc}</Text>
                                                </View>
                                                <View style={{ flex: 2, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', paddingLeft: 10, }}>
                                                    {
                                                        items[5].subItems.map(subItem => {
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
                                            }} source={items[5].image} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </LinearGradient>

                        </View>
                        {/* END BLOCK 2 - 1 COMPONENT */}

                    </ScrollView>


            </View>
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <TopStatusBar />
            <LinearGradient colors={[Colors.backgroundColor1of3, Colors.backgroundColor2of3, Colors.backgroundColor3of3]} style={{flex: 1,}} >
            {
                isLoading ? Loader() : Content()
            }
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor1of3,
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
    },
    bottomTags: {
        fontSize: 10,
        fontWeight: 'bold',
        justifyContent: 'center',
        color: Colors.fontWhite,
        margin: 1,
    },
    blockLoader: {
        width: 390,
        height: 350,
        alignSelf: 'center',
    },
    oneLineLoader: {
        width: 370,
        height: 20,

    },
    modelViewBody: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: Colors.modelColor,
        borderRadius: 20,
        padding: 5,
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.block3Color1of3,
    },
});
