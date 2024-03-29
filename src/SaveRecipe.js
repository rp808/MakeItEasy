import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import API_BASE_URL from '../config';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';


const SaveRecipe = ({ navigation, token }) => {
    const [savedRecipes, setSavedRecipes] = useState([]);

    useEffect(() => {
        fetchSavedRecipes();
    }, []);

    useEffect(() => {
        // Refresh saved recipes list when the SaveRecipeDirection screen is focused again
        const unsubscribe = navigation.addListener('focus', () => {
            fetchSavedRecipes();
        });

        return unsubscribe;
    }, [navigation]);


    const fetchSavedRecipes = () => {
        fetch(`${API_BASE_URL}/saved-recipes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + token,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch saved recipes');
                }
            })
            .then((data) => {
                const savedRecipes = data.savedRecipes;
                setSavedRecipes(savedRecipes);
            })
            .catch((error) => {
                console.error('Error fetching saved recipes:', error);
            });
    };

    const handleRemoveRecipe = (recipeId) => {
        fetch(`${API_BASE_URL}/saved-recipes/remove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({ recipeId }),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Recipe removed successfully');
                    setSavedRecipes(savedRecipes.filter((recipe) => recipe.id !== recipeId));
                } else {
                    throw new Error('Failed to remove the recipe');
                }
            })
            .catch((error) => {
                console.error('Error removing the recipe:', error);
            });
    };

    const handleShareRecipe = async (recipe) => {
        console.log(recipe.description);
        try {
            const ingredientsList = recipe.ingredients.map((ingredient, index) => `${index + 1}. ${ingredient}`).join("\n");
            const instructionsList = recipe.instructions.map((instruction, index) => `${index + 1}. ${instruction}`).join("\n");
            
            const message = `Check out this delicious recipe: ${recipe.description}\n\nIngredients:\n${ingredientsList}\n\nInstructions:\n${instructionsList}\n\nNutrition:\nTotal Calories: ${recipe.nutrition.totalCalories}\n\nImage Source: ${recipe.imageSource}`;


            const fileUri = `${FileSystem.cacheDirectory}recipe.txt`;
            await FileSystem.writeAsStringAsync(fileUri, message);

            const result = await Sharing.shareAsync(fileUri);
            if (result !== null) {
                if (result.action === Sharing.sharedAction) {
                    console.log('Shared successfully');
                } else if (result.action === Sharing.dismissedAction) {
                    console.log('Share was dismissed or not supported');
                }
                else {
                    console.log('Share was not completed');
                }
            }
            else {
                console.log('Share action is null');
            }

            await FileSystem.deleteAsync(fileUri);
        } catch (error) {
            console.error('Error while sharing:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.appNameFlex}>

                <Text style={styles.logoTxt}>MakeItEasy</Text>

            </View>

            <View style={styles.header}>

                <Text style={styles.title}>Your favourites</Text>

            </View>

            {savedRecipes.length === 0 ? (
                <View style={styles.noRecipesContainer}>
                    <Text style={styles.noRecipesText}>Hey, you haven't saved any recipes yet.</Text>
                </View>
            ) : (
                <ScrollView style={styles.scrollContainer}>
                    {savedRecipes.map((recipe) => (
                        <TouchableOpacity key={recipe._id} style={styles.cardContainer} onPress={() => navigation.navigate('SaveRecipeDirection', { recipeData: recipe })}>
                            <Image style={styles.image} source={{ uri: recipe.imageSource }} />
                            <View style={styles.descCard}>
                                <View style={styles.recipeInfoContainer}>
                                    <Text style={styles.title}>{recipe.description}</Text>

                                    <View style={styles.saveShareContainer}>
                                        <TouchableOpacity style={styles.saveC} onPress={() => handleRemoveRecipe(recipe.id)} >

                                            <Image style={styles.saveImg} source={require("./assets/saveFilled.png")} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.shareC} onPress={() => handleShareRecipe(recipe)} >
                                            <Image style={styles.saveImg} source={require("./assets/share.png")} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            {/* 
            <Text>{recipe.instructions}</Text> */}

                            <View style={styles.nutritionContainer}>
                                <Ionicons name="ios-flame" size={20} color="#05595b" />
                                <Text style={styles.nutritionText}> {recipe.nutrition.totalCalories}</Text>
                                <Ionicons name="md-timer" size={20} color="#05595b" />
                                <Text style={styles.nutritionText}>{recipe.time}</Text>
                                <Text style={styles.nutritionText}> Serving:  {recipe.serving}  </Text>

                            </View>

                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}


            <View style={styles.buttomNavFlex}>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Home')}>
                    <Image style={styles.iconImg} source={require("./assets/homeNF.png")} />

                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('FilterPage')}>
                    <Image style={styles.iconImg} source={require("./assets/filter.png")} />

                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('SaveRecipe')}>
                    <Image style={styles.iconImg} source={require("./assets/saveFilled.png")} />

                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('UserProfile')}>
                    <Image style={styles.iconImg} source={require("./assets/user.png")} />

                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
    },
    saveC: {
        marginLeft: 5,
        marginRight: 25,
    },
    shareC: {
        marginLeft: 5,
        marginRight: 5,
    },
    saveImg: {
        width: 30,
        height: 30,
        margin: 5,
    },
    noRecipesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noRecipesText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    descCard: {
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        elevation: 2,
        marginBottom: 10,
    },
    recipeInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    saveShareContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nutritionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginBottom: 20,
        // marginTop: 10,

    },
    nutritionIcon: {
        marginRight: 2,
    },
    nutritionText: {
        fontSize: 18,
        marginLeft: 5,
        marginRight: 60,
        fontFamily: 'GillSans-SemiBold',
        color: '#05595b',
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10,
        //  paddingTop: 10,
        paddingBottom: 30,
    },
    cardContainer: {
        marginVertical: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,

        elevation: 5,
        width: '90%',
        alignSelf: 'center',
    },
    appNameFlex: {
        width: '100%',
        backgroundColor: '#F6F6F6',
        paddingTop: 35,
        paddingHorizontal: 15,
    },
    btmContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20,
        width: '100%',
    },
    buttomNavFlex: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 64,
        width: '100%',
        flex: 0,
        margin: 10,
        padding: 10

    },
    iconContainer: {
        alignItems: 'center',
        marginLeft: 35,
        marginRight: 35,
        marginBottom: 15,


    },

    iconImg: {
        width: 30,
        height: 35,
        marginBottom: 10,
        marginTop: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    logoTxt: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'GillSans-SemiBoldItalic',
        color: '#05595b',
    },
    header: {
        // marginTop: 10,
        // marginBottom: 10,
        alignItems: 'center',
    },
    selectedIngredients: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        margin: 20,
        fontFamily: 'GillSans-SemiBold',
        color: '#05595b',
        flexShrink: 1,

    },
    detailsContainer: {
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    rating: {
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 20,
    },
    ingredients: {
        fontSize: 16,
        marginBottom: 5,
    },
    instructions: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default SaveRecipe