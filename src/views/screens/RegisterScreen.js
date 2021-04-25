import React from 'react';
import { useState, useContext } from 'react';
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
import COLORS from '../../consts/colors';
const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
import {AuthContext} from '../navigation/MainStackNavigator';
import moment from 'moment';
import {signup} from '../../helpers/api';

const RegisterScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [clinicName, setClinicName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    
    //how to get 
//    const { setToken} =
     const {setToken} = useContext(AuthContext);
     //console.log('from use authcontext: ', temp);

/*
    navigation.navigate('Root', {
      screen: 'Settings',
      params: {
        screen: 'Sound',
        params: {
          screen: 'Media',
        },
      },
    });
*/

    const onPress=function(){

      
      signup(email, password, clinicName, phone, address)
                  .then(result=>{
                    console.log('token from signup: ', result);
                    setToken(result.data.token);

                }).catch(err=>console.log(err));    
    }

    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    function onChangedEmail(inputEmail){
      if (validateEmail(inputEmail))
        setValidEmail(true);
      else
        setValidEmail(false);
      setEmail(inputEmail);
    }


    return (
      /* <Image /> company icon*/
        <SafeAreaView >
        <View >
          <View style={{paddingTop:20, paddingHorizontal:13, flexDirection:'row', justifyContent:'space-between'}}>
              <Text>Email: </Text><Text style={{color:validEmail?'#fff':'red'}}>Email address not valid</Text>
          </View>
          <TextInput  style={style.input} onChangeText={onChangedEmail} value={email}/>
          
          <View style={{paddingTop:5, paddingHorizontal:13, flexDirection:'row', justifyContent:'space-between'}}>
            <Text>Password: </Text><Text style={{color:password?'#fff':'red'}}>Password must not be empty</Text>
          </View>
          <TextInput style={style.input} onChangeText={setPassword} value={password} textContentType='password' secureTextEntry={true}/>

          <View style={{paddingTop:5, paddingHorizontal:13, flexDirection:'row', justifyContent:'space-between'}}>
            <Text>Clinic name: </Text><Text style={{color:clinicName?'#fff':'red'}}>Clinic name must not be empty</Text>
          </View>
          <TextInput  style={style.input} onChangeText={setClinicName} value={clinicName} />
          
          <View style={{paddingTop:5, paddingHorizontal:13, flexDirection:'row', justifyContent:'space-between'}}>
            <Text>Phone number: </Text><Text style={{color:phone?'#fff':'red'}}>Phone number must not be empty</Text>
          </View>
          <TextInput  style={style.input} onChangeText={setPhone} value={phone} />
          
          <View style={{paddingTop:5, paddingHorizontal:13, flexDirection:'row', justifyContent:'space-between'}}>
            <Text>Address: </Text><Text style={{color:address?'#fff':'red'}}>Address must not be empty</Text>
          </View>
          <TextInput  style={style.input} onChangeText={setAddress} value={address} />
        </View>
        
          <TouchableHighlight onPress={email&&password&&clinicName&&phone&&address?onPress:()=>{}} style={{marginTop:60}}>
            <View style={{ alignSelf:'center', backgroundColor: "#ef5353", padding:20, borderWidth:0, borderRadius:20 }}>    
                <Text style={{textAlign:'center', fontSize:20, color:'#fff'}}>Register button</Text>
            </View >
          </TouchableHighlight>
        
         
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
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
  },
  
});

export default RegisterScreen;
