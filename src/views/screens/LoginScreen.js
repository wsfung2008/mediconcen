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
  TextInput,
  TouchableHighlight,
} from 'react-native-gesture-handler';

import {AuthContext} from '../navigation/MainStackNavigator';

import {signin} from '../../helpers/api';

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('lol@whatever.com');
    const [password, setPassword] = useState('secure pass');

    const {setToken} = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');

    const onPress=function(){

      signin(email, password)
                  .then(result=>{
                    console.log('token from signin: ', result);
                    setToken(result.data.token);

                }).catch(err=>{console.log(err);setLoginError('Incorrect email or password')});    
    }

    return (
      /* <Image /> company icon </Image>*/
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
