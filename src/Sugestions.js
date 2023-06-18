import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';

const Suggestions = ({ route }) => {
    const { filteredData, selectedIngredients } = route.params;

  if (!filteredData || !filteredData.matchingCards) {
    return null; // Or display a loading indicator, error message, or fallback UI
  }

  const { matchingCards } = filteredData;

  return (
    <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.appNameFlex}>
                <View >
                    <Text style={styles.logoTxt}>MakeItEasy</Text>
                </View>

            </View>
           <View style={styles.header}>
        <Text style={styles.selectedIngredients}>
          Selected Ingredients:
        </Text>
        <Text style={styles.title}>Suggestions</Text>
      </View>
      {matchingCards.map((card) => (
        <View key={card._id} style={styles.cardContainer}>
          <Image source={{uri: card.imageSource}} style={styles.image} />
          <Text style={styles.title}>{card.description}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.rating}>Rating: {card.rating}</Text>
            <Text style={styles.ingredients}>Ingredients: {card.ingredients.join(', ')}</Text>
            <Text style={styles.instructions}>Instructions: {card.instructions.join(', ')}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  cardContainer: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  appNameFlex: {
    flex: 1.2,
    width: '100%',
    backgroundColor: "#fff",
    paddingLeft: 15,
    alignItems: "start",
    justifyContent: "center",
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
    paddingTop: 35,
    fontFamily: 'GillSans-SemiBoldItalic',
},
  header: {
    marginBottom: 20,
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
    marginBottom: 20,
  },

  detailsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  rating: {
    fontSize: 16,
    marginBottom: 5,
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