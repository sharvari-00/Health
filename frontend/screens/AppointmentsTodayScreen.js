import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook

const AppointmentsTodayScreen = () => {
  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation object

  // Dummy data for today's appointments (replace it with your actual data)
  const appointmentsData = [
    { id: '1', name: 'John Doe', age: 30, gender: 'Male' },
    { id: '2', name: 'Jane Smith', age: 25, gender: 'Female' },
    // Add more appointment data as needed
  ];

  const handlePatientClick = (patientId) => {
    navigation.navigate('PatientFormScreen', { patientId });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/wall.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.layer}>
          <View style={styles.upperContainer}>
            <Text style={styles.headerText}>Appointments for Today</Text>
            <Text style={styles.dateText}>Date: {new Date().toLocaleDateString()}</Text>
            <View style={styles.divider} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('DoctorScreen')}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.middleLeftContainer}>
              <Text style={styles.heading}>Appointments</Text>
            </View>
            <View style={styles.middleRightContainer}>
              <FlatList
                data={appointmentsData}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={[styles.patientItem, { backgroundColor: 'rgba(169, 204, 207, 0.6)' }]}
                    onPress={() => handlePatientClick(item.id)}
                  >
                    <Text style={styles.serialNumber}>{index + 1}</Text>
                    <View style={styles.patientDetails}>
                      <Text style={styles.detailLabel}>Name:</Text>
                      <Text style={styles.detailText}>{item.name}</Text>
                    </View>
                    <View style={styles.patientDetails}>
                      <Text style={styles.detailLabel}>Age:</Text>
                      <Text style={styles.detailText}>{item.age}</Text>
                    </View>
                    <View style={styles.patientDetails}>
                      <Text style={styles.detailLabel}>Gender:</Text>
                      <Text style={styles.detailText}>{item.gender}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  logoutButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  middleLeftContainer: {
    flex: 1,
    backgroundColor: 'rgba(223, 233, 235, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleRightContainer: {
    flex: 2,
    paddingLeft: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  patientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  serialNumber: {
    marginRight: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  patientDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#000000',
  },
  detailText: {
    marginLeft: 5,
    color: '#FFFFFF',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default AppointmentsTodayScreen;
