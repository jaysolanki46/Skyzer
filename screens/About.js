import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Colors from '../config/Colors';
import whoWeAre from "../assets/images/about/who-we-are.png";
import values from "../assets/images/about/value-s.png";
import Headertext from '../config/Headertext';
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
                        <Text style={[Headertext.h5, { textAlign: 'justify', marginTop: 10 }]} >
                            <Text style={{ fontWeight: 'bold' }}>Skyzer Technologies</Text> specialise in the provision of Eftpos payments solutions for the New Zealand market.
                        </Text>
                        <Text style={[Headertext.h5, { textAlign: 'justify', marginTop: 10 }]} >
                            As the distributor of the Ingenico range of EFTPOS hardware, Skyzer prides itself on bringing best of breed payment solutions to our customers.
                        </Text>
                        <Text style={[Headertext.h5, { textAlign: 'justify', marginTop: 10 }]} >
                            Skyzer's payment systems enable commerce in a wide range of industries - from nationwide fashion retailers, fast food chains and supermarket giants, to taxi fleets, cafes and tradespeople.
                        </Text>
                        <Text style={[Headertext.h5, { textAlign: 'justify', marginTop: 10 }]} >
                            Operating through a strong dealer network across New Zealand, Skyzer Technologies is the country's leading distributor of Payments solutions.
                        </Text>
                    </View>
                </View>

                <View style={styles.body}>
                <View style={{ flex: 1,}}>
                    <View style={styles.bodyBox}>
                        <View style={styles.bodyBox}>
                            
                            <TouchableOpacity style={{flex: 1,}} onPress={() => navigation.navigate('WhoWeAre')}>
                            <View style={{
                                flex: 1,
                                borderRadius: 10,
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 30,
                                backgroundColor: Colors.modelColor
                            }}>
                                <View style={styles.boxImage}>
                                    <Image style={styles.image} source={whoWeAre} />
                                </View>
                                <View style={styles.boxText}>
                                    <Text style={Headertext.h5, styles.text}>
                                        WHO WE ARE
                                    </Text>
                                </View>
                            </View>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.bodyBox}>
                            
                             <TouchableOpacity style={{flex: 1,}} onPress={() => navigation.navigate('Values')}>
                            <View 
                              style={{
                                flex: 1,
                                borderRadius: 10,
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 30,
                                backgroundColor: Colors.modelColor
                            }}>
                                <View style={styles.boxImage}>
                                    <Image style={styles.image} source={values} />
                                </View>
                                <View style={styles.boxText}>
                                    <Text style={Headertext.h5, styles.text}>
                                        VALUES 
                                    </Text>
                                </View>
                            </View>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={{ width: '100%', height: 400,  margin: 10, marginBottom: 30}}>
                            <Text style={[Headertext.h4, { textDecorationLine: 'underline',  }]}>
                                ADDRESS
                            </Text>
                            <View style={{ marginTop: 10,}}>
                                <Text style={[Headertext.h5, {fontWeight: '500'}]}>
                                    269 Mount Smart Road,
                                </Text>
                                <Text style={[Headertext.h5, { fontWeight: '500', marginTop: 5 }]}>
                                    Onehunga, Auckland 1061
                                </Text>
                                <Text style={[Headertext.h5, { fontWeight: '500', marginTop: 5 }]}>
                                    New Zealand
                                </Text>
                            </View>

                            <View style={{ marginTop: 20,}}>
                                <Text style={[Headertext.h4, { textDecorationLine: 'underline',  }]}>
                                    FOLLOW US
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
    bodyBox: {
        flex: 3, 
        flexDirection: 'row', 
    },
    body: {
        flex: 4,
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