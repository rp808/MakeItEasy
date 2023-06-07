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

export const Home = () => {
    const data = [
        { id: '1', imageSource: require('./assets/eggs.jpg'), description: 'Card 1', rating: '4.5' },
        { id: '2', imageSource: require('./assets/eggs.jpg'), description: 'Card 2', rating: '4.2' },
        { id: '1', imageSource: require('./assets/eggs.jpg'), description: 'Card 1', rating: '4.5' },
        { id: '2', imageSource: require('./assets/eggs.jpg'), description: 'Card 2', rating: '4.2' },
        { id: '1', imageSource: require('./assets/eggs.jpg'), description: 'Card 1', rating: '4.5' },
        { id: '2', imageSource: require('./assets/eggs.jpg'), description: 'Card 2', rating: '4.2' },
        { id: '1', imageSource: require('./assets/eggs.jpg'), description: 'Card 1', rating: '4.5' },
        { id: '2', imageSource: require('./assets/eggs.jpg'), description: 'Card 2', rating: '4.2' },
        // Add more card data here
      ];
      const renderItem = ({ item }) => (
        <View style={styles.cards}>
          <Image source={item.imageSource} style={styles.image} />
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      );
    return (
        <View style={styles.screen}>
            <StatusBar style="auto" />

            <View style={styles.appNameFlex}>
                <View>
                    <Text style={styles.logoTxt}>MakeItEasy</Text>
                </View>

            </View>
           

            <View style={styles.cardsFlex}>
                {/* <View style={styles.cards}>
                    <Image source={require("./assets/eggs.jpg")} style={styles.image}></Image>
                    <Text style={styles.description}>recipe description</Text>
                    <Text style={styles.rating}>rating</Text>
                </View> */}
                 <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />

            </View>


            <View style={styles.buttomNavFlex}>

            </View>




        </View>
    )
};
const styles = StyleSheet.create({


    screen: {
        flex: 1,
        width: '100%',
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    appNameFlex: {
        flex: 1.2,
        width: '100%',
        backgroundColor: "#fbf",
        paddingLeft: 15,
        alignItems: "start",
        justifyContent: "center",
    },
    cardsFlex: {
        flex: 10,
        // marginTop:10,
        width: '100%',
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
   
    buttomNavFlex: {
        flex: 1,
        width: '100%',
        backgroundColor: "#fbc",
        alignItems: "center",
        justifyContent: "center",
    },
    logoTxt: {
        fontSize: 22,
        fontWeight: 'bold',
        paddingTop: 35,
        fontFamily: 'GillSans-SemiBoldItalic',
    },
    cards: {
        
        width: "40%",
        height: 200,
        backgroundColor: '#CFD4D2',
        borderRadius: 8,
        // paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        
        margin:"5%",
        
        // marginBottom: 10,
        // marginTop:20,
        // marginLeft:20,  
            
        
    },
    image: {
        marginTop: -80,
        width: 120,
        height: 120,
        borderRadius: "100%",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    rating: {
        fontSize: 14,
        color: '#888888',
    },
    listContainer: {
        paddingHorizontal: 10,
      }
    //   signUpTxt:{
    //     marginTop: 5,
    //     height: 30,
    //     marginBottom: 30,

    //   },


});
