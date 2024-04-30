import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


// Existing imports

const AppointmentsTodayScreen = ({ route }) => {
  const navigation = useNavigation(); 
  const { doctorId } = route.params; 
  

  
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [disabledItems, setDisabledItems] = useState([]);
  

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        setAccessToken(token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9090/api/v1/doctor/doctors/${doctorId}/patients`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch appointments data');
        }
        const data = await response.json();
        setAppointmentsData(data);
      } catch (error) {
        console.error('Error fetching appointments data:', error);
      }
    };
  
    if (doctorId && accessToken) {
      fetchData();
    }
  }, [doctorId, accessToken]);

  const handlePatientClick = (patientId, name, age, gender,index) => {
    //navigation.navigate('PatientFormScreen', { patientId,name,age,gender});
    setDisabledItems(prevDisabledItems => [...prevDisabledItems, index]);
  }

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
              <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.middleLeftContainer}>
              {/* <Text style={styles.heading}></Text> */}
            </View>
            <ScrollView style={styles.middleRightContainer}>
              <FlatList
                data={appointmentsData}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                  style={[
                    styles.patientItem,
                    { 
                      backgroundColor: disabledItems.includes(index) ? 'rgba(255, 255, 242, 0.45)' : 'transparent',
                      opacity: disabledItems.includes(index) ? 0.5 : 1
                    }
                  ]}
                  onPress={() => handlePatientClick(item.id, `${item.fname} ${item.lname}`, item.age, item.gender, index)}
                  disabled={disabledItems.includes(index)}
                  >
                    <Text style={styles.serialNumber}>{index + 1}</Text>
                    <View style={styles.patientDetails}>
                      {/* <Text style={styles.detailLabel}>Patient Id:</Text>
                      <Text style={styles.detailText}>{item.patientId}</Text> */}
                    </View>
                    <View style={styles.patientDetails}>
                      <Text style={styles.detailLabel}>Name:</Text>
                      <Text style={styles.detailText}>{item.fname} {item.lname}</Text>
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
            </ScrollView>
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
    fontSize: 50,
    fontWeight: 'bold',
    color: '#004849',
    marginBottom: 10,
    fontFamily: 'Cursive',
  },
  dateText: {
    fontSize: 20,
    color: '#004849',
    marginBottom: 18,
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
    fontSize: 29,
    fontWeight: 'bold',
    color: '#326974',
  },
  middleLeftContainer: {
    flex: 0,
    backgroundColor: 'rgba(200, 200, 200, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleRightContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  heading: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#004849',
    marginBottom: 10,
  },
  patientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    //height: 200,
  },
  serialNumber: {
    marginRight: 10,
    fontWeight: 'bold',
    color: '#004849',
    fontSize: 25,
  },
  patientDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    fontSize: 25,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 25,
  },
  detailText: {
    marginLeft: 5,
    color: '#000000',
    fontSize: 25,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    //marginBottom: 20,
  },
});

export default AppointmentsTodayScreen;