import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, RefreshControl, SafeAreaView, Linking, Alert } from 'react-native';
import Colors from '../config/Colors';
import Configurations from '../config/Configurations';
import Headertext from '../config/Headertext';
import NoContentImage from '../assets/images/tetra/no-content.png';
import LoaderImage from '../assets/images/loaders/list-loader.gif';
import TopStatusBar from '../components/TopStatusBar';
import BulletinImage from '../assets/images/home/bulletin-card-book.png';
import ExternalLinkImage from '../assets/images/bulletin/external-link.png';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../components/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

export default Bulletins = ({navigation}) => {

    const route = useRoute();
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    const { logOut } = React.useContext(AuthContext);

    const settingSession = async () => {
        await SecureStore.getItemAsync('token').then(val => setUserToken(val));
    }

    useEffect(() => {
        settingSession();
    }, []);

    useEffect(() => {
        if (userToken != null) {
            InitList();
        }
    }, [userToken]);

    const InitList = async () => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", userToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
       
        try {
            const response = await fetch(Configurations.host + "/bulletins", requestOptions)
            const status = await response.status;

            if(status == 200) {
                const responseJson = await response.json();
                setIsLoading(false);
                setRefreshing(false);
                setDataSource(responseJson);

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
                setRefreshing(false);
                setDataSource(null);
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

    const ItemView = ({ item }) => {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => Linking.openURL(item.link)}>
            <View style={[styles.listContainer]}>
                <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center',
                }}>
                    <Image style={{
                        width: 50,
                        height: 50,
                    }} source={BulletinImage} />
                </View>
                <View style={{ flex: 4.5,}}>
                    <Text style={styles.text}>Technical Bulletin No.{item.number}</Text>
                    <Text style={[styles.text, {fontWeight: '500'}]}>{item.name}</Text>
                </View>
                <View style={{ flex: .5, justifyContent: 'flex-end'}}>
                        <Image style={{
                            width: 20,
                            height: 20,
                        }} source={ExternalLinkImage} />
                </View>
            </View>
            </TouchableOpacity>
        );
    };

    const OnRefresh = React.useCallback(() => {
        setRefreshing(true);
        InitList();
    }, [userToken]);

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

    function renderEmptyContainer() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image style={styles.noContent} source={NoContentImage} />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[Headertext.h4, { fontWeight: 'bold' }]}>NO ITEMS,</Text>
                    <Text style={[Headertext.h4, { fontWeight: 'bold', color: Colors.fontColorBluest }]}>SORRY!</Text>
                </View>
            </View>
        );
    }

    function Content() {
        return (
            <View>
                <FlatList style={styles.gridView}
                    data={dataSource}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={ItemView}
                    ListEmptyComponent={renderEmptyContainer()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={OnRefresh}
                            tintColor={Colors.colorType1_1}
                            colors={[Colors.colorType1_1]}
                            title="Pull to refresh"
                        />
                    }
                />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <TopStatusBar />
            <View style={styles.body}>

                {
                    isLoading ? Loader() : Content()
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.bodyColor
    },
    body: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        margin: 5,
        backgroundColor: Colors.colorType5_1,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        flexDirection: 'row',
    },
    text: {
        fontSize: 15,
        color: Colors.fontColorBluest,
        fontWeight: '700',
        margin: 5,
    },
    gridView: {
        width: '100%',
        height: '90%',
    },
    noContent: {
        resizeMode: 'contain',
        width: 200,
        height: 300,
    },
    loader: {
        width: Dimensions.get('window').width,
        height: 100,
        marginTop: 10,
    },
});
