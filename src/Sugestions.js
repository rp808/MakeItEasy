import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

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
                <Text style={styles.selectedIngredients}>Selected Ingredients:</Text>
                <Text style={styles.title}>Suggestions</Text>
            </View>

            <ScrollView style={styles.scrollContainer}>
                {matchingCards.map((card) => (
                    <View key={card._id} style={styles.cardContainer}>
                        <Image source={{ uri: card.imageSource }} style={styles.image} />
                        <Text style={styles.title}>{card.description}</Text>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.rating}>Rating: {card.rating}</Text>
                            {/* <Text style={styles.ingredients}>
                                Ingredients: {card.ingredients.join(', ')}
                            </Text>
                            <Text style={styles.instructions}>
                                Instructions: {card.instructions.join(', ')}
                            </Text> */}
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.btmContainer}>
                <View style={styles.buttomNavFlex}>
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Image style={styles.iconImg} source={require('./assets/homeNF.png')} />
                    </TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <Image
                            style={styles.iconImg}
                            source={require('./assets/filterFilled.png')}
                        />
                    </View>
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
    scrollContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10,
        paddingTop: 20,
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
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'GillSans-SemiBoldItalic',
    },
    header: {
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center',
    },
    selectedIngredients: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
     margin:20,
    },
    detailsContainer: {
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    rating: {
        fontSize: 16,
        marginBottom: 5,
        marginLeft:20,
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