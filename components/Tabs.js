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
import Support from '../screens/Support';
import Colors from '../config/Colors';
import { createStackNavigator } from '@react-navigation/stack';
import Values from '../screens/Values';
import WhoWeAre from '../screens/WhoWeAre';
import More from '../screens/More';
import Terms from '../screens/Terms';
import Credits from '../screens/Credits';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  return (
    //<Stack.Navigator screenOptions={{ headerTitle: false, headerStyle: { shadowOffset: { height: 0, width: 0 } } }}>
    <Stack.Navigator screenOptions={{ headerStyle: { shadowOffset: { height: 0, width: 0 }, elevation: 0, } }}>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="TetraGuide" component={TetraGuide} options={{
        headerShown: true, 
        headerTitle: "Tetra Guide",
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        }} />
      <Stack.Screen name="TeliumGuide" component={TeliumGuide} options={{
        headerShown: true,
        headerTitle: "Telium Guide",
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }} />
      <Stack.Screen name="About" component={About} options={{
        headerShown: true,
        headerTitle: "About",
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }} />
      <Stack.Screen name="WhoWeAre" component={WhoWeAre} options={{
        headerShown: true,
        headerTitle: false,
        headerTitleAlign: 'center',
        headerTransparent: true,
        headerBackTitleVisible: false,
      }} />
      <Stack.Screen name="Values" component={Values} options={{
        headerShown: true,
        headerTitle: false,
        headerTitleAlign: 'center',
        headerTransparent: true,
        headerBackTitleVisible: false,
      }} />
      <Stack.Screen name="Support" component={Support} options={{
        headerShown: true,
        headerTitle: "Support",
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }} />
      <Stack.Screen name="More" component={More} options={{
        headerShown: true,
        headerTitle: "More",
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }} />
      <Stack.Screen name="Terms" component={Terms} options={{
        headerShown: true,
        headerTitle: "Terms",
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
      activeColor={Colors.active}
      inactiveColor={Colors.inactive}
      labelStyle={{ fontSize: 12 }}
      barStyle={{
        backgroundColor: 'transparent',
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
                backgroundColor: focused? Colors.cardBodyColor : null,
                borderRadius: focused ? 10 : null,
            }}>
              {
                focused ? <Image style={styles.icon}
                  source={require('../assets/images/menu-icons/home.png')} /> :
                  <Image style={styles.iconOutline}
                    source={require('../assets/images/menu-icons/home-outline.png')} />
              }
              {
                focused ?
                  <Text style={{ color: Colors.fontColorWhite, fontWeight: 'bold' }}>Home</Text> :
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
              backgroundColor: focused ? Colors.cardBodyColor : null,
              borderRadius: focused ? 10 : null,
              }}>
              {
                focused ? <Image style={styles.icon}
                  source={require('../assets/images/menu-icons/favourite.png')} /> :
                  <Image style={styles.iconOutline}
                    source={require('../assets/images/menu-icons/favourite-outline.png')} />
              }
              {
                focused ?
                  <Text style={{ color: Colors.fontColorWhite, fontWeight: 'bold' }}>Favourites</Text> :
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
            <View style={{ alignItems: 'center', width: 100, 
              flexDirection: 'row',
              justifyContent: focused ? null : 'center',
              backgroundColor: focused ? Colors.cardBodyColor : null,
              borderRadius: focused ? 10 : null, }}>
              {
                focused ? <Image style={styles.icon}
                  source={require('../assets/images/menu-icons/profile.png')} /> :
                  <Image style={styles.iconOutline}
                    source={require('../assets/images/menu-icons/profile-outline.png')} />
              }
              {
                focused ?
                  <Text style={{ color: Colors.fontColorWhite, fontWeight: 'bold' }}>Profile</Text> :
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
