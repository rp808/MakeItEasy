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
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Recipe = () => {
    return (
        <View style={styles.screen} >
            {/* <Text>Hello</Text> */}

            <View style={styles.recipeImg}>

                <Image style={styles.image} source={require("./assets/eggs.jpg")} />


            </View>

            <View style={styles.titleRating}>

                <View style={styles.titleContainer}>
                    <Text style={styles.recipeTitle}>Delicious Recipe</Text>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={25} color="#000000" style={styles.starIcon} />
                        <Text style={styles.ratingText}>4.5</Text>
                    </View>
                </View>

            </View>


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
        flex: 2.5,
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

    image: {
        width: '100%',
        height: '100%',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
      },
      recipeTitle: {
        fontSize: 25,
       // fontWeight: 'bold',
       fontFamily:"GillSans-SemiBold",
        marginRight: 8,
        alignItems: 'left',
      },
      ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      starIcon: {
        marginRight: 4,
      },
      ratingText: {
        fontSize: 25,
        fontFamily:"GillSans-SemiBold",
      },
});


export default Recipe;