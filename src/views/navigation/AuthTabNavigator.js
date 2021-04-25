import * as React from 'react';
import { View, Text } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



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