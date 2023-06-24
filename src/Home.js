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
        return(
        <TouchableOpacity style={styles.cards} onPress={() => { navigation.navigate("Recipe", { item , totalCalories }) }}>
            <Image source={{ uri: item.imageSource }} style={styles.image} />
          
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.nutritionContainer}>
            <Ionicons name="ios-flame" size={20} color="black" /> 
            <Text style={styles.nutritionText}>{totalCalories}</Text>
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
                {/* <View style={styles.cards}>
                    <Image source={require("./assets/eggs.jpg")} style={styles.image}></Image>
                    <Text style={styles.description}>recipe description</Text>
                    <Text style={styles.rating}>rating</Text>
                </View> */}
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
                    {/* <Text style={styles.ttitle}>Homee</Text> */}
                </View>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('FilterPage')}>
                    <Image style={styles.iconImg} source={require("./assets/filter.png")} />
                    {/* <Text style={styles.ttitle}>Homee</Text> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Login')}>
                    <Image style={styles.iconImg} source={require("./assets/logout.png")} />
                    {/* <Text style={styles.ttitle}>Homee</Text> */}
                </TouchableOpacity>


            </View>




        </View>
    )
};
const styles = StyleSheet.create({

    nutritionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft:-90,
        marginTop: 10,

      },
      nutritionIcon: {
        marginRight: 2,
      },
      nutritionText: {
        fontSize: 18,
        marginLeft: 5,
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
        // width: '100%',
        // backgroundColor: "#fbc",
        // alignItems: "center",
        // justifyContent: "center",
    },
    iconContainer: {
        alignItems: 'center',
        marginLeft: 35,
        marginRight: 55,
        marginBottom: 15,
        // marginTop:15,

    },
    logoTxt: {
        fontSize: 22,
        fontWeight: 'bold',
        paddingTop: 35,
        fontFamily: 'GillSans-SemiBoldItalic',
    },
    cards: {

        width: "40%",
        height: 200,
        backgroundColor: '#CFD4D2',
        borderRadius: 8,
        // paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginRight: "5%",
        marginLeft: "5%",
        marginBottom: "5%",

        // marginBottom: 10,
        // marginTop:20,
        // marginLeft:20,  


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
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        //  marginRight: "10%",
        width: "90%"
    },
    rating: {
        fontSize: 14,
        color: '#888888',
        marginRight: "50%",
    },
    listContainer: {
        paddingHorizontal: 10,
    }
    //   signUpTxt:{
    //     marginTop: 5,
    //     height: 30,
    //     marginBottom: 30,

    //   },


});
export default Home;
