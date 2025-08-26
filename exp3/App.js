import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Clock from './Clock';

export default function App() {
  return (
    <View style={styles.container}>
      <Clock/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    // Removed justifyContent to allow child to use full width
  },
});
