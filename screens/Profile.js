import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../config/Colors';

export default Profile = () => {
    return (
    <View style={styles.container}>
        <Text>Profile</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'ios'? 10 : 60,
      paddingBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.white,
    },
});