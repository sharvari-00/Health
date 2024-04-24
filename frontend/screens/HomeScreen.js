import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';
import { Button, Avatar } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const [pressed, setPressed] = useState(false);
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
            <Button
              icon={({ size, color }) => (
                <Avatar.Image size={size} source={require('../assets/logo2.png')} style={{ backgroundColor: '#61828a' }} />
              )}
              mode="contained"
              onPress={() => handleLogin('frontdesk')}
              style={[styles.roleButton, pressed && { backgroundColor: '#3C8C9D' }]}
              labelStyle={styles.buttonText}
              onPressIn={() => setPressed(true)}
              onPressOut={() => setPressed(false)}
            >
              FrontDesk
            </Button>
            <Button
              icon={({ size, color }) => (
                <Avatar.Image size={size} source={require('../assets/logo2.png')} style={{ backgroundColor: '#61828a' }} />
              )}
              mode="contained"
              onPress={() => handleLogin('doctor')}
              style={[styles.roleButton, pressed && { backgroundColor: '#3C8C9D' }]}
              labelStyle={styles.buttonText}
              onPressIn={() => setPressed(true)}
              onPressOut={() => setPressed(false)}
            >
              Doctor
            </Button>
            <Button
              icon={({ size, color }) => (
                <Avatar.Image size={size} source={require('../assets/logo2.png')} style={{ backgroundColor: '#61828a' }} />
              )}
              mode="contained"
              onPress={() => handleLogin('nurse')}
              style={[styles.roleButton, pressed && { backgroundColor: '#3C8C9D' }]}
              labelStyle={styles.buttonText}
              onPressIn={() => setPressed(true)}
              onPressOut={() => setPressed(false)}
            >
              Nurse
            </Button>
            <Button
              icon={({ size, color }) => (
                <Avatar.Image size={size} source={require('../assets/logo2.png')} style={{ backgroundColor: '#61828a' }} />
              )}
              mode="contained"
              onPress={() => handleLogin('pharmacist')}
              style={[styles.roleButton, pressed && { backgroundColor: '#3C8C9D' }]}
              labelStyle={styles.buttonText}
              onPressIn={() => setPressed(true)}
              onPressOut={() => setPressed(false)}
            >
              Pharmacist
            </Button>
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
    backgroundColor: 'rgba(0, 150, 136, 0.1)',
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
    color: '#F2C6975',
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
    backgroundColor: '#2C6975',
  },
});

export default HomeScreen;

