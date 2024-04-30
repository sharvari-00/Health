import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const NurseScreen = () => {
  const navigation = useNavigation(); // Use useNavigation hook here
  const [accessToken, setAccessToken] = useState('');
  const [patientData, setPatientData] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        // Retrieve the access token from AsyncStorage
        const token = await AsyncStorage.getItem('accessToken');
        setAccessToken(token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    const fetchUserName = async () => {
      try {
        // Retrieve the user name from AsyncStorage or an API endpoint
        const name = await AsyncStorage.getItem('userName');
        setUserName(name);
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchAccessToken();
    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // Make a GET request to the API endpoint to fetch patient data using the access token
        const response = await fetch('http://localhost:9090/api/v1/nurse/onRoundPatients', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPatientData(data);
        } else {
          console.error('Failed to fetch patient data');
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    if (accessToken) {
      fetchPatientData();
    }
  }, [accessToken]);

  const handleViewDetails = (patientId) => {
    navigation.navigate('PatientDetailsScreen', { patientId });
  };

  const currentDate = new Date().toDateString();

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/wall.jpg')}
      >
        <View style={styles.layer}>
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
          <View style={styles.middleContainer}>
            <View style={styles.leftMiddleContainer}>
              <Text style={styles.dateText}>{currentDate}</Text>
              <Text style={styles.greetingText}>Hello, {userName}</Text>
              <Text style={styles.departmentText}>Nurse</Text>
              <Text style={styles.infoText}>Hope you have a great day today!</Text>
              {/* Additional nurse details can be added here */}
            </View>
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
                    <Text style={styles.patientText}>Bed No: {item.bedId}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
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

const lightBorderColor = '#326974'; // Light brown color for borders

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