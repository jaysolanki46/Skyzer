import React, { useState } from 'react';
import Colors from '../config/Colors';
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TextInput, Alert, SafeAreaView, Animated } from 'react-native';
import Headertext from '../config/Headertext';
import BackgroundImage from "../assets/images/background.jpg";
import Configurations from '../config/Configurations';
import rightArrowImage from '../assets/images/right-arrow.png';
import TopStatusBar from '../components/TopStatusBar';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import * as SecureStore from 'expo-secure-store';

const CELL_SIZE = 55;
const CELL_BORDER_RADIUS = 8;
const DEFAULT_CELL_BG_COLOR = '#fff';
const NOT_EMPTY_CELL_BG_COLOR = '#f7fafe';
const ACTIVE_CELL_BG_COLOR = '#f7fafe';
const { Value, Text: AnimatedText } = Animated;
const CELL_COUNT = 4;
const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
    Animated.parallel([
        Animated.timing(animationsColor[index], {
            useNativeDriver: false,
            toValue: isFocused ? 1 : 0,
            duration: 250,
        }),
        Animated.spring(animationsScale[index], {
            useNativeDriver: false,
            toValue: hasValue ? 0 : 1,
            duration: hasValue ? 300 : 250,
        }),
    ]).start();
};

export default ForgetPasswordCode = ({ navigation }) => {

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const renderCell = ({ index, symbol, isFocused }) => {
        const hasValue = Boolean(symbol);
        const animatedCellStyle = {
            backgroundColor: hasValue
                ? animationsScale[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                })
                : animationsColor[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                }),
        };

        setTimeout(() => {
            animateCell({ hasValue, index, isFocused });
        }, 0);

        return (
            <AnimatedText
                key={index}
                style={[styles.cell, animatedCellStyle]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
            </AnimatedText>
        );
    };

    const verifyCode = async () => {
        if (value.length < 4) {
            Alert.alert("Error", "Invalid code");
        } else {

            var email = await SecureStore.getItemAsync("forgetEmail");
            var code = value;
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "email": email,
                "forget_code": code
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            try {
                const response = await fetch(Configurations.host + "/skyzer-guide/users/verifyUserEmailAndCode", requestOptions);
                const status = await response.status;
                
                if (status == 200) {
                    navigation.navigate('ResetPassword');
                } else {
                    Alert.alert("Error", "Invalid code!");
                }
            } catch (error) {
                console.log(new Date().toLocaleString() + " | " + "Screen: ForgetPasswordCode.js" + " | " + "Status: " + error + " | " + "User: " + email);
            }
        }
    }

    const resendCode = async () => {

        var email = await SecureStore.getItemAsync("forgetEmail");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            const response = await fetch(Configurations.host + "/skyzer-guide/users/verifyUserAndSendCodeOnForgetPassword/" + email, requestOptions);
            const status = await response.status;
            
            if (status == 200) {
                Alert.alert("Success", "We have sent verification code to your email address");
            } else {
                throw new Error(status);
            }
        } catch (error) {
            console.log(new Date().toLocaleString() + " | " + "Screen: ForgetPasswordCode.js" + " | " + "Module: ResendCode" + " | " + "Status: " + error + " | " + "User: " + email);
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
                            <Text style={styles.bodyFormHeader}> Verification </Text>
                            <Text style={[Headertext.h5, { color: Colors.fontColorWhite }]}> Please enter the verification code  </Text>
                            <Text style={[Headertext.h5, { color: Colors.fontColorWhite }]}> we send to your email address </Text>
                        </View>
                        <View>
                            <CodeField
                                ref={ref}
                                {...props}
                                value={value}
                                onChangeText={setValue}
                                cellCount={CELL_COUNT}
                                rootStyle={styles.codeFiledRoot}
                                keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                renderCell={renderCell}
                            />
                        </View>
                        <View style={{ width: Dimensions.get('window').width - 110, flexDirection: 'row', alignItems: 'center', }}>
                            <TouchableOpacity style={[styles.button]} onPress={() => { verifyCode() }}>
                                <Text style={[Headertext.h4, { marginRight: 15, color: Colors.fontColorWhite }]}>Verify</Text>
                            </TouchableOpacity>
                            <Image style={[styles.icon]} source={rightArrowImage} />
                        </View>
                        <View style={{ marginTop: 30, marginBottom: 10, width: Dimensions.get('window').width - 110, flexDirection: 'row', alignItems: 'center', }}>
                            <TouchableOpacity style={[styles.navButton]} onPress={() => { resendCode() }}>
                                <Text style={[Headertext.h5, { color: Colors.fontColorWhite, fontWeight: '700' }]}>Resend code?</Text>
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

    codeFiledRoot: {
        height: CELL_SIZE,
        marginTop: 30,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    cell: {
        marginHorizontal: 8,
        height: CELL_SIZE,
        width: CELL_SIZE,
        lineHeight: CELL_SIZE - 5,
        fontSize: 30,
        textAlign: 'center',
        borderRadius: CELL_BORDER_RADIUS,
        color: '#3759b8',
        backgroundColor: '#fff',
        overflow: 'hidden',
        
        // IOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        // Android
        elevation: 3,
    },
});