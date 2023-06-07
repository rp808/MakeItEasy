import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react';
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

export const Home = () => {
    return (
        <View style={styles.screen}>
            <StatusBar style="auto" />

            <View style={styles.appNameFlex}>
                <View>
                    <Text style={styles.logoTxt}>MakeItEasy</Text>
                </View>

            </View>


            <View style={styles.cardsFlex}>

            </View>


            <View style={styles.buttomNavFlex}>

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
    appNameFlex: {
        flex: 1.2,
        width: '100%',
        backgroundColor: "#fbc",
        paddingLeft:15,
        alignItems: "start",
        justifyContent: "center",
    },
    cardsFlex: {
        flex: 10,
        width: '100%',
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    buttomNavFlex: {
        flex: 1,
        width: '100%',
        backgroundColor: "#fbc",
        alignItems: "center",
        justifyContent: "center",
    },
    logoTxt:{
        fontSize: 22,
        fontWeight: 'bold',
        paddingTop: 35,
        fontFamily:'GillSans-SemiBoldItalic',
    },
    //   signUpTxt:{
    //     marginTop: 5,
    //     height: 30,
    //     marginBottom: 30,

    //   },


});
