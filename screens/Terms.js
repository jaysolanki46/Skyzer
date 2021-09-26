import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, StatusBar, Button, Image, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView, Dimensions, Alert, ScrollView } from 'react-native';
import Colors from '../config/Colors';
import Headertext from '../config/Headertext';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../components/AuthContext';
import Configurations from '../config/Configurations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultImageUrl from '../assets/images/profile.png';
import moreBanner from '../assets/images/more-banner.png';
import Constants from 'expo-constants';
import copyright from '../assets/images/copyright.png';

export default Terms = () => {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" hidden={false} translucent={true}></StatusBar>
            <ScrollView style={styles.body}>
                <Text style={[Headertext.h3, { color: Colors.fontColorBlack }]}>Terms & Privacy Policy</Text>
                <Text style={Headertext.h5, styles.paraText}>
                    Your privacy is important to us. It is Skyzer's policy to respect your privacy and comply with any applicable law and regulation regarding any personal information we may collect about you, including across our application.
                </Text>
                <Text style={Headertext.h5, styles.paraText}>
                    This policy is effective as of 24 September 2021 and was last updated on 24 September 2021.
                </Text>

                <Text style={[Headertext.h4, { color: Colors.fontColorBlack, marginTop: 20 }]}>Information We Collect</Text>
                <Text style={Headertext.h5, styles.paraText}>
                    Information we collect includes both information you knowingly and actively provide us when using or participating in any of our services and promotions, and any information automatically sent by your devices in the course of accessing our products and services.
                </Text>

                <Text style={[Headertext.h4, { color: Colors.fontColorBlack, marginTop: 20 }]}>Log Data</Text>
                <Text style={Headertext.h5, styles.paraText}>
                    Please be aware that while this information may not be personally identifying by itself, it may be possible to combine it with other data to personally identify individual persons.
                </Text>
                
                <Text style={[Headertext.h4, { color: Colors.fontColorBlack, marginTop: 20 }]}>Personal Information</Text>
                <Text style={Headertext.h5, styles.paraText}>
                    We may ask for personal information which may include one or more of the Name and Email.
                </Text>

                <Text style={[Headertext.h4, { color: Colors.fontColorBlack, marginTop: 20 }]}>Legitimate Reasons for Processing Your Personal Information</Text>
                <Text style={Headertext.h5, styles.paraText}>
                    We only collect and use your personal information when we have a legitimate reason for doing so. In which instance, we only collect personal information that is reasonably necessary to provide our services to you.
                </Text>
                
                <Text style={[Headertext.h4, { color: Colors.fontColorBlack, marginTop: 20 }]}>Collection and Use of Information</Text>
                <Text style={Headertext.h5, styles.paraText}>
                    We may collect, hold, use, and disclose information for the following purposes, and personal information will not be further processed in a manner that is incompatible with these purposes:
                </Text>
                <Text style={Headertext.h5, styles.paraText}>
                    We may collect, hold, use, and disclose information for the following purposes, and personal information will not be further processed in a manner that is incompatible with these purposes:
                </Text>
                <Text style={Headertext.h5, styles.paraText}>
                    {'\u2B24'} To contact and communicate with you
                </Text>
                <Text style={Headertext.h5, styles.paraText}>
                    {'\u2B24'} For analytics, market research, and business development, including to operate and improve associated application
                </Text>
                <Text style={Headertext.h5, styles.paraText}>
                    {'\u2B24'} For internal record keeping and administrative purposes
                </Text>

                <Text style={[Headertext.h4, { color: Colors.fontColorBlack, marginTop: 20 }]}>Personal Information</Text>
                <Text style={Headertext.h5, styles.paraText}>
                    We may ask for personal information which may include one or more of the Name and Email.
                </Text>

                <Text style={[Headertext.h4, { color: Colors.fontColorBlack, marginTop: 20 }]}>Security of Your Personal Information</Text>
                <Text style={Headertext.h5, styles.paraText}>
                    When we collect and process personal information, and while we retain this information, we will protect it within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification.
                </Text>
                <Text style={Headertext.h5, styles.paraText}>
                    Although we will do our best to protect the personal information you provide to us, we advise that no method of electronic transmission or storage is 100% secure, and no one can guarantee absolute data security. We will comply with laws applicable to us in respect of any data breach.
                </Text>
                <Text style={Headertext.h5, styles.paraText}>
                    You are responsible for selecting any password and its overall security strength, ensuring the security of your own information within the bounds of our services.
                </Text>

                <Text style={[Headertext.h4, { color: Colors.fontColorBlack, marginTop: 20 }]}>How Long We Keep Your Personal Information</Text>
                <Text style={Headertext.h5, styles.paraText}>
                    We keep your personal information only for as long as we need to. This time period may depend on what we are using your information for, in accordance with this privacy policy. If your personal information is no longer required, we will delete it or make it anonymous by removing all details that identify you.
                </Text>
                <Text style={Headertext.h5, styles.paraText}>
                    However, if necessary, we may retain your personal information for our compliance with a legal, accounting, or reporting obligation or for archiving purposes in the public interest, or statistical purposes.
                </Text>

                <Text style={[Headertext.h4, { color: Colors.fontColorBlack, marginTop: 20 }]}>Children’s Privacy</Text>
                <Text style={Headertext.h5, styles.paraText}>
                    We do not aim any of our products or services directly at children under the age of 13, and we do not knowingly collect personal information about children under 13.
                </Text>

                <Text style={[Headertext.h4, { color: Colors.fontColorBlack, marginTop: 20 }]}>Your Rights and Controlling Your Personal Information</Text>
                <Text style={Headertext.h5, styles.paraText}>
                    You always retain the right to withhold personal information from us, with the understanding that your experience of our app may be affected. We will not discriminate against you for exercising any of your rights over your personal information. If you do provide us with personal information you understand that we will collect, hold, use and disclose it in accordance with this privacy policy. You retain the right to request details of any personal information we hold about you.
                </Text>
                <Text style={Headertext.h5, styles.paraText}>
                    If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time. We will provide you with the ability to unsubscribe from our email-database or opt out of communications. Please be aware we may need to request specific information from you to help us confirm your identity.
                </Text>
                <Text style={Headertext.h5, styles.paraText}>
                    If you believe that any information we hold about you is inaccurate, out of date, incomplete, irrelevant, or misleading, please contact us using the details provided in this privacy policy. We will take reasonable steps to correct any information found to be inaccurate, incomplete, misleading, or out of date.
                </Text>
                <Text style={Headertext.h5, styles.paraText}>
                    If you believe that we have breached a relevant data protection law and wish to make a complaint, please contact us using the details below and provide us with full details of the alleged breach. We will promptly investigate your complaint and respond to you, in writing, setting out the outcome of our investigation and the steps we will take to deal with your complaint. You also have the right to contact a regulatory body or data protection authority in relation to your complaint.
                </Text>

                <Text style={[Headertext.h4, { color: Colors.fontColorBlack, marginTop: 20 }]}>Changes to This Policy</Text>
                <Text style={Headertext.h5, styles.paraText}>
                    At our discretion, we may change our privacy policy to reflect updates to our business processes, current acceptable practices, or legislative or regulatory changes. If we decide to change this privacy policy, we will post the changes here at the same link by which you are accessing this terms & privacy policy.
                </Text>
                <Text style={Headertext.h5, styles.paraText}>
                    If required by law, we will get your permission or give you the opportunity to opt in to or opt out of, as applicable, any new uses of your personal information.
                </Text>

                <Text style={[Headertext.h4, { color: Colors.fontColorBlack, marginTop: 20 }]}>Contact Us</Text>
                <Text style={Headertext.h5, styles.paraText}>
                    For any questions or concerns regarding your privacy, you may contact us using the following details:
                </Text>
                <Text style={Headertext.h5, styles.paraText}>
                    Support: 
                    support@skyzer.co.nz
                </Text>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : 20,
        backgroundColor: Colors.bodyColor,
    },
    body: {
        margin: 10,
        paddingBottom: 10
    },
    paraText: {
        color: Colors.fontColorBlack, 
        textAlign: 'justify', 
        marginTop: 10,
        alignItems: 'center',
    }
});