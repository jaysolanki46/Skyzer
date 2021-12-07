import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StyleSheet, Text, View, Image, StatusBar, Platform, } from 'react-native';
import Home from '../screens/Home';
import TetraGuide from '../screens/TetraGuide';
import TeliumGuide from '../screens/TeliumGuide';
import About from '../screens/About';
import Favourites from '../screens/Favourites'
import Profile from '../screens/Profile';
import Colors from '../config/Colors';
import { createStackNavigator } from '@react-navigation/stack';
import Values from '../screens/Values';
import WhoWeAre from '../screens/WhoWeAre';
import More from '../screens/More';
import Terms from '../screens/Terms';
import Credits from '../screens/Credits';
import Nitro from '../screens/Nitro';
import Bulletins from '../screens/Bulletins';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  return (
    //<Stack.Navigator screenOptions={{ headerTitle: false, headerStyle: { shadowOffset: { height: 0, width: 0 } } }}>
    <Stack.Navigator screenOptions={{ 
      headerStyle: { backgroundColor: Colors.backgroundColor1of3, shadowColor: 'transparent' },
      headerTitleStyle: {
        color: Colors.fontWhite,
      },
      headerTintColor: Colors.fontWhite,
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
                  }}>

      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="TetraGuide" component={TetraGuide} options={{
        headerShown: true, 
        headerTitle: "Tetra Guide",
        }} />
      <Stack.Screen name="TeliumGuide" component={TeliumGuide} options={{
        headerShown: true,
        headerTitle: "Telium Guide",
      }} />
      <Stack.Screen name="About" component={About} options={{
        headerShown: true,
        headerTitle: "About Us",
        
      }} />
      <Stack.Screen name="WhoWeAre" component={WhoWeAre} options={{
        headerShown: true,
        headerTitle: "Who We Are",
      }} />
      <Stack.Screen name="Values" component={Values} options={{
        headerShown: true,
        headerTitle: "Values",
      }} />
      <Stack.Screen name="Nitro" component={Nitro} options={{
        headerShown: true,
        headerTitle: "Nitro",
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }} />
      <Stack.Screen name="Bulletins" component={Bulletins} options={{
        headerShown: true,
        headerTitle: "Bulletins",
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }} />
    </Stack.Navigator>
  );
} 

function ProfileTabs() {
  return (
    <Stack.Navigator screenOptions={{ 
      headerStyle: {
        backgroundColor: Colors.backgroundColor1of3, shadowColor: 'transparent'},
        headerTitleStyle: {
          color: Colors.fontWhite,
        },
        headerTintColor: Colors.fontWhite,
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}>
      
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} an />
      <Stack.Screen name="More" component={More} options={{
        headerTitle: "More",
      }} />
      <Stack.Screen name="Terms" component={Terms} options={{
        headerShown: true,
        headerTitle: "Terms & Privacy Policy",
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }} />
      <Stack.Screen name="Credits" component={Credits} options={{
        headerShown: true,
        headerTitle: "Credits",
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }} />
    </Stack.Navigator>
  );
}

export default Tabs = () => {

  return (
    <Tab.Navigator
      
      initialRouteName="HomeTabs"
      labelStyle={{ fontSize: 12 }}
      barStyle={{
        backgroundColor: Colors.backgroundColor1of3,
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
            <View style={{ alignItems: 'center', width: 90,
                flexDirection: 'row',
                justifyContent: focused ? null : 'center',
                borderWidth: focused ? 1 : null,
                borderColor: focused ? Colors.white : null,
                borderRadius: focused ? 10 : null,
            }}>
              <Image style={styles.icon}
                source={require('../assets/images/menu-icons/home.png')} />
              {
                focused ?
                  <Text style={{ color: Colors.fontWhite, fontWeight: 'bold' }}>Home</Text> :
                  null
              }
            </View>
          )
        }}
      />

      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          tabBarLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', width: 115,
              flexDirection: 'row',
              justifyContent: focused ? null : 'center',
              borderWidth: focused ? 1 : null,
              borderColor: focused ? Colors.white : null,
              borderRadius: focused ? 10 : null,
              }}>
              <Image style={styles.icon}
                source={require('../assets/images/menu-icons/favourite.png')} />
              {
                focused ?
                  <Text style={{ color: Colors.fontWhite, fontWeight: 'bold' }}>Favourites</Text> :
                  null
              }
            </View>
          )
        }}
      />

      <Tab.Screen
        name="ProfileTabs"
        component={ProfileTabs}
        options={{
          tabBarLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', width: 100, 
              flexDirection: 'row',
              justifyContent: focused ? null : 'center',
              borderWidth: focused ? 1 : null,
              borderColor: focused ? Colors.white : null,
              borderRadius: focused ? 10 : null, }}>
              <Image style={styles.icon}
                source={require('../assets/images/menu-icons/profile.png')} />
              {
                focused ?
                  <Text style={{ color: Colors.fontWhite, fontWeight: 'bold' }}>Profile</Text> :
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
    width: 30,
    height: 30,
    margin: 5,
  },
  iconOutline: {
    width: 30,
    height: 30,
  },
});
