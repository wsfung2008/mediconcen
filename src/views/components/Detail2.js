import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import moment from 'moment';

 

const Detail2 =({consult})=>{


  console.log('consult received by Detail: ', consult);
  //const {doctorName} = consult;
  return <Text>{JSON.stringify(consult)}</Text>;

}

export default Detail2;
