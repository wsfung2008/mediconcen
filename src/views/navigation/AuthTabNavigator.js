import * as React from 'react';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';



const AuthTab = createMaterialTopTabNavigator();

function AuthTabNavigator() {
    return (
        <AuthTab.Navigator>
          <AuthTab.Screen name="Login" component={LoginScreen} />
          <AuthTab.Screen name="Register" component={RegisterScreen} />
        </AuthTab.Navigator>
    );
}

export default AuthTabNavigator;