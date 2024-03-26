import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = ({ route, navigation }) => {
  const { role } = route.params;
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform authentication logic based on the selected role, loginId, and password
    console.log(`Role: ${role}, Login ID: ${loginId}, Password: ${password}`);

    // Example: Navigate to PatientIdScreen if role is "pharmacist"
    if (role === 'pharmacist') {
      console.log('Navigating to PatientIdScreen...');
      navigation.navigate('PatientIdScreen');
    } else if (role === 'nurse') {
      navigation.navigate('NurseScreen');
    } else if (role === 'doctor') {
      navigation.navigate('DoctorScreen');
    } else if (role === 'frontdesk') {
      navigation.navigate('FrontDeskScreen');
    }
    // Add more conditions for other roles or navigate to different screens

    // Add your authentication logic here or navigate to the next screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/Loginim.jpg')}
          resizeMode="cover"
        >
          <View style={styles.layer}>
            <View style={styles.leftContainer}>
              
            </View>
            <View style={styles.rightContainer}>
              <View style={styles.overlay}>
                <View style={styles.welcomeContainer}>
                  <Image style={styles.logo} source={require('../assets/logo2.png')} />
                  <Text style={styles.welcomeText}>Welcome {role}</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Login ID"
                  onChangeText={(text) => setLoginId(text)}
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
    //backgroundColor: '#A9CCCF',
    flex: 2, // 40% of the height
    width: '50%',
    justifyContent: 'flex-end', // Align content to the bottom
    alignItems: 'center', // Align content horizontally
  },
  rightContainer: {
    flex: 8, // 60% of the height
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  logo: {
    width: 220, // Adjust the width to make it a bit bigger
    height: 220, // Adjust the height to maintain aspect ratio
    marginBottom: 10, // Increase the margin bottom to separate from the welcome text
    resizeMode: 'contain',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 20, // Increase the margin top to separate from the logo
    marginBottom: 20, // Increase the margin bottom for spacing
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
