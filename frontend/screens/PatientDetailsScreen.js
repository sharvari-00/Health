import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useEmergencyContext } from './EmergencyContext';

const PatientDetailsScreen = ({ route }) => {
  const { patientId,bedId } = route.params;
  const navigation = useNavigation();
  const [visits, setVisits] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [patientDetails, setPatientDetails] = useState({});
  const [fetchedImages, setFetchedImages] = useState([]);
  const { emergency, triggerEmergency, resolveEmergency } = useEmergencyContext(); // Access the emergency context
  const [image, setImage] = useState(null);
  useEffect(() => {
    console.log('image state updated:', image);
  }, [image]); 

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');

        // Fetch patient details and visits
        const [patientResponse, visitsResponse] = await Promise.all([
          fetch(`http://localhost:9090/api/v1/nurse/patient/${patientId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch(`http://localhost:9090/api/v1/nurse/patient_history/${patientId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
        ]);

        const [patientData, visitsData] = await Promise.all([
          patientResponse.json(),
          visitsResponse.json(),
        ]);

        setPatientDetails(patientData);
        setVisits(visitsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [patientId]);
  
  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
  
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        setImage(selectedAsset.uri);
        console.log('Selected image URI:', selectedAsset.uri);
        console.log('select',image);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
  
  const saveImage = async (uri, patientId) => {
    try {
      const apiUrl = `http://localhost:9090/api/v1/nurse/uploadImage/${patientId}`;
  
      // Convert base64 data to binary buffer
      const base64Response = await fetch(uri);
      const blob = await base64Response.blob();
  
      // Create a new File object from the binary buffer
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
  
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Response from backend:', responseData);
        // Handle successful response
      } else {
        console.error('Error:', response.statusText);
        // Handle error response
      }
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };
  const handleSaveImage = async () => {
    if (image) {
      await saveImage(image, patientId);
    } else {
      alert('Please select an image first.');
    }
  };
  
  
  const handleToggleVisit = (visitIndex) => {
    setSelectedVisit(selectedVisit === visitIndex ? null : visitIndex);
  };
  const handleEmergency = () => {
    // Include patient ID, bed ID, and message in the emergency notification
    const emergencyMessage = `Hurry! Need your assistance. Patient ID: ${patientId}, Bed ID: ${bedId};`;
    // Trigger emergency with patientId, bedId, and message
    triggerEmergency(patientId, bedId, emergencyMessage);
    // Additional logic if needed...
  };
  const handleDoctorAcknowledge = () => {
    // Resolve the emergency
    resolveEmergency();
    // Additional logic if needed...
  };

  const renderVisitItems = (visitData) => {
    return (
      <View style={styles.visitContainer}>
        {visitData.map((item, itemIndex) => {
          switch (item.type) {
            case 'prescription':
              return (
                <Text key={itemIndex} style={styles.visitItem}>
                  Prescription: {item.data.pre_text}
                </Text>
              );
            case 'diagnosis':
              return (
                <Text key={itemIndex} style={styles.visitItem}>
                  Diagnosis: {item.data.dia_text}
                </Text>
              );
            case 'symptom':
              return (
                <Text key={itemIndex} style={styles.visitItem}>
                  Symptom: {item.data.sym_text}
                </Text>
              );
            default:
              return null;
          }
        })}
      </View>
    );
  };

  const fetchPatientImages = async (patientId) => {
    try {
      const apiUrl = `http://localhost:9090/api/v1/nurse/patientImages/${patientId}`;
      const response = await fetch(apiUrl);
      if (response.ok) {
        const images = await response.json();
        console.log('Patient images:', images);
        setFetchedImages(images);
        //console.log('Fetched images:', images[0].images);
      } else {
        console.error('Failed to retrieve patient images:', response.statusText);
        // Handle error response
      }
    } catch (error) {
      console.error('Error retrieving patient images:', error);
      // Handle fetch error
    }
  };
  useEffect(() => {
    fetchPatientImages(patientId);
  }, []); 
 
   return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/wall.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.layer}>
          <View style={styles.upperContainer}>
          
            <Text style={styles.headerText}>Patient Diagnosis</Text>
            <View style={styles.divider} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('NurseScreen')}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.middleContainer}>
            {/* Right Middle Container */}
            <View style={styles.rightMiddleContainer}>
              <Text style={[styles.patientDetailText, { fontSize: 24, textAlign: 'center' }]}>Patient History</Text>
              <Text style={styles.patientDetailText}>Patient Id: {patientDetails.id}</Text>
              <Text style={styles.patientDetailText}>First Name: {patientDetails.fname}</Text>
              <Text style={styles.patientDetailText}>Last Name: {patientDetails.lname}</Text>
              <Text style={styles.patientDetailText}>Age: {patientDetails.age}</Text>
              <Text style={styles.patientDetailText}>Gender: {patientDetails.gender}</Text>
 
<TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
      <Text style={styles.buttonText}>{image ? 'Change Image' : 'Upload Image'}</Text>
    </TouchableOpacity>
    {image && (
      <View style={{ alignItems: 'center' }}>
        <Image source={{ uri: image }} style={styles.imagePreview} />
      </View>
    )}
    {image && (
  <View style={{ alignItems: 'center' }}>
    <TouchableOpacity style={styles.saveButton} onPress={handleSaveImage}>
      <Text style={styles.buttonText}>Save Image</Text>
    </TouchableOpacity>
  </View>
)}
            </View>
            {/* Left Middle Container */}
            <View style={styles.leftMiddleContainer}>
              {visits.map((visitData, index) => (
                <TouchableOpacity key={index} onPress={() => handleToggleVisit(index)}>
                  <Text style={styles.visitDate}>Visit {index + 1}</Text>
                  {/* <Text style={styles.visitDate}>Date: {visitData[0].data.diagnosisDate}</Text> */}
                  {selectedVisit === index && renderVisitItems(visitData)}
                </TouchableOpacity>
              ))}
              
        {/* <Image
        source={{ uri: 'data:image/jpeg;base64,' + imageData }}
        style={{ width: 200, height: 200 }}
      /> */}
        <View style={styles.fetchedImagesContainer}>
  <Text style={styles.headerText}>Fetched Patient Images</Text>
  {fetchedImages.map((image, index) => (
    <Image key={index} source={{ uri: 'data:image/jpeg;base64,' + image.images }} style={styles.fetchedImage} />
  ))}
</View>

        
             
            </View>
          </View>
          <View style={styles.bottomContainer}>
  <View style={styles.logoContainer}>
    <Image style={styles.logo} source={require('../assets/logo2.png')} />
  </View>
  <View style={styles.emergencyContainer}>
    <TouchableOpacity
      style={[styles.emergencyButton, { backgroundColor: emergency ? 'yellow' : 'red' }]}
      onPress={emergency ? handleDoctorAcknowledge : handleEmergency}
    >
      <Text style={styles.emergencyButtonText}>
        {emergency ? 'Informing Doctor' : 'Emergency'}
      </Text>
    </TouchableOpacity>
    {/* Render emergency details if emergency is active */}
    {emergency && (
      <View style={styles.emergencyDetails}>
        <Text style={styles.emergencyDetailsText}>
          Patient ID: {emergency.patientId}
        </Text>
        <Text style={styles.emergencyDetailsText}>
          Bed ID: {emergency.bedId}
        </Text>
      </View>
    )}
  </View>
</View>
      
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  layer: {
    flex: 1,
    backgroundColor: 'rgba(26, 95, 116, 0.13)',
  },
  upperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    flex: 3,
    flexDirection: 'row',
  },
  leftMiddleContainer: {
    flex: 8,
    padding: 20,
  },
  rightMiddleContainer: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: 'rgba(223, 233, 235, 0.2)',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  divider: {
    width: '80%',
    height: 2,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  logoutButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  patientDetailText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  imageUploadText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  uploadButton: {
    backgroundColor: '#61828a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cameraButton: {
    backgroundColor: '#61828a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    marginBottom: 20,
    width: 170,
  },
  saveButton: {
    backgroundColor: '#61828a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  logoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  detailText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  visitContainer: {
    backgroundColor: '#2E5B8B',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  visitDate: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  visitItem: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  fetchedImagesContainer: {
    marginTop: 20,
  },
  fetchedImage: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    marginBottom: 10,
    borderRadius: 10, // Optional: Add border radius for rounded corners
  },
  emergencyButton: {
    alignSelf: 'flex-end',
  marginBottom: 20,
  marginRight: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  emergencyDetails: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  emergencyDetailsText: {
    color: '#000000',
  },
  emergencyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

export default PatientDetailsScreen;