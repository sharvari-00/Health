import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; // Create this file for your role selection
import LoginScreen from './screens/LoginScreen'; // Create this file for your login form
import PatientIdScreen from './screens/PatientIdScreen';
import PatientDetailsScreen from './screens/PatientDetailsScreen';
import NurseScreen from './screens/NurseScreen';
import DoctorScreen from './screens/DoctorScreen';
import AppointmentsTodayScreen from './screens/AppointmentsTodayScreen';
import PatientFormScreen from './screens/PatientFormScreen';
import RoundsScreen from './screens/RoundsScreen';
import AdmittedPatientDetailsScreen from './screens/AdmittedPatientDetailsScreen';
import FrontDeskScreen from './screens/FrontDeskScreen';
import AddPatientScreen from './screens/AddPatientScreen';
import BookAppointmentScreen from './screens/BookAppointmentScreen';
import ViewEditPatientsScreen from './screens/ViewEditPatientsScreen';
import ViewEditPatientDetailsScreen from './screens/ViewEditPatientDetailsScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="PatientIdScreen" component={PatientIdScreen} />
        <Stack.Screen name="FrontDeskScreen" component={FrontDeskScreen} />
        <Stack.Screen name="PatientDetailsScreen" component={PatientDetailsScreen} />
        <Stack.Screen name="NurseScreen" component={NurseScreen} />
        <Stack.Screen name="DoctorScreen" component={DoctorScreen} />
        <Stack.Screen name="AppointmentsTodayScreen" component={AppointmentsTodayScreen} />
        <Stack.Screen name="PatientFormScreen" component={PatientFormScreen} />
        <Stack.Screen name="RoundsScreen" component={RoundsScreen} />
        <Stack.Screen name="AdmittedPatientDetailsScreen" component={AdmittedPatientDetailsScreen} />
        <Stack.Screen name="AddPatientScreen" component={AddPatientScreen} />
        <Stack.Screen name="BookAppointmentScreen" component={BookAppointmentScreen} />
        <Stack.Screen name="ViewEditPatientDetailsScreen" component={ViewEditPatientDetailsScreen} />
        <Stack.Screen name="ViewEditPatientScreen" component={ViewEditPatientsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
