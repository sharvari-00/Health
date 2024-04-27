package com.example.healthcare.service;

import com.example.healthcare.diagnosis.Diagnosis;
import com.example.healthcare.diagnosis.DiagnosisRepository;
import com.example.healthcare.doctor_details.Doctor_details;
import com.example.healthcare.doctor_details.Doctor_details_repo;
import com.example.healthcare.login.Login_repo;
import com.example.healthcare.patient_registration.Patient_registration_repo;
import com.example.healthcare.prescription.PrescriptionRepository;
import com.example.healthcare.symptoms.Symptoms;
import com.example.healthcare.prescription.Prescription;
import com.example.healthcare.symptoms.SymptomsRepository;

import com.example.healthcare.patient_registration.Patient_registration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.*;


@Service
public class Doctor_service<TreatmentDto> {
    @Autowired
    Patient_registration_repo patient_repo;
    @Autowired
    Doctor_details_repo doctor_details_repo;
    @Autowired
    Login_repo login_repo;
    @Autowired
    PrescriptionRepository prescriptionRepository;
    @Autowired
    SymptomsRepository symptomsRepository;
    @Autowired
    DiagnosisRepository diagnosisRepository;
    //Doctor details Update
    public Doctor_details updateDoctorDetailsByAdmin(String doctorEmail, Doctor_details updatedDoctorDetails) {
        // Find the doctor details by email
        Doctor_details existingDoctorDetails = doctor_details_repo.findByEmail(doctorEmail)
                .orElseThrow(() -> new RuntimeException("Doctor not found with email: " + doctorEmail));

        existingDoctorDetails.setFname(updatedDoctorDetails.getFname());
        existingDoctorDetails.setLname(updatedDoctorDetails.getLname());
        existingDoctorDetails.setShift_starts(updatedDoctorDetails.getShift_starts());
        existingDoctorDetails.setShift_ends(updatedDoctorDetails.getShift_ends());
        existingDoctorDetails.setDept_name(updatedDoctorDetails.getDept_name());

        return doctor_details_repo.save(existingDoctorDetails);
    }

    public List<Doctor_details> getAllDoctors() {
        return doctor_details_repo.findAll();
    }



    public List<Patient_registration> getPatientsByDoctorIdAndTodayDate(Integer doctorId) {

        LocalDate today = LocalDate.now();
        return patient_repo.findByDocIdAndRegistrationDate(String.valueOf(doctorId), today);

    }

    public Symptoms updateSymptoms(int patient_id, Symptoms symptoms) {

        symptoms.setPatient_id(patient_id);

        // Check if existing symptom has an ID (indicates existing record)
        if (symptoms.getId() != null) {
            // Retrieve the existing symptom from the database (optional)
            Symptoms existingSymptom = symptomsRepository.findById(symptoms.getId()).orElse(null);

            // Optionally copy the existing symptomDate if updating only specific fields
            if (existingSymptom != null && symptoms.getSymptomDate() == null) {
                symptoms.setSymptomDate(existingSymptom.getSymptomDate());
            }
        } else {
            // Set the current date and time for new symptoms
            symptoms.setSymptomDate(new java.util.Date());
        }

        // Save the updated symptom
        return symptomsRepository.save(symptoms);
    }
    public Prescription updatePrescription(int patient_id, Prescription prescription) {

        prescription.setPatientId(patient_id);

        // Check if existing prescription has an ID (indicates existing record)
        if (prescription.getId() != null) {
            // Retrieve the existing prescription from the database (optional)
            Prescription existingPrescription = prescriptionRepository.findById(prescription.getId()).orElse(null);

            // Optionally copy the existing prescriptionDate if updating only specific fields
            if (existingPrescription != null && prescription.getPrescriptionDate() == null) {
                prescription.setPrescriptionDate(existingPrescription.getPrescriptionDate());
            }
        } else {
            // Set the current date and time for new prescriptions
            prescription.setPrescriptionDate(new java.util.Date());
        }

        // Save the updated prescription
        return prescriptionRepository.save(prescription);
    }
    public Diagnosis updateDiagnosis(int patient_id, Diagnosis diagnosis) {

        diagnosis.setPatientId(patient_id);

        // Check if existing prescription has an ID (indicates existing record)
        if (diagnosis.getId() != null) {
            // Retrieve the existing prescription from the database (optional)
            Prescription existingPrescription = prescriptionRepository.findById(diagnosis.getId()).orElse(null);

            // Optionally copy the existing prescriptionDate if updating only specific fields
            if (existingPrescription != null && diagnosis.getDiagnosisDate() == null) {
                diagnosis.setDiagnosisDate(existingPrescription.getPrescriptionDate());
            }
        } else {
            // Set the current date and time for new prescriptions
            diagnosis.setDiagnosisDate(new java.util.Date());
        }

        // Save the updated prescription
        return diagnosisRepository.save(diagnosis);
    }

    public Optional<Object> getPatientById(Long patientId) {
        return patient_repo.findById(patientId);
    }
    public List<Symptoms> getSymptomsByPatientId(Integer patientId) {
        return symptomsRepository.findByPatientId(patientId);
    }
    public List<Prescription> getPrescriptionsByPatientId(Integer patientId) {
        return (List<Prescription>) prescriptionRepository.findByPatientId(patientId);
    }

    public List<Diagnosis> getDiagnosesByPatientId(Integer patientId) {
        return (List<Diagnosis>) diagnosisRepository.findByPatientId(patientId);
    }
}
