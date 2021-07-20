import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import Colors from '../config/Colors';
import Headertext from '../config/Headertext';

export default Home = () => {
    return (
        <View style={styles.container}>
            {Platform.OS === 'ios' && <>
            <StatusBar barStyle="dark-content" hidden = {false} translucent = {true}></StatusBar>
            </>}
            <View style={styles.header}>
            <View style={styles.headerSubView}>
                    <View style={styles.headerLeft}>
                        <Text style={Headertext.h1}>Hey,</Text>
                        <Text style={Headertext.h4}>Welcome back, Post Tech!</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Image
                            style={styles.tinyLogo}
                            source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                            }}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.body}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'ios'? 10 : 60,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#e7e4d1",
      flexDirection: 'column',
    },
    header: {
        flex: 1.5,
        alignItems: 'center',
        width: '100%',
    },
    body: {
        flex: 4.5,
        alignItems: 'center',
        backgroundColor: "white",
        width: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        flexDirection: "row",
        alignContent: "space-between",
    },
    headerSubView: {
        flex: 1, 
        flexDirection: 'row',
        margin: 10, 
    },
    headerLeft: {
        flex: 4,
        width: '20%',
        justifyContent: 'center',
    },
    headerRight: {
        flex: 2,
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tinyLogo: {
        width: 75,
        height: 75,
    },
});