package com.example.healthcare.service;

import com.example.healthcare.patient_registration.Patient_registration;
import com.example.healthcare.patient_registration.Patient_registration_repo;
import com.example.healthcare.prescription.Prescription;
import com.example.healthcare.prescription.PrescriptionRepository;
import com.example.healthcare.symptoms.Symptoms;
import com.example.healthcare.symptoms.SymptomsRepository;
//import com.example.healthcare.treatment.TreatmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Patient_service {
    @Autowired
    private final Patient_registration_repo patientRepo;
    private final SymptomsRepository symptomsRepository;
    //private final TreatmentRepository treatmentRepository;
    private final PrescriptionRepository prescriptionRepository;
    public Patient_service(Patient_registration_repo patientRepo, SymptomsRepository symptomsRepository, PrescriptionRepository prescriptionRepository) {
        this.patientRepo = patientRepo;
        this.symptomsRepository = symptomsRepository;
        //this.treatmentRepository = treatmentRepository;
        this.prescriptionRepository = prescriptionRepository;
    }
    public Patient_registration registerPatient(Patient_registration patient) {
        // Perform any additional validation or business logic here
        return (Patient_registration) patientRepo.save(patient);
    }

    public Patient_registration updatePatient(Long id, Patient_registration newPatientData) throws Throwable {
        Patient_registration existingPatient = (Patient_registration) patientRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));

        // Update patient details with new data
        existingPatient.setFname(newPatientData.getFname());
        existingPatient.setLname(newPatientData.getLname());
        existingPatient.setPhone_number(newPatientData.getPhone_number());
        existingPatient.setEmail_id(newPatientData.getEmail_id());
        existingPatient.setAddress_line(newPatientData.getAddress_line());
        existingPatient.setCity(newPatientData.getCity());
        existingPatient.setState(newPatientData.getState());

        return (Patient_registration) patientRepo.save(existingPatient);
    }
    public List<Patient_registration> getAllPatients() {
        return patientRepo.findAll();
    }

    public Patient_registration getPatientById(Long id) {
        return (Patient_registration) patientRepo.findById(id).orElse(null);
    }
    public Symptoms updateSymptoms(int patient_id, Symptoms symptoms) {
        symptoms.setPatient_id(patient_id); // Set patient ID in case it's not provided in the request body
        Symptoms existingSymptoms = symptomsRepository.findByPatientId(patient_id);
        if (existingSymptoms != null) {
            symptoms.setId(existingSymptoms.getId()); // Update existing record if found
        }
        return symptomsRepository.save(symptoms);
    }

//    public Treament updateTreatment(int patient_id, Treament treatment) {
//        treatment.setPatientId(patient_id); // Set patient ID in case it's not provided in the request body
//        Treament existingTreatment = treatmentRepository.findByPatientId(patient_id);
//        if (existingTreatment != null) {
//            treatment.setId(existingTreatment.getId()); // Update existing record if found
//        }
//        return treatmentRepository.save(treatment);
//    }

    public Prescription updatePrescription(int patient_id, Prescription prescription) {
        prescription.setPatientId(patient_id); // Set patient ID in case it's not provided in the request body
        Prescription existingPrescription = prescriptionRepository.findByPatientId(patient_id);
        if (existingPrescription != null) {
            prescription.setId(existingPrescription.getId()); // Update existing record if found
        }
        return prescriptionRepository.save(prescription);
    }


    public List findByDocId(String docId) {
        return patientRepo.findByDocId(docId);
    }

//    public static Patient_registration getPatientDetailsByFname(String fname) {
//        return patientRepo.getPatient_registrationByFname(fname);
//    }
}
