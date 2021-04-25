
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
  Button
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
import MonthlyChart from "../components/MonthlyChart";
import moment from "moment";


const WeeklyRecordScreen = ({ route, navigation }) => {

    //year, month, day //initialize to param if exist, otherwise .now()
    const [year, setYear] = useState('2021');
    const [month, setMonth] = useState('04');
    const [day, setDay] = useState('22');
    //[] = useState(); //need to get summary of current day
    const [listData, setListData] = useState([]);

    const { token } = useContext(AuthContext);

    const [date, setDate]= useState(moment(`${year}-${month}-${day}`));

    //let user choose date
    //show clickable list for that day
    useEffect(function(){
                  
      getSummaries(token, year, month, day, 1)
      .then(result=>{
        //console.log('result from getSummaries: ', result);
        //console.log('result.data: ', result.data);
        setListData(result.data);       

      }).catch(err=>{
                      console.log("Failed to get summaries, ", "xxx"+err.message+"xxx");
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

        //console.log('result from getSummaries: ', result);
        //console.log('result.data: ', result.data);
        
        let tempDailyCounts =  new Array(selectedDate.daysInMonth());
        //[ { date: "2017-01-02", count: 1 }, ];
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

/*
        let length = 0;
        result.data.forEach(
                              item=>{ 
                                if( length==0 || moment(item.datetime).format("YYYY-MM-DD")!=tempDailyCounts[length-1].date ) {
                                  tempDailyCounts.push({ date: moment(item.datetime).format("YYYY-MM-DD"), count:1 });
                                  length++;
                                }else{
                                  tempDailyCounts[length-1].count=tempDailyCounts[length-1].count+1;
                                }
                              }
                              
                            );
  */      
        //console.log(tempDailyCounts);
        setDailyCounts(tempDailyCounts);

      }).catch(err=>{
                      console.log("Failed to get daily counts, ", "xxx"+err.message+"xxx");
                      if (err.message==="Request failed with status code 404")
                        setDailyCounts([]);
                    });               
   
    }, [selectedYear, selectedMonth]);

    
    //if (!listData || listData.length==0)
    //return <Text>Loading data</Text>;

    return (
        //<SafeAreaView>
        
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
{/*
            <ScrollView>
            <ConsultList data={listData} onpress={(consultID)=>navigation.navigate('Detail', {consultID: consultID})} />              
            </ScrollView>
*/}            
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

export default WeeklyRecordScreen;
