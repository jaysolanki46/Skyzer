import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, StatusBar, Button, Image, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView, Dimensions  } from 'react-native';
import Colors from '../config/Colors';
import Headertext from '../config/Headertext';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../components/AuthContext';
import Configurations from '../config/Configurations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultImageUrl from '../assets/images/profile.png';

export default Profile = () => {

    const [image, setImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isImageLoading, setIsImageLoading] = useState(false);

    const [account, setAccount] = useState(null);
    const [dealer, setDealer] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const [sessionId, setSessionId] = useState(null);

    const settingSession = async () => {
        setSessionId(await AsyncStorage.getItem('userId'));
        setImage(await AsyncStorage.getItem('profile'));
    }

    useEffect(() => {
        settingSession();
        (async () => {
            if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
            }
        })();
    }, []);

    useEffect(() => {
        let isMounted = true;
        wait(1000).then(() => {
            if (isMounted) InitList()
        });
        return () => { isMounted = false };
    }, [sessionId]);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const InitList = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            const response = await fetch(Configurations.host + "/users/" + sessionId, requestOptions)
            const status = await response.status;
            
            if (status == 204) {
                setIsLoading(false);
                throw new Error('No Content');
            } else {
                const responseJson = await response.json();
                const userArray = JSON.parse(JSON.stringify(responseJson));
                setAccount(userArray.division.division);
                setDealer(userArray.division.dealer_name);
                setUsername(userArray.username);
                setEmail(userArray.email);
                setPassword(userArray.password);
                setIsLoading(false);
            }

        } catch (error) {
            setIsLoading(false);
            console.log('Profile Init Error', error);
            return false;
        }
    }

    const  { logOut } = React.useContext(AuthContext);

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      //console.log(result);
  
      if (!result.cancelled) {

          setIsImageLoading(true);
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          var raw = JSON.stringify({
              "id": sessionId,
              "image": result.uri
          });

          var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
          };

          try {
              const response = await fetch(Configurations.host + "/user/image/", requestOptions)
              const status = await response.status;

              if (status != 200) {
                  throw new Error(status + ' Something went wrong');
              } else {
                  await AsyncStorage.removeItem('profile');
                  await AsyncStorage.setItem('profile', result.uri);
                  alert("Profile update!")
              }

          } catch (error) {
              console.log('Profile Error', error);
          }

        setImage(result.uri);
        setIsImageLoading(false);
      }
    };

    function Loader() {
        return (
            <View style={{ flex: 1, }}>
                <Image style={styles.loader}
                    source={require('../assets/images/list-loader.gif')} />
                <Image style={styles.loader}
                    source={require('../assets/images/list-loader.gif')} />
                <Image style={styles.loader}
                    source={require('../assets/images/list-loader.gif')} />
            </View>
        );
    }

    function Content() {
        return (
            <View style={{flex : 1}}>
            <View style={styles.bodyProfile}>
                    <View style={ styles.bodyProfileInner}>
                        {
                            isImageLoading ?
                                <ActivityIndicator />
                                :
                                image == null ?
                                    <Image
                                        style={styles.profile}
                                        source={defaultImageUrl}
                                    /> :
                                    <Image
                                        style={styles.profile}
                                        source={{ uri: image }}
                                    />
                        }
                    </View>
                    <TouchableOpacity style={{ backgroundColor: Colors.colorType3_1, padding: 10, borderRadius: 10, }} onPress={pickImage}>
                        <Text style={[Headertext.h5, { color: Colors.fontColorWhite, fontWeight: 'bold' }]}>Change Photo</Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.bodyDetails}>
                    <View style={{flex:1.2,}}>
                        <View style={styles.fieldBlock}>
                            <Text style={[Headertext.h5 ,{color: Colors.fontColorLightBlack, fontWeight: 'bold'}]}>Account</Text>
                            <Text style={[Headertext.h5, { color: Colors.fontColorBlack, fontWeight: 'bold' }]}>{account}</Text>
                        </View>          
                    </View>
                    <View style={{ flex: 1.2,}}>
                        <View style={styles.fieldBlock}>
                            <Text style={[Headertext.h5, { color: Colors.fontColorLightBlack, fontWeight: 'bold' }]}>Dealer</Text>
                            <Text style={[Headertext.h5, { color: Colors.fontColorBlack, fontWeight: 'bold' }]}>{dealer}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1.2, }}>
                        <View style={styles.fieldBlock}>
                            <Text style={[Headertext.h5, { color: Colors.fontColorLightBlack, fontWeight: 'bold' }]}>Email</Text>
                            <Text style={[Headertext.h5, { color: Colors.fontColorBlack, fontWeight: 'bold' }]}>{email}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1.2,}}>
                        <View style={styles.fieldBlock}>
                            <Text style={[Headertext.h5, { color: Colors.fontColorLightBlack, fontWeight: 'bold' }]}>Username</Text>
                            <Text style={[Headertext.h5, { color: Colors.fontColorBlack, fontWeight: 'bold' }]}>{username}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1.2,}}>
                        <View style={styles.fieldBlock}>
                            <View style={{ flexDirection: 'row', alignItems: 'center',}}>
                            <Text style={[Headertext.h5, { color: Colors.fontColorLightBlack, fontWeight: 'bold' }]}>Password</Text>
                            {
                                showPassword ?
                                    <MaterialCommunityIcons name="eye" size={24} style={{ marginLeft: 5 }}
                                        color={Colors.grey} onPress={() => setShowPassword(false)} />
                                    :
                                    <MaterialCommunityIcons name="eye-off" size={24} style={{ marginLeft: 5 }}
                                        color={Colors.grey} onPress={() => setShowPassword(true)} />
                            }
                            </View>
                            <Text style={[Headertext.h5, { color: Colors.fontColorBlack, fontWeight: 'bold' }]}>
                                {showPassword ? password : "****"}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1.2, }}>
                        <View style={[styles.fieldBlock, {justifyContent: 'center', borderBottomWidth: 0}]}>
                            <TouchableOpacity style={{backgroundColor: Colors.colorType4_1, padding: 10, borderRadius: 10,}} onPress={() => logOut()}>
                                <Text style={[Headertext.h5, { color: Colors.fontColorWhite, fontWeight: 'bold' }]}>Log out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" hidden = {false} translucent = {true}></StatusBar>

            <View style={styles.header}>
                <View style={styles.headerSubView}>
                    <Text style={[Headertext.h1, { marginRight: 10, color: Colors.fontColorBluest }]}>Profile</Text>
                    <TouchableOpacity onPress={() => alert("Me help!!!")}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Image
                                style={styles.help}
                                source={require('../assets/images/help.png')}
                            />
                            <Text style={[Headertext.h5, { fontWeight: 'bold', color: Colors.fontColorBluest, margin: 5 }]}>More</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={styles.body}>
                {
                    isLoading ? Loader() : Content()
                }
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
        flex: .5,
    },
    headerSubView: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.bodyColor,
    },
    body: {
        flex: 5.5,
        marginLeft: 10,
        marginRight: 10,
    },
    bodyProfile: {
        flex: 2.5,
        borderRadius: 10,
        borderColor: Colors.colorType5_1,
        alignItems: 'center',
    },
    bodyProfileInner: {
        flex: 1,
        justifyContent: 'center',
    },
    bodyDetails: {
        flex: 4.5,
    },
    profile: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        borderRadius: 10,
        backgroundColor: Colors.colorType5_1,
    },
    fieldBlock: {
        borderBottomWidth: 1, 
        borderBottomColor: Colors.colorType5_1,
        flexDirection: 'row', 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        margin: 5,
    },
    help: {
        width: 20,
        height: 20,
        borderRadius: 5,
    },
    loader: {
        width: Dimensions.get('window').width,
        height: 100,
        marginTop: 10,
    },
});