import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera } from 'react-native-image-picker';

const PatientDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { patientId } = route.params;

  const [patientDetails, setPatientDetails] = useState({});
  const [symptoms, setSymptoms] = useState([]);
  const [treatmentPlan, setTreatmentPlan] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [uploadButtonText, setUploadButtonText] = useState('Upload');

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          fetchPatientDetails(accessToken);
          fetchSymptoms(accessToken);
          fetchTreatmentPlan(accessToken);
          fetchPrescription(accessToken);
        } else {
          console.error('Access token not found.');
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchPatientData();
  }, []);

  const fetchPatientDetails = async (accessToken) => {
    try {
      const response = await fetch(`your_patient_details_api_endpoint/${patientId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setPatientDetails(data);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const fetchSymptoms = async (accessToken) => {
    try {
      const response = await fetch(`your_symptoms_api_endpoint/${patientId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setSymptoms(data);
    } catch (error) {
      console.error('Error fetching symptoms:', error);
    }
  };

  const fetchTreatmentPlan = async (accessToken) => {
    try {
      const response = await fetch(`your_treatment_plan_api_endpoint/${patientId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setTreatmentPlan(data);
    } catch (error) {
      console.error('Error fetching treatment plan:', error);
    }
  };

  const fetchPrescription = async (accessToken) => {
    try {
      const response = await fetch(`your_prescription_api_endpoint/${patientId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setPrescription(data);
    } catch (error) {
      console.error('Error fetching prescription:', error);
    }
  };

  const handleUpload = () => {
    setShowInput(!showInput);
    setUploadButtonText(showInput ? 'Upload' : 'Cancel');
    if (!showInput) {
      setFilePath('');
    }
  };

  const handleCamera = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel) {
        setFilePath(response.uri);
      }
    });
  };

  const handleSaveImage = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const formData = new FormData();
      formData.append('image', {
        uri: filePath,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
      const response = await fetch(`your_upload_image_api_endpoint/${patientId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
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
                  <Image source={{ uri: filePath }} style={styles.imagePreview} />
                  <TouchableOpacity style={styles.saveButton} onPress={handleSaveImage}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {/* Left Middle Container */}
            <View style={styles.leftMiddleContainer}>
              <Text style={[styles.patientDetailText, { fontSize: 24, textAlign: 'center' }]}>Patient History</Text>
              <Text style={styles.patientDetailText}>Patient Id: {patientDetails.id}</Text>
              <Text style={styles.patientDetailText}>Name: {patientDetails.name}</Text>
              <Text style={styles.patientDetailText}>Age: {patientDetails.age}</Text>
              <Text style={styles.patientDetailText}>Gender: {patientDetails.gender}</Text>
              <Text style={styles.patientDetailText}>Symptoms:</Text>
              <FlatList
                data={symptoms}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <Text style={styles.detailText}>{index + 1}. {item.symptom}</Text>
                )}
              />
              <Text style={styles.patientDetailText}>Treatment Plan:</Text>
              <FlatList
                data={treatmentPlan}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <Text style={styles.detailText}>{index + 1}. {item.treatment}</Text>
                )}
              />
              <Text style={styles.patientDetailText}>Prescription:</Text>
              <FlatList
                data={prescription}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <Text style={styles.detailText}>{index + 1}. {item.medication}</Text>
                )}
              />
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require('../assets/logo2.png')} />
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
});

export default PatientDetailsScreen;
