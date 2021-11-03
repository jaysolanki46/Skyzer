import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Animated, TouchableOpacity, Linking, ImageBackground, Dimensions, ScrollView, TextInput, Alert } from 'react-native';
import Colors from '../config/Colors';
import NitroBannerImage from '../assets/images/nitro/nitro-banner.png';
import TopStatusBar from '../components/TopStatusBar';
import Headertext from '../config/Headertext';
import Configurations from '../config/Configurations';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../components/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

export default Nitro = ({ navigation }) => {

    const route = useRoute();
    const [userToken, setUserToken] = useState(null);
    const [isErrorEmail, setIsErrorEmail] = useState(false);
    const [email, setEmail] = useState('');

    const { logOut } = React.useContext(AuthContext);

    const settingSession = async () => {
        await SecureStore.getItemAsync('token').then(val => setUserToken(val));
    }
    
    useEffect(() => {
        settingSession();
    }, []);

    const sendLink = async (email) => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (email === null || email === "") {
            Alert.alert("Error", "Please enter your email");
        } else if (reg.test(email) === false) {
            setIsErrorEmail(true);
            Alert.alert("Error", "Invalid email");
        } else {
            setIsErrorEmail(false);

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", userToken);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            try {
                const response = await fetch(Configurations.host + "/nitroPackage/sendLink/" + email, requestOptions);
                const status = await response.status;

                if (status == 200) {
                    setEmail('');
                    Alert.alert("Success", "Package link sent!");

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
                    Alert.alert("Error", "Something went wrong, please contact Skyzer!");
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
    }

    return (

        <SafeAreaView style={styles.container} behavior="height">
            <TopStatusBar />
             <ScrollView showsVerticalScrollIndicator={false} style={{fled:1}}>
           
            <View style={styles.header}>
                <View style={styles.headerImage}>
                    <Image
                        style={styles.image}
                        source={NitroBannerImage}
                    />
                </View>
            </View>

            <View style={styles.body}>
                    <View style={{ flex: 1}}>
                        <View style={{ height: 100, width: '100%', padding: 10}}>
                            <Text style={[Headertext.h5, { fontWeight: 'bold', color: Colors.fontColorBluest }]}>Enter your email</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <TextInput style={[styles.input, {
                                    borderColor: isErrorEmail ? Colors.danger : Colors.bluest
                                }]} placeholder="ex. abc@domain.co.nz" value={email}
                                    placeholderTextColor={Colors.fontColorBluest} keyboardType="email-address"
                                    onChangeText={(Email) => setEmail(Email)} selectionColor={Colors.bluest} />

                                <TouchableOpacity onPress={() => { sendLink(email)}} style={styles.sendLinkButton}>
                                <Text style={[Headertext.h5, { color: Colors.buttonFont }]}>Send link</Text>
                            </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ height: 300, width: '100%', padding: 10 }}>
                            <Text style={[Headertext.h4, { fontWeight: 'bold', color: Colors.fontColorBluest }]}>How it works!</Text>
                            <Text style={[Headertext.h5, { textAlign: 'justify', marginTop: 10, marginBottom: 10 }]} >
                                {'\u2B24'}&nbsp;Enter your email and hit send link button
                            </Text>
                            <Text style={[Headertext.h5, { textAlign: 'justify', marginTop: 10, marginBottom: 10 }]} >
                                {'\u2B24'}&nbsp;Get email with package download link attached
                            </Text>

                            <Text style={[Headertext.h5, { textAlign: 'justify', marginTop: 10, marginBottom: 10 }]} >
                                {'\u2B24'}&nbsp;Download that package and install it in PC
                            </Text>

                            <Text style={[Headertext.h5, { textAlign: 'justify', marginTop: 10, marginBottom: 10 }]} >
                                {'\u2B24'}&nbsp;Installation steps are also available in package itself
                            </Text>
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
    },
    header: {
        flex: 2,
        padding: 10,
    },
    headerImage: {
        flex: 1,
        margin: 10,
    },
    image: {
        width: 360,
        height: 200,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    body: {
        flex: 3,
        padding: 10,
    },
    input: {
        width: '70%',
        height: 40,
        marginLeft: -10,
        padding: 10,
        paddingRight: 50,
        borderRadius: 10,
        borderBottomWidth: 1,
        color: Colors.fontColorBluest,
    },
    sendLinkButton: {
        backgroundColor: Colors.colorType2_1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
    },
});