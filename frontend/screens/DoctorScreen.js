import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
const DoctorScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const { accessToken } = route.params;
  const [doctorDetails, setDoctorDetails] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch('http://localhost:9090/api/v1/user/details', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch doctor details');
        }

        const data = await response.json();
        setDoctorDetails(data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
        // Handle error
      }
    };

    fetchDoctorDetails();
  }, [accessToken]);

  // Doctor's data
  const doctorId = doctorDetails ? doctorDetails.id : 'Loading...';
  const doctorName = doctorDetails ? `Dr. ${doctorDetails.fname} ${doctorDetails.lname}` : 'Loading...';
  const doctorDepartment = doctorDetails ? doctorDetails.dept_name : 'Loading...';
  const greetingMessage = "Hope you have a great day today!";

  const handleAppointmentsToday = () => {
    navigation.navigate('AppointmentsTodayScreen', { doctor: doctorDetails });
  };
  
  const handleRoundsForAdmittedPatients = () => {
    // Implement the logic for Rounds for Admitted Patients
    navigation.navigate('RoundsScreen');
  };

  // Get the current system date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/wall.jpg')} // Adjust the image path accordingly
        resizeMode="cover"
      >
        {/* Layer */}
        <View style={styles.layer}>
          {/* Upper Container */}
          <View style={styles.upperContainer}>
            <Text style={styles.headerText}>Doctor's Dashboard</Text>
            <View style={styles.divider} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Logout')}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Middle Container */}
          <View style={styles.middleContainer}>
            {/* Left Container */}
            <View style={styles.middleLeftContainer}>
              <Text style={styles.dateText}>{currentDate}</Text>
              
              <Text style={styles.greetingText}>Hello, {doctorName}</Text>
              <Text style={styles.departmentText}>{doctorDepartment}</Text>
              <Text style={styles.infoText}>ID: {doctorId}</Text>
              <Text style={styles.infoText}>{greetingMessage}</Text>
            </View>
            {/* Right Container */}
            <View style={styles.middleRightContainer}>
              <TouchableOpacity style={styles.button} onPress={handleAppointmentsToday}>
                <Text style={styles.buttonText}>Appointments for Today</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleRoundsForAdmittedPatients}>
                <Text style={styles.buttonText}>On Round Consultation</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Lower Container */}
          <View style={styles.lowerContainer}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require('../assets/logo2.png')} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const lightBorderColor = '#564335'; // Light brown color for borders

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  layer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent layer
  },
  upperContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleContainer: {
    flex: 4,
    flexDirection: 'row',
  },
  middleLeftContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(223, 233, 235, 0.2)',
    justifyContent: 'center',
  },
  middleRightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowerContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  divider: {
    width: '80%',
    height: 2,
    backgroundColor: '#FFFFFF',
    marginVertical: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginLeft: 20,
  },
  greetingText: {
    paddingTop: 80, 
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  departmentText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  infoText: {
    paddingTop: 40,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
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
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#61828a', // Button background color
    padding: 15,
    margin: 10,
    width: 300,
    alignItems: 'center',
    borderRadius: 10,
  },
  logoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default DoctorScreen;
