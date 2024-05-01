import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput as PaperTextInput } from 'react-native-paper'; // Import Paper TextInput
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = ({ route, navigation }) => {
  const { role } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleLogin = async () => {
    try {
      const normalizedRole = role.toUpperCase() === 'FRONTDESK' ? 'ADMIN' : role.toUpperCase();
      const response = await fetch('http://localhost:9090/api/v1/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email, "password": password ,"role":normalizedRole}),
      });

      if (!response.ok) {
      const errorResponse = await response.json();
      if (response.status === 400) {
        throw new Error("Nurse cannot login outside shift hours");
      } else {
        throw new Error("Invalid Credentials");
      }
    }

      const { access_token, refresh_token } = await response.json();

      // Store the access token securely (e.g., using AsyncStorage)
       await AsyncStorage.setItem('accessToken', access_token);
       await AsyncStorage.setItem('refreshToken', refresh_token);


      // Navigate to the appropriate screen based on user's role
      switch (role) {
        case 'pharmacist':
          navigation.navigate('PatientIdScreen', { accessToken: access_token, refreshToken: refresh_token });
          break;
        case 'nurse':
          navigation.navigate('NurseScreen', { accessToken: access_token, refreshToken: refresh_token });
          break;
          case 'doctor':
            navigation.navigate('DoctorScreen', { 
              accessToken: access_token, 
              refreshToken: refresh_token, 
              email: email // Pass email as a parameter
            });
            break;

        case 'frontdesk':
          navigation.navigate('FrontDeskScreen', { });
          break;
        default:
          // Handle unrecognized roles
          break;
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error.message === "Nurse cannot login outside shift hours" ? error.message : "Invalid Credentials";
      console.error('Error Message:', errorMessage);
      setErrorMessage("Please check your credentials or login in your shift timings"); // Set the error message state
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/wall.jpg')}
          resizeMode="cover"
        >
          <View style={styles.layer}>
            <View style={styles.leftContainer}>

            </View>
            <View style={styles.rightContainer}>
              <View style={styles.overlay}>
                <View style={styles.welcomeContainer}>
                  <Image style={styles.logo} source={require('../assets/logo2.png')} />
                  <Text style={styles.welcomeText}>Login</Text>
                </View>
                <PaperTextInput
                  style={styles.input}
                  label="Enter Email"
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  underlineColor="white"
                  theme={{ colors: { primary: 'white', underlineColor: 'transparent' } }}
                />
                <View style={styles.passwordInput}>
                  <View style={styles.passwordInputInner}>
                    <PaperTextInput
                      style={styles.passwordInputField}
                      label="Enter Password"
                      placeholder="Password"
                      value={password}
                      secureTextEntry={!showPassword}
                      onChangeText={(text) => setPassword(text)}
                      underlineColor="white"
                      theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                      <Image source={require('../assets/eyeicon.jpeg')} style={styles.eyeIconImage} />
                    </TouchableOpacity>
                  </View>
              </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={errorMessage ? styles.errorMessageContainer : null}>
                  {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
                </View>

              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    backgroundColor: '#DFE9EB',
    width: windowWidth,
    height: windowHeight,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layer: {
    backgroundColor: 'rgba(26, 95, 116, 0.13)',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContainer: {
    // Add styling for left container if needed
    flex: 1,
  },
  rightContainer: {
    // Add styling for right container if needed
    flex: 9,
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  logo: {
    width: 420,
    height: 420,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 60,
    fontFamily: 'Cursive',
    fontWeight: 'bold',
    color: '#004849',
  },
  input: {
    height: 80,
    marginVertical: 10,
    width: '100%', // Set the width to 100% for the login input box
    borderRadius: 5,
    color: 'white',
    fontSize: 30,
  },
  button: {
    backgroundColor: '#326974',
    padding: 15,
    margin: 10,
    width: 400,
    alignItems: 'center',
    borderRadius: 10,
    height: 80,
  },
  buttonText: {
    fontSize: 29,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  passwordInput: {
    width: '100%',
    marginBottom: 20, // Add margin-bottom for separation
  },
  passwordInputInner: {
    flexDirection: 'row', // Make the container row-based
    alignItems: 'center', // Align items vertically
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden',
  },
  passwordInputField: {
    flex: 1,
    height: 80,
    fontSize: 30,
    color: 'white',
    paddingHorizontal: 10, // Add padding to the input field
  },
  eyeIcon: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 5, // Add border radius to the eye icon container
  },
  eyeIconImage: {
    width:  50,
    height: 50,
  },
  errorMessageContainer: {
    width: '100%', // Set width to 100%
    alignItems: 'center', // Center the error message horizontally
    marginTop: 10, // Add margin-top for separation
    height: 50, // Set a fixed height for error message container
  },
  errorMessage: {
    fontSize: 25,
    color: 'red',
    textAlign: 'center', // Center the error message text
    maxWidth: 400, // Set a maximum width for the error message
  },
});


export default LoginScreen;

