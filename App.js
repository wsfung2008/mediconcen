import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
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
