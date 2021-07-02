import React from 'react';
import Colors from '../config/Colors';
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions, TextInput, SafeAreaView  } from 'react-native';
import Logo from '../components/Logo';
import { StatusBar } from 'react-native'
import WavyHeader from '../components/WavyHeader';

export default SignUp = () => {
  return (
    
    <SafeAreaView style={styles.container}>
       {Platform.OS === 'ios' && <>
       <StatusBar barStyle="dark-content" hidden = {false} translucent = {true}></StatusBar>
       </>}
        
        
        <View style={styles.header}>
          <Logo/>
          <Text style={styles.h1}>Welcome to</Text>
          <Text style={styles.h1}>Skyzer Guide</Text>
          <Text style={styles.h5}>Let you explore the terminal</Text>
        </View>

        <View style={styles.body}>
            <WavyHeader customStyles={styles.svgCurve} />
            <View style={styles.card}>
                {/* Fields  */}
            </View>
        </View>
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
      borderWidth: 1,
    },
    card: {
        backgroundColor: Colors.white, 
        flex: 1, 
        width: Dimensions.get('window').width - 70, 
        marginTop: 90,
        marginLeft: 70,
        marginRight: 70,
        marginBottom: 40,
        borderRadius: 30,  
        shadowOpacity: 0.2, 
        shadowRadius: 2, 
        elevation: 2
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