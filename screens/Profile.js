import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, SafeAreaView, Dimensions, Alert  } from 'react-native';
import Colors from '../config/Colors';
import Headertext from '../config/Headertext';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../components/AuthContext';
import Configurations from '../config/Configurations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MoreImage from '../assets/images/more/more.png';
import DefaultProfileImage from '../assets/images/profile/profile.png';
import LoaderImage from '../assets/images/list-loader.gif';
import TopStatusBar from '../components/TopStatusBar';
import * as SecureStore from 'expo-secure-store';

export default Profile = ({ navigation }) => {

    const [userToken, setUserToken] = useState(null);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [account, setAccount] = useState(null);
    const [dealer, setDealer] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [sessionId, setSessionId] = useState(null);

    const { logOut } = React.useContext(AuthContext);

    const settingSession = async () => {
        await AsyncStorage.getItem('userId').then(val => setSessionId(val));
        await AsyncStorage.getItem('profile').then(val => setImage(val));
        await SecureStore.getItemAsync('token').then(val => setUserToken(val));
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
        if (sessionId != null && userToken != null) {
            InitUser()
        }
    }, [sessionId, userToken]);

    const InitUser = async () => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", userToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            const response = await fetch(Configurations.host + "/skyzer-guide/users/" + sessionId, requestOptions)
            const status = await response.status;

            if (status == 200) {
                const responseJson = await response.json();
                const userArray = JSON.parse(JSON.stringify(responseJson));
                setAccount(userArray.division.division);
                setDealer(userArray.division.dealer_name);
                setUsername(userArray.username);
                setEmail(userArray.email);
                setIsLoading(false);

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
                throw new Error(status);
            }

        } catch (error) {
            console.log(new Date().toLocaleString() + " | " + "Screen: Profile.js" + " | " + "Status: " + error + " | " + "User: " + await AsyncStorage.getItem("userId"));
        }
    }

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
          myHeaders.append("Authorization", userToken);

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
              const response = await fetch(Configurations.host + "/skyzer-guide/user/image/", requestOptions)
              const status = await response.status;

              if (status == 200) {
                  await AsyncStorage.removeItem('profile');
                  await AsyncStorage.setItem('profile', result.uri);
                  Alert.alert("Profile update!")

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
                  Alert.alert("Something went wrong!");
                  throw new Error(status);
              }

          } catch (error) {
              console.log(new Date().toLocaleString() + " | " + "Screen: Profile.js" + " | " + "Module: Profile Image Update" + " | " + "Status: " + error + " | " + "User: " + await AsyncStorage.getItem("userId"));
          }

        setImage(result.uri);
        setIsImageLoading(false);
      }
    };

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
                                        source={DefaultProfileImage}
                                    /> :
                                    <Image
                                        style={styles.profile}
                                        source={{ uri: image }}
                                    />
                        }
                    </View>
                    <TouchableOpacity style={{ backgroundColor: Colors.colorType1_3, padding: 10, borderRadius: 10, }} onPress={pickImage}>
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
                    <View style={{ flex: 1.2, }}>
                        <View style={[styles.fieldBlock, {justifyContent: 'center', borderBottomWidth: 0}]}>
                            <TouchableOpacity style={{backgroundColor: Colors.colorType1_1, padding: 10, borderRadius: 10,}} onPress={() => logOut()}>
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
            <TopStatusBar />

            <View style={styles.header}>
                <View style={styles.headerSubView}>
                    <Text style={[Headertext.h1, { marginRight: 10, color: Colors.fontColorBluest }]}>Profile</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('More') }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Image
                                style={styles.help}
                                source={MoreImage}
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