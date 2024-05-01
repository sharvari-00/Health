import React, { createContext, useState, useContext } from 'react';

const EmergencyContext = createContext();

export const useEmergencyContext = () => useContext(EmergencyContext);

export const EmergencyProvider = ({ children }) => {
  const [emergency, setEmergency] = useState(null); // { patientId: null, bedId: null, message: null }

  const triggerEmergency = (patientId, bedId, message) => {
    setEmergency({ patientId, bedId, message });
  };

  const resolveEmergency = () => {
    setEmergency(null);
  };

  return (
    <EmergencyContext.Provider value={{ emergency, triggerEmergency, resolveEmergency }}>
      {children}
    </EmergencyContext.Provider>
  );
};