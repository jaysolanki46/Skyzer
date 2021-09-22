import React, { useRef, useEffect } from 'react';
import { ImageBackground, Animated, Text, View, ActivityIndicator, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import backgroundImage from "../assets/images/background.jpg";
import Colors from '../config/Colors';
import Headertext from '../config/Headertext';
import { Restart } from 'fiction-expo-restart';

const NoInternet = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }
        ).start();
    }, [fadeAnim])

    return (
        <Animated.View
            style={{
                ...props.style,
                opacity: fadeAnim,
            }}
        >
            {props.children}
        </Animated.View>
    );
}

export default Loading = () => {

    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={{
            flex: 1,
            justifyContent: "center"
        }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={styles.logo}
                    source={require('../assets/images/no-internet.png')}
                />

                <Text style={[Headertext.h1, { color: Colors.fontColorBluest, marginTop: 20 }]}>
                    NO INTERNET
                </Text>

                <TouchableOpacity onPress={() => Restart()} style={styles.login_button}>
                    <Text style={[Headertext.h3, { color: Colors.buttonFont }]}>RETRY</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    logo: {
        width: 300,
        height: 200,
        resizeMode: 'center'
    },
    login_button: {
        marginTop: 20,
        backgroundColor: Colors.buttonBody,
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
    },
});