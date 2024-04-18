import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PrescriptionScreen = ({ route }) => {
  const { patientId } = route.params; // Get the patient ID from the navigation params
  const [prescriptions, setPrescriptions] = useState([]); // State to store prescriptions
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState('');

  // Function to fetch prescriptions based on patient ID
  const fetchPrescriptions = async () => {
    try {
      // Get access token from AsyncStorage
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token);
  
      // Fetch prescriptions from the API
      const response = await fetch(`http://localhost:9090/api/v1/pharmacist/prescriptions/${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      // Update state with prescriptions data
      setPrescriptions(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Fetch prescriptions when the component mounts
    fetchPrescriptions();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/wall.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.layer}>
          <View style={styles.upperContainer}>
            <Text style={styles.headerText}>Prescription</Text>
            <View style={styles.divider} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('PatientIdScreen')}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.leftMiddleContainer}>
              <Text style={[styles.patientDetailText, { fontSize: 24, textAlign: 'center' }]}>Prescription List</Text>
              <View>
                {prescriptions.map((prescription, index) => (
                  <Text key={index} style={styles.text}>{`${index + 1}. ${prescription.pre_text}`}</Text>
                ))}
                {prescriptions.length === 0 && (
                  <Text style={styles.text}>No prescriptions found for this patient.</Text>
                )}
              </View>
            </View>
            <View style={styles.rightMiddleContainer}>
              {/* Right middle container content */}
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
    flex: 3,
    flexDirection: 'row',
  },
  leftMiddleContainer: {
    flex: 1,
    backgroundColor: 'rgba(223, 233, 235, 0.2)',
    padding: 20,
  },
  rightMiddleContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  patientDetailText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  error: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
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
});

export default PrescriptionScreen;
