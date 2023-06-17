import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './src/SignUp';
import  Home from './src/Home';
import Recipe from './src/Recipe';
import FilterPage from './src/FilterPage';
import RecipeInstruction from './src/RecipeInstruction';
import Suggestions from './src/Sugestions';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
  
      
      <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen
          name="Login"
          component={Login}  
          options={
            {
            headerShown:false}
          }  />
        <Stack.Screen name="Home" component={Home}      options={
            {
            headerShown:false}
          }   />
              <Stack.Screen name="SignUp" component={SignUp}      options={
            {
            headerShown:false}
          }   />
                    <Stack.Screen name="FilterPage" component={FilterPage}      options={
            {
            headerShown:false}
          }   />
                    <Stack.Screen name="Recipe" component={Recipe}      options={
            {
            headerShown:false}
          }   />
                     <Stack.Screen name="RecipeInstruction" component={RecipeInstruction}      options={
            {
            headerShown:false}
          }   />
                        <Stack.Screen name="Suggestions" component={Suggestions}      options={
            {
            headerShown:false}
          }   />
      </Stack.Navigator>

      </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
