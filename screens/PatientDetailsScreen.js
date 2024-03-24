import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, TextInput, Button } from 'react-native';

const PatientDetailsScreen = ({ route }) => {
  const { patientId } = route.params; // Get the patient ID from the navigation params

  // Fetch patient details based on patientId (you might have an API call or local data)
  const patientDetails = {
    name: 'John Doe',
    age: 25,
    gender: 'Male',
    symptoms: 'Fever, Cough',
    diagnosis: 'Common Cold',
    prescription: 'Paracetamol, Rest',
    treatment: 'Stay hydrated, Take prescribed medications',
  };

  const [filePath, setFilePath] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState('Upload');

  const handleUpload = () => {
    if (!showInput) {
      setShowInput(true);
      setUploadButtonText('Cancel');
    } else {
      setShowInput(false);
      setUploadButtonText('Upload');
      setFilePath('');
    }
  };

  const handleSaveImage = () => {
    // Logic to save the image path to the patient database
    console.log('Image path saved:', filePath);
    setShowInput(false); // Hide input after saving
    setUploadButtonText('Upload');
    setFilePath('');
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require('../assets/Loginim.jpg')}
        style={styles.backgroundImage}
      >
        {/* Layer */}
        <View style={styles.layer}>
          {/* Upper Container */}
          <View style={styles.upperContainer}>
            <Text style={styles.headerText}> Patient Diagnosis</Text>
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
          {/* Middle Container */}
          <View style={styles.middleContainer}>
            {/* Left Middle Container */}
            <View style={styles.leftMiddleContainer}>
              <Text style={[styles.patientDetailText, { fontSize: 24, textAlign: 'center' }]}>Patient Details</Text>
              <Text></Text>
              <Text style={styles.patientDetailText}>Name: {patientDetails.name}</Text>
              <Text style={styles.patientDetailText}>Age: {patientDetails.age}</Text>
              <Text style={styles.patientDetailText}>Gender: {patientDetails.gender}</Text>
              <Text style={styles.patientDetailText}>Symptoms: {patientDetails.symptoms}</Text>
              <Text style={styles.patientDetailText}>Diagnosis: {patientDetails.diagnosis}</Text>
              <Text style={styles.patientDetailText}>Prescription: {patientDetails.prescription}</Text>
              <Text style={styles.patientDetailText}>Treatment: {patientDetails.treatment}</Text>
            </View>
            {/* Right Middle Container */}
            <View style={styles.rightMiddleContainer}>
              <Text style={styles.imageUploadText}>Test Report</Text>
              <TouchableOpacity style={[styles.uploadButton, showInput ? styles.cancelButton : null]} onPress={handleUpload}>
                <Text style={[styles.buttonText, showInput ? styles.cancelButtonText : null]}>{uploadButtonText}</Text>
              </TouchableOpacity>
              {showInput && (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter file path"
                    onChangeText={(text) => setFilePath(text)}
                    value={filePath}
                  />
                  <Button title="Save" onPress={handleSaveImage} color="#61828a" />
                </View>
              )}
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
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    flex: 4,
    flexDirection: 'row',
  },
  leftMiddleContainer: {
    flex: 1,
    backgroundColor: 'rgba(223, 233, 235, 0.2)', // Background color with opacity
    padding: 20,
  },
  rightMiddleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 3,
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
  patientDetailText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  imageUploadText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  uploadButton: {
    backgroundColor: '#61828a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom:40,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  cancelButtonText: {
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    marginBottom: 20,
    width:170,
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

export default PatientDetailsScreen;
