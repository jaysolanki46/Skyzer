import React from 'react';
import { ImageBackground, StyleSheet, Platform, Dimensions, StatusBar, SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../config/Colors';
import whoWeAre from "../assets/images/about/who-we-are.png";
import values from "../assets/images/about/value-s.png";
import location from "../assets/images/about/location.png";
import socialHandles from "../assets/images/about/social-handles.png";
import Headertext from '../config/Headertext';
import { LinearGradient } from 'expo-linear-gradient';
import backgroundImage from "../assets/images/background-main.jpg";
import aboutBanner from '../assets/images/about-banner.png';

export default About = ({ navigation }) => {

    return (

        <SafeAreaView style={styles.container} behavior="height">
            {Platform.OS === 'ios' && <>
                <StatusBar barStyle="dark-content" hidden={false} translucent={true}></StatusBar>
            </>}

                <View style={styles.header}>
                    <View style={styles.headerBox}>
                        <Image
                            style={styles.headerImage}
                            source={aboutBanner}
                        />
                    </View>
                </View>

                <View style={styles.body}>
                <ImageBackground source={backgroundImage} style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.45)',
                    width: Dimensions.get("window").width,
                    height: Dimensions.get("window").height
                }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1,}}>
                    <View style={styles.bodyBox}>
                        <View style={styles.bodyBox}>
                            
                            <TouchableOpacity style={{flex: 1,}} onPress={() => navigation.navigate('WhoWeAre')}>
                            <LinearGradient colors={[Colors.colorType4_1, Colors.colorType4_2, Colors.colorType4_3]} style={{
                                flex: 1,
                                borderRadius: 10,
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 30,
                                
                            }}>
                                <View style={styles.boxImage}>
                                    <Image style={styles.image} source={whoWeAre} />
                                </View>
                                <View style={styles.boxText}>
                                    <Text style={Headertext.h5, styles.text}>
                                        WHO WE ARE
                                    </Text>
                                </View>
                            </LinearGradient>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.bodyBox}>
                            
                             <TouchableOpacity style={{flex: 1,}} onPress={() => navigation.navigate('Values')}>
                             <LinearGradient colors={[Colors.colorType4_1, Colors.colorType4_2, Colors.colorType4_3]}
                              style={{
                                flex: 1,
                                borderRadius: 10,
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 30,
                                
                            }}>
                                <View style={styles.boxImage}>
                                    <Image style={styles.image} source={values} />
                                </View>
                                <View style={styles.boxText}>
                                    <Text style={Headertext.h5, styles.text}>
                                        VALUES 
                                    </Text>
                                </View>
                            </LinearGradient>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={styles.bodyBox}>
                        <View style={styles.bodyBox}>
                            
                            <TouchableOpacity style={{flex: 1,}} onPress={() => navigation.navigate('Location')}>
                            <LinearGradient colors={[Colors.colorType4_1, Colors.colorType4_2, Colors.colorType4_3]} style={{
                                flex: 1,
                                borderRadius: 10,
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 30,
                                
                            }}>
                                <View style={styles.boxImage}>
                                    <Image style={styles.image} source={location} />
                                </View>
                                <View style={styles.boxText}>
                                    <Text style={Headertext.h5, styles.text}>
                                        LOCATION
                                    </Text>
                                </View>
                            </LinearGradient>
                            </TouchableOpacity>

                        </View>

                        <View style={styles.bodyBox}>

                            <TouchableOpacity style={{ flex: 1, }} onPress={() => navigation.navigate('SocialHandles')}>
                            <LinearGradient colors={[Colors.colorType4_1, Colors.colorType4_2, Colors.colorType4_3]} style={{
                                flex: 1,
                                borderRadius: 10,
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 30,

                            }}>
                                <View style={styles.boxImage}>
                                    <Image style={styles.image} source={socialHandles} />
                                </View>
                                <View style={styles.boxText}>
                                    <Text style={Headertext.h5, styles.text}>
                                        SOCIAL HANDLES
                                    </Text>
                                </View>
                            </LinearGradient>
                            </TouchableOpacity>

                        </View>
                    </View>

                    
                    
                </ScrollView>
                </ImageBackground>
                </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
    },
    header: {
        flex: 2,
        padding: 10,
    },
    headerBox: {
        flex: 1,
        margin: 10,
    },
    headerImage: {
        width: 360,
        height: 200,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    bodyBox: {
        flex: 3, 
        flexDirection: 'row', 
    },
    body: {
        flex: 4,
        paddingTop: 20,
    },
    boxImage: {
        flex: 3.5, 
        justifyContent: 'center',
        alignItems: 'center', 
        padding: 10,
    },
    boxText: {
        flex: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        
        padding: 10,
    },
    image: {
        width: 120,
        height: 120,
    },
    text: {
        fontWeight: 'bold', 
        color: Colors.fontColorWhite,
    },

});