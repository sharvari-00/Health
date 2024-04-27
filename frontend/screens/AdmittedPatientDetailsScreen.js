import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AdmittedPatientDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { patientId } = route.params;

  const [accessToken, setAccessToken] = useState('');
  const [visits, setVisits] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [dischargeProcessing, setDischargeProcessing] = useState(false);
  const [patientDetails, setPatientDetails] = useState(null);

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
        const patientData = await patientResponse.json();
        setPatientDetails(patientData);

        // Fetch visits
        const visitsResponse = await fetch(`http://localhost:9090/api/v1/doctor/visits/${patientId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const visitsData = await visitsResponse.json();
        setVisits(visitsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleViewTestReport = () => {
    navigation.navigate('ViewImageScreen', { patientId: patientId });
  };

  const handleToggleVisit = (visitIndex) => {
    setSelectedVisit(selectedVisit === visitIndex ? null : visitIndex);
  };

  const renderVisitItems = (visitData) => {
    return (
      <View style={styles.visitContainer}>
        {visitData.map((item, itemIndex) => {
          switch (item.type) {
            case 'prescription':
              return (
                <Text key={itemIndex} style={styles.visitItem}>
                  Prescription: {item.data.pre_text}
                </Text>
              );
            case 'diagnosis':
              return (
                <Text key={itemIndex} style={styles.visitItem}>
                  Diagnosis: {item.data.dia_text}
                </Text>
              );
            case 'symptom':
              return (
                <Text key={itemIndex} style={styles.visitItem}>
                  Symptom: {item.data.sym_text}
                </Text>
              );
            default:
              return null;
          }
        })}
      </View>
    );
  };

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
        // Perform any necessary actions after successful discharge
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
              <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.middleLeftContainer}>
              <Text style={styles.sectionHeading}>Patient Details</Text>
              <Text style={styles.patientDetail}>Patient ID: {patientDetails?.id}</Text>
              <Text style={styles.patientDetail}>First Name: {patientDetails?.fname}</Text>
              <Text style={styles.patientDetail}>Last Name: {patientDetails?.lname}</Text>
              <Text style={styles.patientDetail}>Gender: {patientDetails?.gender}</Text>
              <Text style={styles.patientDetail}>Age: {patientDetails?.age}</Text>
              <Text style={[styles.patientDetail, { textAlign: 'left' }]}>Bed No.: {patientDetails?.bedId}</Text>

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
              <TouchableOpacity
          style={[styles.button, styles.viewReportButton]}
          onPress={handleViewTestReport}
        >
          <Text style={styles.buttonText}>View Test Report</Text>
        </TouchableOpacity>
            </View>
            <View style={styles.middleRightContainer}>
              {visits.map((visitData, index) => (
                <TouchableOpacity key={index} onPress={() => handleToggleVisit(index)}>
                  <Text style={styles.visitDate}>Visit {index + 1}</Text>
                  <Text style={styles.visitDate}>Date: {visitData[0].data.diagnosisDate}</Text>
                  {selectedVisit === index && renderVisitItems(visitData)}
                </TouchableOpacity>
              ))}
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
  visitContainer: {
    backgroundColor: '#2E5B8B',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  visitDate: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  visitItem: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  middleLeftContainer: {
    flex: 1,
    backgroundColor: 'rgba(223, 233, 235, 0.2)',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'left',
    alignItems: 'left',
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
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default AdmittedPatientDetailsScreen;
