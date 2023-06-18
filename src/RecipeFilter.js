import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const RecipeFilter = ({ route, navigation }) => {
    const { cardData } = route.params;
    console.log(cardData);
    return (


        <View>
            <Text>this is filter recipe page</Text>

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
    backButtonContainer: {
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 1,
    },
    ingredientsText: {
        fontSize: 19,
        marginLeft: 16,
        marginBottom: 12,
        paddingBottom: 5,
        fontFamily: "Gill Sans",

        //  marginBottom: 5, // Add margin bottom to create space between each ingredient
    },
    backButton: {
        backgroundColor: '#FFFFFF',
        padding: 8,
        borderRadius: 16,
    },

    recipeImg: {
        flex: 3,
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
        marginRight: 45,
        alignItems: "flex-end",
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
    iconImg: {

        width: 30,
        height: 30,

        marginBottom: 10,
    },
    activeButton:{
        backgroundColor: '#828282',
    },
    activeButtonInstru:{
        backgroundColor: '#828282',
    },
    buttonOne: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: '#D9DDDC',
        marginHorizontal: 8,
        borderRadius: 8,
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
        backgroundColor: '#828282',
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
    // ingredientsText: {
    //     fontSize: 19,
    //     marginLeft: 16,
    //     marginBottom: 12,
    //     paddingBottom: 10,
    //     fontFamily: "Gill Sans",
    // },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    starIcon: {
        marginRight: 4,
        marginLeft: 5,
    },
    ratingText: {
        fontSize: 16,
    },
});

export default RecipeFilter