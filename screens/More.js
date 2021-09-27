import React, {  } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Colors from '../config/Colors';
import MoreBanner from '../assets/images/more/more-banner.png';
import Constants from 'expo-constants';
import CopyrightImage from '../assets/images/more/copyright.png';

export default More = ({ navigation }) => {

   
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" hidden={false} translucent={true}></StatusBar>

            <View style={styles.header}>
                <View style={styles.headerBox}>
                    <Image
                        style={styles.headerImage}
                        source={MoreBanner}
                    />
                </View>
            </View>

            <View style={styles.body}>
                <View style={{borderWidth: .5, borderColor: Colors.grey}}/>
                <TouchableOpacity onPress={() => { navigation.navigate('Terms') }}>
                    <Text style={[{ fontSize: 17, marginTop: 10, marginBottom: 10, fontWeight: '500', color: Colors.link}]}>
                        Terms & Privacy Policy
                    </Text>
                </TouchableOpacity>

                <View style={{ borderWidth: .5, borderColor: Colors.grey }} />
                <TouchableOpacity onPress={() => { navigation.navigate('Credits') }}>
                    <Text style={[{ fontSize: 17, marginTop: 10, marginBottom: 10, fontWeight: '500', color: Colors.link }]}>
                        Credits
                    </Text>
                </TouchableOpacity>

                <View style={{ borderWidth: .5, borderColor: Colors.grey }} />
                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                    <Image style={{ width: 12, height: 12, marginRight: 5 }}
                        source={CopyrightImage} />
                    <Text style={[{
                        fontSize: 12, marginTop: 5, marginBottom: 5, fontWeight: '500',
                        color: Colors.fontColorLightBlack, 
                    }]}>
                         {new Date().getFullYear()} Skyzer Technologies
                    </Text>
                </View>
                
                <Text style={[{ fontSize: 12, fontWeight: '500', color: Colors.fontColorLightBlack }]}>
                    Version {Constants.manifest.version}
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : 20,
        backgroundColor: Colors.bodyColor,
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