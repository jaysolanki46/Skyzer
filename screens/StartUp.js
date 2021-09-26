import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions, ScrollView, Alert, Linking,} from 'react-native';
import Colors from '../config/Colors';
import { StatusBar } from 'react-native';
import Modal from 'react-native-modal';
import Logo from '../components/Logo';
import Headertext from '../config/Headertext';
import backgroundImage from "../assets/images/background.jpg";
import bodyImage from "../assets/images/startup_body.png";
import facebook from '../assets/images/facebook.png';
import linkedin from '../assets/images/linkedin.png';
import instagram from '../assets/images/instagram.png';

export default StartUp = ({navigation}) => {
    
    return (
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} resizeMode="cover" style={{
                flex: 1,
                justifyContent: "center"}}>
        {Platform.OS === 'ios' && <>
        <StatusBar barStyle="dark-content" hidden = {false} translucent = {true}></StatusBar>
        </>}

        <View style={styles.header}>
          {/* <Logo/> */}
          <Text style={[Headertext.h1, {color: Colors.fontColorBluest}]}>Welcome to</Text>
          <Text style={[Headertext.h1, {color: Colors.fontColorPurplest}]}>Skyzer Guide</Text>
          <Text style={[Headertext.h5, {color: Colors.fontColorLightBlack, fontWeight: '600'}]}>Let you explore the terminal</Text>
        </View>
  
        <View style={styles.body}>
            <Image style={styles.signup_body_image} source={bodyImage} />
        </View>
  
        <View style={styles.signup_body}>
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')} style={styles.login_button}><Text style={[Headertext.h3, {color: Colors.buttonFont}]}>Login</Text></TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Text style={Headertext.h5}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={[styles.h5, {color: Colors.fontColorBluest, marginLeft: 5, fontWeight: '500',}]}>Signup</Text></TouchableOpacity>
          </View>
        </View>
  
        <View style={styles.footer}>
          <Text style={[Headertext.h5, ]}>Follow Us:</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => { Linking.openURL(`https://www.facebook.com/skyzernz/`) }} style={styles.social_button}><Image style={styles.social_logo} source={facebook} /></TouchableOpacity>
              <TouchableOpacity onPress={() => { Linking.openURL(`https://www.linkedin.com/company/skyzer-technologies-nz/mycompany/`) }} style={styles.social_button}><Image style={styles.social_logo} source={linkedin} /></TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/skyzer.technologies/")} style={styles.social_button}><Image style={styles.social_logo} source={instagram} /></TouchableOpacity>
            </View>
        </View>
        </ImageBackground>
      </View>
    );
  }

  const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      header: {
        flex: 1.5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20,
      },
      body: {
        flex: 2,
        alignItems: 'center',
        margin: 10,
      },
      signup_body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      footer: {
        flex: 1.5,
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
        width: 40,
        height: 40,
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
  