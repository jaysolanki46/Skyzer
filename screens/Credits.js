import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Dimensions, Linking, Alert } from 'react-native';
import Colors from '../config/Colors';
import Headertext from '../config/Headertext';
import Configurations from '../config/Configurations';
import LoaderImage from '../assets/images/list-loader.gif';
import TopStatusBar from '../components/TopStatusBar';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../components/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Credits = () => {

    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const { logOut } = React.useContext(AuthContext);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    
    const settingSession = async () => {
        await SecureStore.getItemAsync('token').then(val => setUserToken(val));
    }

    useEffect(() => {
        settingSession();
    }, []);

    useEffect(() => {
        let isMounted = true;
        wait(500).then(() => {
            if (isMounted && userToken != null) InitTeam()
        });
        return () => { isMounted = false };
    }, [userToken]);

    const InitTeam = async () => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", userToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            const response = await fetch(Configurations.host + "/skyzer-guide/teamCredits", requestOptions)
            const status = await response.status;

            if (status == 200) {
                const responseJson = await response.json();
                setIsLoading(false);
                setData(responseJson);

            } else if (status == 401) {
                Alert.alert(
                    "Security Alert",
                    "Please login again!",
                    [
                        { text: "OK", onPress: () => logOut() }
                    ]
                );
                throw new Error(status);

            } else {
                setIsLoading(false);
                throw new Error(status);
            }

        } catch (error) {
            console.log(new Date().toLocaleString() + " | " + "Screen: Credits.js" + " | " + "Status: " + error + " | " + "User: " + await AsyncStorage.getItem("userId"));
        }
    }

    function Loader() {
        return (
            <View style={{ flex: 1, }}>
                <Image style={styles.loader}
                    source={LoaderImage} />
                <Image style={styles.loader}
                    source={LoaderImage} />
                <Image style={styles.loader}
                    source={LoaderImage} />
            </View>
        );
    }

    function Content() {
        return (
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, }}>
                    <View style={{
                        marginTop: 20, borderRadius: 10,
                        borderColor: Colors.colorType4_1, alignItems: 'center',
                    }}>

                        <View style={{ borderBottomWidth: 1 }}>
                            <Text style={[Headertext.h3, { color: Colors.fontColorBluest, }]}>Application Core Team</Text>
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
                                                            uri: Configurations.host + "/skyzer-guide/images/team/" + member.image_name,
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
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <TopStatusBar />
            {
                isLoading ? Loader() : Content()
            }
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
    loader: {
        width: Dimensions.get('window').width,
        height: 100,
        marginTop: 10,
    },
});