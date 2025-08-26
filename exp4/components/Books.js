import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react"
import BookCard from "./BookCard"
import {View,Text,StyleSheet} from "react-native"
const Books =()=>{
    const [books,setBooks]=useState([]);
    const [isEmpty,setISEmpty]=useState(false);
    const [isLoading,setIsLoading]=useState(true);
    const loadBooks = async() => {
        const jsonValues=await AsyncStorage.getItem("books");
        if(jsonValues){
            setBooks(JSON.parse(jsonValues));
            setIsLoading(false);
        }
        else{
            setIsLoading(false);
            setISEmpty(true);
            //no books
        }
    }
    useEffect(()=>{
        loadBooks();
    },[])
    return(
        <View style={style.main}>
            Books Dashboard
            {isLoading?(
                <Text>Loading</Text>
            ):(
                isEmpty ? (
                    <Text style={style.nobooks}>No books Available</Text>
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
    }
})


export default Books;
