import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PatientFormScreen = ({ route }) => {
  const navigation = useNavigation();
  const { patientId } = route.params;
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
  const [symptomsAdded, setSymptomsAdded] = useState(false);
  const [diagnosisAdded, setDiagnosisAdded] = useState(false);
  const [prescriptionAdded, setPrescriptionAdded] = useState(false);
  const [admissionUpdated, setAdmissionUpdated] = useState(false);

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

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(`PATIENT_DETAILS_API_ENDPOINT/${patientId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        setPatientDetails(data);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, [accessToken, patientId]);

  const handleAddSymptoms = async () => {
    try {
      const response = await fetch('SYMPTOMS_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          patientId: patientId,
          symptoms: symptoms
        })
      });
      if (response.ok) {
        setSymptomsAdded(true);
      } else {
        console.error('Failed to add symptoms');
      }
    } catch (error) {
      console.error('Error adding symptoms:', error);
    }
  };

  const handleAddDiagnosis = async () => {
    try {
      const response = await fetch('DIAGNOSIS_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          patientId: patientId,
          diagnosis: diagnosis
        })
      });
      if (response.ok) {
        setDiagnosisAdded(true);
      } else {
        console.error('Failed to add diagnosis');
      }
    } catch (error) {
      console.error('Error adding diagnosis:', error);
    }
  };

  const handleAddPrescription = async () => {
    try {
      const response = await fetch('PRESCRIPTION_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          patientId: patientId,
          prescription: prescription
        })
      });
      if (response.ok) {
        setPrescriptionAdded(true);
      } else {
        console.error('Failed to add prescription');
      }
    } catch (error) {
      console.error('Error adding prescription:', error);
    }
  };

  const handleUpdateAdmission = async () => {
    try {
      const response = await fetch('ADMISSION_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          patientId: patientId,
          admitPatient: admitPatient
        })
      });
      if (response.ok) {
        setAdmissionUpdated(true);
      } else {
        console.error('Failed to update admission');
      }
    } catch (error) {
      console.error('Error updating admission:', error);
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
              <Text style={styles.patientDetails}>Name: {patientDetails.name}</Text>
              <Text style={styles.patientDetails}>Age: {patientDetails.age}</Text>
              <Text style={styles.patientDetails}>Gender: {patientDetails.gender}</Text>
            </View>
            <View style={styles.middleRightContainer}>
              <Text style={styles.prescriptionFormHeading}>Consultation Form</Text>
              <TextInput
                style={styles.input}
                placeholder="Symptoms"
                value={symptoms}
                onChangeText={(text) => setSymptoms(text)}
              />
              <TouchableOpacity
                style={[styles.addButton, { backgroundColor: symptomsAdded ? '#888888' : '#61828a' }]}
                onPress={handleAddSymptoms}
                disabled={symptomsAdded}
              >
                <Text style={styles.buttonText}>{symptomsAdded ? 'Added' : 'Save'}</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Treatment Plan"
                value={diagnosis}
                onChangeText={(text) => setDiagnosis(text)}
              />
              <TouchableOpacity
                style={[styles.addButton, { backgroundColor: diagnosisAdded ? '#888888' : '#61828a' }]}
                onPress={handleAddDiagnosis}
                disabled={diagnosisAdded}
              >
                <Text style={styles.buttonText}>{diagnosisAdded ? 'Added' : 'Save'}</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Prescription"
                value={prescription}
                onChangeText={(text) => setPrescription(text)}
              />
              <TouchableOpacity
                style={[styles.addButton, { backgroundColor: prescriptionAdded ? '#888888' : '#61828a' }]}
                onPress={handleAddPrescription}
                disabled={prescriptionAdded}
              >
                <Text style={styles.buttonText}>{prescriptionAdded ? 'Added' : 'Save'}</Text>
              </TouchableOpacity>
              <Picker
                selectedValue={admitPatient}
                style={styles.dropdown}
                onValueChange={(itemValue) => setAdmitPatient(itemValue)}
              >
                <Picker.Item label="No" value={true} />
                <Picker.Item label="Yes" value={false} />
              </Picker>
              <TouchableOpacity
                style={[styles.updateButton, { backgroundColor: admissionUpdated ? '#888888' : '#61828a' }]}
                onPress={handleUpdateAdmission}
                disabled={admissionUpdated}
              >
                <Text style={styles.buttonText}>{admissionUpdated ? 'Updated' : 'Save Admission'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmConsultation}>
                <Text style={styles.buttonText}>Confirm Consultation</Text>
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
  },
  addButton: {
    backgroundColor: '#61828a',
    padding: 10,
    marginVertical: 10,
    width: '50%',
    alignItems: 'center',
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: '#61828a',
    padding: 10,
    marginVertical: 10,
    width: '50%',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  confirmButton: {
    backgroundColor: '#61828a',
    padding: 15,
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default PatientFormScreen;
