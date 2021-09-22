import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
import Configurations from './config/Configurations';
import NetInfo from "@react-native-community/netinfo";
import NoInternet from './screens/NoInternet';

const Drawer = createDrawerNavigator();

const App = () => {

  const[isInternet, setIsInternet] = useState(false);

  const initialLoginState = {
    isLoading: true,
    userToken: null,
    username: null,
    
    email: null,
    password: null,
    account: null,
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

      /** AUTH USER */
      var myHeaders = new Headers();
      var methodType = 'POST';
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "username": username,
        "password": password
      });

      var requestOptions = {
        method: methodType,
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      try {
        const response = await fetch(Configurations.host + "/user/auth/", requestOptions);
        const status = await response.status;
        const responseJson = await response.json();

        if (status != 200) {
          throw new Error("Status:" + status + " Invalid user");
        } else {

          /** SET USER SESSION OBJECT */
          const userArray = JSON.parse(JSON.stringify(responseJson));
          userToken = userArray.username;
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('userId', userArray.id.toString());
          await AsyncStorage.setItem('username', userArray.username);
          userArray.image != null ? await AsyncStorage.setItem('profile', userArray.image) : "";
        }

      } catch (error) {
        console.log('Login Error:', error);
        alert("Invalid username or password!");
      }
      console.log("user tocken:" + userToken)
      dispatch({ type: 'LOGIN', id: username, token: userToken })

      /* if(username == 'Jay' && password == 'pass') {
        
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
      dispatch({type: 'LOGIN', id: username, token: userToken})*/

    },
    logOut: async() => {

      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('profile');
      } catch (error) {
        console.log("Helre" . error);
      }
      dispatch({type: 'LOGOUT'})
    },
  }), []);

  useEffect(() => {

    NetInfo.fetch().then(state => {
      state.isConnected ? setIsInternet(true) : setIsInternet(false);
    });

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
      {
        isInternet ? 
          <NavigationContainer>
            {
              loginState.userToken != null ?
                <Tabs />
                :
                <RootStackScreen />
            }
          </NavigationContainer>
          :
          <NoInternet />
    }
    </AuthContext.Provider>
  );
}

export default App;