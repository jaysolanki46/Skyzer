import React, {  } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking,} from 'react-native';
import Colors from '../config/Colors';
import Headertext from '../config/Headertext';
import bodyImage from "../assets/images/startup_body.png";
import facebookImage from '../assets/images/social/facebook.png';
import linkedinImage from '../assets/images/social/linkedin.png';
import instagramImage from '../assets/images/social/instagram.png';
import TopStatusBar from '../components/TopStatusBar';
import { LinearGradient } from 'expo-linear-gradient';

export default StartUp = ({navigation}) => {
    
    return (
      <View style={styles.container}>
        <TopStatusBar />
        <LinearGradient colors={[Colors.backgroundColor1of3, Colors.backgroundColor2of3, Colors.backgroundColor3of3]} style={{
            borderRadius: 10,
            flex: 1,
          }}>
        <View style={styles.header}>
          {/* <Logo/> */}
          <Text style={[Headertext.h1, {color: Colors.fontWhite}]}>Welcome to</Text>
          <Text style={[Headertext.h1, { color: Colors.fontWhite}]}>SKYZER GUIDE</Text>
            {/* <Text style={[Headertext.h5, {color: Colors.fontColorLightBlack, fontWeight: '600'}]}>Let you explore the terminal</Text> */}
        </View>
  
        <View style={styles.body}>
            <Image style={styles.signupBodyImage} source={bodyImage} />
        </View>
  
        <View style={styles.signupBody}>
            <TouchableOpacity onPress={() => navigation.navigate('LogIn')} >
            <LinearGradient colors={[Colors.white, Colors.white]} style={styles.loginButton}>
              <Text style={[Headertext.h3, {color: Colors.fontBlack}]}>Log In</Text>
            </LinearGradient>
            </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Text style={Headertext.h5}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={[{ color: Colors.fontWhite, marginLeft: 5, fontWeight: 'bold',}]}>Sign Up</Text></TouchableOpacity>
          </View>
        </View>
  
        <View style={styles.footer}>
          <Text style={[Headertext.h5, ]}>Follow Us:</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => { Linking.openURL(`https://www.facebook.com/skyzernz/`) }} style={styles.socialButton}><Image style={styles.socialLogo} source={facebookImage} /></TouchableOpacity>
              <TouchableOpacity onPress={() => { Linking.openURL(`https://www.linkedin.com/company/skyzer-technologies-nz/mycompany/`) }} style={styles.socialButton}><Image style={styles.socialLogo} source={linkedinImage} /></TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/skyzer.technologies/")} style={styles.socialButton}><Image style={styles.socialLogo} source={instagramImage} /></TouchableOpacity>
            </View>
        </View>
        </LinearGradient>
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
      signupBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      footer: {
        flex: 1.5,
        alignItems: 'center',
      },
      loginButton: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
      },
      socialButton: {
        margin: 5,
        borderRadius: 25,
      },
      signupBodyImage: {
        flex:1,
        resizeMode: 'contain'
      },
      socialLogo: {
        width: 40,
        height: 40,
        resizeMode: 'stretch'
      },
  });
  