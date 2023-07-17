import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './src/SignUp';
import Home from './src/Home';
import Recipe from './src/Recipe';
import FilterPage from './src/FilterPage';
import RecipeInstruction from './src/RecipeInstruction';
import Suggestions from './src/Sugestions';
import RecipeFilter from './src/RecipeFilter';
import SaveRecipe from './src/SaveRecipe';
import UserProfile from './src/UserProfile';
import { useState } from "react"
const Stack = createNativeStackNavigator();
export default function App() {

  const [token, setToken] = useState(null)
  return (<NavigationContainer>
    <Stack.Navigator>

      <Stack.Screen
        name="Login"
        // component={Login}
        options={
          {
            headerShown: false
          }
        } >

        {(props) => {
          return <Login setToken={setToken} props={props} />
        }}
      </Stack.Screen>

      <Stack.Screen name="Home">
        {(props) => <Home token={token} {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="SignUp"
        options={{
          headerShown: false
        }}
      >
        {(props) => {
          return <SignUp setToken={setToken} props={props} />;
        }}
      </Stack.Screen>
      <Stack.Screen name="FilterPage" component={FilterPage} options={
        {
          headerShown: false
        }
      } />
      <Stack.Screen name="Recipe" options={
        {
          headerShown: false
        }
      } >

        {(props) => {
          return <Recipe token={token} props={props} />
        }}
      </Stack.Screen>
      <Stack.Screen name="RecipeInstruction" component={RecipeInstruction} options={
        {
          headerShown: false
        }
      } />
      <Stack.Screen name="Suggestions" component={Suggestions} options={
        {
          headerShown: false
        }
      } />

      <Stack.Screen name="RecipeFilter" options={
        {
          headerShown: false
        }
      } >{(props) => {
        return <RecipeFilter token={token} props={props} />
      }}</Stack.Screen>



      <Stack.Screen name="SaveRecipe">
        {(props) => <SaveRecipe token={token} {...props} />}
      </Stack.Screen>

      <Stack.Screen name="UserProfile">
        {(props) => <UserProfile token={token} {...props} />}
      </Stack.Screen>
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
