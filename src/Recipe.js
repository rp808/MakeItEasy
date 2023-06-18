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
import RecipeInstruction from "./RecipeInstruction";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Recipe = ({ navigation, route }) => {
    console.log("props", route.params);
    const [activeSection, setActiveSection] = useState('ingredients');
    const [rating, setRating] = useState(0);

    const toggleSection = (section) => {
        setActiveSection(section);
    };
    const handleRating = (selectedRating) => {

        setRating(selectedRating);

        fetch(`http://192.168.40.75:3000/cards/rate/${route.params.item.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating: selectedRating }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Rating saved successfully');
              // Handle the response data if needed
            })
            .catch((error) => {
              console.error('Error saving the rating:', error);
              // Handle the error if needed
            });


      };
    
    return (
        <View style={styles.screen} >
            {/* <Text>Hello</Text> */}

            <View style={styles.recipeImg}>
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#000000" />
                    </TouchableOpacity>
                </View>
                <Image style={styles.image} source={{uri: route.params.item.imageSource}}/>


            </View>

            <View style={styles.titleRating}>

                <View style={styles.titleContainer}>
                    <View style={styles.backgroundContainer}>
                        <Text style={styles.recipeTitle}>{route.params.item.description}</Text>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={25} color="#000000" style={styles.starIcon} />
                            <Text style={styles.ratingText}>{route.params.item.rating}</Text>
                        </View>
                    </View>
                </View>
            </View>


            <View style={styles.ingreInstruct}>
                <View style={styles.buttonContainer}>


                    <TouchableOpacity style={[
                        styles.buttonOne,
                        activeSection === 'ingredients' ? styles.activeButton : null,
                    ]} onPress={() => toggleSection('ingredients')}>
                        <Text style={[
                            styles.buttonText,
                          
                        ]}>Ingredients</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={[
                        styles.buttonOne,
                        activeSection === 'instructions' ? styles.activeButton : null,
                    ]}
                        onPress={() => toggleSection('instructions')}>
                        <Text style={[
                            styles.buttonText,
                            activeSection === 'instructions' ,
                        ]}>Instructions</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ingredientsContainer}>
                    {/* <Text style={styles.sectionTitle}>Ingredients:</Text> */}
                    {/* <Text style={styles.ingredientsText}> abcd  </Text> */}
                    {/* {route.params.item.ingredients.map((ingredient, index) => (
                        <Text key={index} style={styles.ingredientsText}>{ingredient}</Text>
                    ))} */}

                    {activeSection === 'ingredients' ? (
                        route.params.item.ingredients.map((ingredient, index) => (
                            <Text key={index} style={styles.ingredientsText}>
                                {ingredient}
                            </Text>
                        ))
                    ) : (
                        route.params.item.instructions.map((instructions, index) => (
                            <Text key={index} style={styles.ingredientsText}>
                                {instructions}
                            </Text>
                        ))
                    )}


                </View>
            </View>


            <View style={styles.userRating}>

            <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => handleRating(star)}
            >
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={30}
                color="#000000"
                style={styles.starIcon}
              />
            </TouchableOpacity>
          ))}
        </View>

            </View>


            <View style={styles.buttomNavFlex}>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Home')}>
                    <Image style={styles.iconImg} source={require("./assets/homeNF.png")} />
                    {/* <Text style={styles.ttitle}>Homee</Text> */}
                </TouchableOpacity>
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


export default Recipe;