//import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './src/views/screens/LoginScreen';
import RegisterScreen from './src/views/screens/RegisterScreen';
import DailyRecordScreen from './src/views/screens/DailyRecordScreen';
import WeeklyRecordScreen from './src/views/screens/WeeklyRecordScreen';
import MonthlyRecordScreen from './src/views/screens/MonthlyRecordScreen';
import DetailScreen from './src/views/screens/DetailScreen';

import {MainStackNavigator} from './src/views/navigation/MainStackNavigator';



const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='white' barStyle="dark-content" />
      <MainStackNavigator/>
    </NavigationContainer>
  );
};

export default App;
