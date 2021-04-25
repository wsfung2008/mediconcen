
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
import CalendarStrip from "react-native-calendar-strip";
import WeeklyBarChart from "../components/WeeklyBarChart";
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
        console.log('result from getSummaries: ', result);
        console.log('result.data: ', result.data);
        setListData(result.data);
        

      }).catch(err=>{
                      console.log("Failed to get summaries, ", "xxx"+err.message+"xxx");
                      if (err.message==="Request failed with status code 404")
                        setListData([]);
                    });               
   
    }, [year, month, day]);

    const [startOfWeek, setStartOfWeek] = useState();
    const [endOfWeek, setEndOfWeek] = useState();
    const [totals, setTotals] = useState([0,0,0,0,0,0,0]);

    useEffect(function(){
                  
      getSummaries(token, moment(startOfWeek).format("YYYY"), moment(startOfWeek).format("MM"), moment(startOfWeek).format("DD"), 7)
      .then(result=>{
        console.log('result from getSummaries: ', result);
        console.log('result.data: ', result.data);
        const tempTotals=[0,0,0,0,0,0,0];
        result.data.forEach(
                              item=>{ tempTotals[moment(item.datetime).startOf('day').diff(moment(startOfWeek).startOf('day'), 'days')]+=parseFloat(item.fee); }
                            );
        console.log(totals);
        setTotals(tempTotals);

      }).catch(err=>{
                      console.log("Failed to get totals for the week, ", "xxx"+err.message+"xxx");
                      if (err.message==="Request failed with status code 404")
                        setTotals([0,0,0,0,0,0,0]);
                    });               
   
    }, [startOfWeek]);

    
    //if (!listData || listData.length==0)
    //return <Text>Loading data</Text>;

    return (
        //<SafeAreaView>
        
        <>
        <CalendarStrip
          style={{height:100, paddingVertical: 10}}

          numDaysInWeek={7}
          selectedDate={date}          
          onDateSelected={selectedDate=>{setDate(selectedDate); setYear(moment(selectedDate).format("YYYY")); setMonth(moment(selectedDate).format("MM")); setDay(moment(selectedDate).format("DD"));}}
          onWeekChanged={(start,end)=>{setStartOfWeek(start);setEndOfWeek(end);}}

          daySelectionAnimation={{type:'background', highlightColor:"#f29f4a", duration:300}}
        />
          
          {/*}
            <Text>{year}</Text>
            <Text>{month}</Text>
            <Text>{day}</Text>
            <Text>{date.format()}</Text>
            <Text>{!startOfWeek?'':startOfWeek.format()}</Text>
            <Text>{!endOfWeek?'':endOfWeek.format()}</Text>
          */}
            <WeeklyBarChart totals={totals}/>
            <ScrollView>
            <ConsultList data={listData} onpress={(consultID)=>navigation.navigate('Detail', {consultID: consultID})} />              
            </ScrollView>
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
