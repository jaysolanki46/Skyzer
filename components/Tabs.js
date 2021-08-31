import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StyleSheet, Text, View, Image, StatusBar,  } from 'react-native';
import Home from '../screens/Home';
import TetraGuide from '../screens/TetraGuide';
import TeliumGuide from '../screens/TeliumGuide';
import CodeList from '../screens/CodeList';
import Profile from '../screens/Profile';
import Colors from '../config/Colors';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  return (
    //<Stack.Navigator screenOptions={{ headerTitle: false, headerStyle: { shadowOffset: { height: 0, width: 0 } } }}>
    <Stack.Navigator screenOptions={{ headerTitle: false, headerBackTitleVisible: true,}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="TetraGuide" component={TetraGuide} />
      <Stack.Screen name="TeliumGuide" component={TeliumGuide} />
      {/* <Stack.Screen name="TeliumCodeList" component={TetraCodeList} />
      <Stack.Screen name="TeliumCodeList" component={TetraCodeList} /> */}
    </Stack.Navigator>
  );
}

export default Tabs = () => {

    return(
        <Tab.Navigator
        initialRouteName="HomeTabs"
          activeColor={Colors.active}
          inactiveColor={Colors.inactive}
          labelStyle={{ fontSize: 12 }}
          barStyle={{ backgroundColor: Colors.bodyColor,  
                      borderTopWidth: 0,
                      elevation: 0,
                    }}
          shifting={true}
          labeled={true}
          lazy={true}
        >

        <Tab.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            tabBarLabel: false,
            tabBarIcon: ({ focused }) => (
              <View style={{alignItems: 'center', width: 100}}>
                {
                  focused ? <Image style={styles.icon} 
                    source={require('../assets/images/menu-icons/home.png')} /> :
                    <Image style={styles.iconOutline} 
                    source={require('../assets/images/menu-icons/home-outline.png')} />
                }
                {
                  focused ? 
                    <Text style={{color: Colors.fontColorPurplest, fontWeight: 'bold'}}>Home</Text> :
                    <Text style={{color: Colors.fontColorPurplest,}}>Home</Text>
                }
              </View>
            )
          }}
        />

        <Tab.Screen
          name="CodeList"
          component={CodeList}
          options={{
            tabBarLabel: false,
            tabBarIcon: ({ focused }) => (
              <View style={{alignItems: 'center', width: 100}}>
                {
                  focused ? <Image style={styles.icon} 
                    source={require('../assets/images/menu-icons/list.png')} /> :
                    <Image style={styles.iconOutline} 
                    source={require('../assets/images/menu-icons/list-outline.png')} />
                }
                {
                  focused ? 
                    <Text style={{color: Colors.fontColorPurplest, fontWeight: 'bold'}}>Codes</Text> :
                    <Text style={{color: Colors.fontColorPurplest,}}>Codes</Text>
                }
              </View>
            )
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: false,
            tabBarIcon: ({ focused }) => (
              <View style={{alignItems: 'center', width: 100}}>
                {
                  focused ? <Image style={styles.icon} 
                    source={require('../assets/images/menu-icons/profile.png')} /> :
                    <Image style={styles.iconOutline} 
                    source={require('../assets/images/menu-icons/profile-outline.png')} />
                }
                {
                  focused ? 
                    <Text style={{color: Colors.fontColorPurplest, fontWeight: 'bold'}}>Profile</Text> :
                    <Text style={{color: Colors.fontColorPurplest,}}>Profile</Text>
                }
              </View>
            )
          }}
        />
      </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    icon: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: Colors.profilBackground,
    },
    iconOutline: {
      width: 25,
      height: 25,
      backgroundColor: Colors.profilBackground,
    },
});
