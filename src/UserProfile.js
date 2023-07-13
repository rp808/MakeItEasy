import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react';

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

const UserProfile = () => {
 
    const [selectedItems, setSelectedItems] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '' }]);
    const handleSelection = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
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

    const handleReset = () => {
        // setIngredients([{ name: '', quantity: '' }]);
        setIngredients([{ name: '' }]);
    };
    return (
        (
            <View style={styles.screen}>
                <ImageBackground
                    source={require("./assets/lbg1.jpg")}
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
                   
                  
                    <View style={styles.btmContainer}>
                        <View style={styles.buttomNavFlex}>
                            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Home')}>
                                <Image style={styles.iconImg} source={require("./assets/homeNF.png")} />
                                {/* <Text style={styles.ttitle}>Homee</Text> */}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconContainer}  onPress={() => navigation.navigate('FilterPage')}>
                                <Image style={styles.iconImg} source={require("./assets/filterFilled.png")}   />
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
        backgroundColor: "rgba(255, 255, 255,1)",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 20,
        marginBottom: 20,
        //width: '100%',
    },
    levelThree: {
        backgroundColor: "rgba(255, 255, 255,1)",
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
    radioContainer: {
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
        backgroundColor: '#8DAA6F',
        transform: [{ scale: 1.1 }], // Scale up the selected radio button
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
    radioLabel: {
        marginLeft: 2,
        fontFamily: "GillSans-Light",
        fontSize: 18,
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
        marginRight: 7,
        marginBottom: 10,
        padding: 5,
        borderRadius: 5,  
        borderWidth: 1,
        borderColor: '#9A9A9A',
        marginTop: 10,
        backgroundColor: '#FFF',
        height: 35,
    },
    checkboxSelected: {
        backgroundColor: '#8DAA6F',
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
        backgroundColor: "rgba(255, 255, 255, 1)",
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
    quantityInput: {
        flex: 0.6,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#71797E",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        // marginBottom: 10,
        // width: "40%",
        marginLeft: 20,
        height:40,
    },
    addButtonText: {
        color: 'white',
        marginLeft: 5,
        fontFamily: "GillSans-SemiBold",
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:20,
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

export default UserProfile