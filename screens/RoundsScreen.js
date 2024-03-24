import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Image } from 'react-native';

const RoundsScreen = ({ navigation }) => {
  // Dummy data for admitted patients (replace it with your actual data)
  const admittedPatientsData = [
    {
      id: '1',
      name: 'John Doe',
      age: 30,
      gender: 'Male',
      symptoms: 'Fever, Headache',
      diagnosis: 'Common Cold',
      prescription: 'Rest and fluids',
      bedNo: '101',
      treatment: 'Ongoing',
    },
    {
      id: '2',
      name: 'Jane Smith',
      age: 25,
      gender: 'Female',
      symptoms: 'Cough, Fatigue',
      diagnosis: 'Flu',
      prescription: 'Antiviral medication',
      bedNo: '102',
      treatment: 'Ongoing',
    },
    // Add more admitted patients as needed
  ];

  const handlePatientClick = (patientId) => {
    navigation.navigate('AdmittedPatientDetailsScreen', { patientId });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Loginim.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.layer}>
          <View style={styles.upperContainer}>
            <Text style={styles.headerText}>On Round Consultation</Text>
            <View style={styles.divider} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.middleLeftContainer}>
              <Text style={styles.middleLeftHeader}>Admitted Patients</Text>
              {admittedPatientsData.map((patient, index) => (
                <TouchableOpacity
                  key={patient.id}
                  style={styles.patientItem}
                  onPress={() => handlePatientClick(patient.id)}
                >
                 <Text style={[styles.patientInfo, { fontWeight: 'bold', fontSize: 18 }]}>Patient {index + 1}</Text>

                  <Text style={styles.patientInfo}>ID: {patient.id}</Text>
                  <Text style={styles.patientInfo}>Name: {patient.name}</Text>
                  <Text style={styles.patientInfo}>Age: {patient.age}</Text>
                  <Text style={styles.patientInfo}>Gender: {patient.gender}</Text>
                  <Text style={styles.patientInfo}>Bed No: {patient.bedNo}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.middleRightContainer}>
              <Text style={styles.middleRightHeader}>Patients</Text>
            </View>
          </View>
          <View style={styles.lowerContainer}>
            <Image style={styles.logo} source={require('../assets/logo2.png')} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const lightBorderColor = '#00637C'; // Light brown color for borders

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  layer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  upperContainer: {
    flex: 1,
  },
  middleContainer: {
    flex: 6,
    flexDirection: 'row',
  },
  lowerContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'Cursive',
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#FFFFFF',
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  logoutButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  middleLeftContainer: {
    flex: 7,
    backgroundColor: 'rgba(223, 233, 235, 0.2)',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  middleRightContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleLeftHeader: {
    fontSize: 25,
    fontFamily: 'Cursive',
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  middleRightHeader: {
    fontSize: 25,
    fontFamily: 'Cursive',
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  patientItem: {
    borderBottomWidth: 2,
    borderColor: lightBorderColor,
    padding: 15,
    marginBottom: 10,
    width: '100%',
    backgroundColor: 'rgba(169, 204, 207, 0.6)',
    borderRadius: 5,
  },
  patientInfo: {
    fontSize: 16,
    fontFamily: 'Arial',
    color: '#564335',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default RoundsScreen;
