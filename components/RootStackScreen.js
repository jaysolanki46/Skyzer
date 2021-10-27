import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StartUp from '../screens/StartUp';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import ForgetPassword from '../screens/ForgetPassword';
import Colors from '../config/Colors';
import SignUpSuccess from '../screens/SignUpSuccess';
import ForgetPasswordCode from '../screens/ForgetPasswordCode';
import ResetPassword from '../screens/ResetPassword';
import RestPasswordSuccess from '../screens/RestPasswordSuccess';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none' initialRouteName="StartUp">
        <RootStack.Screen name="StartUp" component={StartUp} options={{ gestureEnabled: false }}/>
        <RootStack.Screen name="LogIn" component={LogIn} options={{ gestureEnabled: false }}/>
        <RootStack.Screen name="SignUp" component={SignUp} options={{ gestureEnabled: false }}/>
        <RootStack.Screen name="SignUpSuccess" component={SignUpSuccess} options={{ gestureEnabled: false }} />

        <RootStack.Screen name="ForgetPassword" component={ForgetPassword} options={{ gestureEnabled: false }} />
        <RootStack.Screen name="ForgetPasswordCode" component={ForgetPasswordCode} options={{ gestureEnabled: false }} />
        <RootStack.Screen name="ResetPassword" component={ResetPassword} options={{ gestureEnabled: false }} />
        <RootStack.Screen name="RestPasswordSuccess" component={RestPasswordSuccess} options={{ gestureEnabled: false }} />
    </RootStack.Navigator>
);

export default RootStackScreen;