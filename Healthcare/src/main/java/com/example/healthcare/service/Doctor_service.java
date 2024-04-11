package com.example.healthcare.service;

import com.example.healthcare.controller.RegistrationRequest;
import com.example.healthcare.doctor_details.Doctor_details;
import com.example.healthcare.doctor_details.Doctor_details_repo;
import com.example.healthcare.login.Login;
import com.example.healthcare.login.Login_repo;
import com.example.healthcare.symptoms.Symptoms;
import com.example.healthcare.prescription.Prescription;
import com.example.healthcare.treatment.Treament;
import com.example.healthcare.patient_registration.Patient_registration;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;

@Service
public class Doctor_service<TreatmentDto> {
    @Autowired
    Doctor_details_repo doctor_details_repo;
    @Autowired
    Login_repo login_repo;

    public Doctor_details registerDoctor(RegistrationRequest request) {
        Doctor_details doctorDetails = request.getDoctorDetails();

        // Check if the Doctor_details object is null
        if (doctorDetails == null) {
            throw new IllegalArgumentException("Doctor_details object is null");
        }
        Doctor_details savedDoctorDetails = doctor_details_repo.save(request.getDoctorDetails());
        Login login = request.getLogin();
        if (login == null) {
            throw new IllegalArgumentException("Login object is null");
        }

        login.setDoctor_details(savedDoctorDetails);
        login_repo.save(login);
        return savedDoctorDetails;
    }

//    public void addSymptoms(AddSymptomsRequest request) {
//        SimpleJpaRepository<Integer,> symptoms;
//        Optional<patient_id> optionalPatient = symptoms.findById(request.getPatientId());
//
//        // Check if the patient exists
//        if (optionalPatient.isPresent()) {
//            Patient patient = optionalPatient.get();
//
//            // Update the patient's symptoms
//            patient.setSymptoms(request.getSymptoms());
//
//            // Save the updated patient to the database
//            symptoms.save(patient);
//        } else {
//            // Handle case when patient does not exist
//            throw new RuntimeException("Patient not found with ID: " + request.getPatientId());
//        }
//    }

//    public void addTreatment(AddTreatmentRequest request) {
//
//    }
//
//    public void addPrescription(AddPrescriptionRequest request) {
//
//    }
//
//
//    @Setter
//    @Getter
//    public static class AddSymptomsRequest {
//        private Long patientId;
//        private String symptoms;
//
//    }
//
//
//    public class AddTreatmentRequest {
//        private Long patientId;
//        private String treatmentDetails;
//
//        public Long getPatientId() {
//            return patientId;
//        }
//
//        public void setPatientId(Long patientId) {
//            this.patientId = patientId;
//        }
//
//        public String getTreatmentDetails() {
//            return treatmentDetails;
//        }
//
//        public void setTreatmentDetails(String treatmentDetails) {
//            this.treatmentDetails = treatmentDetails;
//        }
//    }
//    public class AddPrescriptionRequest {
//        private Long patientId;
//        private String prescriptionDetails;
//
//        public Long getPatientId() {
//            return patientId;
//        }
//
//        public void setPatientId(Long patientId) {
//            this.patientId = patientId;
//        }
//
//        public String getPrescriptionDetails() {
//            return prescriptionDetails;
//        }
//
//        public void setPrescriptionDetails(String prescriptionDetails) {
//            this.prescriptionDetails = prescriptionDetails;
//        }
//    }
}
