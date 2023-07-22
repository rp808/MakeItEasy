import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';

import { data } from "./data";
import {
    StyleSheet,
    Text,
    View,
    Image,


    TouchableOpacity,

    FlatList,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import API_BASE_URL from '../config';



export const Home = ({ navigation, token }) => {


    useEffect(() => {
        sendDataToServer();
    }, []);

    const [savedRecipes, setSavedRecipes] = useState([]);


    const sendDataToServer = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/cards`,
                //192.168.40.75
                {
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
    const sortedData = data.sort((a, b) => a.time - b.time);
    useEffect(() => {
        fetchData();
      }, []);

      const fetchData = async () => {
        try {
          const response = await fetch('${API_BASE_URL}/saved-recipes', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              authorization: 'Bearer ' + token,
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            const savedRecipeIds = data.savedRecipes.map((recipe) => recipe.id);
            setSavedRecipes(savedRecipeIds);
          } else {
            throw new Error('Failed to fetch saved recipes');
          }
        } catch (error) {
          console.error('Error fetching saved recipes:', error);
        }
      };

    const handleSaveRecipe = (recipeId) => {

        const isSaved = savedRecipes.includes(recipeId);

        if (isSaved) {
            // If the recipe is already saved, remove it from the saved list
            fetch(`${API_BASE_URL}/saved-recipes/remove`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({ recipeId: recipeId }),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('Recipe removed successfully');
                        setSavedRecipes(savedRecipes.filter((id) => id !== recipeId));
                    } else {
                        throw new Error('Failed to remove the recipe');
                    }
                })
                .catch((error) => {
                    console.error('Error removing the recipe:', error);
                });
        }
        else {
            fetch(`${API_BASE_URL}/saved-recipes/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({ recipeId: recipeId }),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('Recipe saved successfully');
                        setSavedRecipes([...savedRecipes, recipeId]);

                    } else if (response.status === 400) {
                        throw new Error('Recipe is already saved');
                    } else {
                        throw new Error('Failed to save the recipe');
                    }
                })
                .catch((error) => {
                    console.error('Error saving the recipe:', error);

                });


        }
    };



    const renderItem = ({ item }) => {
        const totalCalories = item.nutrition.totalCalories;
        const recipeId = item.id;
        const isSaved = savedRecipes.includes(recipeId);
        // console.log("recipe id inhome", item.id);
        return (
            <TouchableOpacity style={styles.cards} onPress={() => { navigation.navigate("Recipe", { item, totalCalories }) }}>
                <Image source={{ uri: item.imageSource }} style={styles.image} />

                <Text style={styles.description}>{item.description}</Text>

                <View style={styles.nutritionContainer}>
                    <View style={styles.leftItem}>
                        <Ionicons name="ios-flame" size={20} color="#05595b" />
                        <Text style={styles.nutritionText}>{totalCalories}</Text>
                    </View>

                    <View style={styles.rightItem}>
                        <Ionicons name="md-timer" size={20} color="#05595b" />
                        <Text style={styles.nutritionText}>{item.time}</Text>
                    </View>
                </View>
                <View style={styles.nutritionContainerLeft}>
                    <Text style={styles.nutritionText}> Serving:  {item.serving}</Text>
                    <TouchableOpacity style={styles.saveC} onPress={() => handleSaveRecipe(recipeId)}>
                        {/* <Image style={styles.saveImg} source={require("./assets/saveCard.png")} /> */}
                        <Image style={styles.saveImg} source={isSaved ? require('./assets/saveFilled.png') : require('./assets/saveCard.png')} />

                    </TouchableOpacity>

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
                    data={sortedData}
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
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('SaveRecipe')}>
                    <Image style={styles.iconImg} source={require("./assets/save.png")} />

                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('UserProfile')}>
                    <Image style={styles.iconImg} source={require("./assets/user.png")} />

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
    nutritionContainerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -30,
        marginTop: 10,

    },
    leftItem: {
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5
        //  alignItems: 'center',
    },
    rightItem: {
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 5
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
        color: '#05595b',

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
        marginRight: 35,
        marginBottom: 15,


    },
    saveC: {
        alignItems: 'center',
        marginLeft: 15,
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
        backgroundColor: '#e1e1e1',
        // backgroundColor: '#D1D8D5',
        borderRadius: 8,

        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginRight: "5%",
        marginLeft: "5%",
        marginBottom: "5%",

    },
    saveImg: {
        width: 25,
        height: 25,
    },
    iconImg: {

        width: 30,
        height: 35,

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
        color: '#05595b',

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
