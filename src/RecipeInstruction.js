import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,

    TouchableOpacity,

} from "react-native";
import { Ionicons } from '@expo/vector-icons';



const RecipeInstruction = () => {
    return (
        <View style={styles.screen} >
            {/* <Text>Hello</Text> */}

            <View style={styles.recipeImg}>
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#000000" />
                    </TouchableOpacity>
                </View>
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
                    <TouchableOpacity style={styles.buttonOne}>
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


            <View style={styles.userRating}>

                {/* <Text style={styles.sectionTitle}>User Rating:</Text> */}
                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={30} color="#000000" style={styles.starIcon} />
                    <Ionicons name="star" size={30} color="#000000" style={styles.starIcon} />
                    <Ionicons name="star" size={30} color="#000000" style={styles.starIcon} />
                    <Ionicons name="star" size={30} color="#D9DDDC" style={styles.starIcon} />
                    <Ionicons name="star" size={30} color="#D9DDDC" style={styles.starIcon} />
                </View>

            </View>


            <View style={styles.buttomNavFlex}>
                <View style={styles.iconContainer}>
                    <Image style={styles.iconImg} source={require("./assets/homeNF.png")} />
                    {/* <Text style={styles.ttitle}>Homee</Text> */}
                </View>
                <View style={styles.iconContainer}>
                    <Image style={styles.iconImg} source={require("./assets/filter.png")} />
                    {/* <Text style={styles.ttitle}>Homee</Text> */}
                </View>
                <View style={styles.iconContainer}>
                    <Image style={styles.iconImg} source={require("./assets/logout.png")} />
                    {/* <Text style={styles.ttitle}>Homee</Text> */}
                </View>


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
    backButtonContainer: {
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 1,
    },
    backButton: {
        marginLeft: 20,
        marginTop: 30,
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
    buttonOne: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: '#D9DDDC',
        marginHorizontal: 8,
        borderRadius: 8,
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
    ingredientsText: {
        fontSize: 19,
        marginLeft: 16,
        marginBottom: 12,
        paddingBottom: 10,
        fontFamily: "Gill Sans",
    },
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
export default RecipeInstruction