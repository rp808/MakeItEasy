import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';

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

import API_BASE_URL from '../config';

const FilterPage = ({ props, token }) => {
    const { navigation, route } = props
    const [totalCaloriesErrorMsg, setTotalCaloriesErrorMsg] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    // const [selectedLevel, setSelectedLevel] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '' }]);
    const [totalCalories, setTotalCalories] = useState('');
    const [userDietaryRestriction, setUserDietaryRestriction] = useState('');
    const handleSelection = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };


    useEffect(() => {

        fetchUserDietaryRestriction();
    }, [])

    const fetchUserDietaryRestriction = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/profile`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {

                setUserDietaryRestriction(data.dietaryRestriction);

                setSelectedItems([data.dietaryRestriction]);
            } else {
                console.log('Error:', data.error);
            }
        } catch (error) {
            console.log('Error:', error.message);
        }
    };
    const options = [
        {
            label: 'Vegetarian',
            value: 'vegetarian',
        },
        {
            label: 'Vegan',
            value: 'vegan',
        },
        {
            label: 'Gluten-free',
            value: 'gluten-free',
        },
        {
            label: 'Non-Veg',
            value: 'non',
        },
        {
            label: 'All',
            value: 'all',
        },


    ];

    const handleReset = () => {
        // setIngredients([{ name: '', quantity: '' }]);
        setIngredients([{ name: '' }]);
        setSelectedItems([]);
        setTotalCalories('');
    };



    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = { name: value };
        setIngredients(updatedIngredients);
    };

    const addIngredientRow = () => {
        setIngredients([...ingredients, { name: '' }]);
    };

    const handleSubmit = () => {
        setTotalCaloriesErrorMsg('');
        setErrorMsg('');
        if (ingredients.some((ingredient) => ingredient.name === '')) {
            setErrorMsg('Please enter ingredients');
            return;
        }

        const data = {
            ingredients: ingredients.map((ingredient) => ingredient.name),
            selectedItems: selectedItems,
            totalCalories: totalCalories,
            // selectedLevel: selectedLevel
        };





        fetch(`${API_BASE_URL}/filter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Data sent successfully');
                    return response.json();
                } else {
                    console.error('Error sending data:', response.status);

                }
            })
            .then(data => {

                if (data.matchingCards.length === 0) {
                    setErrorMsg('No matching recipes found.kindly recheck the enetered ingredient.');
                } else {

                    // console.log('Matched Ingredients:', data);
                    navigation.navigate('Suggestions', { filteredData: data });
                }
            })

            .catch(error => {
                console.error('Error sending data:', error);
                error.response.json().then((data) => {
                    setErrorMsg(data.message);
                }).catch(error => {

                    console.error('Error sending data:', error);
                    setTotalCaloriesErrorMsg('hard to find recipe , kindly recheck the enetered ingredient');

                });
            });
    };



    return (
        (
            <View style={styles.screen}>
                <ImageBackground
                    source={require("./assets/elena-joland-mjeQon0Mh_Q-unsplash.jpg")}
                    style={styles.imageBackground}
                    resizeMode="cover"
                >
                    <StatusBar style="auto" />

                    <View style={styles.appNameFlex}>
                        <View>
                            <Text style={styles.logoTxt}>MakeItEasy</Text>
                        </View>

                    </View>
                    <View style={styles.diet}>
                        {/* <View style={styles.container}> */}
                        <Text style={styles.label}>Dietary Restrictions</Text>
                        <View style={styles.checkboxContainer}>
                            {options.map((option) => (
                                <TouchableOpacity
                                    key={option.value}
                                    style={[
                                        styles.checkbox,
                                        selectedItems.includes(option.value) && styles.checkboxSelected,
                                    ]}
                                    onPress={() => handleSelection(option.value)}
                                >
                                    <Text style={[
                                        styles.checkboxLabel,
                                        selectedItems.includes(option.value) ? styles.selectedCheckboxLabel : null,
                                    ]}>{option.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                    </View>
                    <View style={styles.levelThree}>
                        <Text style={styles.label}>Nutrition</Text>
                        {totalCalories !== '' && (
                            <Text style={styles.suggestedRecipeMsg}>
                                Suggested recipe calories range: {parseInt(totalCalories) - 100} to {parseInt(totalCalories) + 100}
                            </Text>
                        )}
                        <View style={styles.caloriesContainer}>
                            <TextInput
                                style={styles.inputCal}
                                placeholder="Enter Total Calories"
                                value={totalCalories}
                                onChangeText={(value) => setTotalCalories(value)}
                                keyboardType="numeric"
                            />
                            <Text style={styles.perServingText}>per serving</Text>
                        </View>

                    </View>


                    {/* <View style={styles.levelThree}>
                        <Text style={styles.label}>Difficulty Level</Text>
                        <View style={styles.radioContainer}>
                            {levels.map((levels) => (
                                <TouchableOpacity
                                    key={levels.value}
                                    style={[
                                        styles.radio,
                                        selectedLevel === levels.value && styles.radioSelected,
                                    ]}
                                    onPress={() => handleLevel(levels.value)}
                                >
                                    <Text style={styles.radioLabel}>{levels.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>


                    </View> */}

                    <KeyboardAvoidingView style={styles.avail} behavior="padding">
                        <View style={styles.headerRow}>
                            <Text style={styles.label}>Available Ingredients</Text>
                            <TouchableOpacity style={styles.addButton} onPress={addIngredientRow}>
                                <Ionicons name="add" size={26} color="black" />
                                <Text style={styles.addButtonText}>Add Ingredient</Text>
                            </TouchableOpacity>
                        </View>
                        {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
                        {ingredients.map((ingredient, index) => (
                            <View key={index} style={styles.ingredientRow}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ingredient Name"
                                    value={ingredient.name}
                                    onChangeText={(value) => handleIngredientChange(index, value)}
                                />

                            </View>
                        ))}

                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.submitButton} onPress={handleReset}>
                                <Text style={styles.buttonText}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.resetButton}  onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>


                    </KeyboardAvoidingView>

                    <View style={styles.buttomNavFlex}>
                        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Home')}>
                            <Image style={styles.iconImg} source={require("./assets/homeNF.png")} />

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('FilterPage')}>
                            <Image style={styles.iconImg} source={require("./assets/filterFilled.png")} />

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('SaveRecipe')}>
                            <Image style={styles.iconImg} source={require("./assets/save.png")} />

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('UserProfile')}>
                            <Image style={styles.iconImg} source={require("./assets/user.png")} />

                        </TouchableOpacity>

                    </View>



                </ImageBackground>

            </View>
        )




    );
};
const styles = StyleSheet.create({
    checkboxLabel: {

        color: 'black',

    },
    caloriesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        height: 45,
        width: '80%',
    },
    suggestedRecipeMsg: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
    perServingText: {
        marginLeft: 3,
        fontFamily: 'GillSans-SemiBold',
        fontSize: 18,

    },
    selectedCheckboxLabel: {

        color: 'white',

    },

    screen: {
        flex: 1,
        width: '100%',
        //backgroundColor: '#FFF',
        alignItems: "center",
        justifyContent: "center",
    },
    errorMsg: {
        color: 'red',
        fontSize: 16,
        marginTop: 8,
    },
    imageBackground: {

        height: '100%',
        width: '100%',
        //   opacity: 0.5,

    },
    headerRow: {
        flexDirection: 'row',
        // alignItems: 'center',
        //   justifyContent: 'space-between',
        marginBottom: 10,
    },
    appNameFlex: {
        flex: 0.8,
        width: '100%',
        // backgroundColor: "#fff",
        paddingLeft: 15,
        alignItems: "start",
        justifyContent: "center",
    },
    // avail: {
    //     flex: 4,


    //     backgroundColor: "#F9F9F9",
    //     // alignItems: "right",
    //     // justifyContent: "center",

    // },

    diet: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255,0.9)",
        borderRadius: 8,

        elevation: 5,
        padding: 15,
        //  margin:10,
        marginBottom: 20,
        //width: '100%',


    },
    levelThree: {
        backgroundColor: "rgba(255, 255, 255,0.9)",
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,

        elevation: 5,
        flex: 1,
    },




    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 22,
        fontFamily: "GillSans-SemiBold",
        // marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 1,

    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 13,
        marginBottom: 10,
        padding: 3,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#9A9A9A',
        marginTop: 10,
        backgroundColor: '#FFF',
        height: 35,
    },

    checkboxSelected: {
        backgroundColor: '#05595b',
        // color:'white',
        transform: [{ scale: 1.1 }], // Scale up the selected checkbox
        borderWidth: 0,
        borderColor: '#000',

        elevation: 5,
    },
    checkboxLabel: {
        marginLeft: 2,
        fontFamily: "GillSans-Light",
        fontSize: 18,
    },



    avail: {
        flex: 4,
        backgroundColor: "rgba(255, 255, 255,0.9)",
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,

        elevation: 5,
    },
    ingredientRow: {
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 5,
        marginTop: 15,

    },
    input: {
        flex: 1,
        marginRight: 30,
        // marginLeft:30,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 19,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        height: 45,
        backgroundColor: '#FFF',
        fontFamily: "GillSans-SemiBold",
    },
    inputCal: {
        flex: 1,
        paddingVertical: 5,
        fontFamily: 'GillSans-SemiBold',

    },
    quantityInput: {
        flex: 0.6,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#e2d784",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        // marginBottom: 10,
        // width: "40%",
        marginLeft: 20,
        height: 40,
    },
    addButtonText: {
        color: 'black',
        marginLeft: 5,
        fontFamily: "GillSans-SemiBold",
        fontSize: 18
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    submitButton: {
        backgroundColor: '#05595b',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginLeft: 5,
        borderRadius: 5,
    },
    resetButton: {
        backgroundColor: '#05595b',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: "GillSans-SemiBold",
    },


    buttomNavFlex: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 54,
        width: '100%',
        flex: 0.5,
        marginTop: 10,
        paddingBottom: 30,


    },
    iconContainer: {
        alignItems: 'center',
        marginLeft: 35,
        marginRight: 35,
        // marginBottom: 15,
        marginTop: 15,

    },
    logoTxt: {
        fontSize: 22,
        fontWeight: 'bold',
        paddingTop: 35,
        fontFamily: 'GillSans-SemiBoldItalic',
    },




    iconImg: {

        width: 30,
        height: 35,
        marginTop: 10,
        marginBottom: 10,
    },
    image: {
        marginTop: -80,
        width: 120,
        height: 120,
        borderRadius: "100%",
        marginBottom: 10,
    },


    //   signUpTxt:{
    //     marginTop: 5,
    //     height: 30,
    //     marginBottom: 30,

    //   },


});

export default FilterPage;
