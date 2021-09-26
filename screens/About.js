import React from 'react';
import { StyleSheet, Platform, StatusBar, SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Colors from '../config/Colors';
import whoWeAre from "../assets/images/about/who-we-are.png";
import values from "../assets/images/about/value-s.png";
import Headertext from '../config/Headertext';
import { LinearGradient } from 'expo-linear-gradient';
import aboutBanner from '../assets/images/about-banner.png';
import facebook from '../assets/images/facebook.png';
import linkedin from '../assets/images/linkedin.png';
import instagram from '../assets/images/instagram.png';

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

                    <View style={{ width: '100%', height: 400,  margin: 10, marginBottom: 30}}>
                            <Text style={[Headertext.h4, { color: Colors.fontColorBluest, textDecorationLine: 'underline',  }]}>
                                ADDRESS
                            </Text>
                            <View style={{ marginTop: 10,}}>
                                <Text style={[Headertext.h4, {color: Colors.fontColorLightBlack, fontWeight: '500'}]}>
                                    269 Mount Smart Road,
                                </Text>
                                <Text style={[Headertext.h4, { color: Colors.fontColorLightBlack, fontWeight: '500', marginTop: 5 }]}>
                                    Onehunga, Auckland 1061
                                </Text>
                                <Text style={[Headertext.h4, { color: Colors.fontColorLightBlack, fontWeight: '500', marginTop: 5 }]}>
                                    New Zealand
                                </Text>
                            </View>

                            <View style={{ marginTop: 20,}}>
                                <Text style={[Headertext.h4, { color: Colors.fontColorBluest, textDecorationLine: 'underline',  }]}>
                                    FOLLOW US:
                                </Text>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/skyzernz/")} style={styles.social_button}><Image style={styles.social_logo} source={facebook} /></TouchableOpacity>
                                    <TouchableOpacity onPress={() => Linking.openURL("https://www.linkedin.com/company/skyzer-technologies-nz?originalSubdomain=nz")} style={styles.social_button}><Image style={styles.social_logo} source={linkedin} /></TouchableOpacity>
                                    <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/skyzer.technologies/")} style={styles.social_button}><Image style={styles.social_logo} source={instagram} /></TouchableOpacity>
                                </View>
                            </View>
                    </View>
                </ScrollView>
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
    social_button: {
        marginRight: 15,
        borderRadius: 25,
    },
    social_logo: {
        width: 40,
        height: 40,
        resizeMode: 'stretch'
    },
});