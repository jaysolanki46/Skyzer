import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, StatusBar, ImageBackground, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../config/Colors';
import Headertext from '../config/Headertext';
import backgroundImage from "../assets/images/background.jpg";

export default SignUpSuccess = ({ navigation }) => {

    return (
        <SafeAreaView style={{flex: 1, }}>
            <ImageBackground source={backgroundImage} resizeMode="cover" style={{
                position: 'absolute',
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.45)',
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height
            }}>
            <StatusBar barStyle="dark-content" translucent={true}></StatusBar>
            <View style={styles.header}>

            </View>
            <View style={styles.body}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/successfully.png')}
                />
                <Text style={[Headertext.h3 ,{color: Colors.fontColorBluest, margin: 10}]}>Register Successful</Text>
                <Text style={[Headertext.h5, { margin: 10 }]}>Your account will be activated within 1 business day</Text>
                <TouchableOpacity onPress={() => navigation.navigate('LogIn')} style={styles.login_button}>
                    <Text style={[Headertext.h4, { color: Colors.buttonFont }]}>Proceed to Login</Text>
                </TouchableOpacity>
            </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
    },
    login_button: {
        backgroundColor: Colors.buttonBody,
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