import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, ImageBackground, Image, Alert } from 'react-native';

const BookAppointmentScreen = ({ route, navigation }) => {
  const [availableDoctorsData, setAvailableDoctorsData] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [registeredPatientId, setRegisteredPatientId] = useState(null);
  const [confirmationText, setConfirmationText] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { accessToken } = route.params;

  useEffect(() => {
    fetchDoctorDetails();
  }, []);

  const fetchDoctorDetails = () => {
    fetch('http://localhost:9090/api/v1/doctor/doctors', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch doctor details');
      }
    })
    .then(data => {
      setAvailableDoctorsData(data);
    })
    .catch(error => {
      console.error('Error fetching doctor details:', error);
    });
  };

  const handleConfirmAppointment = () => {
    const selectedDoctor = availableDoctorsData.find(doctor => doctor.id === parseInt(doctorId));
    if (!selectedDoctor) {
      setErrorText('Please select a valid doctor');
      return;
    } else {
      setErrorText('');
      setIsConfirmed(true); // Mark appointment as confirmed
    }

    const { firstName, lastName, age, gender, phoneNumber, email, houseDetails, city, state, consent } = route.params;

    const patientData = {
      fname: firstName,
      lname: lastName,
      age: age,
      gender: gender,
      phone_number: phoneNumber,
      email_id: email,
      consent: consent,
      docId: selectedDoctor.id,
      address_line: houseDetails,
      city: city,
      state: state,
    };

    fetch('http://localhost:9090/api/v1/patients/register_patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(patientData)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to register patient');
      }
    })
    .then(data => {
      setRegisteredPatientId(data.id);
      setConfirmationText(`Patient ID: ${data.id}\nRegistered Doctor ID: ${selectedDoctor.id}`);
      Alert.alert(
        'Success',
        <Text style={styles.middleHeading}>
          {`Appointment scheduled with Doctor ID: ${selectedDoctor.id}.\nRegistered patient ID is ${data.id}`}
        </Text>
      );
    })
    
    .catch(error => {
      console.error('Error registering patient:', error);
      Alert.alert('Error', 'Failed to register patient. Please try again.');
    });
  };

  return (
    <ImageBackground source={require('../assets/wall.jpg')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        {/* Upper Container */}
        <View style={styles.upperContainer}>
          <Text style={styles.heading}>Available Doctors </Text>
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
          {/* Left Middle Container */}
          <View style={styles.leftMiddleContainer}>
            <Text style={styles.middleHeading}>Enter Doctor ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter doctor ID"
              value={doctorId}
              onChangeText={setDoctorId}
            />
            <TouchableOpacity
              style={[styles.confirmButton, isConfirmed && styles.confirmedButton]} // Change button style when confirmed
              onPress={handleConfirmAppointment}
              disabled={isConfirmed} // Disable button when confirmed
            >
              <Text style={styles.buttonText}>{isConfirmed ? 'Confirmed' : 'Confirm Appointment'}</Text>
            </TouchableOpacity>
            <Text style={styles.errorText}>{errorText}</Text>
            <Text style={styles.confirmationText}>{confirmationText}</Text>
          </View>

          {/* Right Middle Container */}
          <View style={styles.rightMiddleContainer}>
            <Text style={styles.middleHeading}>Doctors</Text>
            <FlatList
              data={availableDoctorsData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <View style={[styles.doctorItem, { backgroundColor:'rgba(169, 204, 207, 0.6)', marginBottom: 10 }]}>
                  <View style={styles.doctorDetails}>
                    <Text style={styles.doctorText}>Doctor ID: {item.id}</Text>
                    <Text style={styles.doctorText}>Name: {item.fname} {item.lname}</Text>
                    <Text style={styles.doctorText}>Department: {item.dept_name}</Text>
                    <Text style={styles.doctorText}>Shift: {item.shift_starts} - {item.shift_ends}</Text>
                    <Text style={styles.doctorText}>Email: {item.email}</Text>
                  </View>
                </View>
              )}
            />
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
    fontSize: 50,
    fontWeight: 'bold',
    color: '#004849',
    marginBottom: 10,
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
    fontSize: 25,
    fontWeight: 'bold'
  },
  middleContainer: {
    flex: 6,
    flexDirection: 'row',
  },
  leftMiddleContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(223, 233, 235, 0.2)',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    color: '#000000',
    backgroundColor:'#FFFFFF',
    fontSize:20,
  },
  confirmButton: {
    backgroundColor: '#326974',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  confirmedButton: {
    backgroundColor: '#4CAF50', // Change color when confirmed
  },
  middleHeading: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#004849',
    marginBottom: 10,
  },
  rightMiddleContainer: {
    flex: 7,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  doctorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorText: {
    fontSize: 25,
    color: '#000000',
    fontWeight: 'bold'
  },
  bookButton: {
    backgroundColor: '#326974',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
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
  confirmationText: {
    color: '#004849',
    fontSize: 25,
    marginTop: 10,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default BookAppointmentScreen;
