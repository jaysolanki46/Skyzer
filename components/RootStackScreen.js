import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StartUp from '../screens/StartUp';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import ForgetPassword from '../screens/ForgetPassword';
import Colors from '../config/Colors';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="StartUp" component={StartUp}/>
        <RootStack.Screen name="LogIn" component={LogIn}/>
        <RootStack.Screen name="SignUp" component={SignUp} />
        <RootStack.Screen name="ForgetPassword" component={ForgetPassword} />
    </RootStack.Navigator>
);

export default RootStackScreen;