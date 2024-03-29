import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import API_BASE_URL from '../config';
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
    ImageBackground
} from "react-native";


const Login = ({ props, setToken }) => {
    const navigation = props.navigation
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
            fetch(`${API_BASE_URL}/signin`, {
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
                        <MaterialIcons name="email" size={24} color="#05595b" />
                        <TextInput style={styles.textInput}
                            placeholder="Email."
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onPressIn={() => setErrMsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, email: text })}
                        ></TextInput>
                    </View>


                    <View style={styles.box}>
                        <Fontisto name="key" size={24} color="#05595b" />
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
            </ImageBackground>
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
    imageBackground: {

        height: '100%',
        width: '100%',
        //   opacity: 0.5,

    },
    boxFlex: {
        flex: 4,
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

        // height: 50,
        // flex: 1,
        // padding: 10,
        // marginLeft: 20,
        // width: "80%",

    },
    loginBtn: {
        width: "50%",
        borderRadius: 8,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "#05595b",


    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white",
        letterSpacing: 2,
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