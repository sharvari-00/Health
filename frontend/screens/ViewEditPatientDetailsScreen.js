import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

const ViewEditPatientDetailsScreen = ({ route }) => {
  const { patientId } = route.params;

  // Dummy patient details (replace it with your actual data)
  const patientDetails = {
    id: '1',
    name: 'John Doe',
    age: 30,
    gender: 'Male',
    phoneNumber: '1234567890',
    address: '123 Main St',
    doctorAppointed: 'Dr. Smith',
    consent: true,
    bedAllocated: null, // Nullable bed allocation
  };

  const [editedPhoneNumber, setEditedPhoneNumber] = useState(patientDetails.phoneNumber);
  const [editedAddress, setEditedAddress] = useState(patientDetails.address);
  const [consent, setConsent] = useState(true); // Initially set to true (Yes)

  const handleYesClick = () => {
    setConsent(true);
  };

  const handleNoClick = () => {
    setConsent(false);
  };

  const handleSaveChanges = () => {
    // Implement the logic to save edited patient details
    console.log('Saving changes to patient details...');
  };

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
              <Text style={styles.formLabel}>ID:</Text>
              <Text style={styles.formValue}>{patientDetails.id}</Text>
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Name:</Text>
              <Text style={styles.formValue}>{patientDetails.name}</Text>
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
              <Text style={styles.formLabel}>Doctor Appointed:</Text>
              <Text style={styles.formValue}>{patientDetails.doctorAppointed}</Text>
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Bed Allocated:</Text>
              <Text style={styles.formValue}>{patientDetails.bedAllocated || 'Not allocated'}</Text>
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
              <Text style={styles.formLabel}>Address:</Text>
              <TextInput
                style={styles.input}
                value={editedAddress}
                onChangeText={(text) => setEditedAddress(text)}
              />
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Consent for data sharing, if neccessary:</Text>
              <TouchableOpacity
                style={[styles.radioButton, consent ? styles.selected : styles.unselected]}
                onPress={handleYesClick} // Set to true for "Yes"
              >
                <Text style={consent ? styles.selectedText : styles.unselectedText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.radioButton, !consent ? styles.selected : styles.unselected]}
                onPress={handleNoClick} // Set to false for "No"
              >
                <Text style={!consent ? styles.selectedText : styles.unselectedText}>No</Text>
              </TouchableOpacity>
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
    //backgroundColor: '#FF0000', // Red for "No"
  },
  selectedText: {
    color: '#FFFFFF',
  },
  unselectedText: {
    color: '#000000',
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

export default ViewEditPatientDetailsScreen;
