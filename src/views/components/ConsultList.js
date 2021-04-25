//consult list is used in daily, weekly, monthly record screen

//accept an array of consults
//sort accoroding to time
//group into time section
//for nonempty section, create section
//at the top there are the doctor, patient and money icons
//each section starts with the timeslot
//each row is a clickable card listing the doctor name, patient name and fee
//the card links the corresponding detail screen


import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  StatusBar
} from 'react-native';
import {
  TouchableHighlight
} from 'react-native-gesture-handler';
import {convertList} from '../../helpers/convertList'


const Item = ({ consultID, doctor, patient, fee, onpress }) => {

return    <TouchableHighlight onPress={onpress}>
            <View style={styles.item}>
              <Text style={{
                      padding: 2,
                      flex: 4
                  }}>{doctor}</Text>
              <Text style={{
                      padding: 2,
                      flex: 4
                  }}>{patient}</Text>
              <Text style={{
                      padding: 2,
                      flex: 2
                  }}>{'$'+fee}</Text>
            </View>
          </TouchableHighlight>

        };

const ConsultList =( {data, onpress} )=>{


    if (!data )
    return <Text>Loading data2</Text>;

    if ( data.length==0)
    return <Text>No record for this day</Text>;

    data = convertList(data);

    return (

        <>  
          <View style={[styles.item, { backgroundColor: "#ef5353", color:"#ffffff"}]}> 
            <Text style={{
                    padding: 2,
                    flex: 4,
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>Doctor</Text>
            <Text style={{
                    padding: 2,
                    flex: 4,
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>Patient</Text>
            <Text style={{
                    padding: 2,
                    flex: 2,
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>Fee</Text>
          </View>
          
          <SectionList
            sections={data}
            keyExtractor={(item, index) => item.consultID}
            renderItem={({ item }) => <Item consultID={item.consultID} doctor={item.doctorName} patient={item.patientName} fee={item.fee} onpress={()=>onpress(item.consultID)}/>}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{
                  (parseInt(title)>12?(parseInt(title)-12):parseInt(title))+(parseInt(title)>11?' pm':' am')}</Text>
            )}
            />
          </>
  
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16
    },
    item: {
      backgroundColor: "#f58363",
      padding: 10,
      margin: 4,
      flexDirection: 'row'
    },
    header: {
        textAlign: 'center',
      fontSize: 22,
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 24
    }
  });

export default ConsultList;










