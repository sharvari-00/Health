import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Image,Picker} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 
import Slider from '@react-native-community/slider'; // Import Slider from react-native-community

const AdmittedPatientDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { patientId } = route.params;

  const [accessToken, setAccessToken] = useState('');
  const [patientDetails, setPatientDetails] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [dischargeProcessing, setDischargeProcessing] = useState(false);
  const [temperature, setTemperature] = useState(98.6); // State for temperature
  const [bloodPressure, setBloodPressure] = useState({ systolic: 120, diastolic: 80 }); // State for blood pressure
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        setAccessToken(token);

        // Fetch patient details
        const patientResponse = await fetch(`http://localhost:9090/api/v1/doctor/patient/${patientId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (patientResponse.ok) {
          const patientData = await patientResponse.json();
          setPatientDetails(patientData);
        } else {
          console.error('Failed to fetch patient details');
        }

        // Fetch symptoms
        const symptomsResponse = await fetch(`http://localhost:9090/api/v1/doctor/symptoms_patient/${patientId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (symptomsResponse.ok) {
          const symptomsData = await symptomsResponse.json();
          setSymptoms(symptomsData);
        } else {
          console.error('Failed to fetch symptoms');
        }

        // Fetch diagnosis
        const diagnosisResponse = await fetch(`http://localhost:9090/api/v1/doctor/diagnosis_patient/${patientId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (diagnosisResponse.ok) {
          const diagnosisData = await diagnosisResponse.json();
          setDiagnosis(diagnosisData);
        } else {
          console.error('Failed to fetch diagnosis');
        }

        // Fetch prescription
        const prescriptionResponse = await fetch(`http://localhost:9090/api/v1/doctor/prescriptions_patient/${patientId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (prescriptionResponse.ok) {
          const prescriptionData = await prescriptionResponse.json();
          setPrescription(prescriptionData);
        } else {
          console.error('Failed to fetch prescription');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token);
      setDischargeProcessing(true);
      const response = await fetch(`http://localhost:9090/api/v1/admission/discharge/${patientId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        setDischargeProcessing(false);
      } else {
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
              <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.middleLeftContainer}>
            <Text style={styles.consultationFormHeading}>Patient Vitals</Text>
              <View style={styles.toolContainer}>
                <Text style={styles.sliderLabel}>Temperature: {temperature.toFixed(1)} °F</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={95}
                  maximumValue={105}
                  step={0.1}
                  value={temperature}
                  onValueChange={(temp) => setTemperature(temp)}
                />
                
                <View style={styles.bloodPressureSliderContainer}>
                  <Text style={styles.sliderLabel}>Systolic:</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={90}
                    maximumValue={180}
                    step={1}
                    value={bloodPressure.systolic}
                    onValueChange={(systolic) => setBloodPressure({ ...bloodPressure, systolic })}
                  />
                  <Text style={styles.sliderLabel}>Diastolic:</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={60}
                    maximumValue={120}
                    step={1}
                    value={bloodPressure.diastolic}
                    onValueChange={(diastolic) => setBloodPressure({ ...bloodPressure, diastolic })}
                  />
                </View>
                <Text style={styles.sliderLabel}>Blood Pressure: {bloodPressure.systolic}/{bloodPressure.diastolic} mmHg</Text>
              </View>
              
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
                data={diagnosis}
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
    backgroundColor: 'rgba(26, 95, 116, 0.13)',
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
    fontSize: 50,
    fontWeight: 'bold',
    color: '#004849',

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
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  middleLeftContainer: {
    flex: 1,
    backgroundColor: 'rgba(223, 233, 235, 0.2)',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  middleRightContainer: {
    flex: 2,
    paddingLeft: 20,
  },
  button: {
    backgroundColor: '#326974',
    padding: 10,
    marginVertical: 10,
    width: '70%',
    alignItems: 'center',
    borderRadius: 5,
  },
  sectionHeading: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#004849',
    marginTop:10,
    marginBottom: 10,
  },
  patientDetail: {
    fontSize: 23,
    color: '#000000',
    marginBottom: 5,
  },
  item: {
    fontSize: 23,
    color: '#000000',
    marginBottom: 5,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  toolContainer: {
    marginTop:15,
    marginBottom:15,
    backgroundColor: '#f0f0f0', // Background color of the tool container
    borderRadius: 10, // Curved corners
    padding: 10, // Padding around the content
  },
  sliderLabel: {
    fontSize: 20, // Adjust font size as needed
    marginBottom: 5, // Spacing between labels
  },
  slider: {
    marginBottom: 15, // Spacing between sliders
  },
  bloodPressureSliderContainer: {
    marginBottom: 15, // Spacing between blood pressure sliders and text
  },
  consultationFormHeading: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#004849',
    marginBottom: 10,
  },
});

export default AdmittedPatientDetailsScreen;
