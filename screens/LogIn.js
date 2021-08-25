import React, { useState } from 'react';
import Colors from '../config/Colors';
import { Linking, Button, StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions, TextInput, KeyboardAvoidingView, StatusBar, ScrollView, LayoutAnimation, Alert} from 'react-native';
import Logo from '../components/Logo';
import Modal from 'react-native-modal';
import WavyHeader from '../components/WavyHeader';
import Headertext from '../config/Headertext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../components/AuthContext';


export default LogIn = () => {

  const [modelSignUpVisible, setModelSignUpVisible] = useState(false);
  const [modelForgetPasswordVisible, setModelForgetPasswordVisible] = useState(false);
  const [iconPosition, setIconPosition] = useState("left");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const  { logIn } = React.useContext(AuthContext);
  const toggleIcon = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIconPosition(iconPosition === "left" ? "right" : "left");
  };
  
  return (
    
    <KeyboardAvoidingView style={styles.container} behavior="height">
       {Platform.OS === 'ios' && <>
       <StatusBar barStyle="dark-content" hidden = {false} translucent = {true}></StatusBar>
       </>}

      {/* MODEL SIGNUP PROCESS  */}
      <Modal isVisible={modelSignUpVisible} animationType="fade" transparent={true}>
        <View style={{height: Dimensions.get('window').height - 300}}>
        <View style={[styles.modelContainer, {backgroundColor: Colors.bodyColor}]} >
            
            <View style={[styles.modelHeader, {backgroundColor: Colors.bodyColor}]}>
              <Text style={[Headertext.h3, {flex: 5.8, alignSelf: 'center', textAlign: 'center', color: Colors.fontColorBluest}]}>
                Sign Up!
              </Text>
              <TouchableOpacity style={[styles.button, {flex: .2, marginLeft: 'auto',}]} onPress={() => setModelSignUpVisible(false)}>
                  <Image style={styles.iconClose} source={require('../assets/images/close.png')} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{padding: 10}}>
              <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10,}}>
                <View>
                  <Text style={[styles.h5, {color: Colors.fontColorBlack, fontWeight: '600'}]}>
                    Step 1:
                  </Text>
                </View>
                <View style={{ marginLeft: 10, marginRight: 50, }}>
                  <Text style={[styles.h5, {color: Colors.fontColorBlack}]}>
                    Please email Skyzer support team at
                  </Text>
                  <Text style={{color: 'blue', marginLeft: 1, }} onPress={() => 
                    Linking.openURL('mailto:support@skyzer.co.nz?subject=Skyzer App: Forget Password!&body=Description') }>
                      support@skyzer.co.nz
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10,}}>
                <View>
                  <Text style={[styles.h5, {color: Colors.fontColorBlack, fontWeight: '600'}]}>
                    Step 2:
                  </Text>
                </View>
                <View style={{ marginLeft: 10, marginRight: 50, }}>
                  <Text style={[styles.h5, {color: Colors.fontColorBlack}]}>
                    You will be receive a call from one of support team with your username and password.
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10,}}>
                <View>
                  <Text style={[styles.h5, {color: Colors.fontColorBlack, fontWeight: '600'}]}>
                    Step 3:
                  </Text>
                </View>
                <View style={{ marginLeft: 10, marginRight: 50, }}>
                  <Text style={[styles.h5, {color: Colors.fontColorBlack}]}>
                    That's all! Get login and enjoy the Skyzer app experience.
                  </Text>
                </View>
               </View>

            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODEL FORGET PASSWORD PROCESS  */}
      <Modal isVisible={modelForgetPasswordVisible} animationType="fade" transparent={true}>
        <View style={{height: Dimensions.get('window').height - 300}}>
        <View style={[styles.modelContainer, {backgroundColor: Colors.bodyColor}]} >
            
            <View style={[styles.modelHeader, {backgroundColor: Colors.bodyColor}]}>
              <Text style={[Headertext.h3, {flex: 5.8, alignSelf: 'center', textAlign: 'center', color: Colors.fontColorBluest}]}>
                Forget Password?
              </Text>
              <TouchableOpacity style={[styles.button, {flex: .2, marginLeft: 'auto',}]} onPress={() => setModelForgetPasswordVisible(false)}>
                  <Image style={styles.iconClose} source={require('../assets/images/close.png')} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{padding: 10}}>
              <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10,}}>
                <View>
                  <Text style={[styles.h5, {color: Colors.fontColorBlack, fontWeight: '600'}]}>
                    Step 1:
                  </Text>
                </View>
                <View style={{ marginLeft: 10, marginRight: 50, }}>
                  <Text style={[styles.h5, {color: Colors.fontColorBlack}]}>
                    Please email Skyzer support team at
                  </Text>
                  <Text style={{color: 'blue', marginLeft: 1, }} onPress={() => 
                    Linking.openURL('mailto:support@skyzer.co.nz?subject=Skyzer App: Forget Password!&body=Description') }>
                      support@skyzer.co.nz
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10,}}>
                <View>
                  <Text style={[styles.h5, {color: Colors.fontColorBlack, fontWeight: '600'}]}>
                    Step 2:
                  </Text>
                </View>
                <View style={{ marginLeft: 10, marginRight: 50, }}>
                  <Text style={[styles.h5, {color: Colors.fontColorBlack}]}>
                    You will be receive a call from one of support team with your username and password.
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10,}}>
                <View>
                  <Text style={[styles.h5, {color: Colors.fontColorBlack, fontWeight: '600'}]}>
                    Step 3:
                  </Text>
                </View>
                <View style={{ marginLeft: 10, marginRight: 50, }}>
                  <Text style={[styles.h5, {color: Colors.fontColorBlack}]}>
                    That's all! Get login and enjoy the Skyzer app experience.
                  </Text>
                </View>
               </View>

            </ScrollView>
          </View>
        </View>
      </Modal>
        
        
        <View style={styles.header}>
          {/* <Logo/> */}
          <Text style={[Headertext.h1, {color: Colors.fontColorBluest}]}>Welcome to</Text>
          <Text style={[Headertext.h1, {color: Colors.fontColorPurplest}]}>Skyzer Guide</Text>
          <Text style={[Headertext.h5, {color: Colors.fontColorLightBlack, fontWeight: '600'}]}>Let you explore the terminal</Text>
        </View>

        <View style={styles.body}>
            <WavyHeader customStyles={styles.svgCurve} />
            <View style={styles.bodyForm}>
              <View style={{margin: 15}}>
                <Text style={styles.bodyFormHeader}> Welcome </Text>
                <Text style={styles.bodyFormHeader}> Back</Text>
              </View>
              <View style={{margin: 10}}>
                <TextInput style={styles.input} placeholder="Username" placeholderTextColor={Colors.fontColorWhite} keyboardType="default" onChangeText={(Username) => setUsername(Username)}/>
                <View style={[{flexDirection: 'row', alignItems: 'center',}]}>
                  <TextInput style={styles.input} placeholder="Password" 
                    placeholderTextColor={Colors.fontColorWhite} 
                    keyboardType="default" secureTextEntry={!showPassword} 
                    onChangeText={(Password) => setPassword(Password)} />
                    {
                     showPassword ? 
                      <MaterialCommunityIcons name="eye" size={24} style={{marginLeft: -25}}
                      color={Colors.white} onPress={() => setShowPassword(false)} /> 
                     :
                      <MaterialCommunityIcons name="eye-off" size={24} style={{marginLeft: -25}}
                      color={Colors.white} onPress={() => setShowPassword(true)} />
                    }
                    
                    
                </View>
                <View style={{flexDirection:'row', alignItems: 'center'}}>
                  <TouchableOpacity style={[styles.button]}  onPress={() => logIn()}>
                    <Text style={[Headertext.h4, {marginRight: 15, color: Colors.buttonWhite}]}>Log In</Text>
                  </TouchableOpacity>
                  <View style={iconPosition === "left" ? styles.moveLeft : styles.moveRight}>
                    <Image style={[styles.icon]} source={require('../assets/images/right-arrow.png')} />  
                  </View>
                </View>

              </View>
              <View style={{margin: 10, flexDirection: 'row'}}>
                <TouchableOpacity style={[styles.navButton]} onPress={() => setModelSignUpVisible(true)}>
                  <Text style={[Headertext.h5, {color: Colors.fontColorWhite, fontWeight: '700'}]}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navButton, {marginLeft: 'auto',}]} onPress={() => setModelForgetPasswordVisible(true)}>
                  <Text style={[Headertext.h5, {color: Colors.fontColorWhite, fontWeight: '700'}]}>Forget Password?</Text>
                </TouchableOpacity>
              </View>
              
            </View>
        </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    svgCurve: {
        position: 'absolute',
        width: Dimensions.get('window').width,
      },
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'ios'? 10 : 60,
      backgroundColor: Colors.bodyColor,
    },
    header: {
      flex: 1.5,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 20,
      backgroundColor: Colors.bodyColor,
    },
    body: {
      flex: 4.5,
      alignItems: 'center',
      backgroundColor: Colors.subBodyColor,
    },
    bodyForm: {
        width: Dimensions.get('window').width - 70, 
        marginTop: 30,
        marginLeft: 70,
        marginRight: 70,
        color: Colors.fontColorWhite,
    }, 
    bodyFormHeader: {
      fontSize: 25,
      fontWeight: 'bold',
      color: Colors.fontColorWhite,
    },
    modelContainer: {
      flex: 1, 
      backgroundColor: Colors.bodyColor, 
      borderRadius: 25,
    },
    modelHeader: {
      flexDirection: 'row', 
      padding: 10,
      marginLeft: 5,
      backgroundColor: Colors.bodyColor,
      borderRadius: 25,
    },
    input: {
      width: 300 ,
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