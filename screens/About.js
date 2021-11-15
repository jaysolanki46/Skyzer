import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Colors from '../config/Colors';
import whoWeAre from "../assets/images/about/who-we-are.png";
import values from "../assets/images/about/value-s.png";
import Headertext from '../config/Headertext';
import { LinearGradient } from 'expo-linear-gradient';
import AboutBanner from '../assets/images/about/about-banner.png';
import facebookImage from '../assets/images/social/facebook.png';
import linkedinImage from '../assets/images/social/linkedin.png';
import instagramImage from '../assets/images/social/instagram.png';
import TopStatusBar from '../components/TopStatusBar';

export default About = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container} behavior="height">
            <TopStatusBar />
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
              
                <View style={styles.header}>
                    <View style={styles.headerBox}>
                        <Image
                            style={styles.headerImage}
                        source={AboutBanner}
                        />
                    </View>
                </View>

                <View style={styles.body}>
                <View style={{ flex: 1,}}>
                    <View style={styles.bodyBox}>
                        <View style={styles.bodyBox}>
                            
                            <TouchableOpacity style={{flex: 1,}} onPress={() => navigation.navigate('WhoWeAre')}>
                                    <LinearGradient colors={[Colors.block6Color1of3, Colors.block6Color2of3, Colors.block6Color3of3]} style={{
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
                                    <LinearGradient colors={[Colors.block6Color1of3, Colors.block6Color2of3, Colors.block6Color3of3]}
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
                            <Text style={[Headertext.h4, { textDecorationLine: 'underline',  }]}>
                                ADDRESS
                            </Text>
                            <View style={{ marginTop: 10,}}>
                                <Text style={[Headertext.h4, {fontWeight: '500'}]}>
                                    269 Mount Smart Road,
                                </Text>
                                <Text style={[Headertext.h4, { fontWeight: '500', marginTop: 5 }]}>
                                    Onehunga, Auckland 1061
                                </Text>
                                <Text style={[Headertext.h4, { fontWeight: '500', marginTop: 5 }]}>
                                    New Zealand
                                </Text>
                            </View>

                            <View style={{ marginTop: 20,}}>
                                <Text style={[Headertext.h4, { textDecorationLine: 'underline',  }]}>
                                    FOLLOW US:
                                </Text>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/skyzernz/")} style={styles.socialButton}><Image style={styles.socialLogo} source={facebookImage} /></TouchableOpacity>
                                    <TouchableOpacity onPress={() => Linking.openURL("https://www.linkedin.com/company/skyzer-technologies-nz?originalSubdomain=nz")} style={styles.socialButton}><Image style={styles.socialLogo} source={linkedinImage} /></TouchableOpacity>
                                    <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/skyzer.technologies/")} style={styles.socialButton}><Image style={styles.socialLogo} source={instagramImage} /></TouchableOpacity>
                                </View>
                            </View>
                    </View>
                </View>
                </View>
        </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor1of3
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
        color: Colors.fontWhite,
    },
    socialButton: {
        marginRight: 15,
        borderRadius: 25,
    },
    socialLogo: {
        width: 40,
        height: 40,
        resizeMode: 'stretch'
    },
});