import {
  BarChart
} from "react-native-chart-kit";

import React from 'react';
import {
  Dimensions
} from 'react-native';


function WeeklyBarChart({totals}){

  if (!totals || totals.length==0)
    return null;

  //console.log('totals:', totals);

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: totals
      }
    ]
  };
  
  
  const screenWidth = Dimensions.get("window").width;
  

  const chartConfig={
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    barPercentage: 0.7,
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 0, 0, 1)`,
    fillShadowGradient: "#2a7ab1",
    fillShadowGradientOpacity: 1,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
    style: {
      borderRadius: 16
    },
    
  };

  return (
      <BarChart
        data={data}
        width={screenWidth}
        height={220}
        yAxisLabel="$"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        fromZero
      />
  )
}

export default  WeeklyBarChart;