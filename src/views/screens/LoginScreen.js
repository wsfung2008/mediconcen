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
import {signin} from '../../helpers/api';

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('lol@whatever.com');
    const [password, setPassword] = useState('secure pass');
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
    const [loginError, setLoginError] = useState('');

    const onPress=function(){

      signin(email, password)
                  .then(result=>{
                    console.log('token from signin: ', result);
                    setToken(result.data.token);

                }).catch(err=>{console.log(err);setLoginError('Incorrect email or password')});    
    }

    

    //style={{ alignSelf:'center', top:60, backgroundColor: "#ef5353", padding:20, borderWidth:0, fontWeight:"bold", borderRadius:20 }}
    //style={{textAlign:'center', fontSize:20, color:'#fff'}}
    return (
      /* <Image /> company icon*/
        <SafeAreaView>
          <View >

            <View style={{paddingTop:20, paddingHorizontal:13, flexDirection:'row', justifyContent:'space-between'}}>
              <Text>Email: </Text><Text style={{color:email?'#fff':'red'}}>Email address not valid</Text>
            </View>
            <TextInput  style={style.input} onChangeText={setEmail} value={email}/>
            <View style={{paddingTop:20, paddingHorizontal:13, flexDirection:'row', justifyContent:'space-between'}}>
              <Text>Password: </Text><Text style={{color:password?'#fff':'red'}}>Password must not be empty</Text>
            </View>
            <TextInput style={style.input} onChangeText={setPassword} value={password} textContentType='password' secureTextEntry={true}/>

            <Text style={{alignSelf:'center', color:'red'}}> {loginError}</Text>
          </View>
          

            <TouchableHighlight onPress={ email&&password?onPress:()=>{}} style={{marginTop:60}}>
              <View style={{ alignSelf:'center', backgroundColor: "#ef5353", padding:20, borderWidth:0, borderRadius:20 }}>
              <Text style={{textAlign:'center', fontSize:20, color:'#fff'}}>Login button</Text>
              </View>
            </TouchableHighlight>
          

          {/*  
            <TouchableHighlight onPress={ ()=>{navigation.navigate('Detail')} }>
                <Text>Temporary detail screen button</Text>
            </TouchableHighlight>
            
            <TouchableHighlight onPress={ ()=>{navigation.navigate('DailyRecord')} }>
                <Text>Temporary daily record screen button</Text>
            </TouchableHighlight>
        */}
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

export default LoginScreen;
