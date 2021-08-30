import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, StatusBar, Button,Image, TextInput, TouchableOpacity, Dimensions, SafeAreaView  } from 'react-native';
import Colors from '../config/Colors';
import Headertext from '../config/Headertext';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../components/AuthContext';
import LogIn from './LogIn';

export default Profile = () => {

    const defaultImageUrl = '../assets/images/profile.png';
    const [image, setImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);

    const  { logOut } = React.useContext(AuthContext);

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" hidden = {false} translucent = {true}></StatusBar>
            <View style={styles.header}>
                    <Text style={[Headertext.h1, {marginRight: 10, color: Colors.fontColorPurplest}]}>
                        Profile
                    </Text>
                    <TouchableOpacity onPress={() => alert("Me help!!!")}>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <Image
                                style={styles.help}
                                source={require('../assets/images/help.png')}
                            />
                            <Text style={[Headertext.h5, { fontWeight: 'bold', color: Colors.fontColorBluest, margin: 5 }]}>Help</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyProfile}>
                    <View style={ styles.bodyProfileInner}>
                        {
                            image == null ?
                                <Image
                                    style={styles.profile}
                                    source={require(defaultImageUrl)}
                                /> :
                                <Image
                                    style={styles.profile}
                                    source={require('../assets/images/menu-icons/home.png')}
                                />
                        }
                        <TouchableOpacity onPress={pickImage}>
                            <Image 
                                style={styles.profileEdit}
                                source={require('../assets/images/camera.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bodyDetails}>
                    <View style={{flex:1.2,}}>
                        <View style={styles.fieldBlock}>
                            <Text style={[Headertext.h5 ,{color: Colors.fontColorLightBlack, fontWeight: 'bold'}]}>Account</Text>
                            <Text style={[Headertext.h5, { color: Colors.fontColorBlack, fontWeight: 'bold' }]}>1248</Text>
                        </View>          
                    </View>
                    <View style={{ flex: 1.2,}}>
                        <View style={styles.fieldBlock}>
                            <Text style={[Headertext.h5, { color: Colors.fontColorLightBlack, fontWeight: 'bold' }]}>Dealer</Text>
                            <Text style={[Headertext.h5, { color: Colors.fontColorBlack, fontWeight: 'bold' }]}>Skyzer technologies</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1.2,}}>
                        <View style={styles.fieldBlock}>
                            <Text style={[Headertext.h5, { color: Colors.fontColorLightBlack, fontWeight: 'bold' }]}>Username</Text>
                            <Text style={[Headertext.h5, { color: Colors.fontColorBlack, fontWeight: 'bold' }]}>Jay</Text>
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
                                {showPassword ? "pass" : "****"}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1.2, }}>
                        <View style={[styles.fieldBlock, {justifyContent: 'center'}]}>
                            <TouchableOpacity style={{backgroundColor: Colors.colorType3_1, padding: 10, borderRadius: 10,}} onPress={() => logOut()}>
                                <Text style={[Headertext.h5, { color: Colors.fontColorWhite, fontWeight: 'bold' }]}>Log out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1.2,}}>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[Headertext.h5,]}>
                                Version: 1.0
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="copyright" size={20} color={Colors.white} />
                                <Text style={[Headertext.h5, { marginLeft: 5, }]}>
                                    Skyzer Technologies. All Rights Reserved.
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios'? 10 : 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.bodyColor,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        width: '95%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    body: {
        flex: 5,
        width: '95%',
    },
    bodyProfile: {
        flex: 2.5,
        width: '100%',
        borderWidth: 1,
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
        width: '100%',
    },
    profile: {
        width: 130,
        height: 130,
        borderRadius: 50,
        backgroundColor: Colors.colorType5_1,
    },
    profileEdit: {
        width: 30,
        height: 30,
        margin: -20,
        marginLeft: 90,
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
    }
});