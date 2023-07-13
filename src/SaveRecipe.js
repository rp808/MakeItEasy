import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SaveRecipe = () => {

    return (
        <View style={styles.container}>
            <View style={styles.appNameFlex}>

                <Text style={styles.logoTxt}>MakeItEasy</Text>

            </View>

            <View style={styles.header}>

                <Text style={styles.title}>Suggestions</Text>

            </View>

            <ScrollView style={styles.scrollContainer}>
               
                    <TouchableOpacity style={styles.cardContainer}>
                        <Image style={styles.image} source={require("./assets/filter.png")} />
                        <Text style={styles.title}> abcd </Text>
                        <View style={styles.nutritionContainer}>
                            <Ionicons name="ios-flame" size={20} color="#05595b" />
                            <Text style={styles.nutritionText}> abcd</Text>
                            <Ionicons name="md-timer" size={20} color="#05595b" />
                            <Text style={styles.nutritionText}>abcd</Text>
                            <Text style={styles.nutritionText}> Serving:  </Text>

                        </View>
                    </TouchableOpacity>
                
            </ScrollView>

            <View style={styles.btmContainer}>
                <View style={styles.buttomNavFlex}>
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Image style={styles.iconImg} source={require('./assets/homeNF.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('FilterPage')}>
                        <Image style={styles.iconImg} source={require("./assets/filterFilled.png")} />
                        {/* <Text style={styles.ttitle}>Homee</Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Image style={styles.iconImg} source={require('./assets/logout.png')} />
                    </TouchableOpacity>
                </View>
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
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
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
        backgroundColor: '#F6F6F6',
        height: 54,

        flex: 0,
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
    iconImg: {
        width: 30,
        height: 30,
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