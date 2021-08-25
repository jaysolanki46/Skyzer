import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Button,Image, TextInput, TouchableOpacity  } from 'react-native';
import Colors from '../config/Colors';
import Headertext from '../config/Headertext';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../components/AuthContext';

export default Profile = () => {

    const defaultImageUrl = '../assets/images/profile.png';
    const [image, setImage] = useState(null);
    const [showPassword, setShowPassword] = useState(true);

    const  { logOut} = React.useContext(AuthContext);

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
        <View style={styles.container}>
            {Platform.OS === 'ios' && <>
            <StatusBar barStyle="light-content" hidden = {false} translucent = {true}></StatusBar>
            </>}
            <View style={styles.header}>
            <View style={styles.headerSubView}>
                    <Text style={[Headertext.h2]}>Profile</Text>
            </View>
            </View>
            <View style={styles.body}>
                <View style={styles.bodySubView}>
                    <View style={styles.bodyTop}>
                        <View style={styles.bodyTopLeft}>
                            <View>
                                {
                                image == null ? 
                                    <Image
                                        style={styles.tinyLogo}
                                        source={require(defaultImageUrl)}
                                    /> :
                                    <Image 
                                        style={styles.tinyLogo}
                                        source={{ uri: image }} />
                                    }
                                    <Text style={[Headertext.h5, {alignSelf: 'center'}]} onPress={pickImage}>Edit</Text>
                            </View>
                        </View>
                        <View style={styles.bodyTopRight}>
                            <Text style={Headertext.h3}>Jay</Text>
                            <Text style={Headertext.h4}>1248 - Skyzer Technologies</Text>
                        </View>
                    </View>

                    <View style={styles.bodyMiddle}>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text style={Headertext.h4}>Password</Text>
                            {(() => {
                                if(showPassword) {
                                    return  (
                                        <View style={{flexDirection: 'row', alignItems: 'center'}} >
                                            <MaterialCommunityIcons name="eye" size={24} color={Colors.white} onPress={() => setShowPassword(false)} />
                                            <Text style={[Headertext.h5, {marginLeft: 5,}]} onPress={() => setShowPassword(false)}>Show</Text>
                                        </View>
                                    )
                                } else {
                                    return (
                                        <View style={{flexDirection: 'row', alignItems: 'center'}} >
                                            <MaterialCommunityIcons name="eye-off" size={24} color={Colors.white} onPress={() => setShowPassword(true)}/>
                                            <Text style={[Headertext.h5, {marginLeft: 5,}]} onPress={() => setShowPassword(true)}>Hide</Text>
                                        </View>
                                    )
                                } 
                            })()}    
                        </View>
                        <TextInput style={styles.input} placeholder="Password" 
                            placeholderTextColor={Colors.lightFont} keyboardType="default" 
                            secureTextEntry={showPassword} value="12345" />

                        <TouchableOpacity onPress={() => {logOut()}} 
                        style={styles.logout_button}>
                            <Text style={[Headertext.h3, {color: Colors.buttonFont}]}>Logout</Text></TouchableOpacity>
                    </View>

                    <View style={styles.bodyBottom}>
                        
                    </View>

                    <View style={styles.footer}>
                            <View style={{flex: 4, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                                <View>
                                    <Text style={[Headertext.h5, {color: Colors.lightFont, alignSelf: 'center', fontWeight: '500'}]}>Need Support?</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity style={styles.social_button}><Image style={styles.social_logo} source={require('../assets/images/phone.png')} /></TouchableOpacity>
                                        <TouchableOpacity style={styles.social_button}><Image style={styles.social_logo} source={require('../assets/images/email.png')} /></TouchableOpacity>
                                    </View>
                                </View>
                                <View>
                                    <Text style={[Headertext.h5, {color: Colors.lightFont, alignSelf: 'center', fontWeight: '500'}]}>Get Know Us:</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity style={styles.social_button}><Image style={styles.social_logo} source={require('../assets/images/facebook.png')} /></TouchableOpacity>
                                        <TouchableOpacity style={styles.social_button}><Image style={styles.social_logo} source={require('../assets/images/linkedin.png')} /></TouchableOpacity>
                                    </View>
                                </View>
                                
                            </View>
                            <View style={{flex: 2, justifyContent: 'flex-end', alignItems: 'center'}}>
                                <Text style={[Headertext.h5,]}>
                                    Version: 1.0 
                                </Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <MaterialCommunityIcons name="copyright" size={20} color={Colors.white} />
                                    <Text style={[Headertext.h5, {marginLeft: 5,}]}>
                                            Skyzer Technologies. All Rights Reserved.
                                    </Text>
                                </View>
                            </View>
                    </View>        
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios'? 10 : 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: Colors.background,
    },
    header: {
          flex: .5,
          width: '100%',
          marginTop: 20, 
          marginBottom: 10,
    },
    headerSubView: {
          flex: 1, 
          flexDirection: 'row',
          marginLeft: 10, 
          marginRight: 10,
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          backgroundColor: Colors.background,
    },
    body: {
        flex: 5.5,
        alignItems: 'center',
        width: '100%',
        flexDirection: "row",
        alignContent: "space-between",
    },
    bodySubView: {
        flex: 1, 
        backgroundColor: Colors.background,
    },
    bodyTop: {
        flex: 2,
        flexDirection: 'row',
    },
    bodyTopLeft: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyTopRight: {
        flex: 4.2,
        justifyContent: 'center',
    },
    bodyMiddle: {
        flex: 1,
        backgroundColor: Colors.background,
        margin: 10,
    },
    bodyBottom: {
        flex: 0.5,
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between',
    },
    footer: {
        flex: 2.5,
        alignItems: 'center',
        padding: 5,
    },
    tinyLogo: {
        width: 75,
        height: 75,
        borderRadius: 50,
    },
    input: {
      height: 40,
      marginTop: 15,
      marginBottom: 15,
      padding: 10,
      borderRadius: 10,
      borderBottomColor: Colors.lightFont,
      borderBottomWidth: 1,
      color: Colors.lightFont,
    },
    button: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 10,
      paddingBottom: 10,
      margin: 5,
      borderRadius: 25,
      alignItems: 'center',
      flexDirection: 'row',
    },
    social_button: {
      margin: 5,
      borderRadius: 25,
    },
    social_logo: {
      width: 50,
      height: 50,
      resizeMode: 'stretch'
    },
    logout_button: {
        backgroundColor: Colors.buttonBody,
        paddingLeft: 120,
        paddingRight: 120,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        alignItems: 'center',
      },
});