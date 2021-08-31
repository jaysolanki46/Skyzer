import React, { useState } from 'react';
import Colors from '../config/Colors';
import { Linking, Button, StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions, TextInput, KeyboardAvoidingView, StatusBar, ScrollView, LayoutAnimation, Alert } from 'react-native';
import Logo from '../components/Logo';
import Modal from 'react-native-modal';
import WavyHeader from '../components/WavyHeader';
import Headertext from '../config/Headertext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../components/AuthContext';


export default SignUp = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [account, setAccount] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { signUp } = React.useContext(AuthContext);

    const signInHandle = (username, email, password, account) => {
        signUp(username, password);
    }

    return (

        <KeyboardAvoidingView style={styles.container} behavior="height">
            <StatusBar barStyle="dark-content" hidden={false} translucent={true}></StatusBar>

            <View style={styles.header}>
                {/* <Logo/> */}
                <Text style={[Headertext.h1, { color: Colors.fontColorBluest }]}>Welcome to</Text>
                <Text style={[Headertext.h1, { color: Colors.fontColorPurplest }]}>Skyzer Guide</Text>
                <Text style={[Headertext.h5, { color: Colors.fontColorLightBlack, fontWeight: '600' }]}>Let you explore the terminal</Text>
            </View>

            <View style={styles.body}>
                <WavyHeader customStyles={styles.svgCurve} />
                <ScrollView style={styles.bodyForm} showsVerticalScrollIndicator={false}>
                    <View style={{ margin: 15 }}>
                        <Text style={styles.bodyFormHeader}> Create Account </Text>
                    </View>
                    <View style={styles.form}>
                       
                       <TextInput style={styles.input} placeholder="Username" 
                        placeholderTextColor={Colors.fontColorWhite} keyboardType="default" 
                        onChangeText={(Username) => setUsername(Username)} />

                        <TextInput style={styles.input} placeholder="Email"
                            placeholderTextColor={Colors.fontColorWhite} keyboardType="default"
                            onChangeText={(Username) => setUsername(Username)} />

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

                        <View style={[{ flexDirection: 'row', alignItems: 'center', }]}>
                            <TextInput style={styles.input} placeholder="Account i.e. 9999"
                                placeholderTextColor={Colors.fontColorWhite} keyboardType="default"
                                onChangeText={(Account) => setAccount(Account)} />
                            <MaterialCommunityIcons name="comment-question" size={24} style={{ marginLeft: -25 }}
                                color={Colors.white} />
                        </View>
                            
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 5, }}>
                            <TouchableOpacity style={[styles.navButton]} onPress={() => navigation.navigate('LogIn')}>
                                <Text style={[Headertext.h5, { color: Colors.fontColorWhite, fontWeight: '700' }]}>Already a member?</Text>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity style={[styles.button]} onPress={() => { signInHandle(username, email, password, account) }}>
                                    <Text style={[Headertext.h4, { marginRight: 15, color: Colors.buttonWhite }]}>Sign In</Text>
                                </TouchableOpacity>
                                <View>
                                    <Image style={[styles.icon]} source={require('../assets/images/right-arrow.png')} />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
        width: 300,
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
    form: {
        margin: 10,
    }
});