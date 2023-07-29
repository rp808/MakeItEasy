import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../config';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,

    TouchableOpacity,

    ImageBackground,
    KeyboardAvoidingView
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const RecipeUpload = ({ props, token }) => {
    const { navigation, route } = props;
  


    





    return (
        <View style={styles.screen}>
        


        <Text style={styles.recipeTitle}>abcd</Text>
           
        </View>
    )
};

const styles = StyleSheet.create({
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 5,
    },
    timerIcon: {
        marginRight: 5,
    },
    timerValue: {
        fontSize: 24,
        marginLeft: 4,
        marginRight: 20,
        fontFamily: 'GillSans-SemiBold',
        color: '#05595b',
    },
    saveC: {
        marginLeft: 50,
        marginRight: 20,
    },
    saveImg: {

        width: 30,
        height: 35,
        // marginTop: 10,
        // marginBottom: 10,
    },
    nutritionName: {
        flex: 1,
        // textAlign: 'right',
    },
    nutritionValue: {
        flex: 1,
        textAlign: 'left',
    },
    nutritionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    servingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    perServingText: {
        marginTop: 10,
        textAlign: 'right',
        fontStyle: 'italic',
        color: 'gray',
    },
    servingText: {
        marginTop: 10,
        textAlign: 'right',
        fontStyle: 'italic',
        color: 'gray',
    },
    nutritionBox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: 'gray',
        marginRight: 15,
    },
    proteinBox: {
        backgroundColor: '#05595b',
    },
    carbsBox: {
        backgroundColor: '#FB7B14',
    },
    fatBox: {
        backgroundColor: 'black',
    },
    nutritionTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nutritionText: {
        marginLeft: 5,
    },
    nutritionSeparator: {
        borderBottomWidth: 0.3,
        borderBottomColor: 'gray',
        marginTop: 5,
        marginBottom: 10,
    },

    cardContent: {
        backgroundColor: '#f5f5f5',
        margin: 10,
        borderRadius: 10,

        borderWidth: 1,
        borderColor: '#ccc',
    },


    screen: {
        flex: 1,
        width: '100%',
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    backButtonContainer: {
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 1,
    },
    ingredientsText: {
        fontSize: 20,
        marginLeft: 16,
        marginBottom: 12,
        paddingBottom: 5,
        // letterSpacing: 1,
        fontFamily: "Gill Sans",
        color: '#05595b',



    },
    backButton: {
        backgroundColor: '#FFFFFF',
        padding: 8,
        borderRadius: 16,
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

        //backgroundColor: "#fff",


        // alignItems: "center",
        // justifyContent: "center",
    },
    userRating: {
        flex: 0.5,
        width: '100%',
        backgroundColor: "#fff",
        //marginRight: 45,
        alignItems: "flex-end",
        justifyContent: "center",
    },
    totalCaloriesText: {
        color: 'red',

    },
    proteinText: {
        color: '#05595b',

    },
    carbsText: {
        color: '#FB7B14',

    },
    fatText: {
        color: '#000000',

    },
    defaultText: {

    },
    nutritionText: {

    },

    buttomNavFlex: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 54,
        width: '100%',
        flex: 0,
        margin: 10,

    },
    iconContainer: {
        alignItems: 'center',
        marginLeft: 35,
        marginRight: 35,
        marginBottom: 15,
        // marginTop:15,

    },
    iconImg: {

        width: 30,
        height: 35,
        marginTop: 10,
        marginBottom: 10,
    },
    activeButton: {
        // backgroundColor: '#05595B',
        backgroundColor: '#fff',
        borderBottomWidth: 4,
        borderBottomColor: '#05595b',

    },
    activeButtonInstru: {
        backgroundColor: '#828282',
        // backgroundColor: '#828282',
    },
    activeText: {
        color: '#05595b',

    },
    buttonOne: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: '#fff',
        marginHorizontal: 8,
        //borderRadius: 8,
    },

    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: '#ccc',

    },
    button: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: '#05595B',
        marginHorizontal: 8,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 22,
        color: '#AB9704',
        fontFamily: "Gill Sans",
        // letterSpacing: '1',
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
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
        alignItems: 'center',



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
        fontSize: 24,
        // fontWeight: 'bold',

        marginLeft: 8,
        fontFamily: 'GillSans-SemiBold',
        color: '#05595b',

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
        fontSize: 24,
        fontFamily: "GillSans-Light",
        //marginRight: 35,
    },

    ingredientsContainer: {
        marginTop: 16,
        paddingHorizontal: 16,
        // backgroundColor:'#333',
        alignContent: 'center',




    },

    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        paddingRight: 30,
    },
    starIcon: {
        marginRight: 4,
        marginLeft: 5,
    },
    ratingText: {
        fontSize: 16,
    },
});

export default RecipeUpload