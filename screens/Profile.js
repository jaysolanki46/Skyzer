import React from 'react';
import { StyleSheet, Text, View, StatusBar, Button,TouchableOpacity  } from 'react-native';
import Colors from '../config/Colors';
import Headertext from '../config/Headertext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Menu, Divider, Provider } from 'react-native-paper';

export default Profile = () => {

    return (
        <View style={styles.container}>
            {Platform.OS === 'ios' && <>
            <StatusBar barStyle="light-content" hidden = {false} translucent = {true}></StatusBar>
            </>}
            <View style={styles.header}>
            <View style={styles.headerSubView}>
                    <Text style={[Headertext.h2]}>Profile</Text>
            </View>
            </View>
            <View style={styles.body}>
                <View style={styles.bodySubView}>
                    <View style={styles.bodyTop}>
                        <View style={styles.bodyTopLeft}>
        
                        </View>
                        <View style={styles.bodyTopRight}>

                        </View>
                    </View>

                    <View style={styles.bodyMiddle}>

                    </View>

                    <View style={styles.bodyBottom}>

                    </View>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios'? 10 : 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: Colors.background,
    },
    header: {
          flex: .5,
          width: '100%',
          marginTop: 20, 
          marginBottom: 10,
    },
    headerSubView: {
          flex: 1, 
          flexDirection: 'row',
          marginLeft: 10, 
          marginRight: 10,
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          backgroundColor: Colors.background,
    },
    body: {
        flex: 5.5,
        alignItems: 'center',
        width: '100%',
        flexDirection: "row",
        alignContent: "space-between",
        borderWidth: 1,
    },
    bodySubView: {
        flex: 1, 
        backgroundColor: Colors.background,
    },
    bodyTop: {
        borderWidth: 1,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.white,
    },
    bodyTopLeft: {
        borderWidth: 1,
        flex: 3,
        backgroundColor: Colors.yellow,
    },
    bodyTopRight: {
        borderWidth: 1,
        flex: 3,
        backgroundColor: Colors.green,
    },
    bodyMiddle: {
        borderWidth: 1,
        flex: 4,
        backgroundColor: Colors.white,
    },
    bodyBottom: {
        borderWidth: 1,
        flex: 1,
        backgroundColor: Colors.green,
    },
});