import React from 'react';
import {
  Text,
  View,
} from 'react-native';

import moment from 'moment';

 

const Detail =({consult})=>{


  console.log('consult received by Detail: ', consult);

  if (!consult)
    return <Text>Loading data</Text>;

  const {doctorName, patientName, diagnosis, medication, fee, datetime, followup}=consult;

    const LabeledText =({label, text})=>{
        return(
            <View style={{flexDirection:'row'}}>
                <Text style={{alignSelf: 'center', flex:1, fontSize:15, textAlign: 'right'}}>{label}</Text>
                <Text style={{alignSelf: 'center', paddingLeft:10, flex:2, fontSize:20}}>{text}</Text>
            </View>
        )
    }

    return(<View style={{   
                            
                            marginHorizontal: 10,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            paddingTop: "20%",                            
                            borderWidth: 0,
                            height: "80%"
                        }}>
                
                <LabeledText label="Doctor: " text={doctorName}/>
                <LabeledText label="Patient: " text={patientName}/>
                <LabeledText label="Diagnosis: " text={diagnosis}/>
                <LabeledText label="Medication: " text={medication}/>
                <LabeledText label="Fee: " text={`HKD ${fee}`}/>
                <LabeledText label="Date: " text={moment(datetime).format('YYYY-MM-DD').toString()}/>
                <LabeledText label="Time: " text={moment(datetime).format('HH:mm').toString()}/>
                <LabeledText label="Followup: " text={`${followup?'Yes':'No'}`}/>

            </View>
    );
}

export default Detail;
