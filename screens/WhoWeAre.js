import React from 'react';
import { ImageBackground, StyleSheet, Platform, Dimensions, StatusBar, SafeAreaView, View, Text, Image } from 'react-native';
import Colors from '../config/Colors';
import care from "../assets/images/about/values/1-care.png";
import win from "../assets/images/about/values/2-win.png";
import grow from "../assets/images/about/values/3-grow.png";
import integrity from "../assets/images/about/values/4-integrity.png";
import Headertext from '../config/Headertext';

export default WhoWeAre = ({ navigation }) => {

    return (

        <SafeAreaView style={styles.container} behavior="height">
            {Platform.OS === 'ios' && <>
                <StatusBar barStyle="dark-content" hidden={false} translucent={true}></StatusBar>
            </>}

            <View style={styles.container}>
                <View style={styles.body}>
                    
                    <View style={styles.bodyBox}>
                        <View style={styles.bodyBox}>
                            
                            <View style={styles.boxContainer}>
                                <View style={styles.boxImage}>
                                    <Image style={styles.image} source={care} />
                                </View>
                                <View style={styles.boxText}>
                                    <Text style={Headertext.h5, styles.text}>
                                        We CARE
                                    </Text>
                                    <Text style={Headertext.h5, styles.text}>
                                        About Our Customers
                                    </Text>
                                </View>
                            </View>

                        </View>
                        <View style={styles.bodyBox}>
                            
                            <View style={styles.boxContainer}>
                                <View style={styles.boxImage}>
                                    <Image style={styles.image} source={win} />
                                </View>
                                <View style={styles.boxText}>
                                    <Text style={Headertext.h5, styles.text}>
                                        We WIN 
                                    </Text>
                                    <Text style={Headertext.h5, styles.text}>
                                        Together
                                    </Text>
                                </View>
                            </View>

                        </View>
                    </View>

                    <View style={styles.bodyBox}>
                        <View style={styles.bodyBox}>
                            
                            <View style={styles.boxContainer}>
                                <View style={styles.boxImage}>
                                    <Image style={styles.image} source={grow} />
                                </View>
                                <View style={styles.boxText}>
                                    <Text style={Headertext.h5, styles.text}>
                                        We GROW Ourselves
                                    </Text>
                                    <Text style={Headertext.h5, styles.text}>
                                        To Grow Our Business
                                    </Text>
                                </View>
                            </View>

                        </View>
                        <View style={styles.bodyBox}>
                            
                            <View style={styles.boxContainer}>
                                <View style={styles.boxImage}>
                                    <Image style={styles.image} source={integrity} />
                                </View>
                                <View style={styles.boxText}>
                                    <Text style={Headertext.h5, styles.text}>
                                        We ACT
                                    </Text>
                                    <Text style={Headertext.h5, styles.text}>
                                        With Integrity Always
                                    </Text>
                                </View>
                            </View>

                        </View>
                    </View>
                    
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
    },
    body: {
        flex: 1,
        margin: 10,
    },  
    bodyBox: {
        flex: 3, 
        flexDirection: 'row', 
    },
    boxContainer: {
        flex: 1,
        backgroundColor: Colors.cardColor,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
    },
    boxImage: {
        flex: 3.5, 
        justifyContent: 'center',
        alignItems: 'center', 
    },
    boxText: {
        flex: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 120,
    },
    text: {
        fontWeight: 'bold', 
        color: Colors.fontColorLightBlack,
    },

});