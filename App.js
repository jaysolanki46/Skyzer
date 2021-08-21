import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Tabs from './components/Tabs';
import StartUp from './screens/StartUp';
import LogIn from './screens/LogIn';

const App = () => {
    
  return (
    <SafeAreaProvider>
    <LogIn/>
    {/* <Tabs/> */}
      
      
    </SafeAreaProvider>
  );
}

export default App;