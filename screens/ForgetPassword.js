import React, { useState } from 'react';
import Colors from '../config/Colors';
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TextInput, Alert, SafeAreaView } from 'react-native';
import Headertext from '../config/Headertext';
import BackgroundImage from "../assets/images/background.jpg";
import Configurations from '../config/Configurations';
import rightArrowImage from '../assets/images/right-arrow.png';
import TopStatusBar from '../components/TopStatusBar';

export default ForgetPassword = ({ navigation }) => {

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
                const response = await fetch(Configurations.host + "/users/forgetPassword/" + email, requestOptions);
                const status = await response.status;
console.log(status);
                if (status != 200) {
                    /** 200 - OK */
                    throw Error("User does not exist!");
                } else {
                    Alert.alert("Success", "Your details has been to this email!", [{ onPress: () => navigation.navigate('LogIn') }]);
                    return true;
                }
            } catch (error) {
                setIsErrorEmail(true);
                console.log(error);
                console.log(isErrorEmail);
                Alert.alert("Error", "User does not exist!");
                return false;
            }
        }
    }

    return (

        <SafeAreaView style={styles.container} behavior="height">
            <TopStatusBar />
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={{
                position: 'absolute',
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.45)',
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height
            }}>
                <View style={styles.header}>
                    {/* <Logo/> */}
                    <Text style={[Headertext.h1, { color: Colors.fontColorPurplest }]}>Skyzer Guide</Text>
                    <Text style={[Headertext.h5, { color: Colors.fontColorLightBlack, fontWeight: '600' }]}>Let you explore the terminal</Text>
                </View>

                <View style={styles.body}>
                    <View style={styles.bodyForm} showsVerticalScrollIndicator={false}>
                        <View style={{ margin: 15,alignItems: 'center' }}>
                            <Text style={styles.bodyFormHeader}> Forget password </Text>
                            <Text style={[Headertext.h5, {color: Colors.fontColorWhite}]}> Enter the email address associated  </Text>
                            <Text style={[Headertext.h5, {color: Colors.fontColorWhite }]}> with your account. </Text>
                        </View>
                        <View>
                            <TextInput style={[styles.input, {
                                borderColor: isErrorEmail ? Colors.danger : Colors.white,
                            }]} placeholder="Email"
                                placeholderTextColor={Colors.fontColorWhite} keyboardType="email-address"
                                onChangeText={(Email) => setEmail(Email)} selectionColor={Colors.white} />
                            
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity style={[styles.button]} onPress={() => { forgetPasswordHandle() }}>
                                    <Text style={[Headertext.h4, { marginRight: 15, color: Colors.fontColorWhite }]}>Send</Text>
                                </TouchableOpacity>
                                <Image style={[styles.icon]} source={rightArrowImage} />
                            </View>
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 10, width: Dimensions.get('window').width - 100, flexDirection: 'row', alignItems: 'center', }}>
                            <TouchableOpacity style={[styles.navButton]} onPress={() => navigation.navigate('LogIn')}>
                                <Text style={[Headertext.h5, { color: Colors.fontColorWhite, fontWeight: '700' }]}>One more try?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>

                </View>
            </ImageBackground>
        </SafeAreaView>
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
        color: Colors.fontColorWhite,
        borderRadius: 10,
        height: 350,
        backgroundColor: Colors.cardBodyColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyFormHeader: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.fontColorWhite,
    },
    input: {
        width: Dimensions.get('window').width - 100,
        height: 40,
        marginTop: 15,
        marginBottom: 15,
        padding: 10,
        borderRadius: 10,
        borderBottomWidth: 1,
        color: Colors.fontColorWhite,
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
        borderColor: Colors.fontColorWhite,
    },
});