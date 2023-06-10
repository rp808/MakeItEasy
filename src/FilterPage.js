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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CheckBoxForm from 'react-native-checkbox-form';

const FilterPage = () => {

    const [selectedItems, setSelectedItems] = useState([]);

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


    return (
        (
            <View style={styles.screen}>
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


                </View>

                <View style={styles.avail}>



                </View>


                <View style={styles.buttomNavFlex}>

                    <View style={styles.iconContainer}>
                        <Image style={styles.iconImg} source={require("./assets/homeNF.png")} />
                        {/* <Text style={styles.ttitle}>Homee</Text> */}
                    </View>
                    <View style={styles.iconContainer}>
                        <Image style={styles.iconImg} source={require("./assets/filterFilled.png")} />
                        {/* <Text style={styles.ttitle}>Homee</Text> */}
                    </View>
                    <View style={styles.iconContainer}>
                        <Image style={styles.iconImg} source={require("./assets/logout.png")} />
                        {/* <Text style={styles.ttitle}>Homee</Text> */}
                    </View>

                </View>




            </View>
        )




    );
};
const styles = StyleSheet.create({


    screen: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFF',
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
    avail: {
        flex: 4,

        width: '100%',
        backgroundColor: "#fbc",
        alignItems: "right",
        justifyContent: "center",

    },
    levelThree: {
        flex: 4,

        width: '100%',
        backgroundColor: "#000",
        alignItems: "right",
        justifyContent: "center",
    },
    diet: {

        flex: 2,
        backgroundColor:"#EDEDED",
        width:"100%",
        

        // width: '100%',
        // backgroundColor: "#fff",
        // // alignItems: "right",
        // // justifyContent: "center",
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start',


    },
    container: {
        marginBottom: 20,
    },
    label: {
        marginTop:20,
        fontSize: 22,
        marginLeft:"20%",
        fontWeight: 'bold',
        marginBottom: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin:10,
   
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
        marginTop:10,
      },
      checkboxSelected: {
        backgroundColor: '#808080',
      },
      checkboxLabel: {
        marginLeft: 2,
        fontFamily: "Gill Sans",
        fontSize: 18,
      },
    

    buttomNavFlex: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 74,

        flex: 1,
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
