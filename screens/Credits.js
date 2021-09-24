import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar, Button, Image, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView, Dimensions, Alert } from 'react-native';
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

export default Credits = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) InitTeam()
        return () => { isMounted = false };
    }, []);

    const InitTeam = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            const response = await fetch(Configurations.host + "/teamCredits", requestOptions)
            const status = await response.status;
            const responseJson = await response.json();

            if (status == 204) {
                setIsLoading(false);
                throw new Error('204 - No Content');
            } else {
                setIsLoading(false);
                setData(responseJson);
            }

        } catch (error) {
            console.log('Who We Are Error', error);
            return false;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" hidden={false} translucent={true}></StatusBar>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, }}>

                <View style={{
                    marginTop: 20, borderRadius: 10,
                    borderColor: Colors.colorType4_1, alignItems: 'center',
                }}>

                    <View style={{ borderBottomWidth: 1 }}>
                        <Text style={[Headertext.h3, { color: Colors.fontColorBluest, }]}>Meet the Team</Text>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                        {
                            data.map(member => {
                                return (
                                    <View key={member.id} style={{ width: 170, height: 200, marginTop: 10, marginBottom: 10, }}>
                                        <TouchableOpacity style={{ flex: 1, }} onPress={() => Linking.openURL(member.linked_in)}>
                                            <View style={{ flex: 1, backgroundColor: Colors.colorType5_1, borderRadius: 10 }}>

                                                <View style={{
                                                    flex: 4, justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Image style={[styles.image, { borderRadius: 50 }]} source={{
                                                        uri: Configurations.host + "/images/team/" + member.image_name,
                                                    }} />
                                                </View>

                                                <View style={{
                                                    flex: 1, flexDirection: 'row', flexWrap: 'wrap',
                                                }}>
                                                    <Text style={Headertext.h5, { color: Colors.fontColorBluest, textAlign: 'center', flex: 1, }}>
                                                        {member.title}
                                                    </Text>
                                                </View>

                                                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', }}>
                                                    <Text style={Headertext.h5, { color: Colors.fontColorBluest, fontWeight: 'bold', textAlign: 'center', flex: 1, }}>
                                                        {member.full_name}
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : 20,
        backgroundColor: Colors.bodyColor,
    },
    image: {
        width: 80,
        height: 80,
        padding: 10,
    },
});