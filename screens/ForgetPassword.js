import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import Headertext from '../config/Headertext';
import { FlatGrid } from 'react-native-super-grid';
import Colors from '../config/Colors';
import { LinearGradient } from 'expo-linear-gradient';

export default ForgetPassword = ({ navigation }) => {


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" translucent={true}></StatusBar>
            <View>
                <Text>Forget Password</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
    },
});
