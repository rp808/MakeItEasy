import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react';
import Login from "./Login";
import Home from "./Home";
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
    ImageBackground,
    KeyboardAvoidingView
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const FilterPage = ({ navigation }) => {


    const [selectedItems, setSelectedItems] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    // const [selectedLevel, setSelectedLevel] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '' }]);
    const [totalCalories, setTotalCalories] = useState('');

    const handleSelection = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };


    // const handleLevel = (item) => {
    //     setSelectedLevel(item);
    // };

    // const levels = [
    //     { label: 'Beginner Friendly', value: 'beginner' },
    //     { label: 'Intermediate', value: 'intermediate' },
    //     { label: 'Advanced', value: 'advanced' },
    //     { label: 'Any', value: 'any' },
    // ];


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
            value: 'non-vegetarian',
        },
        {
            label: 'All',
            value: 'all',
        },

        // Add more dietary restrictions here
    ];



    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = { name: value };
        setIngredients(updatedIngredients);
    };

    const addIngredientRow = () => {
        setIngredients([...ingredients, { name: '' }]);
    };

    const handleSubmit = () => {
        setErrorMsg('');
        if (ingredients.some((ingredient) => ingredient.name === '')) {
            setErrorMsg('Please enter ingredients');
            return;
        }

        // Prepare the data to be sent to the server
        const data = {
            ingredients: ingredients.map((ingredient) => ingredient.name),
            selectedItems: selectedItems,
            totalCalories: totalCalories,
            // selectedLevel: selectedLevel
        };

        //           if (selectedItems.length === 0 && selectedLevel === '') {
        //     const filteredData = {
        //       matchingCards: [],
        //       ingredients: data.ingredients, // Include the ingredient names only
        //     };
        //     navigation.navigate('Suggestions', { filteredData });
        //     return;
        //   }


        // Make the POST request to the filter endpoint
        fetch('http://192.168.40.75:3000/filter', {
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
                    // Handle any errors that occur during the request
                }
            })
            .then(data => {
                if (data.matchingCards.length === 0) {
                    setErrorMsg('No matching recipes found.kindly recheck the enetered ingredient.');
                } else {
                    // Process the matched ingredients received from the server
                    console.log('Matched Ingredients:', data);
                    navigation.navigate('Suggestions', { filteredData: data });
                }
            })


            .catch(error => {
                console.error('Error sending data:', error);
                setErrorMsg('hard to find recipe , kindly recheck the enetered ingredient');

            });
    };

    const handleReset = () => {
        // setIngredients([{ name: '', quantity: '' }]);
        setIngredients([{ name: '' }]);
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
                        <Text style={styles.label}>Total Calories</Text>
                        <TextInput
                            style={styles.inputCal}
                            placeholder="Enter Total Calories"
                            value={totalCalories}
                            onChangeText={(value) => setTotalCalories(value)}
                            keyboardType="numeric"
                        />
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
                                {/* <TextInput
                                    style={[styles.input, styles.quantityInput]}
                                    placeholder="Quantity (optional)"
                                    value={ingredient.quantity}
                                    onChangeText={(value) => handleIngredientChange(index, 'quantity', value)}
                                /> */}
                            </View>
                        ))}
                        {/* <TouchableOpacity style={styles.addButton} onPress={addIngredientRow}>
                            <Ionicons name="add" size={24} color="white" />
                            <Text style={styles.addButtonText}>Add Ingredient</Text>
                        </TouchableOpacity> */}
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                                <Text style={styles.buttonText}>Reset</Text>
                            </TouchableOpacity>
                        </View>


                    </KeyboardAvoidingView>

                    <View style={styles.btmContainer}>
                        <View style={styles.buttomNavFlex}>

                            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Home')}>
                                <Image style={styles.iconImg} source={require("./assets/homeNF.png")} />
                                {/* <Text style={styles.ttitle}>Homee</Text> */}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('FilterPage')}>
                                <Image style={styles.iconImg} source={require("./assets/filterFilled.png")} />
                                {/* <Text style={styles.ttitle}>Homee</Text> */}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Login')}>
                                <Image style={styles.iconImg} source={require("./assets/logout.png")} />
                                {/* <Text style={styles.ttitle}>Homee</Text> */}
                            </TouchableOpacity>
                        </View>
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flex: 1,
    },




    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 22,
        fontFamily: "GillSans-SemiBold",
        marginBottom: 10,
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    checkboxLabel: {
        marginLeft: 2,
        fontFamily: "GillSans-Light",
        fontSize: 18,
    },
    // title: {
    //     fontSize:  fontFamily: "GillSans-Light",16,
    //     fontWeight: 'bold',
    //     marginBottom: 10,
    // },



    avail: {
        flex: 4,
        backgroundColor: "rgba(255, 255, 255,0.9)",
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        height: 45,
        backgroundColor: '#FFF',
        fontFamily: "GillSans-SemiBold",
    },
    inputCal:{
        marginRight: 30,
        // marginLeft:30,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        height: 45,
        backgroundColor: '#FFF',
        fontFamily: "GillSans-SemiBold",

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
        fontSize:18
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
    btmContainer: {
        flex: 1,
        // height:"100%",

    },
    buttomNavFlex: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 54,

        flex: 0.5,
        //margin: 10,
        width: "100%",
        //     flexDirection: 'row',
        //     justifyContent: "center",
        //     alignItems: 'center',
        //    // backgroundColor: '#fff',
        //     height: 74,

        //     flex: 1,
        //     margin: 10,
        //     // width: '100%',
        //     // backgroundColor: "#fbc",
        //     // alignItems: "center",
        //     // justifyContent: "center",
    },
    iconContainer: {
        alignItems: 'center',
        marginLeft: 35,
        marginRight: 55,
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
        height: 30,

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
