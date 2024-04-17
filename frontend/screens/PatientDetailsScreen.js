import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PatientDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { patientId } = route.params;

  // State variables to store patient details, symptoms, treatment plan, and prescription
  const [patientDetails, setPatientDetails] = useState({});
  const [symptoms, setSymptoms] = useState([]);
  const [treatmentPlan, setTreatmentPlan] = useState([]);
  const [prescription, setPrescription] = useState([]);

  // Fetch access token and patient data on component mount
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

  // Function to fetch patient details
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

  // Function to fetch symptoms
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

  // Function to fetch treatment plan
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

  // Function to fetch prescription
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
              {/* Add your image upload logic here */}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent layer
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
    marginBottom:40,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  cancelButtonText: {
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    marginBottom: 20,
    width:170,
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
});

export default PatientDetailsScreen;
