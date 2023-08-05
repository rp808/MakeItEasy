import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
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
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const Home = ({ navigation, token }) => {


    useEffect(() => {
        sendDataToServer();
    }, []);

    const [savedRecipes, setSavedRecipes] = useState([]);
    const [userDietaryRestriction, setUserDietaryRestriction] = useState(null);
    const fetchUserDietaryRestriction = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + token,
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data.dietaryRestriction;
            } else {
                throw new Error('Failed to fetch user dietary restriction');
            }
        } catch (error) {
            console.error('Error fetching user dietary restriction:', error);
            return null;
        }
    };

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
    const isFocused = useIsFocused();
    useEffect(() => {
        fetchData();
        fetchUserDietaryRestriction().then((restriction) => {
            setUserDietaryRestriction(restriction);
        });
    }, [isFocused]);

    const filterRecipesByDiet = (recipes) => {
        if (!userDietaryRestriction || userDietaryRestriction === 'all') {
            // If the user's dietary restriction is not set or 'all', show all recipes
            return recipes;
        } else {
            // Filter recipes based on the user's dietary restriction
            return recipes.filter((recipe) => {
                return recipe.dietaryRestrictions.includes(userDietaryRestriction);
            });
        }
    };
    const filteredData = filterRecipesByDiet(sortedData);

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/saved-recipes`, {
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

    const handleShareRecipe = async (recipe) => {
        try {
            const message = `Check out this delicious recipe: ${recipe.description}\n\n`
                + `Ingredients:\n${recipe.ingredients.join("\n")}\n\n`
                + `Instructions:\n${recipe.instructions.map((instr, index) => `${index + 1}. ${instr}`).join("\n")}\n\n`
                + `Nutrition:\nTotal Calories: ${recipe.nutrition.totalCalories}\n`
                + `Image Source: ${recipe.imageSource}`;
    
          
            const fileUri = `${FileSystem.cacheDirectory}recipe.txt`;
            await FileSystem.writeAsStringAsync(fileUri, message);
    
            const result = await Sharing.shareAsync(fileUri); 
            
            if (result !== null) {
                if (result.action === Sharing.sharedAction) {
                    console.log('Shared successfully');
                } else if (result.action === Sharing.dismissedAction) {
                    console.log('Share was dismissed or not supported');
                } else {
                    console.log('Share was not completed');
                }
            } else {
                console.log('Share action is null');
            }
    
           
            await FileSystem.deleteAsync(fileUri);
        } catch (error) {
            console.error('Error while sharing:', error);
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
                <View style={styles.descCard}>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                    <TouchableOpacity style={styles.shareC} onPress={() => handleShareRecipe(item)}>
                        <Image style={styles.saveImg} source={require("./assets/share.png")} />
                    </TouchableOpacity>
                </View>
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
                    <Text style={styles.nutritionText}> Serving: {item.serving}</Text>
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
                    data={filteredData}
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
        marginLeft: -10,
        marginTop: 10,
        justifyContent: 'space-between',

    },
    descriptionContainer: {
        flex: 1, 
        marginRight: 5, 
        marginLeft:5,
       
    },
    shareC: {
        marginLeft: 5,
        marginRight: 10,
    },
    descCard: {
        flexDirection: 'row', 
        alignItems: 'center', 
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
        marginRight: 5,
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
        alignItems: "center",
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
        marginLeft: 23,

    },
    logoTxt: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 35,
        color: '#05595b',
        fontFamily: 'GillSans-SemiBoldItalic',
    },
    cards: {

        width: "45%",
        height: 200,
        backgroundColor: '#e1e1e1',
        // backgroundColor: '#D1D8D5',
        borderRadius: 8,

        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,

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
        paddingHorizontal: 1,
        paddingLeft: 2.5,
        paddingRight: 2.5,
    }



});
export default Home;
