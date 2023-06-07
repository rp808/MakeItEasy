import { StatusBar } from "expo-status-bar";
import React, {useState} from 'react';
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
    return(
    <View style={styles.screen}> 
    <StatusBar style="auto" />
 
   
  
   <View style={styles.signUpTxt}> 
   <Text >"Already have an account" Log In</Text>
   </View>
  </View>
    )
};
const styles = StyleSheet.create({
    
    
    screen:{
        flex:1,
        width:'100%',
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center",
    },
    

      signUpTxt:{
        marginTop: 5,
        height: 30,
        marginBottom: 30,
    
      },
      

    });
