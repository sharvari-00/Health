import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { launchCamera } from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const PatientDetailsScreen = ({ route }) => {
  const { patientId } = route.params;
  const navigation = useNavigation();
  const [visits, setVisits] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [patientDetails, setPatientDetails] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [uploadButtonText, setUploadButtonText] = useState('Upload');
  const [modalVisible, setModalVisible] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');

        // Fetch patient details and visits
        const [patientResponse, visitsResponse] = await Promise.all([
          fetch(`http://localhost:9090/api/v1/doctor/patient/${patientId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch(`http://localhost:9090/api/v1/doctor/visits/${patientId}`, {
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
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'You need to allow camera access to take pictures.');
    } else {
      launchCameraWithPermission();
    }
  };

  const launchCameraWithPermission = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setFilePath(result.uri);
    }
  };

  const handleCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'You need to allow camera access to take pictures.');
      } else {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
  
        if (!result.cancelled) {
          // Display the captured image
          setFilePath(result.uri);
          // Show the modal for image preview
          setModalVisible(true);
        }
      }
    } catch (error) {
      console.error('Error launching camera:', error);
    }
  };
  

  const handlePreviewImage = (imageUri) => {
    setFullscreenImage(imageUri);
    setModalVisible(true);
  };

  const handleViewTestReport = () => {
    navigation.navigate('ViewImageScreen', { patientId: patientId });
  };

  const handleToggleVisit = (visitIndex) => {
    setSelectedVisit(selectedVisit === visitIndex ? null : visitIndex);
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

  const handleUpload = () => {
    setShowInput(!showInput);
    setUploadButtonText(showInput ? 'Upload' : 'Cancel');
    if (!showInput) {
      setFilePath('');
    }
  };

  const handleSaveImage = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const base64Image = await FileSystem.readAsStringAsync(filePath, { encoding: FileSystem.EncodingType.Base64 });

      const response = await fetch(`your_upload_image_api_endpoint/${patientId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      });

      if (response.ok) {
        console.log('Image uploaded successfully');
        fetchPatientDetails(accessToken);
      } else {
        console.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }

    setShowInput(false);
    setUploadButtonText('Upload');
    setFilePath('');
  };

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
              <Text style={styles.patientDetailText}>Name: {patientDetails.name}</Text>
              <Text style={styles.patientDetailText}>Age: {patientDetails.age}</Text>
              <Text style={styles.patientDetailText}>Gender: {patientDetails.gender}</Text>
              <TouchableOpacity
                style={[styles.button, styles.viewReportButton]}
                onPress={handleViewTestReport}
              >
                <Text style={styles.buttonText}>View Test Report</Text>
              </TouchableOpacity>
              <Text style={styles.imageUploadText}>Test Report</Text>
              <TouchableOpacity style={[styles.uploadButton, showInput ? styles.cancelButton : null]} onPress={handleUpload}>
                <Text style={[styles.buttonText, showInput ? styles.cancelButtonText : null]}>
                  {showInput ? 'Cancel' : 'Upload'}
                </Text>
              </TouchableOpacity>
              {showInput && (
                <View>
                  <TouchableOpacity style={styles.cameraButton} onPress={handleCamera}>
                    <Text style={styles.buttonText}>Open Camera</Text>
                  </TouchableOpacity>
                  <Image source={{ uri: filePath }} style={styles.imagePreview} onPress={() => handlePreviewImage(filePath)} />
                  <TouchableOpacity style={styles.saveButton} onPress={handleSaveImage}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                  
                </View>
              )}
            </View>
            {/* Left Middle Container */}
            <View style={styles.leftMiddleContainer}>
              {visits.map((visitData, index) => (
                <TouchableOpacity key={index} onPress={() => handleToggleVisit(index)}>
                  <Text style={styles.visitDate}>Visit {index + 1}</Text>
                  <Text style={styles.visitDate}>Date: {visitData[0].data.diagnosisDate}</Text>
                  {selectedVisit === index && renderVisitItems(visitData)}
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require('../assets/logo2.png')} />
            </View>
          </View>
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={false}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <Image source={{ uri: fullscreenImage }} style={styles.fullscreenImage} />
            </View>
          </Modal>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});

export default PatientDetailsScreen;
