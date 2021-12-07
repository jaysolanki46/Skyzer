import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../config/Colors';
import Headertext from '../config/Headertext';
import TopStatusBar from '../components/TopStatusBar';
import { LinearGradient } from 'expo-linear-gradient';

export default NoInternet = () => {

    return (
        <LinearGradient colors={[Colors.backgroundColor1of3, Colors.backgroundColor2of3, Colors.backgroundColor2of3]} style={{
            flex: 1,
        }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TopStatusBar />
                <Text style={[Headertext.h4, { color: Colors.fontWhite, marginTop: 20, textAlign: 'center' }]}>
                    Skyzer Guide Connection Lost
                </Text>
                <Text style={[Headertext.h5, { color: Colors.fontWhite, marginTop: 5, textAlign: 'center' }]}>
                    Skyzer Guide has lost network connection. Please restart the app to continue.
                </Text>
            </View>
        </LinearGradient>
    )
}