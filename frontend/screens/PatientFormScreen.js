import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Switch } from 'react-native-paper'; // Import Switch from react-native-paper
import Slider from '@react-native-community/slider'; // Import Slider from react-native-community

const PatientFormScreen = ({ route }) => {
  const navigation = useNavigation();
  const { patientId, name, age, gender } = route.params;

  const [accessToken, setAccessToken] = useState('');
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    age: '',
    gender: ''
  });
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');
  const [admitPatient, setAdmitPatient] = useState('No');
  const [formSaved, setFormSaved] = useState(false);
  const [isConsultationConfirmed, setIsConsultationConfirmed] = useState(false); // New state for switch
  const [temperature, setTemperature] = useState(98.6); // State for temperature
  const [bloodPressure, setBloodPressure] = useState({ systolic: 120, diastolic: 80 }); // State for blood pressure

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        setAccessToken(token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchAccessToken();
  }, []);

  // useEffect(() => {
  //   const fetchPatientDetails = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:9090/api/v1/patients/details/${patientId}`, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`
  //         }
  //       });
  //       const data = await response.json();
  //       setPatientDetails(data);
  //     } catch (error) {
  //       console.error('Error fetching patient details:', error);
  //     }
  //   };

  //   fetchPatientDetails();
  // }, [accessToken, patientId]);

  const handleSaveForm = async () => {
    try {
      await Promise.all([
        addSymptoms(),
        addDiagnosis(),
        addPrescription(),
        //updateAdmission()
      ]);
      setFormSaved(true);
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  const addSymptoms = async () => {
    const response = await fetch(`http://localhost:9090/api/v1/doctor/symptoms/${patientId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        patient_id: patientId,
        sym_text: symptoms
      })
    });
    if (!response.ok) {
      throw new Error('Failed to add symptoms');
    }
  };

  const addDiagnosis = async () => {
    const response = await fetch(`http://localhost:9090/api/v1/doctor/diagnosis/${patientId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        patient_id: patientId,
        dia_text: diagnosis
      })
    });
    if (!response.ok) {
      throw new Error('Failed to add diagnosis');
    }
  };

  const addPrescription = async () => {
    const response = await fetch(`http://localhost:9090/api/v1/doctor/prescription/${patientId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        patient_id: patientId,
        pre_text: prescription
      })
    });
    if (!response.ok) {
      throw new Error('Failed to add prescription');
    }
  };

  const updateAdmission = async () => {
    const response = await fetch(`http://localhost:9090/api/v1/admission/admit/${patientId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        patientId: patientId
      })
    });
    if (!response.ok) {
      throw new Error('Failed to update admission');
    }
  };

  const handleConfirmConsultation = () => {
    navigation.navigate('AppointmentsTodayScreen');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/wall.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.layer}>
          <View style={styles.upperContainer}>
            <Text style={styles.headerText}>Consultation Form</Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.middleLeftContainer}>
              <Text style={styles.consultationFormHeading}>Patient Details</Text>
              <Text style={styles.patientDetails}>ID: {patientId}</Text>
              <Text style={styles.patientDetails}>Name: {name}</Text>
              <Text style={styles.patientDetails}>Age: {age}</Text>
              <Text style={styles.patientDetails}>Gender: {gender}</Text>
            </View>
            <View style={styles.middleRightContainer}>
              <Text style={styles.prescriptionFormHeading}>Consultation Form</Text>
              <Slider
                style={styles.slider}
                minimumValue={95}
                maximumValue={105}
                step={0.1}
                value={temperature}
                onValueChange={(temp) => setTemperature(temp)}
              />
              <Text style={styles.sliderLabel}>Temperature: {temperature.toFixed(1)} °F</Text>
              <View style={styles.bloodPressureSliderContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={90}
                  maximumValue={180}
                  step={1}
                  value={bloodPressure.systolic}
                  onValueChange={(systolic) => setBloodPressure({ ...bloodPressure, systolic })}
                />
                <Slider
                  style={styles.slider}
                  minimumValue={60}
                  maximumValue={120}
                  step={1}
                  value={bloodPressure.diastolic}
                  onValueChange={(diastolic) => setBloodPressure({ ...bloodPressure, diastolic })}
                />
              </View>
              <Text style={styles.sliderLabel}>Blood Pressure: {bloodPressure.systolic}/{bloodPressure.diastolic} mmHg</Text>
              <TextInput
                style={styles.input}
                placeholder="Symptoms"
                value={symptoms}
                onChangeText={(text) => setSymptoms(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Treatment Plan"
                value={diagnosis}
                onChangeText={(text) => setDiagnosis(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Prescription"
                value={prescription}
                onChangeText={(text) => setPrescription(text)}
              />
              <View style={styles.switchContainer}></View>
              <Text style={styles.switchText}>Admit Patient:</Text>
              <Switch
                value={isConsultationConfirmed}
                onValueChange={(value) => setIsConsultationConfirmed(value)}
              />
              <TouchableOpacity
                style={[styles.addButton, { backgroundColor: formSaved ? '#888888' : '#61828a' }]}
                onPress={handleSaveForm}
                disabled={formSaved}
              >
                <Text style={styles.buttonText}>{formSaved ? 'Saved' : 'Save'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.lowerContainer}>
            <Image style={styles.logo} source={require('../assets/logo2.png')} />
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
    padding: 20,
  },
  upperContainer: {
    flex: 1,
  },
  middleContainer: {
    flex: 6,
    flexDirection: 'row',
  },
  lowerContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  middleLeftContainer: {
    flex: 1,
    backgroundColor: 'rgba(223, 233, 235, 0.2)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  consultationFormHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  patientDetails: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  middleRightContainer: {
    flex: 2,
    paddingLeft: 20,
  },
  prescriptionFormHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    height: 80,
  },
  addButton: {
    backgroundColor: '#61828a',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: '#61828a',
    padding: 15,
    marginVertical: 20,
    width: '40%',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginRight: 10,
  },
  admitText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 10,
  },
  
});

export default PatientFormScreen;
