import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

const AdmittedPatientDetailsScreen = ({ route }) => {
  const { patientId } = route.params;

  const patientDetails = {
    id: '1',
    name: 'John Doe',
    age: 30,
    gender: 'Male',
    symptoms: 'Fever, Headache',
    diagnosis: 'Common Cold',
    prescription: 'Rest and fluids',
    bedNo: '101',
    treatment: 'Ongoing',
  };

  const [editedDetails, setEditedDetails] = useState({
    symptoms: patientDetails.symptoms,
    diagnosis: patientDetails.diagnosis,
    prescription: patientDetails.prescription,
    treatment: patientDetails.treatment,
  });

  const handleUpdateDetails = () => {
    console.log(`Update details for patient: ${patientId}`, editedDetails);
  };

  const handleCanBeDischarged = () => {
    console.log(`Patient can be discharged: ${patientId}`);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Loginim.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.layer}>
          <View style={styles.upperContainer}>
            <Text style={styles.headerText}>Treatment Plan</Text>
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
              <Text style={styles.patientDetailsHeading}>Patient Details</Text>
              <Text style={styles.patientDetails}>ID: {patientId}</Text>
              <Text style={styles.patientDetails}>Name: {patientDetails.name}</Text>
              <Text style={styles.patientDetails}>Gender: {patientDetails.gender}</Text>
              <Text style={styles.patientDetails}>Bed No: {patientDetails.bedNo}</Text>
            </View>
            <View style={styles.middleRightContainer}>
              <Text style={styles.inputLabel}>Symptoms</Text>
              <TextInput
                style={styles.input}
                placeholder="Symptoms"
                value={editedDetails.symptoms}
                onChangeText={(text) => setEditedDetails({ ...editedDetails, symptoms: text })}
              />
              <Text style={styles.inputLabel}>Diagnosis</Text>
              <TextInput
                style={styles.input}
                placeholder="Diagnosis"
                value={editedDetails.diagnosis}
                onChangeText={(text) => setEditedDetails({ ...editedDetails, diagnosis: text })}
              />
              <Text style={styles.inputLabel}>Prescription</Text>
              <TextInput
                style={styles.input}
                placeholder="Prescription"
                value={editedDetails.prescription}
                onChangeText={(text) => setEditedDetails({ ...editedDetails, prescription: text })}
              />
              <TouchableOpacity style={styles.updateButton} onPress={handleUpdateDetails}>
                <Text style={styles.buttonText}>Update Treatment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dischargeButton} onPress={handleCanBeDischarged}>
                <Text style={styles.buttonText}>Discharge</Text>
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
  patientDetailsHeading: {
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
  updateButton: {
    backgroundColor: '#61828a',
    padding: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  dischargeButton: {
    backgroundColor: '#61828a',
    padding: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default AdmittedPatientDetailsScreen;
