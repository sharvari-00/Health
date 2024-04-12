import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook

const PatientFormScreen = ({ route }) => {
  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation object
  const { patientId } = route.params;

  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');
  const [admitPatient, setAdmitPatient] = useState('No');
  const [symptomsAdded, setSymptomsAdded] = useState(false);
  const [diagnosisAdded, setDiagnosisAdded] = useState(false);
  const [prescriptionAdded, setPrescriptionAdded] = useState(false);
  const [admissionUpdated, setAdmissionUpdated] = useState(false);

  const handleAddSymptoms = () => {
    // Logic to add symptoms to the state or database
    setSymptomsAdded(true);
  };

  const handleAddDiagnosis = () => {
    // Logic to add diagnosis/treatment plan to the state or database
    setDiagnosisAdded(true);
  };

  const handleAddPrescription = () => {
    // Logic to add prescription to the state or database
    setPrescriptionAdded(true);
  };

  const handleUpdateAdmission = () => {
    // Logic to update admission status in the database
    setAdmissionUpdated(true);
  };

  const handleConfirmConsultation = () => {
    // Logic to confirm consultation and navigate back to AppointmentsTodayScreen
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
              <Text style={styles.patientDetails}>Name: John Doe</Text>
              <Text style={styles.patientDetails}>Age: 30</Text>
              <Text style={styles.patientDetails}>Gender: Male</Text>
            </View>
            <View style={styles.middleRightContainer}>
              <Text style={styles.prescriptionFormHeading}>Consultation Form</Text>
              <Text style={styles.inputLabel}>Symptoms</Text>
              <TextInput
                style={styles.input}
                placeholder="Symptoms"
                value={symptoms}
                onChangeText={(text) => setSymptoms(text)}
              />
              <TouchableOpacity style={[styles.addButton, { backgroundColor: symptomsAdded ? '#888888' : '#61828a' }]} onPress={handleAddSymptoms} disabled={symptomsAdded}>
                <Text style={styles.buttonText}>{symptomsAdded ? 'Added' : 'Save'}</Text>
              </TouchableOpacity>
              <Text style={styles.inputLabel}>Treatment Plan</Text>
              <TextInput
                style={styles.input}
                placeholder="Treatment Plan"
                value={diagnosis}
                onChangeText={(text) => setDiagnosis(text)}
              />
              <TouchableOpacity style={[styles.addButton, { backgroundColor: diagnosisAdded ? '#888888' : '#61828a' }]} onPress={handleAddDiagnosis} disabled={diagnosisAdded}>
                <Text style={styles.buttonText}>{diagnosisAdded ? 'Added' : 'Save'}</Text>
              </TouchableOpacity>
              <Text style={styles.inputLabel}>Prescription</Text>
              <TextInput
                style={styles.input}
                placeholder="Prescription"
                value={prescription}
                onChangeText={(text) => setPrescription(text)}
              />
              <TouchableOpacity style={[styles.addButton, { backgroundColor: prescriptionAdded ? '#888888' : '#61828a' }]} onPress={handleAddPrescription} disabled={prescriptionAdded}>
                <Text style={styles.buttonText}>{prescriptionAdded ? 'Added' : 'Save'}</Text>
              </TouchableOpacity>
              <Text style={styles.inputLabel}>Admit Patient:</Text>
              <Picker
                selectedValue={admitPatient}
                style={styles.dropdown}
                onValueChange={(itemValue) => setAdmitPatient(itemValue)}
              >
                <Picker.Item label="No" value="0" />
                <Picker.Item label="Yes" value="1" />
              </Picker>
              <TouchableOpacity style={[styles.updateButton, { backgroundColor: admissionUpdated ? '#888888' : '#61828a' }]} onPress={handleUpdateAdmission} disabled={admissionUpdated}>
                <Text style={styles.buttonText}>{admissionUpdated ? 'Updated' : 'Save'}</Text>
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
  inputLabel: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 5,
  },
  input: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  dropdown: {
    height: 40,
    width: '100%',
    color: '#000000',
  },
  addButton: {
    backgroundColor: '#61828a',
    padding: 5,
    marginVertical: 5,
    width: 150,
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  updateButton: {
    backgroundColor: '#61828a',
    padding: 10,
    marginVertical: 10,
    width: 150,
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'flex-end',
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
  confirmButton: {
    backgroundColor: '#61828a',
    padding: 15,
    marginVertical: 20,
    width: 200,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
});

export default PatientFormScreen;
