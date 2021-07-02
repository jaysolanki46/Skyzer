import { Image, View, StyleSheet } from "react-native";
import React from 'react';

export default Logo = () => {

    return(
        <View>
            <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 120,
        height: 50,
        resizeMode: 'stretch'
      },
});