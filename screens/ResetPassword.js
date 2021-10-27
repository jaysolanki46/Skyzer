import React, { useState } from 'react';
import Colors from '../config/Colors';
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TextInput, Alert, SafeAreaView } from 'react-native';
import Headertext from '../config/Headertext';
import BackgroundImage from "../assets/images/background.jpg";
import Configurations from '../config/Configurations';
import rightArrowImage from '../assets/images/right-arrow.png';
import TopStatusBar from '../components/TopStatusBar';
import * as SecureStore from 'expo-secure-store';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default ResetPassword = ({ navigation }) => {

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const resetPassword = async () => {

    if (password == null || password == "") {
      Alert.alert("Error", "Password can't be empty");
    } else {
      var email = await SecureStore.getItemAsync("forgetEmail");
      var pass = password;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "email": email,
        "password": pass
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      try {
        const response = await fetch(Configurations.host + "/skyzer-guide/users/resetPassword", requestOptions);
        const status = await response.status;
        
        if (status == 200) {
          navigation.navigate('RestPasswordSuccess');
        } else {
          throw new Error(status);
        }
      } catch (error) {
        console.log(new Date().toLocaleString() + " | " + "Screen: ResetPassword.js" + " | " + "Status: " + error + " | " + "User: " + email);
      }
    }
  }

  return (

    <SafeAreaView style={styles.container} behavior="height">
      <TopStatusBar />
      <ImageBackground source={BackgroundImage} resizeMode="cover" style={{
        position: 'absolute',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
      }}>
        <View style={styles.header}>
          {/* <Logo/> */}
          <Text style={[Headertext.h1, { color: Colors.fontColorPurplest }]}>Skyzer Guide</Text>
          <Text style={[Headertext.h5, { color: Colors.fontColorLightBlack, fontWeight: '600' }]}>Let you explore the terminal</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.bodyForm} showsVerticalScrollIndicator={false}>
            <View style={{ margin: 15, alignItems: 'center',}}>
              <Text style={styles.bodyFormHeader}> Create new password </Text>
              <Text style={[Headertext.h5, { color: Colors.fontColorWhite }]}> Enter the new password  </Text>
            </View>
            <View>
              <View style={[{ flexDirection: 'row', alignItems: 'center', }]}>
                <TextInput style={styles.input} placeholder="Password"
                  placeholderTextColor={Colors.fontColorWhite}
                  keyboardType="default" secureTextEntry={!showPassword}
                  onChangeText={(Password) => setPassword(Password)} />
                {
                  showPassword ?
                    <MaterialCommunityIcons name="eye" size={24} style={{ marginLeft: -25 }}
                      color={Colors.white} onPress={() => setShowPassword(false)} />
                    :
                    <MaterialCommunityIcons name="eye-off" size={24} style={{ marginLeft: -25 }}
                      color={Colors.white} onPress={() => setShowPassword(true)} />
                }
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity style={[styles.button]} onPress={() => { resetPassword() }}>
                  <Text style={[Headertext.h4, { marginRight: 15, color: Colors.fontColorWhite }]}>Reset</Text>
                </TouchableOpacity>
                <Image style={[styles.icon]} source={rightArrowImage} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer}>

        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  body: {
    flex: 4,
    alignItems: 'center',
  },
  footer: {
    flex: 1,
  },
  bodyForm: {
    width: Dimensions.get('window').width - 60,
    height: 50,
    marginTop: 30,
    marginLeft: 70,
    marginRight: 70,
    color: Colors.fontColorWhite,
    borderRadius: 10,
    height: 300,
    backgroundColor: Colors.cardBodyColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyFormHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.fontColorWhite,
  },
  input: {
    width: Dimensions.get('window').width - 100,
    height: 40,
    marginTop: 15,
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    borderBottomColor: Colors.fontColorWhite,
    borderBottomWidth: 1,
    color: Colors.fontColorWhite,
  },
  button: {
    marginTop: 15,
    marginBottom: 15,
    padding: 5,
    alignItems: 'center'
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'stretch'
  },
  navButton: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.fontColorWhite,
  },
});