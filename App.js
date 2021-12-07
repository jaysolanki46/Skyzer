import React, { useEffect, useState } from 'react';
import Tabs from './components/Tabs';
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
import * as SecureStore from 'expo-secure-store';

const Drawer = createDrawerNavigator();

const App = () => {

  const[isInternet, setIsInternet] = useState(false);

  const initialLoginState = {
    isLoading: true,
    userToken: null,
    email: null,
    
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
          email: action.email,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          email: null,
          userToken: null,
          isLoading: false,
        };  
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    logIn: async(email, password) => {
      let userToken = null;

      /** AUTH USER */
      var myHeaders = new Headers();
      var methodType = 'POST';
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "email": email,
        "password": password
      });

      var requestOptions = {
        method: methodType,
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      try {
        const response = await fetch(Configurations.host + "/authenticate", requestOptions);
        const status = await response.status;
        const responseJson = await response.json();
        
        if (status != 200) {
          throw new Error("Status:" + status + " Invalid user");
        } else {

          /** SET USER SESSION OBJECT */
          const userArray = JSON.parse(JSON.stringify(responseJson));
          userToken = "Bearer " + userArray.token;

          await SecureStore.setItemAsync("email", email);
          await SecureStore.setItemAsync("token", userToken);
        }

      } catch (error) {
        alert("Invalid email or password!");
        var myErrorHeaders = new Headers();
            var errorMethodType = "POST";
            myErrorHeaders.append("Content-Type", "application/json");

            var erroRaw = JSON.stringify({
                "screen": "APP",
                "module": "NA",
                "user": email,
                "status": error.message
            });

            var errorRequestOptions = {
                method: errorMethodType,
                headers: myErrorHeaders,
                body: erroRaw,
                redirect: 'follow'
            };

            await fetch(Configurations.host + "/logs/error", errorRequestOptions);
            return false;
      }
      dispatch({ type: 'LOGIN', email: email, token: userToken })

    },
    logOut: async() => {

      try {
        await SecureStore.deleteItemAsync("email");
        await SecureStore.deleteItemAsync("token");
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('profile');
        
      } catch (error) {
        console.log(error);
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
        userToken = await SecureStore.getItemAsync("token");
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