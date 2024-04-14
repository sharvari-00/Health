package com.example.healthcare.service;

import com.example.healthcare.doctor_details.Doctor_details;
import com.example.healthcare.doctor_details.Doctor_details_repo;
import com.example.healthcare.login.Login_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

import java.util.Optional;


@Service
public class Doctor_service<TreatmentDto> {
    @Autowired
    Doctor_details_repo doctor_details_repo;
    @Autowired
    Login_repo login_repo;

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

//    public Optional<Doctor_details> getDoctorDetailsByEmail(String email) {
//    return doctor_details_repo.findByEmail(email);
//    }
//

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



    public List<Doctor_details> getAllDoctors() {
        return doctor_details_repo.findAll();
    }

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
