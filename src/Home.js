import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';
import Login from "../src/Login";
import FilterPage from "./FilterPage";
import Recipe from "./Recipe";
import { data } from "./data";
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
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const Home = ({ navigation }) => {
    
    useEffect(() => {
        sendDataToServer();
    }, []);


    const sendDataToServer = async () => {
        try {
            const response = await fetch('http://192.168.40.75:3000/cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });


        } catch (error) {
            console.error('An error occurred while sending data:', error);
        }
    };


    const renderItem = ({ item }) => {
        const totalCalories = item.nutrition.totalCalories;
        return (
            <TouchableOpacity style={styles.cards} onPress={() => { navigation.navigate("Recipe", { item, totalCalories }) }}>
                <Image source={{ uri: item.imageSource }} style={styles.image} />

                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.nutritionContainerLeft}>
                <Text style={styles.nutritionText}> Serving:  {item.serving}</Text>

                </View>
                <View style={styles.nutritionContainer}>

                    {/* <View style={styles.leftItem}>

                        <Text style={styles.nutritionText}> Serving:  {item.serving}</Text>
                    </View> */}
                    <View style={styles.leftItem}>
                    <Ionicons name="ios-flame" size={20} color="#062c30" />
                    <Text style={styles.nutritionText}>{totalCalories}</Text>
                    </View>

                    <View style={styles.rightItem}>
                        <Ionicons name="md-timer" size={20} color="#062c30" />
                        <Text style={styles.nutritionText}>{item.time}</Text>
                    </View>
                </View>
              


            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.screen}>
            <StatusBar style="auto" />

            <View style={styles.appNameFlex}>
                <View >
                    <Text style={styles.logoTxt}>MakeItEasy</Text>
                </View>

            </View>


            <View style={styles.cardsFlex}>

                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.listContainer}
                />

            </View>


            <View style={styles.buttomNavFlex}>
                <View style={styles.iconContainer}>
                    <Image style={styles.iconImg} source={require("./assets/home.png")} />

                </View>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('FilterPage')}>
                    <Image style={styles.iconImg} source={require("./assets/filter.png")} />

                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Login')}>
                    <Image style={styles.iconImg} source={require("./assets/logout.png")} />

                </TouchableOpacity>


            </View>




        </View>
    )
};
const styles = StyleSheet.create({

    nutritionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 10,
        justifyContent: 'space-between',

    },
    nutritionContainerLeft:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -60,
       marginTop: 10,
 
    },
    leftItem: {
        flexDirection: 'row',
        marginLeft:5,
        marginRight:5
      //  alignItems: 'center',
      },
      rightItem: {
        flexDirection: 'row',
        marginLeft:30,
        marginRight:5
        //alignItems: 'center',
      },
    nutritionIcon: {
        marginRight: 2,
    },
    nutritionText: {
        fontSize: 18,
        marginLeft: 5,
        marginRight: 15,
        fontSize: 17,

        fontFamily: 'GillSans-SemiBold',
        color: '#062c30',

    },
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
        backgroundColor: "#fff",
        paddingLeft: 15,
        alignItems: "start",
        justifyContent: "center",
    },
    cardsFlex: {
        flex: 10,

        width: '100%',
        backgroundColor: "#fff",
        alignItems: "right",
        justifyContent: "center",

    },

    buttomNavFlex: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 54,

        flex: 0,
        margin: 10,

    },
    iconContainer: {
        alignItems: 'center',
        marginLeft: 35,
        marginRight: 55,
        marginBottom: 15,


    },
    logoTxt: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 35,
        color: '#05595b',
        fontFamily: 'GillSans-SemiBoldItalic',
    },
    cards: {

        width: "40%",
        height: 200,
        backgroundColor: '#D1D8D5',
        borderRadius: 8,

        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginRight: "5%",
        marginLeft: "5%",
        marginBottom: "5%",

    },
    iconImg: {

        width: 30,
        height: 30,

        marginBottom: 10,
    },
    image: {
        marginTop: -80,
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    description: {
        fontSize: 17,
        fontFamily: 'GillSans-SemiBold',
        marginBottom: 5,

        width: "90%",
        color: '#062c30',

    },
    rating: {
        fontSize: 14,
        color: '#888888',
        marginRight: "50%",
    },
    listContainer: {
        paddingHorizontal: 10,
    }



});
export default Home;
