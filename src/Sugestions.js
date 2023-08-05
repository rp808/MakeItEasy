import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import API_BASE_URL from '../config';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';


const Suggestions = ({ route, navigation, token }) => {
    const { filteredData, selectedIngredients } = route.params;
    //const { navigation, token } = props
    const [savedRecipes, setSavedRecipes] = useState([]);

    if (!filteredData || !filteredData.matchingCards) {
        return null;
    }

    const { matchingCards } = filteredData;


    useEffect(() => {
        fetchSavedRecipes();
    }, []);

    const fetchSavedRecipes = () => {
        fetch(`${API_BASE_URL}/saved-recipes`, {
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
                const savedRecipeIds = data.savedRecipes.map((recipe) => recipe.id);
                setSavedRecipes(savedRecipeIds);
            })
            .catch((error) => {
                console.error('Error fetching saved recipes:', error);
            });
    };

    const handleSaveRecipe = (recipeId) => {
        const isSaved = savedRecipes.includes(recipeId);

        if (isSaved) {

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
                        setSavedRecipes(savedRecipes.filter((id) => id !== recipeId));
                    } else {
                        throw new Error('Failed to remove the recipe');
                    }
                })
                .catch((error) => {
                    console.error('Error removing the recipe:', error);
                });
        } else {
            fetch(`${API_BASE_URL}/saved-recipes/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({ recipeId }),
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
    
    


    return (
        <View style={styles.container}>
            <View style={styles.appNameFlex}>

                <Text style={styles.logoTxt}>MakeItEasy</Text>

            </View>

            <View style={styles.header}>

                <Text style={styles.title}>Suggestions</Text>

            </View>

            <ScrollView style={styles.scrollContainer}>
                {matchingCards.map((card) => (
                    <TouchableOpacity key={card._id} style={styles.cardContainer} onPress={() => navigation.navigate('RecipeFilter', { cardData: card })}>
                        <Image source={{ uri: card.imageSource }} style={styles.image} />
                        <View style={styles.descCard}>
                            <Text style={styles.title}>{card.description}</Text>
                            <View style={styles.saveShareContainer}>
                                <TouchableOpacity style={styles.saveC} onPress={() => handleSaveRecipe(card.id)}>
                                    {/* <Image style={styles.saveImg} source={require("./assets/saveCard.png")} /> */}
                                    <Image style={styles.saveImg} source={savedRecipes.includes(card.id) ? require('./assets/saveFilled.png') : require('./assets/saveCard.png')} />

                                </TouchableOpacity>
                                <TouchableOpacity style={styles.shareC} onPress={() => handleShareRecipe(card)} >
                                    <Image style={styles.saveImg} source={require("./assets/share.png")} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.nutritionContainer}>
                            <Ionicons name="ios-flame" size={20} color="#05595b" />
                            <Text style={styles.nutritionText}> {card.nutrition.totalCalories}</Text>
                            <Ionicons name="md-timer" size={20} color="#05595b" />
                            <Text style={styles.nutritionText}>{card.time}</Text>
                            <Text style={styles.nutritionText}> Serving:  {card.serving}</Text>


                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.buttomNavFlex}>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Home')}>
                    <Image style={styles.iconImg} source={require("./assets/homeNF.png")} />

                </TouchableOpacity>
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
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
        marginTop: 20,
        marginBottom: 10,
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

    },
    descCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        elevation: 2,
        marginBottom: 10,
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



export default Suggestions;