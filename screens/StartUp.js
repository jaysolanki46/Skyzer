import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions, ScrollView, Alert,} from 'react-native';
import Colors from '../config/Colors';
import { StatusBar } from 'react-native';
import Modal from 'react-native-modal';
import Logo from '../components/Logo';
import Headertext from '../config/Headertext';

export default StartUp = ({navigation}) => {
    
  const [modelSignUpVisible, setModelSignUpVisible] = useState(false);

    return (
      <View style={styles.container}>
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
              <TouchableOpacity style={[styles.button, {flex: .2, marginRight: 20,marginLeft: 'auto', alignSelf: 'center', textAlign: 'center'}]} onPress={() => setModelSignUpVisible(false)}>
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
          <Image style={styles.signup_body_image} source={require('../assets/images/startup_body.png')} />
        </View>
  
        <View style={styles.signup_body}>
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')} style={styles.login_button}><Text style={[Headertext.h3, {color: Colors.buttonFont}]}>Log In</Text></TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Text style={Headertext.h5}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => setModelSignUpVisible(true)}><Text style={[styles.h5, {color: Colors.link, marginLeft: 5, fontWeight: '500'}]}>Sign Up</Text></TouchableOpacity>
          </View>
        </View>
  
        <View style={styles.footer}>
          <Text style={[Headertext.h5, ]}>Follow Us:</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.social_button}><Image style={styles.social_logo} source={require('../assets/images/facebook.png')} /></TouchableOpacity>
              <TouchableOpacity style={styles.social_button}><Image style={styles.social_logo} source={require('../assets/images/linkedin.png')} /></TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios'? 10 : 60,
        paddingBottom: 10,
        backgroundColor: Colors.bodyColor,
      },
      header: {
        flex: 1.5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20,
      },
      body: {
        flex: 2.5,
        alignItems: 'center',
        margin: 10,
      },
      signup_body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      footer: {
        flex: 1,
        alignItems: 'center',
      },
      login_button: {
        backgroundColor: Colors.buttonBody,
        paddingLeft: 120,
        paddingRight: 120,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
      },
      social_button: {
        margin: 5,
        borderRadius: 25,
      },
      logo: {
        width: 120,
        height: 50,
        resizeMode: 'stretch'
      },
      signup_body_image: {
        flex:1,
        resizeMode: 'contain'
      },
      social_logo: {
        width: 50,
        height: 50,
        resizeMode: 'stretch'
      },
      modelContainer: {
        flex: 1, 
        backgroundColor: Colors.bodyColor, 
        borderRadius: 25,
        borderWidth: 1,
      },
      modelHeader: {
        flexDirection: 'row', 
        padding: 10,
        marginLeft: 5,
        backgroundColor: Colors.bodyColor,
        borderRadius: 25,
      },
      iconClose: {
        width: 15,
        height: 15,
        resizeMode: 'stretch'
      },
  });
  