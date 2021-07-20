import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StartUp from './screens/StartUp';
import LogIn from './screens/LogIn';
import Home from './screens/Home';
import AllFunctionCodes from './screens/AllFunctionCodes';
import Profile from './screens/Profile';
import Colors from './config/Colors';

const Tab = createMaterialBottomTabNavigator();

const App = () => {
    
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor={Colors.active}
          inactiveColor={Colors.inactive}
          labelStyle={{ fontSize: 12 }}
          barStyle={{ backgroundColor: 'transparent',  
                      borderTopWidth: 0,
                      elevation: 0,}}
          shifting={true}
          labeled={true}
          lazy={true}
        >

        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, focused }) => (
              focused={focused},
              <MaterialCommunityIcons
                name={focused ? "home" : "home-outline"}
                color={color}
                size={27}
              />
            )
          }}
        />

        <Tab.Screen
          name="AllFunctionCodes"
          component={AllFunctionCodes}
          options={{
            tabBarLabel: 'Code List',
            tabBarIcon: ({ color, focused }) => (
              focused={focused},
              <MaterialCommunityIcons
                name={focused ? "view-list" : "view-list-outline"}
                color={color}
                size={27}
              />
            )
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              focused={focused},
              <MaterialCommunityIcons
                name={focused ? "account" : "account-outline"}
                color={color}
                size={27}
              />
            ),
          }}
        />
      </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;