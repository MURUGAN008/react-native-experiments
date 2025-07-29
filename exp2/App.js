import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import feedback from './components/feedback';
import thankyou from './components/thankyou';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="feedback">
        <Stack.Screen name="feedback" component={feedback} />
        <Stack.Screen name="thankyou" component={thankyou} />
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
