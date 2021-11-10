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
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default ResetPassword = ({ navigation }) => {

  const route = useRoute();
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
        const response = await fetch(Configurations.host + "/users/resetPassword", requestOptions);
        const status = await response.status;
        
        if (status == 200) {
          navigation.navigate('RestPasswordSuccess');
          await SecureStore.deleteItemAsync("forgetEmail");

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
          "user": await SecureStore.getItemAsync("forgetEmail"),
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
  }

  return (

    <View style={styles.container} behavior="height">
      <TopStatusBar />
      <LinearGradient colors={[Colors.backgroundColor1of3, Colors.backgroundColor2of3, Colors.backgroundColor3of3]} style={{ flex: 1, }} >
        <View style={styles.header}>
          {/* <Logo/> */}
          <Text style={[Headertext.h1, { color: Colors.fontWhite }]}>SKYZER GUIDE</Text>
        </View>

        <View style={styles.body}>
          <LinearGradient colors={[Colors.modelColor, Colors.modelColor, Colors.modelColor]} style={styles.bodyForm} >
          <View showsVerticalScrollIndicator={false}>
            <View style={{ margin: 15, alignItems: 'center',}}>
              <Text style={styles.bodyFormHeader}> Create new password </Text>
              <Text style={[Headertext.h5, { color: Colors.fontWhite }]}> Enter the new password  </Text>
            </View>
            <View>
              <View style={[{ flexDirection: 'row', alignItems: 'center', }]}>
                <TextInput style={styles.input} placeholder="Password"
                  placeholderTextColor={Colors.fontWhite}
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
                  <Text style={[Headertext.h4, { marginRight: 15, color: Colors.fontWhite }]}>Reset</Text>
                </TouchableOpacity>
                <Image style={[styles.icon]} source={rightArrowImage} />
              </View>
            </View>
          </View>
          </LinearGradient>
        </View>

      </LinearGradient>
    </View>
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
    flex: 5,
    alignItems: 'center',
  },
  bodyForm: {
    width: Dimensions.get('window').width - 60,
    height: 50,
    marginTop: 30,
    marginLeft: 70,
    marginRight: 70,
    color: Colors.fontWhite,
    borderRadius: 10,
    height: 300,
    backgroundColor: Colors.cardBodyColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyFormHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.fontWhite,
  },
  input: {
    width: Dimensions.get('window').width - 100,
    height: 40,
    marginTop: 15,
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    borderBottomColor: Colors.fontWhite,
    borderBottomWidth: 1,
    color: Colors.fontWhite,
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
    borderColor: Colors.fontWhite,
  },
});