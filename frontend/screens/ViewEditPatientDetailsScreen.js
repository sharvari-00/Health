import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Picker } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const ViewEditPatientDetailsScreen = ({ route }) => {
  const { patientId } = route.params;
  const navigation = useNavigation();
  //const [changesSaved, setChangesSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
        const response = await fetch(`http://localhost:9090/api/v1/patients/exists/${patientId}`, {
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
      //setIsSaving(true);
      setIsSaving(true);
      const response = await fetch(`http://localhost:9090/api/v1/patients/${patientId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: patientDetails.fname,
          lname: patientDetails.lname,
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
        //setChangesSaved(true); 
        // Optionally, update the local state or any UI feedback here
        setTimeout(() => {
          setIsSaving(false);
        }, 2000);
      } else {
        console.error('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    }
    // finally {
    //   setIsSaving(false); // Reset saving state
    // }
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
                style={{ height: 50, width: 150,fontSize:22 }}
                onValueChange={(itemValue) => setEditedConsent(itemValue)}
              >
                <Picker.Item label="Yes" value={true} />
                <Picker.Item label="No" value={false} />
              </Picker>
            </View>

            <TouchableOpacity
      style={[styles.saveButton, isSaving && styles.disabledButton]}
      onPress={!isSaving ? handleSaveChanges : null} // Disable onPress event when saving
      disabled={isSaving} // Disable the button when saving
    >
      <Text style={styles.buttonText}>{isSaving ? 'Saving...' : 'Save Changes'}</Text>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#004849',
    marginBottom:10,
  },
  largeFont: {
    fontSize: 40,
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
    fontSize: 29,
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#326974',
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  formLabel: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 10,
  },
  formValue: {
    fontSize: 25,
    color: '#000000',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    flex: 1,
    fontSize:25,
    
  },
  saveButton: {
    backgroundColor: '#326974',
    padding: 15,
    alignItems: 'center',
    marginVertical: 20,
  },
  disabledButton: {
    opacity: 0.5, // Example of how to style a disabled button
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