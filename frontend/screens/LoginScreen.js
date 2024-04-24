// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// const LoginScreen = ({ route, navigation }) => {
//   const { role } = route.params;
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('http://localhost:9090/api/v1/auth/authenticate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }), // Use email and password variables
//       });

//       if (!response.ok) {
//         throw new Error('Authentication failed');
//       }

//       const { access_token } = await response.json(); // Access the access_token variable from the response

//       // Store the access token securely in frontend (e.g., using AsyncStorage)
//       AsyncStorage.setItem('accessToken', access_token);
//       console.log('Access token stored:', token);

//       // Navigate to the appropriate screen based on user's role
//       switch (role) {
//         case 'pharmacist':
//           navigation.navigate('PatientIdScreen');
//           break;
//         case 'nurse':
//           navigation.navigate('NurseScreen');
//           break;
//         case 'doctor':
//           navigation.navigate('DoctorScreen');
//           break;
//         case 'frontdesk':
//           navigation.navigate('FrontDeskScreen');
//           break;
//         default:
//           // Handle unrecognized roles
//           break;
//       }
//     } catch (error) {
//       console.error('Login error:', error.message);
//       // Handle login error
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.background}>
//         <ImageBackground
//           style={styles.backgroundImage}
//           source={require('../assets/Loginim.jpg')}
//           resizeMode="cover"
//         >
//           <View style={styles.layer}>
//             <View style={styles.leftContainer}>
              
//             </View>
//             <View style={styles.rightContainer}>
//               <View style={styles.overlay}>
//                 <View style={styles.welcomeContainer}>
//                   <Image style={styles.logo} source={require('../assets/logo2.png')} />
//                   <Text style={styles.welcomeText}>Login</Text>
//                 </View>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter Email"
//                   onChangeText={(text) => setEmail(text)} // Use setEmail to update the email state
//                   underlineColorAndroid="transparent"
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter Password"
//                   secureTextEntry
//                   onChangeText={(text) => setPassword(text)} // Use setPassword to update the password state
//                   underlineColorAndroid="transparent"
//                 />
//                 <TouchableOpacity style={styles.button} onPress={handleLogin}>
//                   <Text style={styles.buttonText}>Login</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </ImageBackground>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   background: {
//     backgroundColor: '#DFE9EB',
//     width: windowWidth,
//     height: windowHeight,
//   },
//   backgroundImage: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   layer: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     flex: 1,
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   leftContainer: {
//     // Add styling for left container if needed
//   },
//   rightContainer: {
//     // Add styling for right container if needed
//   },
//   overlay: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: 50,
//   },
//   logo: {
//     width: 220,
//     height: 220,
//     marginBottom: 10,
//     resizeMode: 'contain',
//   },
//   welcomeContainer: {
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   welcomeText: {
//     fontSize: 30,
//     fontFamily: 'Cursive',
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },
//   input: {
//     height: 40,
//     borderColor: '#FFFFFF',
//     borderWidth: 1,
//     marginVertical: 10,
//     padding: 10,
//     width: 200,
//     borderRadius: 5,
//     color: '#ABC3CD',
//   },
//   button: {
//     backgroundColor: '#61828a',
//     padding: 15,
//     margin: 10,
//     width: 200,
//     alignItems: 'center',
//     borderRadius: 10,
//   },
//   buttonText: {
//     fontSize: 18,
//     fontFamily: 'Arial',
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },
// });

// export default LoginScreen;
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

  const handleLogin = async () => {
    try {
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
          navigation.navigate('DoctorScreen', {
            accessToken: access_token,
            refreshToken: refresh_token,
            email: email // Pass email as a parameter
          });
          break;

        case 'frontdesk':
          navigation.navigate('FrontDeskScreen', {});
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
                <PaperTextInput
                  style={styles.input}
                  label="Enter Email"
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  underlineColor="white"
                  theme={{ colors: { primary: 'white', underlineColor: 'transparent' } }}
                />
                <PaperTextInput
                  style={styles.input}
                  label="Enter Password"
                  placeholder="Password"
                  value={password}
                  secureTextEntry={!showPassword}
                  right={<PaperTextInput.Icon name={showPassword ? 'eye-off' : 'eye'} color="black" onPress={() => setShowPassword(!showPassword)} />}
                  onChangeText={(text) => setPassword(text)}
                  underlineColor="white"
                  theme={{ colors: { primary: 'white', underlineColor: 'transparent' } }}
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
    backgroundColor: 'rgba(0, 150, 136, 0.1)',
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
    color: '#FFFFFF',
  },
  input: {
    height: 80,
    marginVertical: 10,
    width: 400,
    borderRadius: 5,
    color: 'white',
    fontSize: 30,
  },
  button: {
    backgroundColor: '#61828a',
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
});

export default LoginScreen;


