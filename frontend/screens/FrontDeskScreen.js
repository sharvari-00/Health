import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';

const FrontDeskScreen = ({ navigation }) => {
  const handleAddPatient = () => {
    // Implement logic for adding a patient
    navigation.navigate('AddPatientScreen');
    console.log('Add Patient');
  };

  const handleViewEditPatients = () => {
    // Implement logic for viewing/editing patients
    navigation.navigate('ViewEditPatientScreen');
    console.log('View/Edit Patients');
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
              <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Logout')}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Middle Container */}
          <View style={styles.middleContainer}>
            {/* Left Container with Calendar */}
            <View style={styles.leftContainer}>
              <Calendar
                style={{ width: '100%' }} // Make the calendar fit the width
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
              <TouchableOpacity style={styles.button} onPress={handleViewEditPatients}>
                <Text style={styles.buttonText}>View/Edit Patients</Text>
              </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent layer
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
    backgroundColor: 'rgba(223, 233, 235, 0.2)', // Background color with opacity
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 40,
    fontFamily: 'Cursive',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  divider: {
    width: '80%',
    height: 2,
    backgroundColor: '#FFFFFF',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  logoutButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#61828a', // Button background color
    padding: 15,
    margin: 10,
    width: 200,
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
