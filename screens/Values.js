import React from 'react';
import { ImageBackground, StyleSheet, Platform, Dimensions, StatusBar, SafeAreaView, View, Text, Image, ScrollView } from 'react-native';
import Colors from '../config/Colors';
import care from "../assets/images/about/values/1-care.png";
import win from "../assets/images/about/values/2-win.png";
import grow from "../assets/images/about/values/3-grow.png";
import integrity from "../assets/images/about/values/4-integrity.png";
import Headertext from '../config/Headertext';
import values from "../assets/images/about/value-s.png";
import { LinearGradient } from 'expo-linear-gradient';
import backgroundImage from "../assets/images/about/headerBackground.jpg";

export default Values = ({ navigation }) => {

    return (

        <SafeAreaView style={styles.container} behavior="height">
            {Platform.OS === 'ios' && <>
                <StatusBar barStyle="dark-content" hidden={false} translucent={true}></StatusBar>
            </>}

            <View style={styles.container}>

                <View style={styles.header}>
                    <ImageBackground source={backgroundImage} style={{
                        width: '95%',
                        height: 200,
                    }} resizeMode="cover">
                        <View style={styles.headerBox}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 5 }}>
                                <Text style={[Headertext.h2, { color: Colors.fontColorWhite, }]}>
                                    VALUES
                                </Text>
                            </View>

                        </View>
                    </ImageBackground>
                </View>


                <View style={styles.body}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1,}}>

                        <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                            <View style={{ width: 170, height: 200, marginTop: 10, marginBottom: 10, }}>
                                <View style={{ flex: 1, backgroundColor: Colors.colorType5_1, borderRadius: 10 }}>

                                    <View style={{
                                        flex: 4, justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Image style={styles.valuesImage} source={care} />
                                    </View>

                                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', }}>
                                        <Text style={Headertext.h5, { color: Colors.fontColorBluest, fontWeight: 'bold', textAlign: 'center', flex: 1, }}>
                                            We CARE About Our Customers
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ width: 170, height: 200, marginTop: 10, marginBottom: 10, }}>
                                <View style={{ flex: 1, backgroundColor: Colors.colorType5_1, borderRadius: 10 }}>

                                    <View style={{
                                        flex: 4, justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Image style={styles.valuesImage} source={win} />
                                    </View>

                                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', }}>
                                        <Text style={Headertext.h5, { color: Colors.fontColorBluest, fontWeight: 'bold', textAlign: 'center', flex: 1, }}>
                                            We WIN Together
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ width: 170, height: 200, marginTop: 10, marginBottom: 10, }}>
                                <View style={{ flex: 1, backgroundColor: Colors.colorType5_1, borderRadius: 10 }}>

                                    <View style={{
                                        flex: 4, justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Image style={styles.valuesImage} source={grow} />
                                    </View>

                                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', }}>
                                        <Text style={Headertext.h5, { color: Colors.fontColorBluest, fontWeight: 'bold', textAlign: 'center', flex: 1, }}>
                                            We GROW Ourselves To Grow Our Business
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ width: 170, height: 200, marginTop: 10, marginBottom: 10, }}>
                                <View style={{ flex: 1, backgroundColor: Colors.colorType5_1, borderRadius: 10 }}>

                                    <View style={{
                                        flex: 4, justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Image style={styles.valuesImage} source={integrity} />
                                    </View>

                                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', }}>
                                        <Text style={Headertext.h5, { color: Colors.fontColorBluest, fontWeight: 'bold', textAlign: 'center', flex: 1, }}>
                                            We ACT With Integrity Always
                                        </Text>
                                    </View>
                                </View>
                            </View>

                        </View>


                        <View style={{ width: '100%', padding: 10, marginTop: 20}}>
                            <View style={{marginTop: 10}}>
                                <Text style={[Headertext.h4, { color: Colors.fontColorBluest, }]}>
                                    We CARE About Our Customers
                                </Text>
                                <Text style={[Headertext.h5, { textAlign: 'justify', marginTop: 5 }]} >
                                    We are proud of our excellent customer service record that shows we loose very few customers to our competitors. We let our customers know when we have new people join our Service team because we feel strongly that people who care about the best results for customers are accountable. Our people get to know our customers to try and anticipate their needs and change their support style accordingly.
                                </Text>
                            </View>

                            <View style={{ marginTop: 30 }}>
                                <Text style={[Headertext.h4, { color: Colors.fontColorBluest, }]}>
                                    We WIN Together
                                </Text>
                                <Text style={[Headertext.h5, { textAlign: 'justify', marginTop: 5 }]} >
                                    We enjoy winning and believe the joy and rush of the team’s success is greater than that of an individual’s victory. Anything we can do to support each other, and our customers, to be the top of their game we are up for. We know our combined ideas are stronger too – we see the value in the individual’s ideas, thoughts and beliefs, and the strength that is created when thought-diversity comes together.
                                </Text>
                            </View>

                            <View style={{ marginTop: 30 }}>
                                <Text style={[Headertext.h4, { color: Colors.fontColorBluest, }]}>
                                    We GROW Ourselves To Grow Our Business
                                </Text>
                                <Text style={[Headertext.h5, { textAlign: 'justify', marginTop: 5 }]} >
                                    Lots of us have come from different countries or different industries and we are all learning and growing together. By sharing our knowledge freely, by empowering our people to fail quickly and learn from their mistakes, by encouraging new ideas and supporting those brave enough to try new things, we know that our business will continue growing and evolving. Just like the FINTECH and payments industries we’re part of … staying still is not an option.
                                </Text>
                            </View>

                            <View style={{ marginTop: 30 }}>
                                <Text style={[Headertext.h4, { color: Colors.fontColorBluest, }]}>
                                    We ACT With Integrity Always
                                </Text>
                                <Text style={[Headertext.h5, { textAlign: 'justify', marginTop: 5 }]} >
                                    This was a really important one for us and also the hardest to visually represent! Being there for each other, and having each other’s backs is a really important part of what we stand for. We believe that everyone is equal and deserves respect. We are reliable and trustworthy; we do the right thing and we make the hard calls to protect and support each other and our customers. We trust each other and our customers trust us.
                                </Text>
                            </View>
                           
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
        paddingTop: Platform.OS != 'ios' ? 20 : 0,
    },
    header: {
        flex: 1.5,
    },
    headerBox: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
    },
    body: {
        flex: 4.5,
        paddingTop: Platform.OS != 'ios' ? 40 : 0,
        margin: 15,
    },
    bodyBox: {
        width: 200,
        height: 150, 
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
        marginTop: 10,
    },
    boxText: {
        flex: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: 60,
        height: 60,
        padding: 10,
    },
    valuesImage: {
        width: 120,
        height: 120,
    },
    text: {
        fontWeight: 'bold', 
        color: Colors.fontColorLightBlack,
        textAlign: 'center',
    },

});