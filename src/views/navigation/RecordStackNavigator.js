import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DailyRecordScreen from '../screens/DailyRecordScreen'
import WeeklyRecordScreen from '../screens/WeeklyRecordScreen'
import MonthlyRecordScreen from '../screens/MonthlyRecordScreen'
import DetailScreen from '../screens/DetailScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


/*
const DailyRecordStack = createStackNavigator();
function DailyRecordStackNavigator() {
    return (
        <DailyRecordStack.Navigator>
          <DailyRecordStack.Screen name="DailyRecordList" component={DailyRecordScreen} />
          <DailyRecordStack.Screen name="DailyRecordDetails" component={DetailScreen} />
        </DailyRecordStack.Navigator>
    );
}

const WeeklyRecordStack = createStackNavigator();
function WeeklyRecordStackNavigator() {
    return (
        <WeeklyRecordStack.Navigator>
          <WeeklyRecordStack.Screen name="WeeklyRecordList" component={WeeklyRecordScreen} />
          <WeeklyRecordStack.Screen name="WeeklyRecordDetails" component={DetailScreen} />
        </WeeklyRecordStack.Navigator>
    );
}

const MonthlyRecordStack = createStackNavigator();
function MonthlyRecordStackNavigator() {
    return (
        <MonthlyRecordStack.Navigator>
          <MonthlyRecordStack.Screen name="MonthlyRecordList" component={MonthlyRecordScreen} />
          <MonthlyRecordStack.Screen name="MonthlyRecordDetails" component={DetailScreen} />
        </MonthlyRecordStack.Navigator>
    );
}

const RecordTab = createBottomTabNavigator();
function RecordTabNavigator() {
    return (
        <RecordTab.Navigator>
          <RecordTab.Screen name="DailyRecord" component={DailyRecordStackNavigator} />
          <RecordTab.Screen name="WeeklyRecord" component={WeeklyRecordStackNavigator} />
          <RecordTab.Screen name="MonthlyRecord" component={MonthlyRecordStackNavigator} />
        </RecordTab.Navigator>
    );
}

*/
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