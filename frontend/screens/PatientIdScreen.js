import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

const PatientIdScreen = ({ navigation }) => {
  const [patientId, setPatientId] = useState('');

  const handleNext = () => {
    // Navigate to PatientDetailsScreen with patientId as a parameter
    navigation.navigate('PrescriptionScreen', { patientId });
  };

  // Sample data
  const systemDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const doctorName = "Mr. Satish"; // Fetched from the database
  const doctorDepartment = "Pharmacist"; // Fetched from the database
  const greetingMessage = "Hope you have a great day today!";

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
            <Text style={styles.headerText}>Pharmacist's Dashboard</Text>
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
            {/* Left Container */}
            <View style={styles.middleLeftContainer}>
              <Text style={styles.dateText}>{systemDate}</Text>
              <Text style={styles.infoText}>Hello, {doctorName}</Text>
              <Text style={styles.smallText}>Pharmacist</Text>
              <Text style={styles.infoText}>{greetingMessage}</Text>
            </View>
            {/* Right Container */}
            <View style={styles.middleRightContainer}>
              <Text style={styles.enterIdText}>Enter Patient ID</Text>
              <TextInput
                style={styles.input}
                placeholder="Patient ID"
                onChangeText={(text) => setPatientId(text)}
              />
              <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
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

const lightBorderColor = '#564335'; // Light brown color for borders

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleContainer: {
    flex: 4,
    flexDirection: 'row',
  },
  middleLeftContainer: {
    flex: 1,
    backgroundColor: 'rgba(223, 233, 235, 0.2)',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
  },
  middleRightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowerContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  divider: {
    width: '80%',
    height: 2,
    backgroundColor: '#FFFFFF',
    marginVertical: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    paddingBottom:80,
  },
  infoText: {
    
    textAlign: 'justify',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    
  },
  smallText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  enterIdText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: 200,
    backgroundColor: '#FFFFFF',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#61828a', // Button background color
    padding: 10,
    marginVertical: 10,
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
    width: 200, // Adjust the size as needed
    height: 200, // Adjust the size as needed
    resizeMode: 'contain',
  },
});

export default PatientIdScreen;