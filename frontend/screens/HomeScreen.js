import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const handleLogin = (role) => {
    navigation.navigate('Login', { role });
  };

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
          {/* Left Container */}
          <View style={styles.leftContainer}>
            <Image style={styles.logo} source={require('../assets/logo2.png')} />
          </View>
          {/* Right Container */}
          <View style={styles.rightContainer}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Login as:</Text>
            </View>
            {/* Role Buttons */}
            <TouchableOpacity style={styles.roleButton} onPress={() => handleLogin('frontdesk')}>
              <Text style={styles.buttonText}>FrontDesk</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roleButton} onPress={() => handleLogin('doctor')}>
              <Text style={styles.buttonText}>Doctor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roleButton} onPress={() => handleLogin('nurse')}>
              <Text style={styles.buttonText}>Nurse</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roleButton} onPress={() => handleLogin('pharmacist')}>
              <Text style={styles.buttonText}>Pharmacist</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').width, // Set container height to full window height
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  layer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },
  welcomeContainer: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 40,
    fontFamily: 'Cursive',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  buttonText: {
    fontSize: 29,
    fontFamily: 'Cursive',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  roleButton: {
    backgroundColor: '#61828a',
    padding: 20,
    marginVertical: 10,
    width: 400,
    alignItems: 'center',
    borderRadius: 10,
    height: 80,
  },
});

export default HomeScreen;

