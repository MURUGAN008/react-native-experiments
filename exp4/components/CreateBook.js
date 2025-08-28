import {Text, TextInput, TouchableOpacity, View, Alert} from "react-native"
import { useState } from "react"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
const CreateBook = () =>{
    const naviagtion=useNavigation();
    const [book,setBook]=useState({
        title:"",
        author:"",
        isbn:"",
        yearOfRelease:0,
        description:""
    })
    const handleCreateBook=async()=>{
        const trimmedBook={...book};
        // trim all extra spaces before and after
        console.log("starts!");
        for(let key in trimmedBook){
            let value=trimmedBook[key];
            if(typeof value==="string"){
                trimmedBook[key]=value.trim();
            }
        }
        console.log("here")
        // if(!trimmedBook.title || !trimmedBook.author || !trimmedBook.isbn || isNaN(yearOfRelease) || !trimmedBook.description){
        //     Alert.alert("Enter valid Input!");
        //     console.log("alsret");
        //     return;
        // }
        console.log("before");
        const response=await AsyncStorage.getItem("books");
        let books=JSON.parse(response);
        if(books==null){
            books=[trimmedBook]
        }
        else{
            books.push(trimmedBook);
        }
        console.log(books)
        await AsyncStorage.setItem("books",JSON.stringify(books));
        NavigationActivation.goBack();
    }
    return(
        <View>
            <Text>Create Book</Text>
            <Text>Book Name:</Text>
            <TextInput value={book.title} onChangeText={(text)=>setBook(p=>({...p,title:text}))} />
            <Text>Author Name:</Text>
            <TextInput value={book.author} onChangeText={text=>setBook(p=>({...p,author:text}))} />
            <Text>Book ISBN:</Text>
            <TextInput value={book.isbn} onChangeText={text=>setBook(p=>({...p,isbn:text}))} />
            <Text>Year Of Release:</Text>
            <TextInput value={book.yearOfRelease} onChangeText={text=>setBook(p=>({...p,yearOfRelease:text?Number(text):0}))} />
            <Text>Book Description:</Text>
            <TextInput value={book.description} onChangeText={text=>setBook(p=>({...p,description:text}))}/>
            <TouchableOpacity onPress={handleCreateBook}>
                <Text>Create Book</Text>
            </TouchableOpacity>
        </View>
    )
}
export default CreateBook;