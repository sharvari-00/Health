import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

const FrontDeskScreen = ({ navigation }) => {
  const [showInput, setShowInput] = useState(false); // State to control the visibility of input and buttons
  const [patientId, setPatientId] = useState(''); // State to store the entered patient ID
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message


  const handleAddPatient = () => {
    // Implement logic for adding a patient
    navigation.navigate('AddPatientScreen');
    console.log('Add Patient');
  };

  const handleViewEditPatients = () => {
    setShowInput(true);
  };

  const handleNext = async () => {
    // Check if patient ID exists, if not, display error message
    const patientExists = await checkIfPatientExists(patientId);
    if (patientExists) {
      // Navigate to ViewEditPatientDetailsScreen with patientId
      navigation.navigate('ViewEditPatientDetailsScreen', { patientId });
      // Reset input field and hide input and buttons
      setPatientId('');
      setShowInput(false);
      setErrorMessage('');
    } else {
      setErrorMessage('Patient not found');
    }
  };
  
  const checkIfPatientExists = async (patientId) => {
    try {
      const response = await fetch(`your_backend_api_url/exists/${patientId}`);
      if (response.ok) {
        const patientData = await response.json();
        // Check if patientData is null
        return patientData !== null;
      } else if (response.status === 403) {
        // Patient does not exist, forbidden
        return false;
      } else {
        // Handle other error cases
        console.error('Error:', response.status);
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };
  
  const handleCancel = () => {
    // Reset input field and hide input and buttons
    setPatientId('');
    setShowInput(false);
  };

  
  

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/wall.jpg')} // Adjust the image path accordingly
        resizeMode="cover"
      >
        {/* Layer */}
        <View style={styles.layer}>
          {/* Upper Container */}
          <View style={styles.upperContainer}>
            <Text style={styles.dashboardText}>Front Desk Dashboard</Text>
            <View style={styles.divider} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Logout</Text>
             </TouchableOpacity>

            </View>
          </View>
          {/* Middle Container */}
          <View style={styles.middleContainer}>
            {/* Left Container with Calendar */}
            <View style={styles.leftContainer}>
              <Calendar
                style={{ width: '180%', height: '160%' }} // Make the calendar fit the width
                // Configure the Calendar component here
                onDayPress={(day) => {
                  console.log('Selected day', day);
                }}
              />
            </View>
            {/* Right Container */}
            <View style={styles.rightContainer}>
              <TouchableOpacity style={styles.button} onPress={handleAddPatient}>
                <Text style={styles.buttonText}>Add Patient</Text>
              </TouchableOpacity>
              {showInput ? (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Patient ID"
                    onChangeText={setPatientId}
                    value={patientId}
                  />
                  <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                      <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                      <Text style={styles.buttonText}>Cancel</Text>
                      </TouchableOpacity>
                  </View>
                  {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
                </View>
              ) : (
                <TouchableOpacity style={styles.button} onPress={handleViewEditPatients}>
                  <Text style={styles.buttonText}>View/Edit Patients</Text>
                </TouchableOpacity>
                
              )}
            </View>
          </View>
          {/* Lower Container */}
          <View style={styles.lowerContainer}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require('../assets/logo2.png')} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const lightBorderColor = '#564335'; // Updated light brown color for borders

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  layer: {
    flex: 1,
    backgroundColor: 'rgba(26, 95, 116, 0.13)'
     // Semi-transparent layer
  },
  upperContainer: {
    flex: 3, // 3 parts out of 10
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    flex: 4, // 4 parts out of 10
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1, // Takes up half of the middle container
    //backgroundColor: 'rgba(223, 233, 235, 0.2)', // Background color with opacity
    justifyContent: 'right',
    alignItems: 'center',
    fontSize: '25'
  },
  rightContainer: {
    flex: 1, // Takes up half of the middle container
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerContainer: {
    flex: 3, // 3 parts out of 10
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashboardText: {
    fontSize: 60,
    fontFamily: 'Cursive',
    fontWeight: 'bold',
    color: '#004849',
  },
  divider: {
    width: '80%',
    height: 2,
    backgroundColor: '#FFFFFF',
    marginVertical: 20,
  },
  errorMessage: {
    fontSize: 20,
    color: 'red',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',

  },
  backButton: {
    backgroundColor: '#326974',
    fontSize:25
  },
  logoutButton: {
    backgroundColor: '#326974',
  },
  buttonText: {
    fontSize: 29,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#326974', // Button background color
    padding: 15,
    margin: 10,
    width: 350,
    height: 70,
    alignItems: 'center',
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#E0ECDE',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: 250,
    fontSize: 28,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  nextButton: {
    backgroundColor: '#326974', // Button background color
    padding: 15,
    margin: 10,
    width: 100,
    alignItems: 'center',
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: 'red', // Button background color
    padding: 15,
    margin: 10,
    width: 100,
    alignItems: 'center',
    borderRadius: 10,
  },
  logoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default FrontDeskScreen;
