import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

const PatientFormScreen = ({ route }) => {
  const { patientId } = route.params;

  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');

  const handleSave = () => {
    // Implement the logic to save patient information (symptoms, diagnosis, prescription)
    console.log(`Save for patient: ${patientId}`);
  };

  const handleAllocateNeed = () => {
    // Implement the logic to allocate a need for the patient
    console.log(`Allocation Need for patient: ${patientId}`);
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
                onChangeText={(text) => setSymptoms(text)}
              />
              <Text style={styles.inputLabel}>Diagnosis</Text>
              <TextInput
                style={styles.input}
                placeholder="Diagnosis"
                onChangeText={(text) => setDiagnosis(text)}
              />
              <Text style={styles.inputLabel}>Prescription</Text>
              <TextInput
                style={styles.input}
                placeholder="Prescription"
                onChangeText={(text) => setPrescription(text)}
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save Consultation</Text>
              </TouchableOpacity>
              <View style={{ height: 10 }} />
              <TouchableOpacity style={styles.allocateNeedButton} onPress={handleAllocateNeed}>
                <Text style={styles.buttonText}>Admit Patient ?</Text>
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
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  logoutButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#61828a',
    padding: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  allocateNeedButton: {
    backgroundColor: '#61828a',
    padding: 5,
    marginVertical: 5,
    width: 150,
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default PatientFormScreen;
