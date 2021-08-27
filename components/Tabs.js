import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StyleSheet, Text, View, Image, StatusBar,  } from 'react-native';
import Home from '../screens/Home';
import CodeList from '../screens/CodeList';
import Profile from '../screens/Profile';
import Colors from '../config/Colors';

const Tab = createMaterialBottomTabNavigator();

export default Tabs = () => {

    return(
        <Tab.Navigator
          initialRouteName="Home"
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
          name="Home"
          component={Home}
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
                    null
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
                    null
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
                    null
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
