import React from 'react';
import {useState, useContext, useEffect } from 'react';
import {
  StyleSheet,  
} from 'react-native';
import ConsultList from '../components/ConsultList';
import {AuthContext} from '../navigation/MainStackNavigator';
import {getSummaries} from '../../helpers/api';

import DatePicker from 'react-native-datepicker';

import moment from "moment";


const DailyRecordScreen = ({ route, navigation }) => {


    const [year, setYear] = useState('2021');
    const [month, setMonth] = useState('04');
    const [day, setDay] = useState('22');

    const [listData, setListData] = useState([]);

    const { token } = useContext(AuthContext);

    const [date, setDate]= useState(`${year}-${month}-${day}`);


    useEffect(function(){

      //get summaries for specified date to display in ConsultList
      getSummaries(token, year, month, day, 1)
      .then(result=>{
        console.log('result from getSummaries: ', result);
        console.log('result.data: ', result.data);
        setListData(result.data);
        

      }).catch(err=>{
                      console.log("Failed to get daily summaries, ", err.message);
                      if (err.message==="Request failed with status code 404")
                        setListData([]);
                    });               
   
    }, [year, month, day]);

    

    return (
    
        
        <>
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
