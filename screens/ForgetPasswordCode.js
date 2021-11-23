import React, { useState } from 'react';
import Colors from '../config/Colors';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Alert, Animated } from 'react-native';
import Headertext from '../config/Headertext';
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
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../components/Logo';

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

    const route = useRoute();
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
                const response = await fetch(Configurations.host + "/users/verifyUserEmailAndCode", requestOptions);
                const status = await response.status;
                
                if (status == 200) {
                    navigation.navigate('ResetPassword');
                } else if (status == 404) {
                    Alert.alert("Error", "Invalid code!");
                } else {
                    Alert.alert("Error", "Invalid code!");
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
            const response = await fetch(Configurations.host + "/users/verifyUserAndSendCodeOnForgetPassword/" + email, requestOptions);
            const status = await response.status;
            
            if (status == 200) {
                Alert.alert("Success", "We have sent verification code to your email address");
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
                "module": "resendCode",
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

    return (

        <View style={styles.container} behavior="height">
            <TopStatusBar />
            <LinearGradient colors={[Colors.backgroundColor1of3, Colors.backgroundColor2of3, Colors.backgroundColor3of3]} style={{ flex: 1, }} >
                <View style={styles.header}>
                    <Logo/>
                    <Text style={[Headertext.h1, { color: Colors.fontWhite }]}>Skyzer Guide</Text>
                </View>

                <View style={styles.body}>
                    <LinearGradient colors={[Colors.modelColor, Colors.modelColor, Colors.modelColor]} style={styles.bodyForm} >
                    <View showsVerticalScrollIndicator={false}>
                        <View style={{ margin: 15,alignItems: 'center' }}>
                            <Text style={styles.bodyFormHeader}> Verification </Text>
                            <Text style={[Headertext.h5, { color: Colors.fontWhite }]}> Please enter the verification code  </Text>
                            <Text style={[Headertext.h5, { color: Colors.fontWhite }]}> we send to your email address </Text>
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
                        <View style={{ width: Dimensions.get('window').width - 110, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                            <TouchableOpacity style={[styles.button, { flexDirection: 'row'}]} onPress={() => { verifyCode() }}>
                                <Text style={[Headertext.h4, { marginRight: 15, color: Colors.fontWhite }]}>Verify</Text>
                                <Image style={[styles.icon]} source={rightArrowImage} />
                            </TouchableOpacity>
                        </View>
                            <View style={{ marginTop: 30, marginBottom: 10, width: Dimensions.get('window').width - 110, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                            <TouchableOpacity style={[styles.navButton]} onPress={() => { resendCode() }}>
                                <Text style={[Headertext.h5, { color: Colors.fontBlack, fontWeight: '700' }]}>Resend code?</Text>
                            </TouchableOpacity>
                             <TouchableOpacity style={[styles.navButton, { marginLeft: 'auto', }]} onPress={() => navigation.navigate('LogIn')}>
                                <Text style={[Headertext.h5, { color: Colors.fontBlack, fontWeight: '700' }]}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </LinearGradient>
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
        flex: 5,
        alignItems: 'center',
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
        borderRadius: 5,
        backgroundColor: Colors.white,
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
        color: Colors.fontBlack,
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