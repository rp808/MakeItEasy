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

const Login = () => {
  return (
    <View>
     <View>
        <TextInput   placeholder="Email."></TextInput>
     </View>
     <View>
     <TextInput   placeholder="Password."></TextInput>
     </View>
     
     </View>
  )
}

export default Login