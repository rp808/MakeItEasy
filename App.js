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
import SaveRecipeDirection from './src/SaveRecipeDirection';
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

      <Stack.Screen name="Home" options={
        {
          headerShown: false
        }
      }>
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

      <Stack.Screen name="Suggestions" options={
        {
          headerShown: false
        }
      }>
        {(props) => <Suggestions token={token} {...props} />}
      </Stack.Screen>


      <Stack.Screen name="RecipeFilter" options={
        {
          headerShown: false
        }
      } >{(props) => {
        return <RecipeFilter token={token} props={props} />
      }}</Stack.Screen>



      <Stack.Screen name="SaveRecipe" options={
        {
          headerShown: false
        }
      }>
        {(props) => <SaveRecipe token={token} {...props} />}
      </Stack.Screen>


      <Stack.Screen name="SaveRecipeDirection" options={
        {
          headerShown: false
        }
      }>
        {(props) => <SaveRecipeDirection token={token} {...props} />}
      </Stack.Screen>

      <Stack.Screen name="UserProfile" options={
        {
          headerShown: false
        }
      }>
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
