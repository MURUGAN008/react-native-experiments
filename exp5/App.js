import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated, SafeAreaView, ScrollView, Alert } from 'react-native';
import { CameraView,CameraType, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from "@expo/vector-icons";
export default function App() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('sepia');
  const [cameraActive, setCameraActive] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraFace,setCameraFace]=useState('back');
  const getFilterStyle = (filter) => {
    switch(filter) {
      case 'sepia':
        return { filter: 'sepia(1)' };
      case 'blackandwhite':
        return { filter: 'grayscale(1)' };
      case 'warm':
        return { filter: 'sepia(0.5) hue-rotate(-20deg) saturate(1.2)' };
      case 'cool':
        return { filter: 'hue-rotate(180deg) saturate(0.8) brightness(1.1)' };
      case 'invert':
        return { filter: 'invert(1)' };
      case 'vintage':
        return { filter: 'sepia(0.7) contrast(1.2) brightness(0.9)' };
      case 'blur':
        return { filter: 'blur(5px)' };
      case 'sharpen':
        return { filter: 'contrast(1.5) saturate(1.5)' };
      default:
        return { filter: 'sepia(1)' };
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
          exif: false,
          mirrorImage: cameraFace=='front'?true:false
        });
        
        setCapturedImage(photo.uri);
        setCameraActive(false);
        
        // Start the fade-in animation
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.log('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take picture. Please try again.');
      }
    }
  };

  const startCamera = async () => {
    if (!permission?.granted) {
      await requestPermission();
    }
    setCameraActive(true);
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setCameraActive(false);
  };

  const getFilterName = () => {
    switch(selectedFilter) {
      case 'sepia': return 'Sepia';
      case 'blackandwhite': return 'Black & White';
      case 'warm': return 'Warm';
      case 'cool': return 'Cool';
      case 'invert': return 'Invert';
      case 'vintage': return 'Vintage';
      case 'blur': return 'Blur';
      case 'sharpen': return 'Sharpen';
      default: return 'Sepia';
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to use the camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (cameraActive) {
    return (
      <SafeAreaView style={styles.container}>
        <CameraView
          style={styles.camera}
          ref={cameraRef}
          facing={cameraFace}
        />
        <View style={styles.cameraOverlay}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setCameraActive(false)}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>setCameraFace(p=>p==='back'?'front':'back')} style={{borderWidth:3,borderColor:'white',width:50,height:50,position:'absolute',bottom:50,right:30,display:'flex',flex:1,justifyContent:'center',alignItems:'center',borderRadius:25}}>
          <Ionicons name="camera-reverse-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (capturedImage) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.previewContainer}>
          <Animated.View style={[{ opacity: fadeAnim }, styles.imageContainer]}>
            <Image 
              source={{ uri: capturedImage }} 
              style={[styles.previewImage, getFilterStyle(selectedFilter)]}
            />
          </Animated.View>
          <Text style={styles.filterText}>{getFilterName()} Filter Applied</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.retakeButton]} onPress={retakePicture}>
            <Text style={styles.buttonText}>Take Another Photo</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Camera App</Text>
        <Text style={styles.subtitle}>Choose a filter, then take a photo</Text>
        
        <View style={styles.filterSelectorContainer}>
          <Text style={styles.filterLabel}>Select Filter:</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
          >
            {['sepia', 'blackandwhite', 'warm', 'cool', 'invert', 'vintage', 'blur', 'sharpen'].map((filter) => (
              <TouchableOpacity 
                key={filter}
                style={[styles.filterOption, selectedFilter === filter && styles.selectedFilter]} 
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={styles.filterOptionText}>
                  {filter === 'blackandwhite' ? 'B&W' : 
                   filter === 'sepia' ? 'Sepia' :
                   filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.selectedFilterContainer}>
          <Text style={styles.selectedFilterText}>
            Selected: {getFilterName()}
          </Text>
        </View>

        <TouchableOpacity style={styles.cameraButton} onPress={startCamera}>
          <Text style={styles.cameraButtonText}>Open Camera</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
  },
  filterSelectorContainer: {
    width: '100%',
    marginBottom: 30,
  },
  filterLabel: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  filterScrollContent: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  filterOption: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedFilter: {
    backgroundColor: '#4451ffff',
    borderWidth: 2,
    borderColor: '#fff',
  },
  filterOptionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedFilterContainer: {
    marginBottom: 40,
  },
  selectedFilterText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cameraButton: {
    backgroundColor: '#4451ffff',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  cameraButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4451ffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.5)',
    marginBottom: 20,
  },
  captureButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 25,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  imageContainer: {
    width: '100%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'contain',
  },
  filterText: {
    color: '#fff',
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#000',
    width: '100%',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  retakeButton: {
    backgroundColor: '#4451ffff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});