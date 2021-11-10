import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../config/Colors';
import Headertext from '../config/Headertext';
import successImage from '../assets/images/successfully.png';
import TopStatusBar from '../components/TopStatusBar';
import { LinearGradient } from 'expo-linear-gradient';

export default SignUpSuccess = ({ navigation }) => {

    return (
        <View style={{flex: 1, }}>
            <TopStatusBar />
            <LinearGradient colors={[Colors.backgroundColor1of3, Colors.backgroundColor2of3, Colors.backgroundColor3of3]} style={{ flex: 1, }} >
            <View style={styles.header}>
            </View>
            <View style={styles.body}>
                <Image
                    style={styles.image}
                        source={successImage}
                />
                <Text style={[Headertext.h3 ,{color: Colors.fontWhite, margin: 10}]}>Register Successful</Text>
                <Text style={[Headertext.h5, { margin: 10 }]}>Your account will be activated within 1 business day</Text>
                    <LinearGradient colors={[Colors.buttonColor1of2, Colors.buttonColor2of2]} style={styles.loginButton} >
                <TouchableOpacity onPress={() => navigation.navigate('LogIn')} >
                    <Text style={[Headertext.h4, { color: Colors.fontWhite }]}>Proceed to Login</Text>
                </TouchableOpacity>
                </LinearGradient>
            </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
    },
    loginButton: {
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        margin: 20,
    },
    header: {
        flex: 2,
    },
    body: {
        flex: 4,
        alignItems: 'center',
    }
});