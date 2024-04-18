package com.example.healthcare.service;

import com.example.healthcare.DTO.PatientsDTO;
import com.example.healthcare.diagnosis.Diagnosis;
import com.example.healthcare.diagnosis.DiagnosisRepository;
import com.example.healthcare.doctor_details.Doctor_details;
import com.example.healthcare.doctor_details.Doctor_details_repo;
import com.example.healthcare.login.Login;
import com.example.healthcare.login.Login_repo;
import com.example.healthcare.patient_registration.Patient_registration_repo;
import com.example.healthcare.prescription.PrescriptionRepository;
import com.example.healthcare.symptoms.Symptoms;
import com.example.healthcare.prescription.Prescription;
import com.example.healthcare.symptoms.SymptomsRepository;

import com.example.healthcare.patient_registration.Patient_registration;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

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

    public List getPatientsByLoggedInDoctor(String loggedInDoctorEmail) {
        Optional<
                Login> loggedInDoctor = login_repo.findByEmail(loggedInDoctorEmail);
        if (loggedInDoctor.isPresent()) {
            String docId = String.valueOf(loggedInDoctor.get().getDoctorId()) ;
            List<PatientsDTO> patientsDTOList = new ArrayList<>();
            List<Patient_registration> patients = patient_repo.findByDocId(String.valueOf(docId));
            for (Patient_registration patient : patients) {
                PatientsDTO patientsDTO = new PatientsDTO();
                patientsDTO.setPatientId(Long.valueOf(patient.getId()));
                patientsDTO.setName(patient.getFname() + " " + patient.getLname());
                patientsDTO.setAge(patient.getAge());
                patientsDTO.setGender(patient.getGender());
                patientsDTOList.add(patientsDTO);
            }
            return patientsDTOList;
        } else {
            throw new RuntimeException("Doctor not found with email: " + loggedInDoctorEmail);
        }
    }
    public Symptoms updateSymptoms(int patient_id, Symptoms symptoms) {
        symptoms.setPatient_id(patient_id); // Set patient ID in case it's not provided in the request body
//        Symptoms existingSymptoms = symptomsRepository.findByPatientId(patient_id);
//        if (existingSymptoms != null) {
//            symptoms.setId(existingSymptoms.getId()); // Update existing record if found
//        }
        return symptomsRepository.save(symptoms);
    }
    public Prescription updatePrescription(int patient_id, Prescription prescription) {

        prescription.setPatientId(patient_id); // Set patient ID in case it's not provided in the request body
//        Prescription existingPrescription = prescriptionRepository.findByPatientId(patient_id);
//        if (existingPrescription != null) {
//            prescription.setId(existingPrescription.getId()); // Update existing record if found
//        }
        return prescriptionRepository.save(prescription);
    }
    public Diagnosis updateDiagnosis(int patient_id, Diagnosis diagnosis) {

        diagnosis.setPatientId(patient_id); // Set patient ID in case it's not provided in the request body
//        Diagnosis existingDiagnosis = diagnosisRepository.findByPatientId(patient_id);
//        if (existingDiagnosis != null) {
//            diagnosis.setId(existingDiagnosis.getId()); // Update existing record if found
//        }
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
