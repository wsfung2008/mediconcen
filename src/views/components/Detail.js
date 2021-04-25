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

 

const Detail =({consult})=>{


  console.log('consult received by Detail: ', consult);

  if (!consult)
    return <Text>Loading data</Text>;

  const {doctorName, patientName, diagnosis, medication, fee, datetime, followup}=consult;
  //console.log({doctorName, patientName, diagnosis, medication, fee, datetime, followup});
  //console.log('doctorname: ', consult.doctorName);
  
  /*
  //get data with consultID here
   const doctorName= 'Dr X'; 
   const patientName='Tony'; 
   const diagnosis='Too late to save';
   const medication = 'Eat more vegetable';
   const fee= '10000';
   const datetime= moment().format('YYYY-MM-DD HH:mm');
   const followup= true;
*/

  //console.log({doctor, patient, diag, med, fee, datetime, followup});

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
