import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,

    TouchableOpacity,

    ScrollView
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import API_BASE_URL from '../config';


const RecipeFilter = ({ props, token }) => {
    const { navigation, route } = props

    const { cardData } = route.params;
    console.log(cardData);
    const [ratingsArray, setRatingsArray] = useState([])

    const [activeSection, setActiveSection] = useState('ingredients');

    const toggleSection = (section) => {
        setActiveSection(section);
    };
    const [rating, setRating] = useState(ratingsArray.length != 0 ? ratingsArray[ratingsArray.length - 1].ratingValue : 0);
    const [savedRecipes, setSavedRecipes] = useState([]);

    const handleRating = (selectedRating) => {
        setRating(selectedRating);

        fetch(`${API_BASE_URL}/cards/rate/${cardData._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': "Bearer " + token
            },
            body: JSON.stringify({ ratingValue: selectedRating }),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Rating saved successfully');
                } else {
                    throw new Error('Failed to save the rating');
                }
            })
            .catch((error) => {
                console.error('Error saving the rating:', error);
            });
    };

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


    const handleSaveRecipe = () => {
        const isSaved = savedRecipes.includes(cardData.id);

        if (isSaved) {
            // If the recipe is already saved, remove it from the saved list
            fetch(`${API_BASE_URL}/saved-recipes/remove`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({ recipeId: cardData.id }),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('Recipe removed successfully');
                        setSavedRecipes(savedRecipes.filter((id) => id !== cardData.id));
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
                body: JSON.stringify({ recipeId: cardData.id }),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('Recipe saved successfully');
                        setSavedRecipes([...savedRecipes, cardData.id]);
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


    return (
        <View style={styles.screen} >
            {/* <Text>Hello</Text> */}

            <View style={styles.recipeImg}>
                <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.navigate('Suggestions')}>
                    <View style={styles.backButton} >
                        <Ionicons name="arrow-back" size={24} color="#000000" />
                    </View>
                </TouchableOpacity>
                <Image style={styles.image} source={{ uri: cardData.imageSource }} />


            </View>

            <View style={styles.titleRating}>

                <View style={styles.titleContainer}>
                    <View style={styles.backgroundContainer}>
                        <Text style={styles.recipeTitle}>{cardData.description}</Text>
                        <View style={styles.timerContainer}>
                            <Ionicons name="md-timer" size={35} color="#05595b" style={styles.timerIcon} />
                            <Text style={styles.timerValue}>{cardData.time} mins</Text>
                            <TouchableOpacity style={styles.saveC} onPress={handleSaveRecipe}>
                                {/* <Image style={styles.saveImg} source={require("./assets/saveCard.png")} /> */}
                                <Image
                                    style={styles.saveImg}
                                    source={savedRecipes.includes(cardData.id) ? require("./assets/saveFilled.png") : require("./assets/saveCard.png")}
                                />

                            </TouchableOpacity>
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
                            activeSection === 'ingredients' ? styles.activeText : null

                        ]}>Ingredients</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={[
                        styles.buttonOne,
                        activeSection === 'instructions' ? styles.activeButton : null,
                    ]}
                        onPress={() => toggleSection('instructions')}>
                        <Text style={[
                            styles.buttonText,
                            activeSection === 'instructions' ? styles.activeText : null
                        ]}>Instructions</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.buttonOne,
                            activeSection === 'nutrition' ? styles.activeButton : null,
                        ]}
                        onPress={() => toggleSection('nutrition')}
                    >
                        <Text style={[
                            styles.buttonText,
                            activeSection === 'nutrition',
                            activeSection === 'nutrition' ? styles.activeText : null,
                        ]}>Nutrition</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.cardContent}>
                    {activeSection === 'ingredients' ? (
                        <View style={styles.ingredientsContainer}>
                            {cardData.ingredients.map((ingredient, index) => (
                                <Text key={index} style={styles.ingredientsText}>
                                    - {ingredient}
                                </Text>
                            ))}
                        </View>
                    ) : activeSection === 'instructions' ? (
                        <View style={styles.ingredientsContainer}>
                            {cardData.instructions.map((instruction, index) => (
                                <Text key={index} style={styles.ingredientsText}>
                                    - {instruction}
                                </Text>
                            ))}
                        </View>
                    ) : activeSection === 'nutrition' ? (
                        <View style={styles.ingredientsContainer}>
                            {/* <Text style={styles.totalCalories}>
                                Total Calories: {route.params.totalCalories}
                            </Text> */}
                            {Object.entries(cardData.nutrition).map(([key, value]) => {
                                let name = null;
                                let textStyle = null;
                                let boxStyle = null;
                                switch (key) {
                                    case 'totalCalories':
                                        name = 'Total Calories';
                                        textStyle = styles.totalCaloriesText;
                                        break;
                                    case 'proteinPercentage':
                                        name = 'Protein';
                                        textStyle = styles.proteinText;
                                        boxStyle = styles.proteinBox;
                                        break;
                                    case 'carbsPercentage':
                                        name = 'Carbohydrates';
                                        textStyle = styles.carbsText;
                                        boxStyle = styles.carbsBox;
                                        break;
                                    case 'fatPercentage':
                                        name = 'Fat';
                                        textStyle = styles.fatText;
                                        boxStyle = styles.fatBox;
                                        break;
                                    default:
                                        name = key;
                                        textStyle = styles.defaultText;

                                }

                                let formattedValue = value;
                                if (key === 'proteinPercentage' || key === 'carbsPercentage' || key === 'fatPercentage') {
                                    formattedValue = value + '%';
                                }

                                return (
                                    <View key={key}>
                                        <View style={styles.nutritionRow}>
                                            <View style={[styles.nutritionBox, boxStyle]}></View>
                                            <View style={styles.nutritionTextContainer}>
                                                <Text style={[styles.nutritionText, styles.nutritionName, textStyle]}>
                                                    {name}:
                                                </Text>
                                                <Text style={[styles.nutritionText, styles.nutritionValue, textStyle]}>
                                                    {formattedValue}
                                                </Text>


                                            </View>

                                        </View>
                                        {/* <View style={styles.nutritionSeparator}></View> */}
                                    </View>
                                );
                            })}
                            <View style={styles.nutritionSeparator}></View>
                            <View style={styles.servingContainer}>
                                <Text style={styles.servingText}>Total Servings: {cardData.serving}</Text>
                                <Text style={styles.perServingText}>Values are per serving</Text>
                            </View>
                        </View>
                    ) : null}
                </ScrollView>
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
        marginLeft: 15,
    },
    timerValue: {
        fontSize: 24,
        marginLeft: 4,
        marginRight: 20,
        fontFamily: 'GillSans-SemiBold',
        color: '#05595b',
    },
    nutritionName: {
        flex: 1,
        // textAlign: 'right',
    },
    nutritionValue: {
        flex: 1,
        textAlign: 'left',
    },
    saveC: {
        marginLeft: 20,
        marginRight: 20,
    },
    saveImg: {

        width: 30,
        height: 35,
        // marginTop: 10,
        // marginBottom: 10,
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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    nutritionText: {
        marginLeft: 5,
    },
    nutritionSeparator: {
        // borderTopWidth:0.3,
        // borderTopColor:'gray',
        borderBottomWidth: 0.3,
        borderBottomColor: 'gray',
        marginTop: 5,
        marginBottom: 10,
    },
    cardContent: {
        backgroundColor: '#f5f5f5',

        borderRadius: 10,
        // padding: 20,
        margin: 10,
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        elevation: 3,
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
    totalCaloriesText: {
        color: 'red',
        fontFamily: "Gill Sans",
    },
    proteinText: {
        color: '#05595b',
        fontFamily: "Gill Sans",
    },
    carbsText: {
        color: '#FB7B14',
        fontFamily: "Gill Sans",

    },
    fatText: {
        color: '#000000',
        fontFamily: "Gill Sans",
    },
    defaultText: {
        // ...your existing styles for defaultText...
    },
    // nutritionText: {
    //     // ...your existing styles for nutritionText...
    // },

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
        //color: 'white',
        fontFamily: "Gill Sans",

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
        backgroundColor: 'rgba(255, 255, 255,1)',
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

        // marginLeft:'5%',
        //     width:'90%'


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

export default RecipeFilter