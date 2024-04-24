import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Image } from 'react-native';

const NurseScreen = ({ navigation }) => {
  // Dummy data for patients (replace it with your actual data)
  const patientData = [
    { id: '1', bedNo: '101' },
    { id: '2', bedNo: '102' },
    // Add more patient data as needed
  ];

  const handleViewDetails = (patientId) => {
    // Navigate to PatientDetailsScreen with patientId as a parameter
    navigation.navigate('PatientDetailsScreen', { patientId });
  };

  // Dummy user name fetched from database (replace it with actual data)
  const userName = 'XYZ';

  const currentDate = new Date().toDateString();

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/wall.jpg')}
      >
        {/* Layer */}
        <View style={styles.layer}>
          {/* Upper Container */}
          <View style={styles.upperContainer}>
            <Text style={styles.headerText}>Nurse's Dashboard</Text>
            <View style={styles.divider} />
            <View style={styles.buttonContainer}>
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
              <Text style={styles.dateText}>{currentDate}</Text>
              <Text style={styles.greetingText}>Hello, {userName}</Text>
              <Text style={styles.departmentText}>Nurse</Text>
              <Text style={styles.infoText}>Hope you have a great day today!</Text>
            </View>
            {/* Right Middle Container */}
            <View style={styles.rightMiddleContainer}>
              <Text style={styles.listHeaderText}>List of Patients</Text>
              <FlatList
                data={patientData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.patientItem}
                    onPress={() => handleViewDetails(item.id)}
                  >
                    <Text style={styles.patientText}>Patient ID: {item.id}</Text>
                    <Text style={styles.patientText}>Bed No: {item.bedNo}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          {/* Bottom Container */}
          <View style={styles.bottomContainer}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require('../assets/logo2.png')} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const lightBorderColor = '#61828a'; // Light brown color for borders

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent layer
  },
  upperContainer: {
    flex: 3, // 2 parts out of 10
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    flex: 4, // 6 parts out of 10
    flexDirection: 'row',
  },
  leftMiddleContainer: {
    flex: 1, // Takes up half of the middle container
    backgroundColor: 'rgba(223, 233, 235, 0.2)', // Background color with opacity
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  rightMiddleContainer: {
    flex: 1, // Takes up half of the middle container
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 3, // 2 parts out of 10
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  listHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  divider: {
    width: '80%',
    height: 2,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
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
  },
  patientItem: {
    borderBottomWidth: 2,
    borderBottomColor: lightBorderColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  patientText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  logoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    marginBottom: 100,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  departmentText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  infoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
});

export default NurseScreen;
