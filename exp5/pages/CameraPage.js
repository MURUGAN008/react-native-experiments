import {CameraView,useCameraPermissions} from "expo-camera";
import { Text, View, StyleSheet, TouchableOpacity, Button} from "react-native"
import {useState} from "react"

const CameraPage=()=>{
    const [cameraFace,setcameraFace]=useState('back');
    const [permission,requestPermission]=useCameraPermissions();
    if(!permission){
        return(
            <View>
                <Text>Camera is loading</Text>
            </View>
        )
    }
    if(!permission.granted){
        return(
            <View>
                <Text>Allow camera permission</Text>
                <Button onPress={requestPermission} title="Grant Permission"/>
            </View>
        )
    }
    function toggleCamera(){
        setcameraFace(p=>p==="back"?"front":"back");
    }
    return(
        <View style={{flex:1}}>
            <CameraView style={{flex: 1}}facing={cameraFace} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={toggleCamera}>
                    <Text style={styles.flipText}>Flip Camera</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default CameraPage;
const styles=StyleSheet.create(
    {
        buttonContainer:{
            backgroundColor:"transparent",
            height:150,
            display: "flex",
            justifyContent:"flex-start",
            alignItems:"flex-end"
        },
        flipText:{
            // textAlign:"center",
            marginTop:30,
            marginRight: 30,
            backgroundColor:"rgba(56, 135, 238, 0.84)",
            padding: 15,
            borderColor: "rgba(5, 5, 5, 0.94)",
            borderWidth: 1,
            borderRadius: 5
        }
    }
)