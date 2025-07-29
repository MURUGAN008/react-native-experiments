import { Text,StyleSheet,View } from "react-native";
import React,{useContext} from 'react';
export default function ThankYou() {
    const {name,setName} = useContext(nameContext);
  return (
    <View style={styles.container}>
      <Text>{name}, Thank you for your feedback!</Text>
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
