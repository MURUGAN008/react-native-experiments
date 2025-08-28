import AsyncStorage from "@react-native-async-storage/async-storage";
import {useCallback, useEffect, useState} from "react"
import BookCard from "./BookCard"
import {View,Text,StyleSheet, TouchableOpacity} from "react-native"
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native"
const Books =()=>{
    const [books,setBooks]=useState([]);
    const [isEmpty,setISEmpty]=useState(false);
    const [isLoading,setIsLoading]=useState(true);
    const navigation=useNavigation();
    const loadBooks = async() => {
        const jsonValues=await AsyncStorage.getItem("books");
        console.log(jsonValues);
        if(jsonValues){
            setBooks(JSON.parse(jsonValues));
            setISEmpty(false);
            setIsLoading(false);
        }
        else{
            setIsLoading(false);
            setISEmpty(true);
            //no books
        }
        console.log(isEmpty);
    }
    useFocusEffect(
          useCallback(() => {
    const fetchBooks = async () => {
      await loadBooks();
    }
    fetchBooks();
    },[])
    )
    const handleCreateBook=()=>{
        navigation.navigate("createbook");
    }
    return(
        <View style={style.main}>
            <Text>Books Dashboard</Text>
            {isLoading?(
                <Text>Loading</Text>
            ):(
                isEmpty ? (
                    <>
                        <Text style={style.nobooks}>No books Available</Text>
                        <TouchableOpacity style={[style.addBooksEmpty,style.createBooks]} onPress={handleCreateBook}>
                            <Text style={{color:"white",fontSize:10}}>Add Books</Text>
                        </TouchableOpacity>
                    </>
                ):(
                    <View>
                    {books.map((book,idx)=>(<BookCard key={idx} book={book} />))}
                    </View>
                )
            )}
        </View>
    )
}


const style=StyleSheet.create({
    main:{
        margin:0,
        padding:0,
        boxSizing: "border-box",
        flex:1,
        backgroundColor: "#E8D4B7"
    },
    nobooks:{
        color: 'red',
        position: 'absolute',
        top:"40%",
        left:"30%",
        fontSize: 20,
    },
    addBooksEmpty:{

    },
    createBooks:{
        backgroundColor:"blue",
    }
})


export default Books;
