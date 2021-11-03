import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Linking, Alert } from 'react-native';
import Colors from '../config/Colors';
import Headertext from '../config/Headertext';
import Configurations from '../config/Configurations';
import LoaderImage from '../assets/images/loaders/description-loader.gif';
import TopStatusBar from '../components/TopStatusBar';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../components/AuthContext';
import { useRoute } from '@react-navigation/native';

export default Credits = () => {

    const route = useRoute();
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const { logOut } = React.useContext(AuthContext);

    const settingSession = async () => {
        await SecureStore.getItemAsync('token').then(val => setUserToken(val));
    }

    useEffect(() => {
        settingSession();
    }, []);

    useEffect(() => {
        let isMounted = true;
            if (isMounted && userToken != null) InitTeam()
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
            const response = await fetch(Configurations.host + "/teamCredits", requestOptions)
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
                Alert.alert(
                    "Error",
                    "Something went wrong!"
                );
                throw new Error(status);
            }

        } catch (error) {
            var myErrorHeaders = new Headers();
            var errorMethodType = "POST";
            myErrorHeaders.append("Content-Type", "application/json");

            var erroRaw = JSON.stringify({
                "screen": route.name,
                "module": "NA",
                "user": await SecureStore.getItemAsync("email"),
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

    function Loader() {
        return (
            <View style={{ flex: 1, }}>
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

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', margin: 10}}>
                        <Text style={[Headertext.h5, { textAlign: 'justify',}]} >
                        <Text style={{ fontWeight: 'bold' }}>Skyzer Technologies</Text> would like to say a very, very special thank you to the application core team for creating a really AWESOME product.
                        </Text>
                        <Text style={[Headertext.h5, { textAlign: 'justify', marginTop: 10 }]} >
                            This was a new level of responsibility for you, and you performed exceptionally well organizing the team, delegating tasks and overseeing the entire app to successful completion.
                        </Text>
                        <Text style={[Headertext.h5, { textAlign: 'justify', marginTop: 10 }]} >
                            Your ability to work through unforeseen challenges and collaborate so well with the rest of the team is impressive and shows exceptional critical thinking skills and a true dedication to this company.
                        </Text>
                        <Text style={[Headertext.h5, { textAlign: 'justify', marginTop: 10 }]} >
                            We pride ourselves on your hard work and dedication to making every critical project a great success. As always, we are counting on you to go the extra mile.
                        </Text>
                        <Text style={[Headertext.h5, { textAlign: 'justify', marginTop: 10 }]} >
                            Thank you once again for all your contributions.
                        </Text>
                    </View>

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
        width: 370,
        height: 100,
        marginTop: 10,
    },
});