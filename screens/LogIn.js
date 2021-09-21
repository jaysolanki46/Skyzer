import React, { useState } from 'react';
import Colors from '../config/Colors';
import { ImageBackground, Linking, Button, StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions, TextInput, KeyboardAvoidingView, StatusBar, ScrollView, LayoutAnimation, Alert, SafeAreaView} from 'react-native';
import Headertext from '../config/Headertext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../components/AuthContext';
import backgroundImage from "../assets/images/background.jpg";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

export default LogIn = ({navigation}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const  { logIn } = React.useContext(AuthContext);
  
  const logInHandle = (username, password) => {
    logIn(username, password);
  }

  return (
    
    <SafeAreaView style={styles.container} behavior="height">
      <ImageBackground source={backgroundImage} resizeMode="cover" style={{
        position: 'absolute',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height}}>
       {Platform.OS === 'ios' && <>
       <StatusBar barStyle="dark-content" hidden = {false} translucent = {true}></StatusBar>
       </>}

        <View style={styles.header}>
          {/* <Logo/> */}
          <Text style={[Headertext.h1, {color: Colors.fontColorPurplest}]}>Skyzer Guide</Text>
          <Text style={[Headertext.h5, {color: Colors.fontColorLightBlack, fontWeight: '600'}]}>Let you explore the terminal</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.bodyForm} showsVerticalScrollIndicator={false}>
            <View style={{ margin: 15 }}>
              <Text style={styles.bodyFormHeader}> Welcome Back </Text>
            </View>
            {
              Platform.OS === 'ios' ?
                <View>
                  <TextInput selectionColor={Colors.white} style={styles.input} placeholder="Username" placeholderTextColor={Colors.fontColorWhite} keyboardType="default" onChangeText={(Username) => setUsername(Username)} />
                  <View style={[{ flexDirection: 'row', alignItems: 'center', }]}>
                    <TextInput selectionColor={Colors.white} style={styles.input} placeholder="Password"
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
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={[styles.button]} onPress={() => { logInHandle(username, password) }}>
                      <Text style={[Headertext.h4, { marginRight: 15, color: Colors.fontColorWhite }]}>Log In</Text>
                    </TouchableOpacity>
                      <Image style={[styles.icon]} source={require('../assets/images/right-arrow.png')} />
                  </View>
                </View>
                :
                <KeyboardAwareScrollView
                  enableOnAndroid={true}
                  style={{ flexGrow: 1 }}
                >
                  <View style={{ height: 300 }}>
                    <View>
                      <TextInput style={styles.input} placeholder="Username" placeholderTextColor={Colors.fontColorWhite} keyboardType="default" onChangeText={(Username) => setUsername(Username)} />
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
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={[styles.button]} onPress={() => { logInHandle(username, password) }}>
                          <Text style={[Headertext.h4, { marginRight: 15, color: Colors.fontColorWhite }]}>Log In</Text>
                        </TouchableOpacity>
                          <Image style={[styles.icon]} source={require('../assets/images/right-arrow.png')} />
                      </View>
                    </View>
                  </View>
                </KeyboardAwareScrollView>
            }
            <View style={{ marginTop: 10, marginBottom: 10, width: Dimensions.get('window').width - 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
              <TouchableOpacity style={[styles.navButton]} onPress={() => navigation.navigate('SignUp')}>
                <Text style={[Headertext.h5, { color: Colors.fontColorWhite, fontWeight: '700' }]}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navButton, { marginLeft: 'auto', }]} onPress={() => navigation.navigate('ForgetPassword')}>
                <Text style={[Headertext.h5, { color: Colors.fontColorWhite, fontWeight: '700' }]}>Forget Password?</Text>
              </TouchableOpacity>
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
    svgCurve: {
        position: 'absolute',
        width: Dimensions.get('window').width,
      },
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
      height: 350,
      backgroundColor: Colors.cardBodyColor,
      justifyContent: 'center',
      alignItems: 'center',
    }, 
    bodyFormHeader: {
      fontSize: 25,
      fontWeight: 'bold',
      color: Colors.fontColorWhite,
    },
    modelContainer: {
      flex: 1, 
      borderRadius: 25,
    },
    modelHeader: {
      flexDirection: 'row', 
      padding: 10,
      marginLeft: 5,
      borderRadius: 25,
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
    iconClose: {
      width: 15,
      height: 15,
      resizeMode: 'stretch'
    },
    navButton: {
      padding: 5,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: Colors.fontColorWhite,
    },
    moveRight: {
      marginLeft: 'auto',
    },
    moveLeft: {
      marginRight: 'auto',
    }
    
});