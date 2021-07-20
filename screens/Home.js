import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../config/Colors';

export default Home = () => {
    return (
        <SafeAreaView style={styles.container}>
        <Text>This is top text.</Text>
        <Text>This is bottom text.</Text>
        </SafeAreaView>
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