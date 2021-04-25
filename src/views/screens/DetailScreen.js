import React from 'react';
import { useEffect, useState, useContext } from 'react';
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import { getDetailsByID } from '../../helpers/api';
const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

import Detail from '../components/Detail'
import Detail2 from '../components/Detail2'
import { AuthContext } from '../navigation/MainStackNavigator';


const DetailScreen =  ({ route, navigation }) => {

    console.log(route.params)
    //how to get 
    const { consultID } = route.params;
    const [consult, setConsult]=useState();
    const {token} = useContext(AuthContext);

    useEffect(function(){
                  
                  getDetailsByID(token, consultID)
                  .then(result=>{
                    //console.log('result from getDetailsByID: ', result);
                    setConsult(result.data);
                    //console.log('result.data: ', result.data);

                }).catch(err=>console.log(err));               
               
    }, [consultID]);

    /*
    useEffect(async function ()  {
      consult = await getDetailsByID(consultID);//.then(()=>console.log('consultID', consultID));
      console.log('consult: ', consult);
    }, [consultID])
*/
    

    return (
        <SafeAreaView>
            {/*header */}
            {/*doctor, patient, diag, med, fee, date, time */}
            <Detail consult={consult}/>
        </SafeAreaView>
    );

};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});

export default DetailScreen;
