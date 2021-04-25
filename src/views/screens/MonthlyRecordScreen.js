
import React from 'react';
import {useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import {
  ScrollView,  
} from 'react-native-gesture-handler';
import ConsultList from '../components/ConsultList';
import {AuthContext} from '../navigation/MainStackNavigator';
import {getSummaries} from '../../helpers/api';
import MonthlyChart from "../components/MonthlyChart";
import moment from "moment";


const WeeklyRecordScreen = ({ route, navigation }) => {

    //TODO: dont hardcode starting date
    const [year, setYear] = useState('2021');
    const [month, setMonth] = useState('04');
    const [day, setDay] = useState('22');
    
    const [listData, setListData] = useState([]);

    const { token } = useContext(AuthContext);

    
    useEffect(function(){
                  
      getSummaries(token, year, month, day, 1)
      .then(result=>{
    
        setListData(result.data);       

      }).catch(err=>{
                      console.log("Failed to get weekly summaries, ", err.message);
                      if (err.message==="Request failed with status code 404")
                        setListData([]);
                    });               
   
    }, [year, month, day]);

    const [selectedYear, setSelectedYear] = useState(2021);
    const [selectedMonth, setSelectedMonth] = useState(4);
    const [dailyCounts, setDailyCounts] = useState([]);

    useEffect(function(){

      const selectedDate = moment(`${selectedYear}-${selectedMonth}-01`);
                  
      getSummaries(token, selectedDate.format("YYYY"), selectedDate.format("MM"), "01", selectedDate.daysInMonth())
      .then(result=>{

        
        let tempDailyCounts =  new Array(selectedDate.daysInMonth());
        //format required: [ { date: "2017-01-02", count: 1 }, ];
        for (let i=0;i<selectedDate.daysInMonth();i++)
          tempDailyCounts[i]={date: selectedDate.format("YYYY-MM-"+(i+1)), count:0};
        console.log("test", tempDailyCounts);

        result.data.forEach(
          item=>{
            console.log(item);
            console.log(parseInt(moment(item.datetime).format("DD")));
            console.log(tempDailyCounts[parseInt(moment(item.datetime).format("DD"))])
            tempDailyCounts[parseInt(moment(item.datetime).format("DD"))-1].count++;
          }
        );


        setDailyCounts(tempDailyCounts);

      }).catch(err=>{
                      console.log("Failed to get daily counts, ", "xxx"+err.message+"xxx");
                      if (err.message==="Request failed with status code 404")
                        setDailyCounts([]);
                    });               
   
    }, [selectedYear, selectedMonth]);

    

    return (

        
        <>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Button style={{flex:1}} title="Prev" onPress={()=>{ 
                                          if (selectedMonth==1) {
                                            setSelectedMonth(12);
                                            setSelectedYear(selectedYear-1)
                                          }else{
                                            setSelectedMonth(selectedMonth-1);
                                          }}}/>
          <Text style={{flex:1, textAlign:'center'}} >{moment(`${selectedYear}-${selectedMonth}-1`).format("MMM YYYY")} </Text>
          <Text></Text>
          <Button style={{flex:1}} title="Next" onPress={()=>{ 
                                          if (selectedMonth==12) {
                                            setSelectedMonth(1);
                                            setSelectedYear(selectedYear+1)
                                          }else{
                                            setSelectedMonth(selectedMonth+1);
                                          }}}/>
        </View>                                          
        <View style={{alignSelf:'center'}}>
          <MonthlyChart dailyCounts={dailyCounts} setYear={setYear} setMonth={setMonth} setDay={setDay} year={selectedYear} month={selectedMonth}/>
          
        </View>
        <Text>{year}-{month}-{day}</Text>

        <ScrollView>
          <ConsultList data={listData} onpress={(consultID)=>navigation.navigate('Detail', {consultID: consultID})} />              
        </ScrollView>

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

export default WeeklyRecordScreen;
