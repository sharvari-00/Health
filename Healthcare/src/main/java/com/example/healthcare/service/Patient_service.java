package com.example.healthcare.service;

import com.example.healthcare.dto.PatientDetailsDTO;
import com.example.healthcare.dto.patientInfoDTO;
import com.example.healthcare.patient_registration.Patient_registration;
import com.example.healthcare.patient_registration.Patient_registration_repo;
import com.example.healthcare.prescription.Prescription;
import com.example.healthcare.prescription.PrescriptionRepository;
import com.example.healthcare.symptoms.Symptoms;
import com.example.healthcare.symptoms.SymptomsRepository;
//import com.example.healthcare.treatment.TreatmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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



//    public Treament updateTreatment(int patient_id, Treament treatment) {
//        treatment.setPatientId(patient_id); // Set patient ID in case it's not provided in the request body
//        Treament existingTreatment = treatmentRepository.findByPatientId(patient_id);
//        if (existingTreatment != null) {
//            treatment.setId(existingTreatment.getId()); // Update existing record if found
//        }
//        return treatmentRepository.save(treatment);
//    }




    public List findByDocId(String docId) {
        return patientRepo.findByDocId(docId);
    }

    public List<Patient_registration> getAdmittedPatients() {
        return patientRepo.findAdmittedPatients();
    }

    public List<patientInfoDTO> getPatientsWithBedId() {
        List<Patient_registration> patients = patientRepo.findByBedIdNotNull();
        return patients.stream()
                .map(patient -> new patientInfoDTO(patient.getId(), patient.getBedId()))
                .collect(Collectors.toList());
    }
    //nurses and doctors see this on clicking on round patient

    //after that the below api is used to fetch the entire patient details.
    public PatientDetailsDTO getPatientDetailsById(int patientId) {
        Patient_registration patientRegistration = patientRepo.findById((long) patientId).orElse(null);
        if (patientRegistration == null) {
            return null; // or throw exception
        }

        List<Symptoms> symptoms = Collections.singletonList(symptomsRepository.findByPatientId(patientId));
        List<Prescription> prescriptions = Collections.singletonList(prescriptionRepository.findByPatientId(patientId));

        return new PatientDetailsDTO(patientRegistration, symptoms, prescriptions);
    }

//    public static Patient_registration getPatientDetailsByFname(String fname) {
//        return patientRepo.getPatient_registrationByFname(fname);
//    }
}
