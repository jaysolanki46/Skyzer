import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StartUp from '../screens/StartUp';
import LogIn from '../screens/LogIn';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="StartUp" component={StartUp}/>
        <RootStack.Screen name="LogIn" component={LogIn}/>
    </RootStack.Navigator>
);

export default RootStackScreen;