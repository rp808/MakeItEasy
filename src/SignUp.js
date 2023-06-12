import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react';
import Home from "./Home";
import Login from "./Login";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Linking,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import codegenNativeCommands from "react-native/Libraries/Utilities/codegenNativeCommands";

const SignUp = ({ navigation }) => {
const [fdata, setFdata] = useState({
 firstName:'',
 lastName:'',
  email: '',
  password: '',
 
})

  const [errMsg, setErrMsg] = useState(null);
  const SendToBackend = () => {
    if (fdata.firstName == "" || fdata.lastName == "" || fdata.email == "" || fdata.password == ""  ){
      setErrMsg("all field are required");
      return;
   }
   else{
    fetch("http://192.168.40.75:3000/signup",{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(fdata)
    })
    .then((res) => res.json()).then(
      data => {
          //console.log(data);
          if(data.error){
            setErrMsg(data.error);
          }
          else{
            navigation.navigate('Home');
          }
        })
   }

    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
    console.log(fdata);  };




  return (
    <View style={styles.screen}>
      <StatusBar style="auto" />
      <View style={styles.boxFlex}>
        <View>
          <Text style={styles.welcomeTxt}>Hello and welcome</Text>
        </View>
        {
          errMsg ? <Text style={{ color: 'red' }}>{errMsg}</Text> : null
        }
        <View style={styles.box}>
          <TextInput style={styles.textInput}
            placeholder="First Name"
            autoCapitalize="none"
            onPressIn={() => setErrMsg(null)}
            onChangeText={(text) => setFdata({ ...fdata, firstName: text })}
          ></TextInput>
        </View>
        <View style={styles.box}>
          <TextInput style={styles.textInput}
            placeholder="Last Name"
            autoCapitalize="none"
            onPressIn={() => setErrMsg(null)}
            onChangeText={(text) => setFdata({ ...fdata, lastName: text })}
          ></TextInput>
        </View>
        <View style={styles.box}>
          <TextInput style={styles.textInput}
            placeholder="Email"
            autoCapitalize="none"
            onPressIn={() => setErrMsg(null)}
            onChangeText={(text) => setFdata({ ...fdata, email: text })}
          ></TextInput>
        </View>


        <View style={styles.box}>
          <TextInput style={styles.textInput}
            placeholder="Password"
            autoCapitalize="none"
            onPressIn={() => setErrMsg(null)}
            onChangeText={(text) => setFdata({ ...fdata, password: text })}
          ></TextInput>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={() => {
            SendToBackend();
          }} >
          <Text style={styles.signupTxt}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomFlex}>
        <View style={styles.hairline} />
        <TouchableOpacity style={styles.signUpTxt} onPress={() => navigation.navigate('Login')}>
          <Text >"Already have an account" Log In</Text>
        </TouchableOpacity>
      </View>
    </View>


  )
};
const styles = StyleSheet.create({


  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  boxFlex: {
    flex: 7,
    width: '100%',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bottomFlex: {
    flex: 2,
    width: '100%',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 30,
  },
  welcomeTxt: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  signupTxt: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  box: {

    borderRadius: 10,
    borderWidth: 1,
    height: 45,
    width: '80%',
    marginBottom: 20,

  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    width: "80%",
  },
  loginBtn: {
    width: "60%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#8DAA6F",
  },
  hairline: {
    marginTop: 40,
    backgroundColor: '#A2A2A2',
    height: 2,
    width: '80%',

  },
  signUpTxt: {
    marginTop: 5,
    height: 30,
    marginBottom: 30,

  },

  //   loginButtonBelowText1: {
  //     fontFamily: 'AvenirNext-Bold',
  //     fontSize: 14,
  //     paddingHorizontal: 5,
  //     alignSelf: 'center',
  //     color: '#A2A2A2'
  //   },
});

export default SignUp