import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import {
  StyleSheet,
  Text,
  View,
 
  TextInput,
 
  TouchableOpacity,
 
  KeyboardAvoidingView,
  ImageBackground
} from "react-native";


const SignUp = ({ props, setToken  }) => {
  const navigation=props.navigation
  const [fdata, setFdata] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',

  })

  const [errMsg, setErrMsg] = useState(null);
  const SendToBackend = () => {
    if (fdata.firstName == "" || fdata.lastName == "" || fdata.email == "" || fdata.password == "") {
      setErrMsg("all field are required");
      return;
    }
    else {
      fetch("http://192.168.40.75:3000/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fdata)
      })
        .then((res) => res.json()).then(
          data => {
            //console.log(data);
            if (data.error) {
              setErrMsg(data.error);
            }
            else {
              setToken(data.token);
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
    console.log(fdata);
  };




  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"
    >
      <StatusBar style="auto" />
      <ImageBackground
        source={require("./assets/elena-joland-mjeQon0Mh_Q-unsplash.jpg")}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.boxFlex}>
          <View>
            <Text style={styles.welcomeTxt}>MakeItEasy</Text>
          </View>
          {
            errMsg ? <Text style={{ color: 'red' }}>{errMsg}</Text> : null
          }
          <View style={styles.box}>
          <Fontisto name="person" size={24} color="#05595b" />
            <TextInput style={styles.textInput}
              placeholder="First Name"
              autoCapitalize="none"
              onPressIn={() => setErrMsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, firstName: text })}
            ></TextInput>
          </View>
          <View style={styles.box}>
          <Fontisto name="person" size={24} color="#05595b" />
            <TextInput style={styles.textInput}
              placeholder="Last Name"
              autoCapitalize="none"
              onPressIn={() => setErrMsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, lastName: text })}
            ></TextInput>
          </View>
          <View style={styles.box}>
            <MaterialIcons name="email" size={24} color="#05595b" />
            <TextInput style={styles.textInput}
              placeholder="Email"
              autoCapitalize="none"
              onPressIn={() => setErrMsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, email: text })}
            ></TextInput>
          </View>


          <View style={styles.box}>
          <Fontisto name="key" size={24} color="#05595b" />
            <TextInput style={styles.textInput}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
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
      </ImageBackground>
    </KeyboardAvoidingView>


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
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bottomFlex: {
    flex: 2,
    width: '100%',
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 30,
  },
  welcomeTxt: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 35,
    color: '#05595b',
    fontFamily: 'GillSans-SemiBoldItalic',
  },
  signupTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "white",
    letterSpacing: 2,
  },
  imageBackground: {

    height: '100%',
    width: '100%',
    //   opacity: 0.5,

  },
  box: {
    flexDirection: 'row',
    width: '80%',
    marginVertical: 10,
    // backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // alignSelf: 'center',
    borderWidth: 0.8,
    elevation: 20,
    backgroundColor: "#fff"

    // borderRadius: 10,
    // borderWidth: 0.8,
    // height: 45,
    // width: '80%',
    // marginBottom: 20,


  },
  textInput: {
    fontSize: 18,
    marginLeft: 10,
    width: '80%',



  },
  loginBtn: {
    width: "60%",
    borderRadius: 8,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#05595b",
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