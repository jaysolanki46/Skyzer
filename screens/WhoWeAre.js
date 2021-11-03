import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Platform, SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, Linking, Alert,  } from 'react-native';
import Colors from '../config/Colors';
import backgroundImage from "../assets/images/about/headerBackground.jpg";
import Headertext from '../config/Headertext';
import { useEffect } from 'react';
import Configurations from '../config/Configurations';
import TopStatusBar from '../components/TopStatusBar';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../components/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default WhoWeAre = ({ navigation }) => {

    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const { logOut } = React.useContext(AuthContext);

    const settingSession = async () => {
        await SecureStore.getItemAsync('token').then(val => setUserToken(val));
    }

    useEffect(() => {
        settingSession();
    }, []);

    useEffect(() => {
        let isMounted = true;
            if (isMounted && userToken) InitTeam();
        return () => { isMounted = false };
    }, [userToken]);

    const InitTeam = async () => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", userToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            const response = await fetch(Configurations.host + "/team", requestOptions)
            const status = await response.status;

            if (status == 200) {
                const responseJson = await response.json();
                setIsLoading(false);
                setData(responseJson);

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
                throw new Error(status);
            }

        } catch (error) {
            console.log(new Date().toLocaleString() + " | " + "Screen: WhoWeAre.js" + " | " + "Status: " + error + " | " + "User: " + await AsyncStorage.getItem("userId"));
            //return false;
        }
    }

    return (

        <SafeAreaView style={styles.container} behavior="height">
            <TopStatusBar />
            <ScrollView showsVerticalScrollIndicator={false} style={{ fled: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <ImageBackground source={backgroundImage} style={{
                        width: '95%',
                        height: 200,
                    }} resizeMode="cover">
                        <View style={styles.headerBox}>
                            <View style={{flex: 1,  justifyContent: 'center', alignItems: 'center', paddingLeft: 5}}>
                                <Text style={[Headertext.h2, {color: Colors.fontColorWhite,}]}>
                                    WHO WE ARE
                                </Text>
                            </View>

                        </View>
                       </ImageBackground>
                </View>


                <View style={styles.body}>
                    <View style={{ flex: 1,}}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap',}}>
                            <Text style={[Headertext.h5, {textAlign: 'justify', marginTop: 10}]} >
                                <Text style={{fontWeight: 'bold'}}>Skyzer Technologies</Text> is the market leader in the innovation, development, and provision of Eftpos and Payment solutions and has been supporting merchants throughout New Zealand since 2007.
                            </Text>
                            <Text style={[Headertext.h5, { textAlign: 'justify', marginTop: 10 }]} >
                                Back then, we had a dream! Since then, we have developed a suite of payment terminal solutions that have revolutionised the way kiwi merchants accept payments for the goods and services they provided!
                            </Text>
                            <Text style={[Headertext.h5, { textAlign: 'justify', marginTop: 10 }]} >
                                Whether you are looking for a Micro Merchant solution for your Market Stall, or you are a major NZ retailer looking for a feature-rich integrated Eftpos solution for your business… Skyzer has got you covered!
                            </Text>
                            <Text style={[Headertext.h5, { textAlign: 'justify', marginTop: 10 }]} >
                                We pride ourselves on our ability to deliver payment solutions to all retailers across New Zealand, both big and small. Using only the best terminal brand in the business, Ingenico, our suite of terminal offerings, has been developed with one goal in mind… “<Text style={{ color: Colors.fontColorBluest, fontWeight: 'bold'}}>Making Payments Simple</Text>”.
                            </Text>
                        </View>

                        <View style={{ marginTop: 20, borderRadius: 10, 
                            borderColor: Colors.colorType4_1, alignItems: 'center', }}>

                                <View style={{borderBottomWidth: 1}}>
                                <Text style={[Headertext.h3, { color: Colors.fontColorBluest, }]}>Our Leadership Team</Text>
                                </View>

                            <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                            {
                                data.map(member => {
                                    return (
                                            <View key={member.id}  style={{ width: 170, height: 200, marginTop: 10, marginBottom: 10, }}>
                                                <TouchableOpacity style={{ flex: 1, }} onPress={() => Linking.openURL(member.linked_in)}>
                                                <View style={{ flex: 1, backgroundColor: Colors.colorType5_1, borderRadius: 10 }}>
                                                    
                                                    <View style={{
                                                        flex: 4, justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}>
                                                        <Image style={[styles.image, {borderRadius: 50}]} source={{
                                                            uri: Configurations.host + "/images/team/" + member.image_name,
                                                        }} />
                                                    </View>

                                                    <View style={{
                                                        flex: 1, flexDirection: 'row', flexWrap: 'wrap',}}>
                                                        <Text style={Headertext.h5, { color: Colors.fontColorBluest, textAlign: 'center', flex: 1, }}>
                                                            {member.title}
                                                        </Text>
                                                    </View>

                                                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap',}}>
                                                        <Text style={Headertext.h5, { color: Colors.fontColorBluest, fontWeight: 'bold', textAlign: 'center', flex: 1, }}>
                                                            {member.full_name}
                                                        </Text>
                                                    </View>
                                                </View>
                                                </TouchableOpacity>
                                            </View>
                                    )
                                })
                            }
                            </View>
                        </View>
                    </View>
                </View>

            </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
        paddingTop: Platform.OS != 'ios' ? 20 : 0, 
    },
    header: {
        flex: 1.5,
    },
    headerBox: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
    },
    body: {
        flex: 4.5,
        paddingTop: Platform.OS != 'ios' ? 40 : 20,
        margin: 15,
    },
    image: {
        width: 80,
        height: 80,
        padding: 10,
    },
});