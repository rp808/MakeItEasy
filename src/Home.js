import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react';
import Login from "./Login";
import FilterPage from "./FilterPage";
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

export const Home = ({navigation}) => {
    const data = [
        { id: '1', imageSource: require('./assets/eggs.jpg'), description: 'Card 1', rating: '4.5' },
        { id: '2', imageSource: require('./assets/eggs.jpg'), description: 'Card 2', rating: '4.2' },
        { id: '3', imageSource: require('./assets/eggs.jpg'), description: 'Card 1', rating: '4.5' },
        { id: '4', imageSource: require('./assets/eggs.jpg'), description: 'Card 2', rating: '4.2' },
        { id: '5', imageSource: require('./assets/eggs.jpg'), description: 'Card 1', rating: '4.5' },
        { id: '6', imageSource: require('./assets/eggs.jpg'), description: 'Card 2', rating: '4.2' },
        { id: '7', imageSource: require('./assets/eggs.jpg'), description: 'Card 1', rating: '4.5' },
        { id: '8', imageSource: require('./assets/eggs.jpg'), description: 'Card 2', rating: '4.2' },
        { id: '9', imageSource: require('./assets/eggs.jpg'), description: 'Card 1', rating: '4.5' },
        { id: '10', imageSource: require('./assets/eggs.jpg'), description: 'Card 2', rating: '4.2' },
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
                <View >
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
                <View style={styles.iconContainer}>
                    <Image style={styles.iconImg} source={require("./assets/home.png")}/>
                    {/* <Text style={styles.ttitle}>Homee</Text> */}
                </View>
                <TouchableOpacity style={styles.iconContainer}  onPress={() => navigation.navigate('FilterPage')}>
                    <Image style={styles.iconImg}  source={require("./assets/filter.png")}/>
                    {/* <Text style={styles.ttitle}>Homee</Text> */}
                </TouchableOpacity>
                <View style={styles.iconContainer}>
                    <Image style={styles.iconImg}  source={require("./assets/logout.png")}/>
                    {/* <Text style={styles.ttitle}>Homee</Text> */}
                </View>

                
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
        backgroundColor: "#fff",
        paddingLeft: 15,
        alignItems: "start",
        justifyContent: "center",
    },
    cardsFlex: {
        flex: 10,
      
        width: '100%',
        backgroundColor: "#fff",
        alignItems: "right",
        justifyContent: "center",
      
    },
   
    buttomNavFlex: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 54,
           
         flex: 0,
         margin:10,
        // width: '100%',
        // backgroundColor: "#fbc",
        // alignItems: "center",
        // justifyContent: "center",
    },
    iconContainer: {
        alignItems: 'center',
        marginLeft:35,
        marginRight:55,
        marginBottom:15,
       // marginTop:15,
        
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
        marginTop:30,
        marginRight:"5%",
        marginLeft:"5%",
        marginBottom:"5%",
        
        // marginBottom: 10,
        // marginTop:20,
        // marginLeft:20,  
            
        
    },
    iconImg: {
       
        width:30,
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
    description: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginRight:"50%",
    },
    rating: {
        fontSize: 14,
        color: '#888888',
        marginRight:"50%",
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
export default Home;
