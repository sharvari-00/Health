import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Image } from 'react-native';

const BookAppointmentScreen = ({ navigation }) => {
  // Dummy data for available doctors (replace it with your actual data)
  const availableDoctorsData = [
    { id: '101', name: 'Dr. Smith', duration: '9:00 - 13:00' },
    { id: '102', name: 'Dr. Johnson', duration: '16:00 - 20:00' },
    // Add more doctor data as needed
  ];

  const handleBookAppointment = (doctorId) => {
    // Implement the logic for booking an appointment
    console.log(`Booking appointment with doctor ID: ${doctorId}`);
    // Show a message or perform any additional actions after booking

    // Show confirmation message
    alert('Appointment booked!');
  };

  return (
    <ImageBackground source={require('../assets/Loginim.jpg')} style={styles.backgroundImage}>
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
            <Text style={styles.middleHeading}>Doctors</Text>
          </View>

          {/* Right Middle Container */}
          <View style={styles.rightMiddleContainer}>
            <FlatList
              data={availableDoctorsData}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View style={[styles.doctorItem, { backgroundColor: index % 2 === 0 ? 'rgba(169, 204, 207, 0.4)' : 'rgba(169, 204, 207, 0.4)' }]}>
                  <View style={styles.doctorDetails}>
                    <Text style={styles.doctorText}>Doctor ID: {item.id}</Text>
                    <Text style={styles.doctorText}>Name: {item.name}</Text>
                    <Text style={styles.doctorText}>Duration: {item.duration}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => handleBookAppointment(item.id)}
                  >
                    <Text style={styles.buttonText}>Book</Text>
                  </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(223, 233, 235, 0.2)',
    paddingHorizontal: 20,
  },
  middleHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
    borderRadius:8,  },
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
