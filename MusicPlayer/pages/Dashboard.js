import {View, Text,Image} from "react-native"
import {useState,useEffect} from "react"
import axios from "axios"
const Dashboard = () =>{
    // const [isLoaded,setIsLoaded]=useState(false);
    // useEffect(async()=>{
    //     const image=await axios.get();
    //     setIsLoaded("true");
    // },[])
    return(
        <View>
            <Text>Enjoy the Music!</Text>
            <Image source={{uri: "https://raw.githubusercontent.com/MURUGAN008/Music-Files/one-love-song/one-love.jpg"}} style={{width:200, height:200}}/>
        </View>
    )
}
export default Dashboard;
//https://raw.githubusercontent.com/MURUGAN008/Music-Files/one-love-song/one-love.jpg