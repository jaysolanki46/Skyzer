import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Dimensions, Linking } from 'react-native';
import Colors from '../config/Colors';
import Headertext from '../config/Headertext';
import Configurations from '../config/Configurations';
import LoaderImage from '../assets/images/list-loader.gif';
import TopStatusBar from '../components/TopStatusBar';

export default Credits = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    
    useEffect(() => {
        let isMounted = true;
        wait(500).then(() => {
            if (isMounted) InitTeam()
        });
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
                throw new Error('No Content');
            } else {
                setIsLoading(false);
                setData(responseJson);
            }

        } catch (error) {
            console.log('Who We Are Error', error);
            return false;
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