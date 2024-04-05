import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPatientScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [houseDetails, setHouseDetails] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [consent, setConsent] = useState(true);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Retrieve the access token from AsyncStorage
    AsyncStorage.getItem('accessToken')
      .then(token => {
        if (token) {
          setAccessToken(token);
        } else {
          console.error('Access token not found');
        }
      })
      .catch(error => {
        console.error('Error retrieving access token:', error);
      });
  }, []);

  const handleSave = () => {
    const patientData = {
      fname: firstName,
      lname: lastName,
      age,
      gender,
      phone_number: phoneNumber,
      email_id: email,
      doc_id: doctorId,
      address_line: houseDetails,
      city,
      state,
      consent
    };

    fetch('http://localhost:9090/api/v1/patients/register_patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(patientData)
    })
    .then(response => {
      if (response.ok) {
        console.log('Patient data saved successfully');
        navigation.navigate('BookAppointmentScreen');
      } else {
        console.error('Failed to save patient data');
      }
    })
    .catch(error => {
      console.error('Error saving patient data:', error);
    });
  };

  return (
    <ImageBackground source={require('../assets/wall.jpg')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        {/* Upper Container */}
        <View style={styles.upperContainer}>
          <Text style={[styles.heading, styles.largeFont]}>Patient Registration Form</Text>
          <View style={styles.divider} />
          <View style={styles.headerButtons}>
            <TouchableOpacity>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Middle Container */}
        <View style={styles.middleContainer}>
          {/* Middle Left Container */}
          <View style={styles.middleLeftContainer}>
            <Text style={styles.dateText}>Date: {new Date().toLocaleDateString()}</Text>
            <Text style={styles.middleHeading}>New Patient Registration</Text>
          </View>
          
          {/* Middle Right Container */}
          <View style={styles.middleRightContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>First Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter first name"
                onChangeText={(text) => setFirstName(text)}
              />
              
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Last Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter last name"
                onChangeText={(text) => setLastName(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Age:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter age"
                onChangeText={(text) => setAge(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Gender:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter gender"
                onChangeText={(text) => setGender(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone Number:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                onChangeText={(text) => setPhoneNumber(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Doctor ID:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Doctor ID"
                onChangeText={(text) => setDoctorId(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>House Details:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter house details"
                onChangeText={(text) => setHouseDetails(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>City:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter city"
                onChangeText={(text) => setCity(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>State:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter state"
                onChangeText={(text) => setState(text)}
              />
            </View>
            {/* <Text style={styles.consentText}>Consent for data sharing:</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={[styles.radioButton, consent ? styles.selected : styles.unselected]}
                onPress={() => setConsent(true)}
              >
                <Text style={consent ? styles.selectedText : styles.unselectedText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.radioButton, !consent ? styles.selected : styles.unselected]}
                onPress={() => setConsent(false)}
              >
                <Text style={!consent ? styles.selectedText : styles.unselectedText}>No</Text>
              </TouchableOpacity>
            </View> */}

            {/* More input fields here */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Lower Container */}
        <View style={styles.lowerContainer}>
          <Image source={require('../assets/logo2.png')} style={styles.logo} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
  largeFont: {
    fontSize: 28,
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
    fontSize: 18,
    fontWeight:'bold'
  },
  middleContainer: {
    flex: 6,
    flexDirection: 'row',
  },
  middleLeftContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(223, 233, 235, 0.2)',
    paddingHorizontal: 20,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  middleHeading: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  middleRightContainer: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputLabel: {
    color: '#000000',
    fontSize: 20,
  },
  input: {
    height: 50,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginVertical: 5,
    paddingHorizontal: 10,
    color: '#FFFFFF',
  },
  consentText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginVertical: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioButton: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  selected: {
    backgroundColor: '#32CD32', // Green for "Yes"
  },
  unselected: {
    backgroundColor: '#DDDDDD', // Gray for "No"
  },
  selectedText: {
    color: '#FFFFFF',
  },
  unselectedText: {
    color: '#564335',
  },
  saveButton: {
    backgroundColor: '#61828a',
    padding: 15,
    alignItems: 'center',
    marginVertical: 20,
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
  },
});

export default AddPatientScreen;
