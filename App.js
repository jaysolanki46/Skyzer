import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Tabs from './components/Tabs';
import StartUp from './screens/StartUp';
import LogIn from './screens/LogIn';
import RootStackScreen from './components/RootStackScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { 
  NavigationContainer, 
} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const App = () => {
    
  return (
    <NavigationContainer>
      <RootStackScreen/>
    {/* <StartUp/> */}
    {/* <Tabs/> */}
      
      
    </NavigationContainer>
  );
}

export default App;