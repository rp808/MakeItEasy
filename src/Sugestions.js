import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Suggestions = ({ route, navigation }) => {
    const { filteredData, selectedIngredients } = route.params;


    if (!filteredData || !filteredData.matchingCards) {
        return null; // Or display a loading indicator, error message, or fallback UI
    }

    const { matchingCards } = filteredData;

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
                        <Text style={styles.title}>{card.description}</Text>
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
                <View style={styles.iconContainer}>
                    <Image style={styles.iconImg} source={require("./assets/homeNF.png")} />

                </View>
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