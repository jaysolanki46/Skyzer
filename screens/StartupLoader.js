import React from 'react';
import { View, ActivityIndicator, Image, StyleSheet } from 'react-native';

export default Loading = () => {

    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
                            style={styles.logo}
                            source={require('../assets/images/startup-logo.png')}
                        />
            <Image
                            style={styles.tinyLogo}
                            source={require('../assets/images/startup-loader.gif')}
                        />
        </View>
    )
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 250,
        height: 300,
        borderRadius: 50,
    },
    logo: {
        width: 500,
        height: 100,
    }
});