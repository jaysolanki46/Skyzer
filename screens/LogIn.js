import React, { useState } from 'react';
import Colors from '../config/Colors';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions, TextInput, Alert} from 'react-native';
import Headertext from '../config/Headertext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../components/AuthContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import rightArrowImage from '../assets/images/right-arrow.png';
import TopStatusBar from '../components/TopStatusBar';
import { LinearGradient } from 'expo-linear-gradient';

export default LogIn = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const  { logIn } = React.useContext(AuthContext);
  
  const logInHandle = (email, password) => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (email === null || email === "" ||
      password === null || password === "") {
      Alert.alert("Error", "Email and password are required");

    } else if (reg.test(email) === false) {
      Alert.alert("Error", "Invalid email");

    } else {
      logIn(email, password);
    }
  }

  return (
    
    <View style={styles.container} behavior="height">
      <TopStatusBar />
      <LinearGradient colors={[Colors.backgroundColor1of3, Colors.backgroundColor2of3, Colors.backgroundColor3of3]} style={{
        flex: 1,}}>
        <View style={styles.header}>
          {/* <Logo/> */}
          <Text style={[Headertext.h1, {color: Colors.fontWhite}]}>SKYZER GUIDE</Text>
        </View>

        <View style={styles.body}>
          <LinearGradient colors={[Colors.modelColor, Colors.modelColor, Colors.modelColor]} style={styles.bodyForm} >
          <View showsVerticalScrollIndicator={false}>
            <View style={{ justifyContent: 'center', alignItems: 'center',}}>
              <Text style={styles.bodyFormHeader}> Welcome Back </Text>
            </View>
            {
              Platform.OS === 'ios' ?
                <View>
                  <TextInput selectionColor={Colors.white} style={styles.input} placeholder="Email" placeholderTextColor={Colors.fontWhite} keyboardType="default" onChangeText={(Email) => setEmail(Email)} />
                  <View style={[{ flexDirection: 'row', alignItems: 'center', }]}>
                    <TextInput selectionColor={Colors.white} style={styles.input} placeholder="Password"
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
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={[styles.button]} onPress={() => { logInHandle(email, password) }}>
                      <Text style={[Headertext.h4, { marginRight: 15, color: Colors.fontWhite }]}>Log In</Text>
                    </TouchableOpacity>
                    <Image style={[styles.icon]} source={rightArrowImage} />
                  </View>
                </View>
                :
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}
                  enableOnAndroid={true}
                  style={{ flexGrow: 1 }}
                >
                  <View style={{ height: 300 }}>
                    <View>
                      <TextInput style={styles.input} placeholder="Email" placeholderTextColor={Colors.fontWhite} keyboardType="default" onChangeText={(Email) => setEmail(Email)} />
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
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={[styles.button]} onPress={() => { logInHandle(email, password) }}>
                          <Text style={[Headertext.h4, { marginRight: 15, color: Colors.fontWhite }]}>Log In</Text>
                        </TouchableOpacity>
                        <Image style={[styles.icon]} source={rightArrowImage} />
                      </View>
                    </View>
                  </View>
                </KeyboardAwareScrollView>
            }
            <View style={{ marginTop: 10, marginBottom: 10, width: Dimensions.get('window').width - 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
              <TouchableOpacity style={[styles.navButton]} onPress={() => navigation.navigate('SignUp')}>
                <Text style={[Headertext.h5, { color: Colors.fontBlack, fontWeight: '700' }]}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navButton, { marginLeft: 'auto', }]} onPress={() => navigation.navigate('ForgetPassword')}>
                <Text style={[Headertext.h5, { color: Colors.fontBlack, fontWeight: '700' }]}>Forget Password</Text>
              </TouchableOpacity>
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
      height: 350,
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
      borderRadius: 5,
      backgroundColor: Colors.white,
    },
});