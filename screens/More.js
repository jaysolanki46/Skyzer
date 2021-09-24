import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, StatusBar, Button, Image, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView, Dimensions, Alert } from 'react-native';
import Colors from '../config/Colors';
import Headertext from '../config/Headertext';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../components/AuthContext';
import Configurations from '../config/Configurations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultImageUrl from '../assets/images/profile.png';
import moreBanner from '../assets/images/more-banner.png';
import Constants from 'expo-constants';
import copyright from '../assets/images/copyright.png';

export default More = ({ navigation }) => {

   
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" hidden={false} translucent={true}></StatusBar>

            <View style={styles.header}>
                <View style={styles.headerBox}>
                    <Image
                        style={styles.headerImage}
                        source={moreBanner}
                    />
                </View>
            </View>

            <View style={styles.body}>
                <View style={{borderWidth: .5, borderColor: Colors.grey}}/>
                <TouchableOpacity onPress={() => { navigation.navigate('Terms') }}>
                    <Text style={[{ fontSize: 17, marginTop: 10, marginBottom: 10, fontWeight: '500', color: Colors.link}]}>
                        Terms & Privacy Policy
                    </Text>
                </TouchableOpacity>
                <View style={{ borderWidth: .5, borderColor: Colors.grey }} />
                <TouchableOpacity onPress={() => { navigation.navigate('Terms') }}>
                    <Text style={[{ fontSize: 17, marginTop: 10, marginBottom: 10, fontWeight: '500', color: Colors.link }]}>
                        Licenses
                    </Text>
                </TouchableOpacity>

                <View style={{ borderWidth: .5, borderColor: Colors.grey }} />
                <TouchableOpacity onPress={() => { navigation.navigate('Credits') }}>
                    <Text style={[{ fontSize: 17, marginTop: 10, marginBottom: 10, fontWeight: '500', color: Colors.link }]}>
                        Credits
                    </Text>
                </TouchableOpacity>

                <View style={{ borderWidth: .5, borderColor: Colors.grey }} />
                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                    <Image style={{ width: 12, height: 12, marginRight: 5 }}
                        source={copyright} />
                    <Text style={[{
                        fontSize: 12, marginTop: 5, marginBottom: 5, fontWeight: '500',
                        color: Colors.fontColorLightBlack, 
                    }]}>
                         {new Date().getFullYear()} Skyzer Technologies
                    </Text>
                </View>
                
                <Text style={[{ fontSize: 12, fontWeight: '500', color: Colors.fontColorLightBlack }]}>
                    Version {Constants.manifest.version}
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : 20,
        backgroundColor: Colors.bodyColor,
    },
    header: {
        flex: 3,
        padding: 10,
    },
    headerBox: {
        flex: 1,
        margin: 10,
    },
    headerImage: {
        width: 360,
        height: 200,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    body: {
        flex: 3,
        paddingTop: Platform.OS != 'ios' ? 40 : 20,
        marginLeft: 10,
        marginRight: 10,
    },
});