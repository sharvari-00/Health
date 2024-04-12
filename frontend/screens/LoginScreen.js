import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = ({ route, navigation }) => {
  const { role } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      /* Commenting out authentication logic for now
      const response = await fetch('http://localhost:9090/api/v1/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email, "password": password }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
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
          navigation.navigate('DoctorScreen', { accessToken: access_token, refreshToken: refresh_token });
          break;
        case 'frontdesk':
          navigation.navigate('FrontDeskScreen', { });
          break;
        default:
          // Handle unrecognized roles
          break;
      }
      */

      // Navigate to the appropriate screen based on user's role without authentication
      switch (role) {
        case 'pharmacist':
          navigation.navigate('PatientIdScreen');
          break;
        case 'nurse':
          navigation.navigate('NurseScreen');
          break;
        case 'doctor':
          navigation.navigate('DoctorScreen');
          break;
        case 'frontdesk':
          navigation.navigate('FrontDeskScreen');
          break;
        default:
          // Handle unrecognized roles
          break;
      }
    } catch (error) {
      console.error('Login error:', error.message);
      // Handle login error
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
                <TextInput
                  style={styles.input}
                  placeholder="Enter Email"
                  onChangeText={(text) => setEmail(text)}
                  underlineColorAndroid="transparent"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter Password"
                  secureTextEntry
                  onChangeText={(text) => setPassword(text)}
                  underlineColorAndroid="transparent"
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContainer: {
    // Add styling for left container if needed
  },
  rightContainer: {
    // Add styling for right container if needed
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontFamily: 'Cursive',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  input: {
    height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    width: 200,
    borderRadius: 5,
    color: '#ABC3CD',
  },
  button: {
    backgroundColor: '#61828a',
    padding: 15,
    margin: 10,
    width: 200,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default LoginScreen;
