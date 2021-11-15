import React, {  } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Colors from '../config/Colors';
import MoreBanner from '../assets/images/more/more-banner.png';
import Constants from 'expo-constants';
import CopyrightImage from '../assets/images/more/copyright.png';
import VersionImage from '../assets/images/more/version.png';
import TopStatusBar from '../components/TopStatusBar';

export default More = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <TopStatusBar />
            
            <View style={styles.header}>
                <View style={styles.headerBox}>
                    <Image
                        style={styles.headerImage}
                        source={MoreBanner}
                    />
                </View>
            </View>

            <View style={styles.body}>
                <View style={{borderWidth: .5, borderColor: Colors.white}}/>
                <TouchableOpacity onPress={() => { navigation.navigate('Terms') }}>
                    <Text style={[{ fontSize: 17, marginTop: 10, marginBottom: 10, fontWeight: '500', color: Colors.fontWhite}]}>
                        Terms & Privacy Policy
                    </Text>
                </TouchableOpacity>

                <View style={{ borderWidth: .5, borderColor: Colors.white }} />
                <TouchableOpacity onPress={() => { navigation.navigate('Credits') }}>
                    <Text style={[{ fontSize: 17, marginTop: 10, marginBottom: 10, fontWeight: '500', color: Colors.fontWhite }]}>
                        Credits
                    </Text>
                </TouchableOpacity>

                <View style={{ borderWidth: .5, borderColor: Colors.white }} />
                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                    <Image style={{ width: 12, height: 12, marginRight: 5 }}
                        source={CopyrightImage} />
                    <Text style={[{
                        fontSize: 12, marginTop: 5, marginBottom: 5, fontWeight: '500',
                        color: Colors.fontWhite, 
                    }]}>
                         {new Date().getFullYear()} Skyzer Technologies
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Image style={{ width: 12, height: 12, marginRight: 5 }}
                        source={VersionImage} />
                    <Text style={[{
                        fontSize: 12, marginTop: 5, marginBottom: 5, fontWeight: '500',
                        color: Colors.fontWhite,
                    }]}>
                        Version {Constants.manifest.version}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor1of3,
    },
    header: {
        flex: 3,
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
    body: {
        flex: 3,
        paddingTop: Platform.OS != 'ios' ? 40 : 20,
        marginLeft: 10,
        marginRight: 10,
    },
});