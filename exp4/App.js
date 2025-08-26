import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Books from "./components/Books"
import CreateBook from './components/CreateBook';

export default function App() {
    const Stack=createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='books'>
        <Stack.Screen name="books" component={Books} />
        <Stack.Screen name="createbook" component={CreateBook} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


