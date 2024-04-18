import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 

const AdmittedPatientDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { patientId } = route.params;

  const [accessToken, setAccessToken] = useState('');
  const [patientDetails, setPatientDetails] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [treatmentPlan, setTreatmentPlan] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [dischargeProcessing, setDischargeProcessing] = useState(false);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        setAccessToken(token);

        const response = await fetch(`http://localhost:9090/api/v1/doctor/patient/${patientId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPatientDetails(data);
        } else {
          console.error('Failed to fetch patient details');
        }
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    const fetchSymptoms = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        setAccessToken(token);
        const response = await fetch(`http://localhost:9090/api/v1/doctor/symptoms_patient/${patientId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSymptoms(data);
        } else {
          console.error('Failed to fetch symptoms');
        }
      } catch (error) {
        console.error('Error fetching symptoms:', error);
      }
    };

    const fetchTreatmentPlan = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        setAccessToken(token);
        const response = await fetch(`http://localhost:9090/api/v1/doctor/diagnosis_patient/${patientId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTreatmentPlan(data);
        } else {
          console.error('Failed to fetch treatment plan');
        }
      } catch (error) {
        console.error('Error fetching treatment plan:', error);
      }
    };

    const fetchPrescription = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        setAccessToken(token);
        const response = await fetch(`http://localhost:9090/api/v1/doctor/prescriptions_patient/${patientId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPrescription(data);
        } else {
          console.error('Failed to fetch prescription');
        }
      } catch (error) {
        console.error('Error fetching prescription:', error);
      }
    };

    fetchPatientDetails();
    fetchSymptoms();
    fetchTreatmentPlan();
    fetchPrescription();
  }, []);

  const handleAddConsultation = () => {
    navigation.navigate('AddConsultationScreen', { 
      patientId,
      firstName: patientDetails?.fname,
      lastName: patientDetails?.lname,
      age: patientDetails?.age,
      gender: patientDetails?.gender,
      bedNo: patientDetails?.bedId,
    });
  };

  const handleDischarge = async () => {
    try {
      // Call backend API to discharge patient using token and patientId
      //const token = await AsyncStorage.getItem('accessToken');
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token);
      setDischargeProcessing(true);
      const response = await fetch(`http://localhost:9090/api/v1/admission/discharge/${patientId}`, {
        method: 'POST', // Adjust the method according to your API endpoint
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // After successful discharge
        setDischargeProcessing(false);
        // Perform any necessary actions after successful discharge
      } else {
        // Handle non-OK response from the server
        console.error('Failed to discharge patient:', response.status);
      }
    } catch (error) {
      console.error('Error discharging patient:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/wall.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.layer}>
          <View style={styles.upperContainer}>
            <Text style={styles.headerText}>Treatment Plan</Text>
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
              <TouchableOpacity
                style={[styles.button, styles.updateButton]}
                onPress={handleAddConsultation}
              >
                <Text style={styles.buttonText}>Add Consultation</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.dischargeButton]}
                onPress={handleDischarge}
                disabled={dischargeProcessing}
              >
                <Text style={styles.buttonText}>
                  {dischargeProcessing ? 'Discharge in Processing' : 'Discharge'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.middleRightContainer}>
              <Text style={styles.sectionHeading}>Patient Details</Text>
              <Text style={styles.patientDetail}>Patient ID: {patientDetails?.id}</Text>
              <Text style={styles.patientDetail}>First Name: {patientDetails?.fname}</Text>
              <Text style={styles.patientDetail}>Last Name: {patientDetails?.lname}</Text>
              <Text style={styles.patientDetail}>Gender: {patientDetails?.gender}</Text>
              <Text style={styles.patientDetail}>Age: {patientDetails?.age}</Text>
              <Text style={styles.patientDetail}>Bed No.: {patientDetails?.bedId}</Text>
              
              <Text style={styles.sectionHeading}>Symptoms</Text>
  <FlatList
    data={symptoms}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item, index }) => (
      <Text style={styles.item}>{`${index + 1}. ${item.sym_text}`}</Text>
    )}
  />
  <Text style={styles.sectionHeading}>Treatment Plan</Text>
  <FlatList
    data={treatmentPlan}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item, index }) => (
      <Text style={styles.item}>{`${index + 1}. ${item.dia_text}`}</Text>
    )}
  />
  <Text style={styles.sectionHeading}>Prescription</Text>
  <FlatList
    data={prescription}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item, index }) => (
      <Text style={styles.item}>{`${index + 1}. ${item.pre_text}`}</Text>
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
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center', // Align items horizontally
    marginBottom: 20,
  },
  middleRightContainer: {
    flex: 2,
    paddingLeft: 20,
  },
  button: {
    backgroundColor: '#61828a',
    padding: 10,
    marginVertical: 10,
    width: '60%',
    alignItems: 'center',
    borderRadius: 5,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  patientDetail: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,

  },
  item: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default AdmittedPatientDetailsScreen;