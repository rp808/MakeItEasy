import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../config';
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

const UserProfile = ({ navigation, token }) => {
    //console.log("token",token);
    const [userData, setUserData] = useState(null);
    const [selectedItem, setSelectedItem] = useState([]);
    const dietaryRestrictionsOptions = [
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

 

    useEffect(() => {
        fetchUserProfile();
    }, []);
    const fetchUserProfile = async () => {
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
                setUserData(data);
                setSelectedItem([data.dietaryRestriction]);
            } else {
                console.log('Error:', data.error);
            }
        } catch (error) {
            console.log('Error:', error.message);
        }
    };

    const saveDietaryRestriction = async () => {
        try {
          const data = {
            dietaryRestriction: selectedItem,
          };
    
          const response = await fetch(`${API_BASE_URL}/profile`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          const responseData = await response.json();
    
          if (response.ok) {
            console.log('User profile updated successfully');
            setUserData({ ...userData, dietaryRestriction: selectedItem });
          } else {
            console.log('Error:', responseData.error);
          }
        } catch (error) {
          console.log('Error:', error.message);
        }
      };
    
      const handleSelection = (item) => {
        setSelectedItem(item);
      };
    
    

    return (
        (
            <View style={styles.screen}>

                <StatusBar style="auto" />
                <View style={styles.appNameFlex}>
                    <View>
                        <Text style={styles.logoTxt}>MakeItEasy</Text>
                    </View>
                </View>
                <View style={styles.userName}>
                   
                        <Text style={styles.logoTxt}>First Name: {userData?.firstName} </Text>
                        <Text style={styles.logoTxt}>Last Name:  {userData?.lastName}</Text>
                  
                </View>
                <View style={styles.userDiet}>
                    <View>
                        <Text style={styles.label}>Dietary Restriction : {userData?.dietaryRestriction || 'Not set'}</Text>
                        <View style={styles.checkboxContainer}>
                            {dietaryRestrictionsOptions.map((option) => (
                                <TouchableOpacity
                                    key={option.value}
                                    style={[
                                        styles.checkbox,
                                        selectedItem.includes(option.value) && styles.checkboxSelected,
                                    ]}
                                    onPress={() => handleSelection(option.value)}
                                >
                                    <Text
                                        style={[
                                            styles.checkboxLabel,
                                            selectedItem.includes(option.value) ? styles.selectedCheckboxLabel : null,
                                        ]}
                                    >
                                        {option.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TouchableOpacity style={styles.saveButton} onPress={saveDietaryRestriction}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('RecipeUpload')} >
                            <Text style={styles.saveButtonText}>REcipe Upload</Text>
                        </TouchableOpacity>
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
                        <Image style={styles.iconImg} source={require("./assets/userFilled.png")} />

                    </TouchableOpacity>

                </View>

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
    cardContainer: {
        flex: 2,
        width: '90%',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#FFF',
        elevation: 3,
      },


    appNameFlex: {
        flex: 1,
        width: '100%',
        // backgroundColor: "#fff",
        paddingLeft: 15,
        alignItems: "start",
        justifyContent: "center",
    },
    userName: {
        flex: 2,
        width: '95%',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#FFF',
        elevation: 3,
    },
    userDiet: {
        flex: 6,
        width: '95%',
        borderRadius: 10,
        padding: 5,
        marginVertical: 10,
        backgroundColor: '#FFF',
        elevation: 3,
    },


    buttomNavFlex: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 54,

        flex: 1,
        margin: 10,
        width: '100%',

    },
    iconContainer: {
        alignItems: 'center',
        marginLeft: 35,
        marginRight: 35,
        marginBottom: 15,


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
        marginBottom: 10,
        marginTop: 10,
    },
    checkboxLabel: {

        color: 'black',

    },
    selectedCheckboxLabel: {

        color: 'white',

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
        marginRight: 10,
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
    saveButton: {
        width:'50%',
        marginTop: 20,
        marginLeft:'25%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor:"#e2d784",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
      
        elevation: 5,
      },
      saveButtonText: {
        color: 'black',
        marginLeft: 5,
        fontFamily: "GillSans-SemiBold",
        fontSize: 23
      },



});

export default UserProfile