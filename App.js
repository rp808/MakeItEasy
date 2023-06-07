import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './src/SignUp';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>
      {/* {<Login/>} */}
      <SignUp/>

      {/* <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
          name="Login"
          component={Login}
          options={{title:'Login'}}/>
        </Stack.Navigator>
      </NavigationContainer> */}
    </View>
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
