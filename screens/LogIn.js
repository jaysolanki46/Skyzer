import React, { useState } from 'react';
import Colors from '../config/Colors';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions, TextInput, KeyboardAvoidingView, StatusBar, ScrollView, LayoutAnimation, Alert} from 'react-native';
import Logo from '../components/Logo';
import Modal from 'react-native-modal';
import WavyHeader from '../components/WavyHeader';

export default LogIn = () => {

  const [modelSignUpVisible, setModelSignUpVisible] = useState(false);
  const [modelForgetPasswordVisible, setModelForgetPasswordVisible] = useState(false);
  const [iconPosition, setIconPosition] = useState("left");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toggleIcon = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIconPosition(iconPosition === "left" ? "right" : "left");
  };
  
  const handleLogin = () => {
    if(!username || !password) {
      alert("Please fill Username and password");
    } else {

      if(username == "jay" && password == "pass")  {
        alert("Pass");  
        toggleIcon();
      } else {
        alert("Invalid username or password!");  
      }
    }   
  }
  
  return (
    
    <KeyboardAvoidingView style={styles.container} behavior="height">
       {Platform.OS === 'ios' && <>
       <StatusBar barStyle="dark-content" hidden = {false} translucent = {true}></StatusBar>
       </>}

      {/* MODEL SIGNUP PROCESS  */}
       <Modal isVisible={modelSignUpVisible} animationType="fade" transparent={true}>
        <View style={{height: Dimensions.get('window').height - 300}}>
        <View style={styles.modelContainer} >
            
            <View style={styles.modelHeader}>
              <Text style={[styles.h3, {alignSelf: 'center'}]}>Signup Process!</Text>
              <TouchableOpacity style={[styles.button, {marginLeft: 'auto',}]} onPress={() => setModelSignUpVisible(false)}>
                  <Image style={styles.iconClose} source={require('../assets/images/close.png')} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{padding: 10}}>
              <Text style={{margin: 10, textAlign: 'justify' }}>
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.    
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODEL FORGET PASSWORD PROCESS  */}
      <Modal isVisible={modelForgetPasswordVisible} animationType="fade" transparent={true}>
        <View style={{height: Dimensions.get('window').height - 300}}>
        <View style={styles.modelContainer} >
            
            <View style={styles.modelHeader}>
              <Text style={[styles.h3, {flex: 5.8, alignSelf: 'center'}]}>Forget Password Process!</Text>
              <TouchableOpacity style={[styles.button, {flex: .2, marginLeft: 'auto',}]} onPress={() => setModelForgetPasswordVisible(false)}>
                  <Image style={styles.iconClose} source={require('../assets/images/close.png')} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{padding: 10}}>
              <Text style={{margin: 10, textAlign: 'justify' }}>
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.    
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.
                As you can see the black size is the scroll View, I want it to be small. In routes stack into dashboard screen, the style: const Style = StyleSheet.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
        
        
        <View style={styles.header}>
          <Logo/>
          <Text style={styles.h1}>Welcome to</Text>
          <Text style={styles.h1}>Skyzer Guide</Text>
          <Text style={styles.h5}>Let you explore the terminal</Text>
        </View>

        <View style={styles.body}>
            <WavyHeader customStyles={styles.svgCurve} />
            <View style={styles.bodyForm}>
              <View style={{margin: 15}}>
                <Text style={styles.bodyFormHeader}> Welcome </Text>
                <Text style={styles.bodyFormHeader}> Back</Text>
              </View>
              <View style={{margin: 10}}>
                <TextInput style={styles.input} placeholder="Username" placeholderTextColor={Colors.white} keyboardType="default" onChangeText={(Username) => setUsername(Username)}/>
                <TextInput style={styles.input} placeholder="Password" placeholderTextColor={Colors.white} keyboardType="default" secureTextEntry={true} onChangeText={(Password) => setPassword(Password)} />
               
                <View style={{flexDirection:'row', alignItems: 'center'}}>
                  <TouchableOpacity style={[styles.button]}  onPress={handleLogin}>
                    <Text style={[styles.h4, {marginRight: 15, color: Colors.white}]}>Log In</Text>
                  </TouchableOpacity>
                  <View style={iconPosition === "left" ? styles.moveLeft : styles.moveRight}>
                    <Image style={[styles.icon]} source={require('../assets/images/right-arrow.png')} />  
                  </View>
                </View>

              </View>
              <View style={{margin: 10, flexDirection: 'row'}}>
                <TouchableOpacity style={[styles.navButton]} onPress={() => setModelSignUpVisible(true)}>
                  <Text style={[styles.h5, {color: Colors.white}]}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navButton, {marginLeft: 'auto',}]} onPress={() => setModelForgetPasswordVisible(true)}>
                  <Text style={[styles.h5, {color: Colors.white}]}>Forget Password?</Text>
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
    },
    header: {
      flex: 1.5,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 20
    },
    body: {
      flex: 4.5,
      alignItems: 'center',
      backgroundColor: Colors.primary,
    },
    bodyForm: {
        width: Dimensions.get('window').width - 70, 
        marginTop: 30,
        marginLeft: 70,
        marginRight: 70,
        color: Colors.white,
    }, 
    bodyFormHeader: {
      fontSize: 25,
      fontWeight: 'bold',
      color: Colors.white,
    },
    modelContainer: {
      flex: 1, 
      backgroundColor: Colors.white, 
      borderRadius: 25,
    },
    modelHeader: {
      flexDirection: 'row', 
      padding: 10
    },
    input: {
      height: 40,
      marginTop: 15,
      marginBottom: 15,
      padding: 10,
      borderRadius: 10,
      borderBottomColor: Colors.white,
      borderBottomWidth: 1,
      color: Colors.white,
    },
    h1: {
      fontSize: 35,
      fontWeight: 'bold',
      color: Colors.darkFont
    },
    h3: {
      fontSize: 25,
      fontWeight: 'bold',
      color: Colors.darkFont
    },
    h4: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.darkFont
    },  
    h5: {
      fontSize: 15,
      color: Colors.darkFont
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
      borderColor: Colors.white,
    },
    moveRight: {
      marginLeft: 'auto',
    },
    moveLeft: {
      marginRight: 'auto',
    }
    
});