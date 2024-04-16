import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Picker } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewEditPatientDetailsScreen = ({ route }) => {
  const { patientId } = route.params;

  const [accessToken, setAccessToken] = useState('');
  const [patientDetails, setPatientDetails] = useState(null);

  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedCity, setEditedCity] = useState('');
  const [editedState, setEditedState] = useState('');
  const [editedConsent, setEditedConsent] = useState(true);

  useEffect(() => {
    // Fetch patient details using API
    const fetchPatientDetails = async () => {
      try {
        // Get access token from async storage
        const token = await AsyncStorage.getItem('accessToken');
        setAccessToken(token);

        // Fetch patient details using the token and patientId
        const response = await fetch(`YOUR_BACKEND_API_ENDPOINT/patients/${patientId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPatientDetails(data);
          // Set initial values for editable fields
          setEditedPhoneNumber(data.phone_number);
          setEditedAddress(data.address_line);
          setEditedEmail(data.email_id);
          setEditedCity(data.city);
          setEditedState(data.state);
          setEditedConsent(data.consent);
        } else {
          console.error('Failed to fetch patient details');
        }
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, []);

  const handleYesClick = () => {
    setEditedConsent(true);
  };

  const handleNoClick = () => {
    setEditedConsent(false);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`YOUR_BACKEND_API_ENDPOINT/patients/${patientId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: editedPhoneNumber,
          email_id: editedEmail,
          address_line: editedAddress,
          city: editedCity,
          state: editedState,
          consent: editedConsent,
        }),
      });

      if (response.ok) {
        console.log('Changes saved successfully');
        // Optionally, update the local state or any UI feedback here
      } else {
        console.error('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  if (!patientDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={require('../assets/wall.jpg')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        {/* Upper Container */}
        <View style={styles.upperContainer}>
          <Text style={[styles.heading, styles.largeFont]}>Edit Details</Text>
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
            <Text style={styles.subHeading}>Patient Details</Text>
          </View>
          
          {/* Middle Right Container */}
          <View style={styles.middleRightContainer}>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Patient ID:</Text>
              <Text style={styles.formValue}>{patientDetails.id}</Text>
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>First Name:</Text>
              <Text style={styles.formValue}>{patientDetails.fname}</Text>
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Last Name:</Text>
              <Text style={styles.formValue}>{patientDetails.lname}</Text>
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Age:</Text>
              <Text style={styles.formValue}>{patientDetails.age}</Text>
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Gender:</Text>
              <Text style={styles.formValue}>{patientDetails.gender}</Text>
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Phone Number:</Text>
              <TextInput
                style={styles.input}
                value={editedPhoneNumber}
                onChangeText={(text) => setEditedPhoneNumber(text)}
              />
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Email:</Text>
              <TextInput
                style={styles.input}
                value={editedEmail}
                onChangeText={(text) => setEditedEmail(text)}
              />
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Address Line 1:</Text>
              <TextInput
                style={styles.input}
                value={editedAddress}
                onChangeText={(text) => setEditedAddress(text)}
              />
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>City:</Text>
              <TextInput
                style={styles.input}
                value={editedCity}
                onChangeText={(text) => setEditedCity(text)}
              />
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>State:</Text>
              <TextInput
                style={styles.input}
                value={editedState}
                onChangeText={(text) => setEditedState(text)}
              />
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Consent for data sharing:</Text>
              <Picker
                selectedValue={editedConsent}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue) => setEditedConsent(itemValue)}
              >
                <Picker.Item label="Yes" value={true} />
                <Picker.Item label="No" value={false} />
              </Picker>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
              <Text style={styles.buttonText}>Save Changes</Text>
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
    marginBottom:10,
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
    fontSize: 16,
  },
  middleContainer: {
    flex: 6,
    flexDirection: 'row',
  },
  middleLeftContainer: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: 'rgba(223, 233, 235, 0.2)',
    justifyContent: 'center',
  },
  middleRightContainer: {
    flex: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  formLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 10,
  },
  formValue: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    flex: 1,
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
    resizeMode: 'contain',
  },
});

export default ViewEditPatientDetailsScreen;
