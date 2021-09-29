import React, { useState } from 'react';
import Colors from '../config/Colors';
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions, TextInput, Alert, SafeAreaView } from 'react-native';
import Headertext from '../config/Headertext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Tooltip from 'react-native-walkthrough-tooltip';
import Configurations from '../config/Configurations';
import BackgroundImage from "../assets/images/background.jpg";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import rightArrowImage from '../assets/images/right-arrow.png';
import TopStatusBar from '../components/TopStatusBar';

export default SignUp = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [account, setAccount] = useState('');

    const [isErrorEmail, setIsErrorEmail] = useState(false);
    const [isErrorAccount, setIsErrorAccount] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [toolTipVisible, setToolTipVisible] = useState(false);

    function clearState() {
        setUsername('');
        setEmail('');
        setPassword('');
        setAccount('');
        setIsErrorEmail(false)
        setIsErrorAccount(false);
        setShowPassword(false);
        setToolTipVisible(false);
    };

    const signInHandle = async (username, email, password, account) => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (username === null || username === "" || email === null || email === "" ||
            password === null || password === "" || account === null || account === "") {

            Alert.alert("Error", "All fields are required");

        } else if (reg.test(email) === false) {
            setIsErrorEmail(true);
            Alert.alert("Error", "Invalid email");
        } else if (account.length < 4) {
            setIsErrorAccount(true);
            Alert.alert("Error", "Account at least 4 digit long");
        } else {
            setIsErrorEmail(false);
            setIsErrorAccount(false);

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            try {
                const responseEmail = await fetch(Configurations.host + "/users/user/" + email, requestOptions);
                const statusEmail = await responseEmail.status;

                if (statusEmail == 200) {
                    /** 200 - OK */
                    throw Error("Email already exist");
                }
            } catch (error) {
                setIsErrorEmail(true);
                Alert.alert("Error", "Email already exist, please try to login");
                return false;
            }

            try {
                const responseDivision = await fetch(Configurations.host + "/divisions/division/" + account, requestOptions);
                const statusDivision = await responseDivision.status;
                
                if (statusDivision != 200) {
                    /** 200 - OK */
                    throw Error("Account doesn't exist");
                } else {
                    /** CREATE NEW USER */
                    createUser(username, email, password, account);
                }
            } catch (error) {
                setIsErrorAccount(true);
                Alert.alert("Error", "Account doesn't exist, please check your account number again. OR Contact Skyzer if you are not sure.");
                return false;
            }
        }
    }

    const createUser = async (username, email, password, account) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
            "username": username,
            "email": email,
            "password": password,
            "division": {
                "division": account
            }
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            const response = await fetch(Configurations.host + "/user", requestOptions);
            const status = await response.status;

            if (status != 201) {
                /** 201 - CREATED */
                throw Error("Something went wrong!");
            } else {
                /** SUCCESS */
                console.log("user created");
                //clearState();
                navigation.navigate('SignUpSuccess');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <SafeAreaView style={styles.container}>
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
                    <View style={styles.bodyForm}>
                        <View style={{ marginTop: 15 }}>
                            <Text style={styles.bodyFormHeader}> Create an Account </Text>
                        </View>
                        {
                            Platform.OS === 'ios' ?
                                <KeyboardAwareScrollView
                                    style={{ flex: 1 }}>
                                    <View style={{ height: 600 }}>
                                        <View>
                                            <TextInput style={[styles.input, { borderColor: Colors.white }]} placeholder="Username"
                                                placeholderTextColor={Colors.fontColorWhite} keyboardType="default"
                                                onChangeText={(Username) => setUsername(Username)} selectionColor={Colors.white} />

                                            <TextInput style={[styles.input, {
                                                borderColor: isErrorEmail ? Colors.danger : Colors.white
                                            }]} placeholder="Email"
                                                placeholderTextColor={Colors.fontColorWhite} keyboardType="email-address"
                                                onChangeText={(Email) => setEmail(Email)} selectionColor={Colors.white} />

                                            <View style={[{ flexDirection: 'row', alignItems: 'center', }]}>
                                                <TextInput style={[styles.input, { borderColor: Colors.white }]} placeholder="Password"
                                                    placeholderTextColor={Colors.fontColorWhite}
                                                    keyboardType="default" secureTextEntry={!showPassword}
                                                    onChangeText={(Password) => setPassword(Password)} selectionColor={Colors.white} />
                                                {
                                                    showPassword ?
                                                        <MaterialCommunityIcons name="eye" size={24} style={{ marginLeft: -25 }}
                                                            color={Colors.white} onPress={() => setShowPassword(false)} />
                                                        :
                                                        <MaterialCommunityIcons name="eye-off" size={24} style={{ marginLeft: -25 }}
                                                            color={Colors.white} onPress={() => setShowPassword(true)} />
                                                }
                                            </View>

                                            <View style={[{ flexDirection: 'row', alignItems: 'center', }]}>
                                                <TextInput style={[styles.input, {
                                                    borderColor: isErrorAccount ? Colors.danger : Colors.white
                                                }]} placeholder="Account number i.e. 1234"
                                                    placeholderTextColor={Colors.fontColorWhite} keyboardType="default"
                                                    minLength={4}
                                                    onChangeText={(Account) => setAccount(Account)} selectionColor={Colors.white} />
                                                <Tooltip
                                                    isVisible={toolTipVisible}
                                                    content={
                                                        <View style={{ flex: 1, padding: 5 }}>
                                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 5, }}>
                                                                <Text style={[Headertext.h4, { color: Colors.fontColorBluest }]}>Find Account Number?</Text>
                                                            </View>
                                                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 5, margin: 10, padding: 10 }}>
                                                                <Text style={[Headertext.h5, { fontWeight: 'bold' }]}>Available on Dealer TMS, under Quick stats</Text>
                                                            </View>
                                                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                                                <Text style={[Headertext.h4, { color: Colors.fontColorBluest }]}>OR</Text>
                                                            </View>
                                                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 5, margin: 10, padding: 10 }}>
                                                                <Text style={[Headertext.h5, { fontWeight: 'bold' }]}>No Dealer TMS access! No Problem, just request to Skyzer they will tell you what yours.</Text>
                                                            </View>
                                                        </View>
                                                    }
                                                    placement="bottom"
                                                    onClose={() => setToolTipVisible(false)}
                                                >
                                                </Tooltip>
                                                <MaterialCommunityIcons name="comment-question" size={24} style={{ marginLeft: -25 }}
                                                    color={Colors.white} onPress={() => setToolTipVisible(true)} />
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10, }}>
                                                <TouchableOpacity style={[styles.navButton]} onPress={() => navigation.navigate('LogIn')}>
                                                    <Text style={[Headertext.h5, { color: Colors.fontColorWhite, fontWeight: '700' }]}>Already a member?</Text>
                                                </TouchableOpacity>

                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <TouchableOpacity style={[styles.button]} onPress={() => { signInHandle(username, email, password, account); }}>
                                                        <Text style={[Headertext.h4, { color: Colors.fontColorWhite }]}>Sign Up</Text>
                                                    </TouchableOpacity>
                                                    <View>
                                                        <Image style={[styles.icon, { marginRight: 10 }]} source={rightArrowImage} />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </KeyboardAwareScrollView>
                                :
                                <KeyboardAwareScrollView
                                    enableAutomaticScroll
                                    extraScrollHeight={10}
                                    enableOnAndroid={true}
                                    extraHeight={Platform.select({ android: 100 })}
                                    style={{ flexGrow: 1 }}>
                                    <View style={{ height: 500 }}>
                                        <View>
                                            <TextInput style={[styles.input, { borderColor: Colors.white }]} placeholder="Username"
                                                placeholderTextColor={Colors.fontColorWhite} keyboardType="default"
                                                onChangeText={(Username) => props.setUsername(Username)} selectionColor={Colors.white} />

                                            <TextInput style={[styles.input, {
                                                borderColor: isErrorEmail ? Colors.danger : Colors.white
                                            }]} placeholder="Email"
                                                placeholderTextColor={Colors.fontColorWhite} keyboardType="email-address"
                                                onChangeText={(Email) => setEmail(Email)} selectionColor={Colors.white} />

                                            <View style={[{ flexDirection: 'row', alignItems: 'center', }]}>
                                                <TextInput style={[styles.input, { borderColor: Colors.white }]} placeholder="Password"
                                                    placeholderTextColor={Colors.fontColorWhite}
                                                    keyboardType="default" secureTextEntry={!showPassword}
                                                    onChangeText={(Password) => setPassword(Password)} selectionColor={Colors.white} />
                                                {
                                                    showPassword ?
                                                        <MaterialCommunityIcons name="eye" size={24} style={{ marginLeft: -25 }}
                                                            color={Colors.white} onPress={() => setShowPassword(false)} />
                                                        :
                                                        <MaterialCommunityIcons name="eye-off" size={24} style={{ marginLeft: -25 }}
                                                            color={Colors.white} onPress={() => setShowPassword(true)} />
                                                }
                                            </View>

                                            <View style={[{ flexDirection: 'row', alignItems: 'center', }]}>
                                                <TextInput style={[styles.input, {
                                                    borderColor: isErrorAccount ? Colors.danger : Colors.white
                                                }]} placeholder="Account number i.e. 1234"
                                                    placeholderTextColor={Colors.fontColorWhite} keyboardType="default"
                                                    maxLength={4}
                                                    onChangeText={(Account) => setAccount(Account)} selectionColor={Colors.white} />
                                                <Tooltip
                                                    isVisible={toolTipVisible}
                                                    content={
                                                        <View style={{ flex: 1, padding: 5 }}>
                                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 5, }}>
                                                                <Text style={[Headertext.h4, { color: Colors.fontColorBluest }]}>Find Account Number?</Text>
                                                            </View>
                                                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 5, margin: 10, padding: 10 }}>
                                                                <Text style={[Headertext.h5, { fontWeight: 'bold' }]}>Find on Dealer TMS, under Quick stats</Text>
                                                            </View>
                                                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                                                <Text style={[Headertext.h4, { color: Colors.fontColorBluest }]}>OR</Text>
                                                            </View>
                                                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 5, margin: 10, padding: 10 }}>
                                                                <Text style={[Headertext.h5, { fontWeight: 'bold' }]}>Contact Skyzer</Text>
                                                            </View>
                                                        </View>
                                                    }
                                                    placement="bottom"
                                                    onClose={() => setToolTipVisible(false)}
                                                >
                                                </Tooltip>
                                                <MaterialCommunityIcons name="comment-question" size={24} style={{ marginLeft: -25 }}
                                                    color={Colors.white} onPress={() => setToolTipVisible(true)} />
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10, }}>
                                                <TouchableOpacity style={[styles.navButton]} onPress={() => navigation.navigate('LogIn')}>
                                                    <Text style={[Headertext.h5, { color: Colors.fontColorWhite, fontWeight: '700' }]}>Already a member?</Text>
                                                </TouchableOpacity>

                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <TouchableOpacity style={[styles.button]} onPress={() => { signInHandle(username, email, password, account); }}>
                                                        <Text style={[Headertext.h4, { color: Colors.buttonWhite }]}>Sign Up</Text>
                                                    </TouchableOpacity>
                                                    <View>
                                                        <Image style={[styles.icon, { marginRight: 10 }]} source={rightArrowImage} />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </KeyboardAwareScrollView>
                        }
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
        height: 450,
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
        width: 300,
        height: 40,
        marginTop: 15,
        marginBottom: 15,
        padding: 10,
        paddingRight: 50,
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