import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthTabNavigator from './AuthTabNavigator';
import RecordStackNavigator from './RecordStackNavigator';


const Stack = createStackNavigator();
const AuthContext = React.createContext();

function MainStackNavigator() {

    const [token, setToken] = React.useState();
    
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