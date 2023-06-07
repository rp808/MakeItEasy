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
    FlatList,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Recipe = () => {
    return (
        <View style={styles.screen} >
            {/* <Text>Hello</Text> */}

            <View style={styles.recipeImg}>

            <Image style={styles.image} source={require("./assets/eggs.jpg")}/>


            </View>

            <View style={styles.titleRating}></View>


            <View style={styles.ingreInstruct}></View>


            <View style={styles.userRating}></View>


            <View style={styles.buttomNavFlex}></View>






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

    recipeImg: {
        flex:2.5,
        width: '100%',
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "center",
    },
    titleRating: {
        flex: 0.5,
        width: '100%',
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    ingreInstruct: {
        flex: 3,
        width: '100%',
        backgroundColor: "#fbc",
        alignItems: "center",
        justifyContent: "center",
    },
    userRating: {
        flex: 0.5,
        width: '100%',
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    buttomNavFlex: {
        flex: 0.5,
        width: '100%',
        backgroundColor: "#fbc",
        paddingLeft: 15,
        alignItems: "start",
        justifyContent: "center",
        
    },

    image:{
        width: '100%',
        height: '100%',
    },
});


export default Recipe;