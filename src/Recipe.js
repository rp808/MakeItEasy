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
                    <View style={styles.backgroundContainer}>
                        <Text style={styles.recipeTitle}>Delicious Recipe</Text>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={25} color="#000000" style={styles.starIcon} />
                            <Text style={styles.ratingText}>4.5</Text>
                        </View>
                    </View>
                </View>
            </View>


            <View style={styles.ingreInstruct}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Ingredients</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Instructions</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ingredientsContainer}>
        {/* <Text style={styles.sectionTitle}>Ingredients:</Text> */}
        <Text style={styles.ingredientsText}>
          - Ingredient 1 {'\n'}
          - Ingredient 2 {'\n'}
          - Ingredient 3 {'\n'}
          - Ingredient 4 {'\n'}
          - Ingredient 5 {'\n'}
        </Text>
      </View>
            </View>


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
        // marginRight: 25,
        // marginLeft:25,
        // alignItems: "center",
        // justifyContent: "center",
    },
    ingreInstruct: {
        flex: 3,
        width: '100%',
        backgroundColor: "#fff",
        // alignItems: "center",
        // justifyContent: "center",
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
       width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
         marginTop: 6,
        // paddingHorizontal: 16,
        alignItems: 'center',
       // marginTop: -40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        
        
    },
    backgroundContainer: {
      //  margin:6,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 8,
        
       
    },
    recipeTitle: {
        fontSize: 25,
        // fontWeight: 'bold',
        fontFamily: "GillSans-Light",
        marginLeft: 8,
        // alignItems: 'left',
        
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        

    },
    starIcon: {
        marginRight: 4,
    },
    ratingText: {
        fontSize: 25,
        fontFamily: "GillSans-Light",
        marginRight: 35,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 8,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 20,
       
        fontFamily: "Gill Sans",
    },
    ingredientsContainer: {
        marginTop: 16,
        paddingHorizontal: 16,
      },
    //   sectionTitle: {
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     marginBottom: 8,
    //   },
      ingredientsText: {
        fontSize: 19,
        marginLeft: 16,
        marginBottom:12,
        paddingBottom:10,
        fontFamily: "Gill Sans",
      },
});


export default Recipe;