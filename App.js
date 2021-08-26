import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator } from 'react-native';
import Tabs from './components/Tabs';
import StartUp from './screens/StartUp';
import LogIn from './screens/LogIn';
import RootStackScreen from './components/RootStackScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { 
  NavigationContainer, 
} from '@react-navigation/native';
import { AuthContext } from './components/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StartupLoader from './screens/StartupLoader';

const Drawer = createDrawerNavigator();

const App = () => {
    
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null); 

  const initialLoginState = {
    isLoading: true,
    username: null,
    userToken: null,
  }

  const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          username: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          username: null,
          userToken: null,
          isLoading: false,
        };  
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    logIn: async(username, password) => {
      let userToken = null;
      if(username == 'Jay' && password == 'pass') {
        
        try {
          userToken = 'u12';
          await AsyncStorage.setItem('userToken', userToken);
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Invalid username or password!");
      }
      console.log("user tocken:" + userToken)
      dispatch({type: 'LOGIN', id: username, token: userToken})
    },
    logOut: async() => {

      try {
        await AsyncStorage.removeItem('userToken');
      } catch (error) {
        console.log("Helre" . error);
      }
      dispatch({type: 'LOGOUT'})
    },
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      let userToken;
      userToken = null;
      try {
        userToken =  await AsyncStorage.getItem('userToken');
      } catch (error) {
        console.log(error);
      }
      //userToken = null;
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken})
    }, 2000);
  }, []);

  if(loginState.isLoading) {
    return (
      <StartupLoader/>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      {
        loginState.userToken != null ?
          <Tabs/>
          :
          <RootStackScreen/>
      }
          
          
        </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;