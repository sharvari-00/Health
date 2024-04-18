import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PatientFormScreen = ({ route }) => {
  const navigation = useNavigation();
  const { patientId, firstName, lastName, age, gender, bedNo } = route.params;
  const [accessToken, setAccessToken] = useState('');
  const [patientDetails, setPatientDetails] = useState({
    id: '',
    fname: '',
    lname: '',
    gender: '',
    age: '',
    bed_id: ''
  });
  const [symptomsInput, setSymptomsInput] = useState('');
  const [treatmentPlanInput, setTreatmentPlanInput] = useState('');
  const [prescriptionInput, setPrescriptionInput] = useState('');
  const [symptomsSaved, setSymptomsSaved] = useState(false);
  const [treatmentPlanSaved, setTreatmentPlanSaved] = useState(false);
  const [prescriptionSaved, setPrescriptionSaved] = useState(false);

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
        const response = await fetch(`YOUR_BACKEND_API_ENDPOINT/patient/${patientId}`, {
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

    if (accessToken) {
      fetchPatientDetails();
    }
  }, [accessToken, patientId]);

  const handleSaveSymptoms = async () => {
    try {
      const response = await fetch('YOUR_BACKEND_API_ENDPOINT/symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ patientId, symptoms: symptomsInput }),
      });
      if (response.ok) {
        setSymptomsSaved(true);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error saving symptoms:', error);
    }
  };

  const handleSaveTreatmentPlan = async () => {
    try {
      const response = await fetch('YOUR_BACKEND_API_ENDPOINT/treatment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ patientId, treatmentPlan: treatmentPlanInput }),
      });
      if (response.ok) {
        setTreatmentPlanSaved(true);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error saving treatment plan:', error);
    }
  };

  const handleSavePrescription = async () => {
    try {
      const response = await fetch('YOUR_BACKEND_API_ENDPOINT/prescription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ patientId, prescription: prescriptionInput }),
      });
      if (response.ok) {
        setPrescriptionSaved(true);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error saving prescription:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/wall.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.upperContainer}>
            <Text style={styles.heading}>Consultation Form</Text>
            <View style={styles.divider} />
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.backButton}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.middleLeftContainer}>
              {/* Details fetched from API */}
              <Text style={styles.patientDetail}>Patient ID: {patientId}</Text>
              <Text style={styles.patientDetail}>First Name: {firstName}</Text>
              <Text style={styles.patientDetail}>Last Name: {lastName}</Text>
              <Text style={styles.patientDetail}>Gender: {gender}</Text>
              <Text style={styles.patientDetail}>Age: {age}</Text>
              <Text style={styles.patientDetail}>Bed No.: {bedNo}</Text>
            </View>
            <View style={styles.middleRightContainer}>
              <View style={styles.formField}>
                <Text style={styles.label}>Symptoms:</Text>
                <TextInput
                  style={[styles.input, styles.curvedInput]}
                  onChangeText={setSymptomsInput}
                  value={symptomsInput}
                  placeholder="Enter symptoms"
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveSymptoms}
                  disabled={symptomsSaved}
                >
                  <Text style={styles.buttonText}>{symptomsSaved ? 'Saved' : 'Save'}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.formField}>
                <Text style={styles.label}>Treatment Plan:</Text>
                <TextInput
                  style={[styles.input, styles.curvedInput]}
                  onChangeText={setTreatmentPlanInput}
                  value={treatmentPlanInput}
                  placeholder="Enter treatment plan"
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveTreatmentPlan}
                  disabled={treatmentPlanSaved}
                >
                  <Text style={styles.buttonText}>{treatmentPlanSaved ? 'Saved' : 'Save'}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.formField}>
                <Text style={styles.label}>Prescription:</Text>
                <TextInput
                  style={[styles.input, styles.curvedInput]}
                  onChangeText={setPrescriptionInput}
                  value={prescriptionInput}
                  placeholder="Enter prescription"
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSavePrescription}
                  disabled={prescriptionSaved}
                >
                  <Text style={styles.buttonText}>{prescriptionSaved ? 'Saved' : 'Save'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.lowerContainer}>
            <ImageBackground source={require('../assets/logo2.png')} style={styles.logo} />
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  upperContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    marginHorizontal: 10,
    fontSize: 16,
  },
  middleContainer: {
    flex: 6,
    flexDirection: 'row',
  },
  middleLeftContainer: {
    flex: 2,
    alignItems: 'left',
    backgroundColor: 'rgba(223, 233, 235, 0.2)',
    justifyContent: 'left',
  
  },
  patientDetail: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
    marginLeft:20,
  },
  middleRightContainer: {
    flex: 8,
    alignItems: 'stretch',
    justifyContent: 'left',
    paddingHorizontal: 20,
  },
  subHeading: {
    fontSize: 20,
    marginTop:20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  formField: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 5,
    marginLeft:20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height:150,
    width:'85%',
    marginBottom: 10,
    marginLeft:20,
  },
  curvedInput: {
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#61828a',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
    width:'5%',
    marginLeft:20,
  },
  lowerContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default PatientFormScreen;
