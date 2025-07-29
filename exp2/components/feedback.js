import {Text,StyleSheet, View, Button, TextInput, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react';
export default function Feedback() {
  const navigation = useNavigation();
    const [name, setName] = useState('');
    const [feedback, setFeedback] = useState('');
    function handleSubmit() {
        // Handle the feedback submission logic here
        console.log('Feedback submitted:', { name, feedback });
        if(name && feedback) {
        navigation.navigate('thankyou');    
        }
        else{
            Alert.alert('Error', 'Please fill in both fields.');
        }
    }
  return (
    <View style={styles.container}>
      <Text>Enter your name: </Text>
      <TextInput value={name} onChangeText={setName}/>
        <Text>Enter your feedback: </Text>
      <TextInput value={feedback} onChangeText={setFeedback}/>
      <Button
        title="Submit Feedback"
        onPress={() => handleSubmit()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {  
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});