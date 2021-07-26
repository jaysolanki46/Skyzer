import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import Headertext from '../config/Headertext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllCodeList from './AllCodeList';
import FavoriteCodeList from './FavoriteCodeList';
import Colors from '../config/Colors';

const Tab = createMaterialTopTabNavigator();

function TopTabs() {
    return (
      <Tab.Navigator
            tabBarOptions={{
                activeTintColor: Colors.white,
                inactiveTintColor: Colors.inactive,
                indicatorStyle: {
                    height: null,
                    top: '10%',
                    bottom: '10%',
                    width: '45%',
                    left: '2.5%',
                    borderRadius: 100,
                    backgroundColor: Colors.pink,
                },
                style: {
                    alignSelf: "center",
                    width: '95%',
                    borderRadius: 100,
                    borderColor: "blue",
                    backgroundColor: Colors.lightBackground,
                    elevation: 2, // shadow on Android
                    shadowOpacity: .05, // shadow on iOS,
                    shadowRadius: 4, // shadow blur on iOS
                },
                tabStyle: {
                    borderRadius: 100,
                },
            }}
         >
        <Tab.Screen name="All" component={AllCodeList} />
        <Tab.Screen name="Favourite" component={FavoriteCodeList} />
      </Tab.Navigator>
    );
}

export default CodeList = () => {

    return (
        <View style={styles.container}>
            {Platform.OS === 'ios' && <>
            <StatusBar barStyle="light-content" hidden = {false} translucent = {true}></StatusBar>
            </>}
            <View style={styles.header}>
            <View style={styles.headerSubView}>
                    <Text style={Headertext.h2}>Code List</Text>
            </View>
            </View>
            <View style={styles.body}>
                <View style={styles.bodySubView}>
                    <TopTabs/>
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
    },
    bodySubView: {
        flex: 1, 
        backgroundColor: Colors.background,
    },
});
