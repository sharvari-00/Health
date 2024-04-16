import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, ImageBackground, Image } from 'react-native';

const BookAppointmentScreen = ({ route, navigation }) => {
  // State to hold the fetched doctor data
  const [availableDoctorsData, setAvailableDoctorsData] = useState([]);

  // Extracting patient data from the route params
  const { firstName, lastName, age, gender, phoneNumber, email, houseDetails, city, state, consent, accessToken } = route.params;

  // Function to fetch doctor details from the backend
  const fetchDoctorDetails = () => {
    fetch('YOUR_BACKEND_ENDPOINT', { // Replace YOUR_BACKEND_ENDPOINT with the actual endpoint
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // Include the accessToken
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
      setAvailableDoctorsData(data); // Update state with fetched doctor data
    })
    .catch(error => {
      console.error('Error fetching doctor details:', error);
    });
  };

  // Fetch doctor details when the component mounts
  useEffect(() => {
    fetchDoctorDetails();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // State to hold the selected doctor ID
  const [doctorId, setDoctorId] = useState('');

  // Function to handle confirming the appointment
  const handleConfirmAppointment = () => {
    const patientData = {
      fname: firstName,
      lname: lastName,
      age: age,
      gender: gender,
      phone_number: phoneNumber,
      email_id: email,
      consent: consent,
      docId: doctorId,
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
        return response.json()
          .then(data => {
            const patientId = data.id;
            alert(`Appointment scheduled with Doctor ID: ${doctorId}.\nRegistered patient ID is ${patientId}`);
            return data;
          });
      } else {
        console.error('Failed to register patient');
      }
    })
    .then(data => {
      console.log('Registered patient details:', data);
    })
    .catch(error => {
      console.error('Error registering patient:', error);
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
              style={styles.confirmButton}
              onPress={handleConfirmAppointment}
            >
              <Text style={styles.buttonText}>Confirm Appointment</Text>
            </TouchableOpacity>
          </View>

          {/* Right Middle Container */}
          <View style={styles.rightMiddleContainer}>
            <Text style={styles.middleHeading}>Doctors</Text>
            <FlatList
              data={availableDoctorsData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <View style={[styles.doctorItem, { backgroundColor: index % 2 === 0 ? 'rgba(169, 204, 207, 0.4)' : 'rgba(169, 204, 207, 0.4)' }]}>
                  <View style={styles.doctorDetails}>
                    <Text style={styles.doctorText}>Doctor ID: {item.id}</Text>
                    <Text style={styles.doctorText}>Name: {item.name}</Text>
                    <Text style={styles.doctorText}>Duration: {item.duration}</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
    fontSize: 18,
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
    backgroundColor:'#FFFFFF'
  },
  confirmButton: {
    backgroundColor: '#61828a',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  middleHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold'
  },
  bookButton: {
    backgroundColor: '#61828a',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
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
});

export default BookAppointmentScreen;
