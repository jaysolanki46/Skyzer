import React, { useState } from 'react';
import Colors from '../config/Colors';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native';
import Headertext from '../config/Headertext';
import Configurations from '../config/Configurations';
import rightArrowImage from '../assets/images/right-arrow.png';
import TopStatusBar from '../components/TopStatusBar';
import * as SecureStore from 'expo-secure-store';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../components/Logo';

export default ForgetPassword = ({ navigation }) => {

    const route = useRoute();
    const [email, setEmail] = useState('');
    const [isErrorEmail, setIsErrorEmail] = useState(false);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    const forgetPasswordHandle = async() => {
        if (email === null || email === "" || reg.test(email) === false) {
            setIsErrorEmail(true);
            Alert.alert("Error", "Invalid email");
        } else {
            setIsErrorEmail(false);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            
            try {
                const response = await fetch(Configurations.host + "/users/verifyUserAndSendCodeOnForgetPassword/" + email, requestOptions);
                const status = await response.status;

                if (status == 200) {
                    await SecureStore.setItemAsync("forgetEmail", email);
                    Alert.alert("Success", "We have sent verification code to your email address", [{ onPress: () => navigation.navigate('ForgetPasswordCode') }]);
                } else if (status == 404) {
                    Alert.alert("Error", "User does not exist!");
                } else {
                    Alert.alert("Error", "User does not exist!");
                    throw new Error(status);
                }

            } catch (error) {
                
                var myErrorHeaders = new Headers();
                var errorMethodType = "POST";
                myErrorHeaders.append("Content-Type", "application/json");

                var erroRaw = JSON.stringify({
                    "screen": route.name,
                    "module": "NA",
                    "user": email,
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

        <View style={styles.container} behavior="height">
            <TopStatusBar />
            <LinearGradient colors={[Colors.backgroundColor1of3, Colors.backgroundColor2of3, Colors.backgroundColor3of3]} style={{flex: 1,}} >
                <View style={styles.header}>
                    <Logo/>
                    <Text style={[Headertext.h1, { color: Colors.fontWhite }]}>Skyzer Guide</Text>
                </View>

                <View style={styles.body}>
                    <LinearGradient colors={[Colors.modelColor, Colors.modelColor, Colors.modelColor]} style={styles.bodyForm} >
                    <View showsVerticalScrollIndicator={false}>
                        <View style={{ margin: 15,alignItems: 'center' }}>
                            <Text style={styles.bodyFormHeader}> Forget password </Text>
                            <Text style={[Headertext.h5, {color: Colors.fontWhite}]}> Enter the email address associated  </Text>
                            <Text style={[Headertext.h5, {color: Colors.fontWhite }]}> with your account. </Text>
                        </View>
                        <View>
                            <TextInput style={[styles.input, {
                                borderColor: isErrorEmail ? Colors.danger : Colors.white,
                            }]} placeholder="Email"
                                placeholderTextColor={Colors.fontWhite} keyboardType="email-address"
                                onChangeText={(Email) => setEmail(Email)} selectionColor={Colors.white} />
                            
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <TouchableOpacity style={[styles.button, { flexDirection: 'row',}]} onPress={() => { forgetPasswordHandle() }}>
                                    <Text style={[Headertext.h4, { marginRight: 15, color: Colors.fontWhite }]}>Send</Text>
                                        <Image style={[styles.icon]} source={rightArrowImage} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 10, width: Dimensions.get('window').width - 100, flexDirection: 'row', alignItems: 'center', }}>
                            <TouchableOpacity style={[styles.navButton]} onPress={() => navigation.navigate('LogIn')}>
                                <Text style={[Headertext.h5, { color: Colors.fontBlack, fontWeight: '700' }]}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </LinearGradient>
                </View>

                <View style={styles.footer}>

                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20,
    },
    body: {
        flex: 4,
        alignItems: 'center',
    },
    footer: {
        flex: 1,
    },
    bodyForm: {
        width: Dimensions.get('window').width - 60,
        height: 50,
        marginTop: 30,
        marginLeft: 70,
        marginRight: 70,
        color: Colors.fontWhite,
        borderRadius: 10,
        height: 350,
        backgroundColor: Colors.cardBodyColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyFormHeader: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.fontWhite,
    },
    input: {
        width: Dimensions.get('window').width - 100,
        height: 40,
        marginTop: 15,
        marginBottom: 15,
        padding: 10,
        borderRadius: 10,
        borderBottomWidth: 1,
        color: Colors.fontWhite,
    },
    button: {
        marginTop: 15,
        marginBottom: 15,
        padding: 5,
        alignItems: 'center'
    },
    icon: {
        width: 25,
        height: 25,
        resizeMode: 'stretch'
    },
    navButton: {
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: Colors.white,
    },
});