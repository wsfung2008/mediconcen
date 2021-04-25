

//local state: current day
//consult array is from context? 
//shouldnt pull the entire list if browsing daily record, bad data efficieny? caching

//should be pulled only once, not repull after switching day
//pull once when login?
//local sync storage
//only update when create new consultation? 
//how to know when to update

//header
//consultList

import { parseTwoDigitYear } from 'moment';
import React from 'react';
import {useState, useContext, useEffect } from 'react';
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
import ConsultList from '../components/ConsultList';
import {AuthContext} from '../navigation/MainStackNavigator';
import {getSummaries} from '../../helpers/api';
//import COLORS from '../../consts/colors';
const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
import DatePicker from 'react-native-datepicker';

import moment from "moment";


const DailyRecordScreen = ({ route, navigation }) => {

    //year, month, day //initialize to param if exist, otherwise .now()
    const [year, setYear] = useState('2021');
    const [month, setMonth] = useState('04');
    const [day, setDay] = useState('22');
    //[] = useState(); //need to get summary of current day
    const [listData, setListData] = useState([]);

    const { token } = useContext(AuthContext);

    const [date, setDate]= useState(`${year}-${month}-${day}`);

    //let user choose date
    //show clickable list for that day
    useEffect(function(){
                  
      getSummaries(token, year, month, day, 1)
      .then(result=>{
        console.log('result from getSummaries: ', result);
        console.log('result.data: ', result.data);
        setListData(result.data);
        

      }).catch(err=>{
                      console.log("Failed to get summaries, ", "xxx"+err.message+"xxx");
                      if (err.message==="Request failed with status code 404")
                        setListData([]);
                    });               
   
    }, [year, month, day]);

    

    //if (!listData || listData.length==0)
    //return <Text>Loading data</Text>;

    return (
        //<SafeAreaView>
        
        <>
          {/*choose date here*/}
          <DatePicker
            style={{ alignSelf:'center', width:300, padding:20}}
            date={date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2010-01-01"
            maxDate="2030-12-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(selectedDate) => { 
              setYear(moment(selectedDate).format("YYYY"));
              setMonth(moment(selectedDate).format("MM"));
              setDay(moment(selectedDate).format("DD"));
              setDate(selectedDate);
              }}
                    
          />
        
          <ConsultList data={listData} onpress={(consultID)=>navigation.navigate('Detail', {consultID: consultID})} />
          
          </>
        //</SafeAreaView>
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

export default DailyRecordScreen;
