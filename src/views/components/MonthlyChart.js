
import React from 'react';

import moment from 'moment';
import {ContributionGraph} from 'react-native-chart-kit'
  
  function MonthlyChart({dailyCounts, year, month, setYear, setMonth, setDay}){
  
    /*test data
    const commitsData = [
        { date: "2021-04-02", count: 1 },
        { date: "2021-04-03", count: 2 },
        { date: "2021-04-04", count: 3 },
        { date: "2021-04-05", count: 4 },
        { date: "2021-04-06", count: 5 },
        { date: "2021-04-11", count: 2 },
        { date: "2021-04-12", count: 3 },
        { date: "2021-04-13", count: 2 },
        { date: "2021-04-22", count: 4 },
        { date: "2021-04-25", count: 2 },
        { date: "2021-04-30", count: 4 }
      ];
    */


    return (
        <>
                <ContributionGraph
                values={dailyCounts}
                squareSize={30}
                endDate={moment(`${year}-${month}-1`).endOf('month')}
                numDays={moment(`${year}-${month}-1`).daysInMonth()}
                width={250}
                height={300}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 256, ${opacity})`,
                    style: {
                    borderRadius: 16,
                    },
                }}
                onDayPress={(item)=>{
                    console.log("selecting a day on calendar: ", item, moment(item.date).format("YYYY-MM-DD"));
                    setYear(moment(item.date).format("YYYY"));
                    setMonth(moment(item.date).format("MM"));
                    setDay(moment(item.date).format("DD"));
                }}	
                />            

        </>
    )
  }
  
  export default  MonthlyChart;