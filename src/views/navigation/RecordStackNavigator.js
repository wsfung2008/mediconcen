import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DailyRecordScreen from '../screens/DailyRecordScreen'
import WeeklyRecordScreen from '../screens/WeeklyRecordScreen'
import MonthlyRecordScreen from '../screens/MonthlyRecordScreen'
import DetailScreen from '../screens/DetailScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const RecordTab = createMaterialTopTabNavigator();
function RecordTabNavigator() {
    return (
        <RecordTab.Navigator  headerMode='card' tabBarOptions={{
          labelStyle: { fontSize: 15, fontWeight:'bold', color:'#fff' },
          style: { backgroundColor: '#f58363' },
        }}>
          <RecordTab.Screen name="DailyRecord" component={DailyRecordScreen} options={{ title: 'Daily Record'}}/>
          <RecordTab.Screen name="WeeklyRecord" component={WeeklyRecordScreen} options={{ title: 'Weekly Record' }} />
          <RecordTab.Screen name="MonthlyRecord" component={MonthlyRecordScreen} options={{ title: 'Monthly Record' }} />
        </RecordTab.Navigator>
    );
}


const RecordStack = createStackNavigator();
function RecordStackNavigator() {
    return (
        <RecordStack.Navigator>
          <RecordStack.Screen name="RecordTab" component={RecordTabNavigator} options={{ headerShown:false }}/>
          <RecordStack.Screen name="Detail" component={DetailScreen}  options={{ title: 'Consultation Details' }}/>
        </RecordStack.Navigator>
    );
}

export default RecordStackNavigator;