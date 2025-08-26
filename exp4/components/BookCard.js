import {View,Text } from "react-native"

const BookCard = ({book}) =>{

    return(
        <View>
            <Text>{book.title}</Text>
            <Text>{book.author}</Text>
            <Text>{book.isbn}</Text>
            <Text>{book.yearOfRelease}</Text>
            <Text>{book.bio}</Text>
        </View>
    )
}