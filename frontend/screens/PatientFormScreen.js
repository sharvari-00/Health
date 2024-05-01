import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image,Picker } from 'react-native';
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
  const [symptoms, setSymptoms] = useState([]);

  const [customSymptom, setCustomSymptom] = useState('');

  const [diagnosis, setDiagnosis] = useState('');
  const [allergy, setAllergy]=useState('');
  const [prescription, setPrescription] = useState('');
  const [admitPatient, setAdmitPatient] = useState('No');
  const [formSaved, setFormSaved] = useState(false);
  const [isConsultationConfirmed, setIsConsultationConfirmed] = useState(false); // New state for switch
  const [temperature, setTemperature] = useState(98.6); // State for temperature
  const [bloodPressure, setBloodPressure] = useState({ systolic: 120, diastolic: 80 }); // State for blood pressure
 
  const handleAddCustomSymptom = () => {
    if (customSymptom.trim() !== '') {
      setSymptoms([...symptoms, customSymptom]);
      setCustomSymptom(''); // Clear the custom symptom input
    }
  };
  const [noBedsAvailable, setNoBedsAvailable] = useState(false); 

  
  

  // Function to handle removing a symptom
  const handleRemoveSymptom = (index) => {
    const updatedSymptoms = [...symptoms];
    updatedSymptoms.splice(index, 1);
    setSymptoms(updatedSymptoms);
  };

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

  const handleSaveForm = async () => {
    try {
      await Promise.all([
        addSymptoms(),
        addAllergy(),
        addDiagnosis(),
        addPrescription(),
        updateAdmission()
      ]);
      setFormSaved(true);
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  const addSymptoms = async () => {
    const symptomText = symptoms.join(', '); // Join the array elements into a single string
    const response = await fetch(`http://localhost:9090/api/v1/doctor/symptoms/${patientId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        patient_id: patientId,
        sym_text: symptomText // Use the joined string here
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
  const addAllergy = async () => {
    const response = await fetch(`http://localhost:9090/api/v1/doctor/allergy/${patientId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        patient_id: patientId,
        allergen: allergy,
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
      setNoBedsAvailable(true);
      Alert.alert('Warning', 'No beds available. Please try again later.');
      throw new Error('Failed to update admission');
    }
  };

  const handleConfirmConsultation = () => {
    navigation.navigate('AppointmentsTodayScreen', { doctorId });
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
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleConfirmConsultation}
                style={styles.confirmButton}
              >
                {/* <Text style={styles.buttonText}>Back to Appointments</Text> */}
              </TouchableOpacity>
            </View>
          </View>
  
          <View style={styles.middleContainer}>
            <View style={styles.middleLeftContainer}>
              <Text style={styles.consultationFormHeading}>Patient Details</Text>
              <Text style={styles.patientDetails}>ID: {patientId}</Text>
              <Text style={styles.patientDetails}>Name: {name}</Text>
              <Text style={styles.patientDetails}>Age: {age}</Text>
              <Text style={styles.patientDetails}>Gender: {gender}</Text>
  
              <Text style={styles.consultationFormHeading}>Patient Vitals</Text>
              <View style={styles.toolContainer}>
                <Text style={styles.sliderLabel}>Temperature: {temperature.toFixed(1)} °F</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={95}
                  maximumValue={105}
                  step={0.1}
                  value={temperature}
                  onValueChange={(temp) => setTemperature(temp)}
                />
                
                <View style={styles.bloodPressureSliderContainer}>
                  <Text style={styles.sliderLabel}>Systolic:</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={90}
                    maximumValue={180}
                    step={1}
                    value={bloodPressure.systolic}
                    onValueChange={(systolic) => setBloodPressure({ ...bloodPressure, systolic })}
                  />
                  <Text style={styles.sliderLabel}>Diastolic:</Text>
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
              </View>
  
            </View>
            <View style={styles.middleRightContainer}>
              <Text style={styles.prescriptionFormHeading}>Assessment</Text>
              <Text style={styles.sym}>Symptoms:</Text>
  
              {/* Display selected symptoms as tags */}
              <View style={styles.tagsContainer}>
                {Array.isArray(symptoms) && symptoms.map((symptom, index) => (
                  <TouchableOpacity key={index} style={styles.tag} onPress={() => handleRemoveSymptom(index)}>
                    <Text style={{ fontSize: 18 }}>{symptom}</Text>

                  </TouchableOpacity>
                ))}
              </View>
  
              {/* Input for selecting predefined symptoms */}
              <Picker
  selectedValue={null}
  style={styles.picker}
  onValueChange={(itemValue) => {
    if (itemValue) {
      if (itemValue === 'other') {
        // If "Other" is selected, set customSymptom as the value
        setCustomSymptom('');
        setSymptoms([...symptoms, itemValue]); // Add 'other' to symptoms temporarily
      } else {
        // For predefined symptoms, just add them to the symptoms array
        setSymptoms([...symptoms, itemValue]);
      }
    }
  }}>
  {/* Add predefined symptoms as Picker items */}
  <Picker.Item label="Select symptom..." value={null} />
  <Picker.Item label="Fever" value="Fever" />
  <Picker.Item label="Fatigue" value="Fatigue" />
  {/* Add more predefined symptoms here */}
  <Picker.Item label="Cough" value="Cough" />
  <Picker.Item label="Shortness of Breath" value="Shortness of Breath" />
  <Picker.Item label="Headache" value="Headache" />
  <Picker.Item label="Muscle Aches" value="Muscle Aches" />
  <Picker.Item label="Joint Pain" value="Joint Pain" />
  <Picker.Item label="Nausea" value="Nausea" />
  <Picker.Item label="Vomiting" value="Vomiting" />
  <Picker.Item label="Diarrhea" value="Diarrhea" />
  <Picker.Item label="Rash" value="Rash" />
  <Picker.Item label="Sore Throat" value="Sore Throat" />
  <Picker.Item label="Weight Loss:" value="Weight Loss:" />
  <Picker.Item label="Swelling" value="Swelling" />
  <Picker.Item label="Chest pain" value="Chest pain" />
  <Picker.Item label="Dizziness" value="Dizziness" />
  {/* Add an "Other" option to trigger custom symptom input */}
  <Picker.Item label="Other" value="other" />
</Picker>

              {/* Input for entering custom symptom */}
              {symptoms.includes('other') && (
                <View style={styles.customSymptomContainer}>
                  <TextInput
                    style={styles.customSymptomInput}
                    placeholder="Enter custom symptom"
                    value={customSymptom}
                    onChangeText={(text) => setCustomSymptom(text)}
                  />
                  <TouchableOpacity style={styles.addButton} onPress={handleAddCustomSymptom}>
                    <Text style={styles.buttonsym}>Add</Text>
                  </TouchableOpacity>
                </View>
              )}
              <TextInput
                style={styles.input}
                placeholder="Any allergies or existing medications"
                value={allergy}
                onChangeText={(text) => setAllergy(text)}
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
              
              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Admit Patient:</Text>
                <Switch
                  value={isConsultationConfirmed}
                  onValueChange={(value) => setIsConsultationConfirmed(value)}
                  trackColor={{ false: '#767577', true: '#4da7a1' }} // Switched-off and switched-on colors
                  thumbColor={isConsultationConfirmed ? '#FFFFFF' : '#FFFFFF'} // Thumb color when switched-off and switched-on
                  ios_backgroundColor="#3e3e3e" // Background color for iOS
                  // Adjust the size of the switch by wrapping it in a View and applying styles
                  style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} 
                />
              </View>
  
              <TouchableOpacity
                style={[styles.addButton, { backgroundColor: formSaved ? '#888888' : '#326974' }]}
                onPress={handleSaveForm}
                disabled={formSaved}
              >
                <Text style={styles.buttonText}>{formSaved ? 'Saved' : 'Save'}</Text>
              </TouchableOpacity>
              {noBedsAvailable && (
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>No beds available. Please try again later or talk to Frontdesk</Text>
        </View>
      )}
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
    backgroundColor: 'rgba(26, 95, 116, 0.13)',
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
    fontSize: 50,
    fontWeight: 'bold',
    color: '#004849',
    marginBottom: 10,
    fontFamily:'Cursive',
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
  label:{
    fontSize:22,
  },
  sym:{
    fontSize:22,
    marginBottom:10,
  },

  consultationFormHeading: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#004849',
    marginBottom: 10,
  },
  patientDetails: {
    fontSize: 25,
    color: '#000000',
    marginBottom: 5,
  },
  middleRightContainer: {
    flex: 2,
    paddingLeft: 20,
  },
  prescriptionFormHeading: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#004849',
    marginBottom: 10,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    fontSize: 22,

  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    fontSize:18,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    fontSize:50,
  },
  picker: {
    marginBottom: 10,
    fontSize: 20,
  },
  customSymptomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  customSymptomInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize:18,
  },
  addButton: {
    backgroundColor: '#326974',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    width: '20%',
  },
  confirmButton: {
    backgroundColor: '#326974',
    padding: 15,
    marginVertical: 20,
    width: '40%',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  buttonsym: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
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
    marginBottom: 15,
    marginTop: 15,
    color: '#004849',
    fontSize: 25,
    marginRight: 10,
  },
  admitText: {
    color: '#326974',
    fontSize: 25,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom:50,
  },
  confirmButton: {
    padding: 15,
    marginVertical: 20,
    width: '100%', // Adjust the width as needed
    alignItems: 'right',
    alignSelf: 'flex-end',
    marginBottom:20, // Align to the right
  },
  toolContainer: {
    marginTop:15,
    backgroundColor: '#f0f0f0', // Background color of the tool container
    borderRadius: 10, // Curved corners
    padding: 10, // Padding around the content
  },
  sliderLabel: {
    fontSize: 20, // Adjust font size as needed
    marginBottom: 5, // Spacing between labels
  },
  slider: {
    marginBottom: 15, // Spacing between sliders
  },
  bloodPressureSliderContainer: {
    marginBottom: 15, // Spacing between blood pressure sliders and text
  },
  warningText:{
    fontSize:17,
    color:'red',
  }
  
});

export default PatientFormScreen;
