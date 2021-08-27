import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, SafeAreaView } from 'react-native';
import Headertext from '../config/Headertext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllCodeList from './AllCodeList';
import FavoriteCodeList from './FavoriteCodeList';
import Colors from '../config/Colors';
import { color } from 'react-native-reanimated';

const Tab = createMaterialTopTabNavigator();

function TopTabs() {
    return (
      <Tab.Navigator
            tabBarOptions={{
                showIcon: true,
                showLabel: false,
                indicatorStyle: {
                    height: null,
                    top: '10%',
                    bottom: '10%',
                    width: '45%',
                    left: '2.5%',
                    borderRadius: 10,
                    backgroundColor: Colors.colorType1_1,
                },
                style: {
                    alignSelf: "center",
                    width: '97%',
                    borderRadius: 10,
                    borderColor: "blue",
                    backgroundColor: Colors.colorType5_1,
                    elevation: 2, // shadow on Android
                    shadowOpacity: .05, // shadow on iOS,
                    shadowRadius: 4, // shadow blur on iOS
                },
                tabStyle: {
                    borderRadius: 100,
                },
            }}
         >
        <Tab.Screen name="All" component={AllCodeList} 
              options={{
                tabBarIcon: ({ focused }) => (
                  <View style={{alignSelf: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: 100,}}>
                    {
                        focused ? 
                        <Image style={styles.icon} 
                        source={require('../assets/images/top-menu-icons/list-selected.png')} /> :
                        <Image style={styles.icon} 
                        source={require('../assets/images/top-menu-icons/list.png')} />
                    }
                    {
                        focused ? 
                        <Text style={{color: Colors.white, fontWeight: 'bold'}}>ALL</Text> :
                        <Text style={{color: Colors.fontColorLightBlack,}}>ALL</Text> 
                    }
                  </View>
                )
              }}
        />
        <Tab.Screen name="Favourite" component={FavoriteCodeList} 
            options={{
                tabBarIcon: ({ focused }) => (
                <View style={{alignSelf: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: 100,}}>
                    {
                        focused ? 
                        <Image style={styles.icon} 
                        source={require('../assets/images/top-menu-icons/favourite-selected.png')} /> :
                        <Image style={styles.icon} 
                        source={require('../assets/images/top-menu-icons/favourite.png')} />
                    }
                    {
                        focused ? 
                        <Text style={{color: Colors.white, fontWeight: 'bold'}}>Favourite</Text> :
                        <Text style={{color: Colors.fontColorLightBlack,}}>Favourite</Text> 
                    }
                </View>
                )
            }}
        />
      </Tab.Navigator>
    );
}

export default CodeList = () => {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" animated></StatusBar>
            <View style={styles.header}>
            <View style={styles.headerSubView}>
                <Text style={[Headertext.h1, {marginRight: 10, color: Colors.fontColorBluest}]}>Code</Text>
                <Text style={[Headertext.h1, {color: Colors.fontColorPurplest,}]}>List</Text>
            </View>
            </View>
            <View style={styles.body}>
                <View style={styles.bodySubView}>
                    <TopTabs/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'ios'? 10 : 20,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      backgroundColor: Colors.bodyColor,
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
        backgroundColor: Colors.bodyColor,
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
        backgroundColor: Colors.bodyColor,
    },
    icon: {
        width: 20,
        height: 20,
      },
});
