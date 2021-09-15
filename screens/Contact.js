import React from 'react';
import { StyleSheet, Platform, StatusBar, SafeAreaView, Text, View, Image } from 'react-native';
import Colors from '../config/Colors';
import contactImage from '../assets/images/contact.png';
import phone from '../assets/images/contact-phone.png';
import email from '../assets/images/contact-email.png';
import Headertext from '../config/Headertext';

export default Contact = ({ navigation }) => {

    return (

        <SafeAreaView style={styles.container} behavior="height">
            {Platform.OS === 'ios' && <>
                <StatusBar barStyle="dark-content" hidden={false} translucent={true}></StatusBar>
            </>}
           <View style={styles.header}>
                <View style={styles.headerImage}>
                    <Image
                        style={styles.image}
                        source={contactImage}
                    />
                </View>
           </View>

            <View style={styles.body}>
                <View style={styles.bodyEmail}>
                    <View style={styles.cardEmail}>
                        <Text style={{ color: Colors.fontColorWhite, fontWeight: 'bold', fontSize: 17, marginLeft: 'auto', margin: 10}}>
                            support@skyzer.co.nz
                        </Text>
                        <Image
                            style={{width: 50, height: 50, marginLeft: 'auto', marginRight: 20}}
                            source={email}
                        />
                    </View>
                </View>
                <View style={styles.bodyPhone}>
                    <View style={styles.cardPhone}>
                        <Image
                            style={{ width: 40, height: 40, marginRight: 'auto', marginLeft: 20}}
                            source={phone}
                        />
                        <Text style={{ color: Colors.fontColorWhite, fontWeight: 'bold', fontSize: 17, marginRight: 'auto', margin: 10 }}>
                            0800 252 252
                        </Text>
                    </View>
                </View>
            </View>
            
            <View style={styles.footer}>
                <View style={{borderBottomWidth: 1, borderBottomColor: Colors.seperator, 
                    borderBottomRightRadius: 10, borderBottomLeftRadius: 10,}}>
                    <Text style={Headertext.h4}>
                        OPERATING HOURS
                    </Text>
                </View>
                <Text style={{fontSize: 17, fontWeight: 'bold', color: Colors.fontColorLightBlack}}>
                    MON - FRI
                </Text>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: Colors.fontColorLightBlack }}>
                    8:00 AM - 5:00 PM
                </Text>
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
    headerImage: {
        flex: 1,
        margin: 10,
    },  
    image: {
        width: 360,
        height: 200,
        resizeMode: 'contain',
        borderRadius: 10,
    },  
    body: {
        flex: 3,
    },
    bodyEmail: {
        flex: 3,
    },
    cardEmail: {
        height: 70,
        backgroundColor: Colors.contactCardColor,
        marginTop: 50,
        marginBottom: 50,
        marginRight: 100,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bodyPhone: {
        flex: 3,
    },
    cardPhone: {
        height: 70,
        backgroundColor: Colors.contactCardColor,
        marginBottom: 100,
        marginLeft: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.contactCardColor,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
        borderRadius: 10,
    },
});