package com.example.healthcare.service;

import com.example.healthcare.patient_registration.Patient_registration;
import com.example.healthcare.patient_registration.Patient_registration_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Patient_service {
    @Autowired
    private final Patient_registration_repo patientRepo;

    public Patient_service(Patient_registration_repo patientRepo) {
        this.patientRepo = patientRepo;
    }
    public Patient_registration registerPatient(Patient_registration patient) {
        // Perform any additional validation or business logic here
        return patientRepo.save(patient);
    }

    public Patient_registration updatePatient(Long id, Patient_registration newPatientData) {
        Patient_registration existingPatient = patientRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));

        // Update patient details with new data
        existingPatient.setFname(newPatientData.getFname());
        existingPatient.setLname(newPatientData.getLname());
        existingPatient.setPhone_number(newPatientData.getPhone_number());
        existingPatient.setEmail_id(newPatientData.getEmail_id());
        existingPatient.setAddress_line(newPatientData.getAddress_line());
        existingPatient.setCity(newPatientData.getCity());
        existingPatient.setState(newPatientData.getState());
        existingPatient.setConsent(newPatientData.getConsent());

        return patientRepo.save(existingPatient);
    }
    public List<Patient_registration> getAllPatients() {
        return patientRepo.findAll();
    }
    public Optional<Patient_registration> getPatientById(Long id) {
        return patientRepo.findById(id);
    }

//    public static Patient_registration getPatientDetailsByFname(String fname) {
//        return patientRepo.getPatient_registrationByFname(fname);
//    }
}
