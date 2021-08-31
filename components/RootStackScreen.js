import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StartUp from '../screens/StartUp';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import ForgetPassword from '../screens/ForgetPassword';
import Colors from '../config/Colors';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator screenOptions={{ headerTitle: false, headerBackTitleVisible: true, }}>
        <RootStack.Screen options={{ headerShown: false }} name="StartUp" component={StartUp}/>
        <RootStack.Screen options={{headerShown: false }} name="LogIn" component={LogIn}/>
        <RootStack.Screen options={{
            headerStyle: {
                backgroundColor: Colors.colorType1_3
                },
            headerBackTitleStyle: {
                color: Colors.fontColorWhite
            },
            headerTintColor: Colors.fontColorWhite
            }
        }  name="SignUp" component={SignUp} />
        <RootStack.Screen options={{
            headerStyle: {
                backgroundColor: Colors.colorType1_3
            },
            headerBackTitleStyle: {
                color: Colors.fontColorWhite
            },
            headerTintColor: Colors.fontColorWhite
        }
        } name="ForgetPassword" component={ForgetPassword} />
    </RootStack.Navigator>
);

export default RootStackScreen;