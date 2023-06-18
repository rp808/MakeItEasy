import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rating: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredients: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

const Suggestions = ({ route }) => {

  const { filteredData } = route.params;
  if (!filteredData || !filteredData.matchingCards) {
    return null; // Or display a loading indicator, error message, or fallback UI
  }

  const { matchingCards } = filteredData;
  return (
    <ScrollView contentContainerStyle={styles.container}>
    {matchingCards.map((card) => (
      <View key={card._id} style={styles.cardContainer}>
        <Image source={{ uri: card.imageSource }} style={styles.image} />
        <Text style={styles.title}>{card.description}</Text>
        <Text style={styles.rating}>Rating: {card.rating}</Text>
        <Text style={styles.ingredients}>Ingredients: {card.ingredients.join(', ')}</Text>
        <Text style={styles.instructions}>Instructions: {card.instructions.join(', ')}</Text>
      </View>
    ))}
  </ScrollView>
  );
};

export default Suggestions;
