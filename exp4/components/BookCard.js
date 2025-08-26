import {View,Text } from "react-native"

const BookCard = ({book}) =>{

    return(
        <View>
            <Text>{book.title}</Text>
            <Text>{book.author}</Text>
            <Text>{book.ispn}</Text>
            <Text>{book.yearOfRelease}</Text>
        </View>
    )
}