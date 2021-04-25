import React from 'react';
import { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { getDetailsByID } from '../../helpers/api';

import Detail from '../components/Detail'
import { AuthContext } from '../navigation/MainStackNavigator';


const DetailScreen =  ({ route, navigation }) => {
    
    const { consultID } = route.params;
    const [consult, setConsult]=useState();
    const {token} = useContext(AuthContext);

    useEffect(function(){
                  
                  getDetailsByID(token, consultID)
                  .then(result=>{                    
                    setConsult(result.data);                    

                }).catch(err=>console.log(err));               
               
    }, [consultID]);
    

    return (
        <SafeAreaView>
            <Detail consult={consult}/>
        </SafeAreaView>
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

export default DetailScreen;
