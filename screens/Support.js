import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Animated, TouchableOpacity, Linking } from 'react-native';
import Colors from '../config/Colors';
import ContactBannerImage from '../assets/images/support/support-banner.png';
import PhoneImage from '../assets/images/support/support-phone.png';
import EmailImage from '../assets/images/support/support-email.png';
import Headertext from '../config/Headertext';
import TopStatusBar from '../components/TopStatusBar';
import { LinearGradient } from 'expo-linear-gradient';

const LRView = (props) => {
    const LRanim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

    React.useEffect(() => {
        Animated.timing(
            LRanim,
            {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }
        ).start();
    }, [LRanim])

    return (
        <Animated.View
            style={{
                ...props.style,
                opacity: LRanim,
            }}
        >
            {props.children}
        </Animated.View>
    );
}

export default Support = ({ navigation }) => {

    return (

        <SafeAreaView style={styles.container} behavior="height">
        <TopStatusBar />
        <LinearGradient colors={[Colors.backgroundColor1of3, Colors.backgroundColor2of3, Colors.backgroundColor3of3]} style={{ flex: 1, }} >
           <View style={styles.header}>
                <View style={styles.headerImage}>
                    <Image
                        style={styles.image}
                        source={ContactBannerImage}
                    />
                </View>
           </View>

            <View style={styles.body}>
                <View style={{ flex: 1, flexDirection: 'row'}}>
                        
                        <View style={styles.box}>
                            <TouchableOpacity style={{flex: 1, }} 
                            onPress={() => { Linking.openURL(`mailto:support@skyzer.co.nz`) }}>
                                <View style={{
                                    flex: 4, 
                                    justifyContent: 'center',}}>
                                        <Image
                                            style={styles.boxImage}
                                            source={EmailImage}
                                        />
                                    </View>
                                    <View style={{ flex: 1,}}>
                                        <Text style={[Headertext.h5, { alignSelf: 'center'}]}>
                                            Email Us
                                        </Text>
                                    </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.box}>
                            <TouchableOpacity style={{flex: 1, }} 
                                onPress={() => { Linking.openURL(`tel:092590322`) }}>
                                <View style={{
                                    flex: 4,
                                    justifyContent: 'center',
                                }}>
                                    <Image
                                        style={styles.boxImage}
                                        source={PhoneImage}
                                    />
                                </View>
                                <View style={{ flex: 1, }}>
                                    <Text style={[Headertext.h5, { alignSelf: 'center' }]}>
                                        Call Us
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                </View>
            </View>

            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 3,
        padding: 10,
    },
    headerImage: {
        flex: 1,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },  
    image: {
        width: 400,
        height: 300,
        resizeMode: 'contain',
        borderRadius: 10,
    },  
    body: {
        flex: 3,
    },
    box: {
        flex: 3, 
        borderWidth: 1, 
        borderColor: Colors.white, 
        borderRadius: 10, 
        margin: 10,
    },  
    boxImage: {
        width: 70,
        height: 70,
        alignSelf: 'center'
    }
});