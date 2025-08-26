import {Text, TextInput, TouchableOpacity, View} from "react-native"
const CreateBook = () =>{
    const [book,setBook]=useState({
        title:"",
        author:"",
        isbn:"",
        yearOfRelease:0,
        description:""
    })
    return(
        <View>
            <Text>Create Book</Text>
            <Text>Book Name:</Text>
            <TextInput value={book.title}></TextInput>
            <Text>Author Name:</Text>
            <TextInput value={book.author}></TextInput>
            <Text>Book ISBN:</Text>
            <TextInput value={book.isbn}></TextInput>
            <Text>Year Of Release:</Text>
            <TextInput value={book.yearOfRelease}></TextInput>
            <Text>Book Description:</Text>
            <TextInput value={book.description}></TextInput>
            <TouchableOpacity onPress={handleCreateBook}>
                <Text>Create Book</Text>
            </TouchableOpacity>
        </View>
    )
}
export default CreateBook;