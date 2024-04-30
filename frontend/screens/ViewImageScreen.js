import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, FlatList, Modal, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TestReportsScreen = ({ route }) => {
  const { patientId } = route.params;

  const [accessToken, setAccessToken] = useState('');
  const [testReports, setTestReports] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchTestReports = async () => {
      try {
        // Fetch access token from AsyncStorage
        const token = await AsyncStorage.getItem('accessToken');
        setAccessToken(token);

        // Fetch test reports using patientId and access token
        const response = await fetch(`http://your-backend-url/api/test-reports/${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setTestReports(data);
      } catch (error) {
        console.error('Error fetching test reports:', error);
      }
    };

    fetchTestReports();
  }, [patientId]); // Fetch test reports whenever patientId changes

  const renderTestReportItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => setSelectedImage(item.image)}>
        <Image source={{ uri: `data:image/png;base64,${item.image}` }} style={styles.testReportImage} />
        <Text style={styles.testReportDate}>{item.date}</Text>
      </TouchableOpacity>
    );
  };

  const toggleFullScreen = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/wall.jpg')} style={styles.backgroundImage}>
        <View style={styles.layer}>
          <View style={styles.upperContainer}>
            <Text style={styles.heading}>Test Reports</Text>
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
          <View style={styles.reportsContainer}>
            <FlatList
              data={testReports}
              renderItem={renderTestReportItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.flatListContent}
            />
          </View>
          <View style={styles.lowerContainer}>
            <Image source={require('../assets/logo2.png')} style={styles.logo} />
          </View>
        </View>
      </ImageBackground>
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleFullScreen}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Image source={{ uri: `data:image/png;base64,${selectedImage}` }} style={styles.fullScreenImage} resizeMode="contain" />
        </View>
      </Modal>
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
    flex: 8,
  },
  heading: {
    fontSize: 24,
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
  reportsContainer: {
    flex: 2,
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  testReportImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  testReportDate: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  lowerContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  fullScreenImage: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height - 100,
  },
});

export default TestReportsScreen;