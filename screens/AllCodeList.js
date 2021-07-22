import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../config/Colors';

export default AllCodeList = () => {
    return (
    <View style={styles.container}>
        <Text>All</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.background,
    },
});