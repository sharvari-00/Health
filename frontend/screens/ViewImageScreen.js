import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, FlatList, Modal, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TestReportsScreen = ({ route }) => {
  const { patientId } = route.params;

  const [accessToken, setAccessToken] = useState('');
  const [testReports, setTestReports] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fetchedImages, setFetchedImages] = useState([]);
  const [image, setImage] = useState(null);
  useEffect(() => {
    console.log('image state updated:', image);
  }, [image]); // Log 'image' whenever it changes


  const fetchPatientImages = async (patientId) => {
    try {
      const apiUrl = `http://localhost:9090/api/v1/nurse/patientImages/${patientId}`;
      const response = await fetch(apiUrl);
      if (response.ok) {
        const images = await response.json();
        console.log('Patient images:', images);
        setFetchedImages(images);
        //console.log('Fetched images:', images[0].images);
      } else {
        console.error('Failed to retrieve patient images:', response.statusText);
        // Handle error response
      }
    } catch (error) {
      console.error('Error retrieving patient images:', error);
      // Handle fetch error
    }
  };
  useEffect(() => {
    fetchPatientImages(patientId);
  }, []); 
 
  const renderTestReportItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => setSelectedImage(item.image)}>
        <Image source={{ uri: `data:image/png;base64,${item.images}` }} style={styles.testReportImage} />
        <Text style={styles.testReportDate}>{item.date}</Text>
      </TouchableOpacity>
    );
  };

  const toggleFullScreen = () => {
    setModalVisible(!modalVisible);
  };
  const handleImageClick = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
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
          <Text style={styles.headerText}>Patient Reports:</Text>
          <View style={styles.reportsContainer}>
          
  
  <View style={styles.fetchedImagesContainer}>
  <View style={styles.imageGrid}>
  {fetchedImages.map((image, index) => (
    <TouchableOpacity key={index} onPress={() => handleImageClick(image.images)}>
    <Image key={index} source={{ uri: 'data:image/jpeg;base64,' + image.images }} style={styles.fetchedImage} />
    </TouchableOpacity>
  ))}
  </View>
</View>
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
    backgroundColor: 'rgba(26, 95, 116, 0.13)',
    padding: 20,
  },
  upperContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#004849',

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
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  reportsContainer: {
    flex: 4,
    backgroundColor: 'rgba(255, 255, 242, 0.45)',
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  testReportImage: {
    width: 500,
    height: 500,
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
    fontSize: 29,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  fullScreenImage: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height - 100,
  },
  fetchedImagesContainer: {
    marginTop: 20,
    
  },
  fetchedImage: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    marginBottom: 10,
    borderRadius: 10, // Optional: Add border radius for rounded corners
    marginLeft: 10,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 10, // Add margin bottom to create space between rows
  },
  headerText:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#004849',
    marginBottom: 10,
  }
});

export default TestReportsScreen;