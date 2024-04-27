import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Image } from 'react-native';

const ViewEditPatientsScreen = ({ navigation }) => {
  // Dummy data for patients (replace it with your actual data)
  const patientsData = [
    { id: '1', name: 'John Doe', age: 30, gender: 'Male', doctor: 'Dr. Satish' },
    { id: '2', name: 'Jane Smith', age: 25, gender: 'Female', doctor: 'Dr. Satish' },
    // Add more patient data as needed
  ];

  const handlePatientClick = (patientId) => {
    navigation.navigate('ViewEditPatientDetailsScreen', { patientId });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/wall.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.layer}>
          <View style={styles.upperContainer}>
            <Text style={styles.headerText}>View/Edit Patients</Text>
            <View style={styles.divider} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Home')}>
  <Text style={styles.buttonText}>Logout</Text>
</TouchableOpacity>

            </View>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.middleLeftContainer}>
              <Text style={styles.middleHeaderText}>Patients</Text>
            </View>
            <View style={styles.middleRightContainer}>
              <FlatList
                data={patientsData}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={[styles.patientItem, { backgroundColor: index % 2 === 0 ? 'rgba(169, 204, 207, 0.6)' : 'rgba(169, 204, 207, 0.8)' }]}
                    onPress={() => handlePatientClick(item.id)}
                  >
                   <Text style={[styles.patientInfo, { fontWeight: 'bold', fontSize: 18, color: '#000000' }]}>ID: {item.id}</Text>


                    <Text style={styles.patientInfo}>Name: {item.name}</Text>
                    <Text style={styles.patientInfo}>Age: {item.age}</Text>
                    <Text style={styles.patientInfo}>Gender: {item.gender}</Text>
                    <Text style={styles.patientInfo}>Doctor Consulted: {item.doctor}</Text>
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
    //padding: 20,
  },
  upperContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  middleContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  lowerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  middleLeftContainer: {
    flex: 1,
    backgroundColor: 'rgba(223, 233, 235, 0.2)',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  middleHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  middleRightContainer: {
    flex: 3,
    paddingLeft: 10,
  },
  patientItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  patientInfo: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default ViewEditPatientsScreen;
