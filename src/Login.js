import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import Home from "./Home";
import SignUp from "./SignUp";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Linking,
    KeyboardAvoidingView,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Login = ({props,setToken}) => {
    const navigation=props.navigation
    const [fdata, setFdata] = useState({
        email: '',
        password: ''
    })

    const [errMsg, setErrMsg] = useState(null);
    const SendToBackend = () => {
        if (fdata.firstName == "" || fdata.lastName == "" || fdata.email == "" || fdata.password == "") {
            setErrMsg("all field are required");
            return;
        }
        else {
            fetch("http://192.168.40.75:3000/signin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fdata)
            })
                .then((res) => res.json()).then(
                    data => {
                        setToken(data.token)
                        //console.log(data);
                        if (data.error) {
                            setErrMsg(data.error);
                        }
                        else {
                            navigation.navigate('Home');
                        }
                    })
        }


        console.log(fdata);
    };
    return (
        
        <KeyboardAvoidingView
        style={styles.screen}
        behavior="padding"
      >
            <StatusBar style="auto" />
            <View style={styles.boxFlex}>
                <View>
                    <Text style={styles.welcomeTxt}>Welcome Back</Text>
                </View>
                {
                    errMsg ? <Text style={{ color: 'red' }}>{errMsg}</Text> : null
                }
                <View style={styles.box}>
                <MaterialIcons name="email" size={24} color="black" />
                    <TextInput style={styles.textInput}
                        placeholder="Email."
                        onPressIn={() => setErrMsg(null)}
                        onChangeText={(text) => setFdata({ ...fdata, email: text })}
                    ></TextInput>
                </View>


                <View style={styles.box}>
                <Fontisto name="key" size={24} color="black" />
                    <TextInput style={styles.textInput}
                        placeholder="Password."

                        secureTextEntry={true}
                        onChangeText={(text) => setFdata({ ...fdata, password: text })}
                        onPressIn={() => setErrMsg(null)}
                    ></TextInput>
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={() => SendToBackend()}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomFlex}>
                <View style={styles.hairline} />
                <TouchableOpacity style={styles.signUpTxt} onPress={() => navigation.navigate('SignUp')}>
                    <Text >"Don't have an account?" Sign Up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>


    )
}
const styles = StyleSheet.create({


    screen: {
        flex: 1,
        width: '100%',
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
    },
    boxFlex: {
        flex: 4,
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
        // height: 50,
        // flex: 1,
        // padding: 10,
        // marginLeft: 20,
        // width: "80%",
    
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
    buttonText: {
        fontSize: 20,
  
        fontFamily: "Gill Sans",
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
        marginBottom: 10,

    },

    //   loginButtonBelowText1: {
    //     fontFamily: 'AvenirNext-Bold',
    //     fontSize: 14,
    //     paddingHorizontal: 5,
    //     alignSelf: 'center',
    //     color: '#A2A2A2'
    //   },
});

export default Login;