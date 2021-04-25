import * as React from 'react';
import { View, Text, TouchableNativeFeedbackComponent } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AuthTabNavigator from './AuthTabNavigator';
import RecordStackNavigator from './RecordStackNavigator';


const Stack = createStackNavigator();
const AuthContext = React.createContext();


//create token context, wrap the app with it, pass down token and setToken
function MainStackNavigator() {

    const [token, setToken] = React.useState();
    
  /*
            {token == null ? (
            <Stack.Screen name="AuthTab" component={AuthTabNavigator} />
            ) : (
            <Stack.Screen name="RecordTab" component={RecordStack} />
            )}
            */

    return (
      <AuthContext.Provider value={{token, setToken}}>

        <Stack.Navigator headerMode='none'>
        {token == null ? (
          <Stack.Screen name="AuthTab" component={AuthTabNavigator} />
            ) : (
            <Stack.Screen name="RecordTab" component={RecordStackNavigator} />
            )}
        </Stack.Navigator>


      </AuthContext.Provider>
    );
  }
  
  
  export  {MainStackNavigator, AuthContext};