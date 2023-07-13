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
                    <View>
                        <Text style={styles.logoTxt}>user name : user name</Text>
                    </View>
                </View>



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



    appNameFlex: {
        flex: 1,
        width: '100%',
        // backgroundColor: "#fff",
        paddingLeft: 15,
        alignItems: "start",
        justifyContent: "center",
    },
    userName: {
        alignItems: "start",
        flex: 8,
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

});

export default UserProfile