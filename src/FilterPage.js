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
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const FilterPage = ({navigation}) => {
    

    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelection = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };
    const [selectedLevel, setSelectedLevel] = useState('');

    const handleLevel = (item) => {
        setSelectedLevel(item);
    };

    const levels = [
        { label: 'Beginner Friendly', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
    ];


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

    const [ingredients, setIngredients] = useState([{ name: '' }]);

    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index].name = value;
        setIngredients(updatedIngredients);
    };

    const addIngredientRow = () => {
        setIngredients([...ingredients, { name:''}]);
    };

    const handleSubmit = () => {
        // Prepare the data to be sent to the server
        const data = {
            ingredients: ingredients.map((ingredient) => ingredient.name),
        //   selectedItems: selectedItems,
        //   selectedLevel: selectedLevel
        };
      
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
          // Process the matched ingredients received from the server
          console.log('Matched Ingredients:', data);
        })
        .catch(error => {
          console.error('Error sending data:', error);
          // Handle any errors that occur during the request
        });
      };

    const handleReset = () => {
        // setIngredients([{ name: '', quantity: '' }]);
        setIngredients([{ name: ''}]);
    };


    return (
        (
            <View style={styles.screen}>
                <ImageBackground
                    source={require("./assets/back.jpg")}
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
                                    <Text style={styles.checkboxLabel}>{option.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                    </View>
                    <View style={styles.levelThree}>
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


                    </View>

                    <View style={styles.avail}>
                        <Text style={styles.label}>Available Ingredients</Text>
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
                        <TouchableOpacity style={styles.addButton} onPress={addIngredientRow}>
                            <Ionicons name="add" size={24} color="white" />
                            <Text style={styles.addButtonText}>Add Ingredient</Text>
                        </TouchableOpacity>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                                <Text style={styles.buttonText}>Reset</Text>
                            </TouchableOpacity>
                        </View>


                    </View>

                    <View style={styles.btmContainer}>
                        <View style={styles.buttomNavFlex}>

                            <TouchableOpacity style={styles.iconContainer}  onPress={() => navigation.navigate('Home')}>
                                <Image style={styles.iconImg} source={require("./assets/homeNF.png")} />
                                {/* <Text style={styles.ttitle}>Homee</Text> */}
                            </TouchableOpacity>
                            <View style={styles.iconContainer}>
                                <Image style={styles.iconImg} source={require("./assets/filterFilled.png")} />
                                {/* <Text style={styles.ttitle}>Homee</Text> */}
                            </View>
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


    screen: {
        flex: 1,
        width: '100%',
        //backgroundColor: '#FFF',
        alignItems: "center",
        justifyContent: "center",
    },
    imageBackground: {
        //  height:'100%',
        resizeMode: 'contain',

    },
    appNameFlex: {
        flex: 0.8,
        width: '100%',
        // backgroundColor: "#fff",
        paddingLeft: 15,
        alignItems: "start",
        justifyContent: "center",
    },
    avail: {
        flex: 4,


        //  backgroundColor: "#F9F9F9",
        // alignItems: "right",
        // justifyContent: "center",

    },
    levelThree: {
        flex: 1,
        //backgroundColor: "#F9F9F9",
        width: "100%",

        // alignItems: "right",
        // justifyContent: "center",
    },
    diet: {

        flex: 1,
        // backgroundColor: "#F9F9F9",
        width: "100%",


        // width: '100%',
        // backgroundColor: "#fff",
        // // alignItems: "right",
        // // justifyContent: "center",
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start',


    }, radioContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 5,
    },
    radio: {
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 10,
        marginLeft: 5,
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#9A9A9A',
        backgroundColor: '#FFF',
        marginTop: 10,
    },
    radioSelected: {
        backgroundColor: '#AEAEAE',
    },
    radioLabel: {
        marginLeft: 2,
        fontFamily: "GillSans-Light",
        fontSize: 18,
    },
    container: {
        marginBottom: 20,
    },
    label: {
        marginTop: 20,
        fontSize: 22,
        marginLeft: 5,
        // marginLeft: "30%",
        // fontWeight: 'bold',GillSans-SemiBold
        fontFamily: "GillSans-SemiBold",
        //marginBottom: 1,
    },
    checkboxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10,

    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 10,
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#9A9A9A',
        marginTop: 10,
        backgroundColor: '#FFF',
        height: 35,
        //width:115,
    },
    checkboxSelected: {
        backgroundColor: '#AEAEAE',
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
    ingredientRow: {
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 5,
        marginTop: 15,

    },
    input: {
        flex: 1,
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        height: 35,
        backgroundColor: '#FFF',
        fontFamily: "GillSans-SemiBold",
    },
    quantityInput: {
        flex: 0.6,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginBottom: 10,
        width: "40%",
        marginLeft: 120,
    },
    addButtonText: {
        color: 'white',
        marginLeft: 5,
        fontFamily: "GillSans-SemiBold",
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    submitButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginLeft: 5,
        borderRadius: 5,
    },
    resetButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
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
