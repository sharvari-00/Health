
import React, { useState, useEffect } from 'react';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Picker } from 'react-native';
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

  const [consent, setConsent] = useState(true); // Default value for consent
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Fetch the accessToken from AsyncStorage
    const fetchAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token !== null) {
          // Set the accessToken state
          setAccessToken(token);
        }
      } catch (error) {
        console.error('Error fetching accessToken:', error);
      }
    };

    fetchAccessToken();
  }, []); // Empty dependency array ensures this runs only once


  const handleSave = () => {
    // Pass the patient data to the BookAppointmentScreen
    navigation.navigate('BookAppointmentScreen', {
      firstName,
      lastName,
      age,
      gender,
      phoneNumber,
      email,
      doctorId,
      houseDetails,
      city,
      state,

      consent,
      accessToken // Include accessToken here

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
          {/* Middle Left Container */}
          <View style={styles.middleLeftContainer}>
            <Text style={styles.dateText}>Date: {new Date().toLocaleDateString()}</Text>
            <Text style={styles.middleHeading}>Patient Details</Text>
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
  <Picker
    style={styles.input}
    selectedValue={gender}
    onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
  >
    <Picker.Item label="Male" value="male" />
    <Picker.Item label="Female" value="female" />
    <Picker.Item label="Other" value="other" />
  </Picker>
</View>

            {/* <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Gender:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter gender"
                onChangeText={(text) => setGender(text)}
              />
            </View> */}
            {/* <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone Number:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                onChangeText={(text) => setPhoneNumber(text)}
              />
            </View> */}
            <View style={styles.inputContainer}>
  <Text style={styles.inputLabel}>Phone Number:</Text>
  <View style={styles.phoneInputContainer}>
    <Text style={styles.countryCode}>+91</Text>
    <TextInput
      style={[styles.input, styles.phoneNumberInput]}
      placeholder="Phone number"
      onChangeText={(text) => setPhoneNumber(text)}
    />
  </View>
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
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Consent for data sharing:</Text>
              <View style={styles.dropdownContainer}>
                <Picker
                  selectedValue={consent}
                  style={styles.dropdown}
                  onValueChange={(itemValue, itemIndex) => setConsent(itemValue)}
                >

                  <Picker.Item label="Yes" value={true} />
                  <Picker.Item label="No" value={false} />

                </Picker>
              </View>
            </View>

            {/* More input fields here */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Next</Text>
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
    backgroundColor: 'rgba(26, 95, 116, 0.13)',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  upperContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#004849',
    marginBottom: 10,
    fontFamily: 'Cursive',
  },
  largeFont: {
    fontSize: 50,
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
    fontSize: 28,
    fontWeight:'bold'
  },
  middleContainer: {
    flex: 4.5,
    justifyContent:'left',
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
    color: '#326974',
    fontSize: 23,
    marginBottom: 10,
  },
  middleHeading: {
    color: '#326974',
    fontSize: 27,
    fontWeight: 'bold',
  },
  middleRightContainer: {
    flex: 3,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputLabel: {
    color: '#000000',
    fontSize: 24,
  },
  input: {
    height: 60,
    borderColor: '#326974',
    borderWidth: 1,
    marginVertical: 5,
    paddingHorizontal: 10,
    backgroundColor:'#FFFFFF',
    fontSize: 22
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#326974',
    borderRadius: 5,
    marginVertical: 5,
    color: '#000000',
  },
  dropdown: {
    height: 50,
    color: '#000000',
  },
  saveButton: {
    backgroundColor: '#326974',
    padding: 15,
    alignItems: 'center',
    marginVertical: 20,
  },
  lowerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCode: {
    marginRight: 8, // Adjust the spacing between the country code and the phone number input
    fontSize:22,
  },
  phoneNumberInput: {
    flex: 1, // Allow the phone number input to take up remaining space
  },
});

export default AddPatientScreen;