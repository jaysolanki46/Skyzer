import React, { useRef } from 'react';
import { Animated, Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../config/Colors';
import Headertext from '../config/Headertext';
import { Restart } from 'fiction-expo-restart';
import NoInternetConnectionImage from '../assets/images/no-internet.png';
import TopStatusBar from '../components/TopStatusBar';
import { LinearGradient } from 'expo-linear-gradient';

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
        <LinearGradient colors={[Colors.backgroundColor1of3, Colors.backgroundColor2of3, Colors.backgroundColor2of3]} style={{
            flex: 1,
        }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TopStatusBar />
                <Image
                    style={styles.logo}
                    source={NoInternetConnectionImage}
                />

                <Text style={[Headertext.h1, { color: Colors.fontWhite, marginTop: 20 }]}>
                    No Connection
                </Text>

                <TouchableOpacity onPress={() => Restart()} >
                    <LinearGradient colors={[Colors.white,
                        Colors.white,
                        ]} style={styles.loginButton}>
                            <Text style={[Headertext.h3, { color: Colors.fontBlack }]}>RETRY</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 300,
        height: 200,
        resizeMode: 'center'
    },
    loginButton: {
        marginTop: 20,
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
    },
});