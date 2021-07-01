import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import Colors from '../config/Colors';

export default StartUp = () => {
    
    return (
      <View style={styles.container}>
  
        <View style={styles.header}>
          <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
          <Text style={styles.h1}>Welcome to</Text>
          <Text style={styles.h1}>Skyzer Guide</Text>
          <Text style={styles.h5}>Let you explore the terminal</Text>
        </View>
  
        <View style={styles.body}>
          <Image style={styles.signup_body_image} source={require('../assets/images/signup_body_image.png')} />
        </View>
  
        <View style={styles.signup_body}>
          <TouchableOpacity style={styles.login_button}><Text style={[styles.h3, {color: Colors.white}]}>Log In</Text></TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Text style={styles.h5}>Don't have an account?</Text><TouchableOpacity><Text style={[styles.h5, {color: Colors.link, marginLeft: 5}]}>Sign Up</Text></TouchableOpacity>
          </View>
        </View>
  
        <View style={styles.footer}>
          <Text style={[styles.h5, {color: Colors.lightFont}]}>Follow Us:</Text>
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
      },
      header: {
        flex: 1.5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20
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
      h5: {
        fontSize: 15,
        fontWeight: 'normal',
        color: Colors.lightFont
      },
      login_button: {
        backgroundColor: Colors.primary,
        paddingLeft: 120,
        paddingRight: 120,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 25,
      },
      social_button: {
        margin: 5,
        borderRadius: 25,
      },
    
      /** Images   */
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
      }
  });
  