package com.example.healthcare.controller;

import com.example.healthcare.diagnosis.Diagnosis;
import com.example.healthcare.doctor_details.Doctor_details;
import com.example.healthcare.patient_registration.Patient_registration;
import com.example.healthcare.prescription.Prescription;
import com.example.healthcare.service.Doctor_service;
import com.example.healthcare.symptoms.Symptoms;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/v1/doctor")
public class Doctor_Controller {
    private final Doctor_service doctor_service;

    public Doctor_Controller(Doctor_service doctorService) { this.doctor_service = doctorService;}
    @PutMapping("/{doctorEmail}")
    public ResponseEntity<Doctor_details> updateDoctorDetailsByAdmin(@PathVariable String doctorEmail, @RequestBody Doctor_details updatedDoctorDetails) {
        Doctor_details updatedDoctorDetailsByAdmin = doctor_service.updateDoctorDetailsByAdmin(doctorEmail,updatedDoctorDetails);
        return ResponseEntity.ok(updatedDoctorDetailsByAdmin);
    }
    @GetMapping("/doctors")
    public ResponseEntity<List<Doctor_details>> getAllDoctors() {
        List<Doctor_details> doctors = doctor_service.getAllDoctors();
        return new ResponseEntity<>(doctors, HttpStatus.OK);
    }

    @GetMapping("/patients")    //this api is used when the patient logs in and see the patient details in short hand when appointments for today is clicked.
    // doctor authenticates-> take the token,pass it into this API.
    //this api will also be used when the doctor clicks on the patient
    public ResponseEntity getPatientsByLoggedInDoctor() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInDoctorEmail = authentication.getName();
        List patients = doctor_service.getPatientsByLoggedInDoctor(loggedInDoctorEmail);
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }
    @PostMapping("/symptoms") //this api creates the symptoms for a particular patient
    public ResponseEntity<Symptoms> updateSymptoms(@PathVariable int patient_id, @RequestBody Symptoms symptoms) {
        try {
            // Get the authentication object from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // Check if the authentication object contains the doctor role
            if (authentication != null && authentication.getAuthorities().stream()
                    .anyMatch(r -> r.getAuthority().equals("DOCTOR"))) {
                // If the user is authenticated as a doctor, admit the patient
                Symptoms updatedSymptoms = doctor_service.updateSymptoms(patient_id, symptoms);
                return ResponseEntity.ok(updatedSymptoms);
            }else {
                // If the user is not authenticated as a doctor, return unauthorized status
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PostMapping("/prescription/{patient_id}") //this api creates the prescription for a particular patient
    public ResponseEntity<Prescription> updatePrescription(@PathVariable int patient_id, @RequestBody Prescription prescription) {
//        Prescription updatedPrescription = doctor_service.updatePrescription(patient_id, prescription);
//        return ResponseEntity.ok(updatedPrescription);
        try {
            // Get the authentication object from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication != null && authentication.getAuthorities().stream()
                    .anyMatch(r -> r.getAuthority().equals("DOCTOR"))) {
                Prescription updatedPrescription = doctor_service.updatePrescription(patient_id, prescription);
                return ResponseEntity.ok(updatedPrescription);
            }else {

                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PostMapping("/diagnosis/{patient_id}") //this api creates the prescription for a particular patient
    public ResponseEntity<Diagnosis> updateDiagnosis(@PathVariable int patient_id, @RequestBody Diagnosis diagnosis) {
//        Prescription updatedPrescription = doctor_service.updatePrescription(patient_id, prescription);
//        return ResponseEntity.ok(updatedPrescription);
        try {
            // Get the authentication object from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication != null && authentication.getAuthorities().stream()
                    .anyMatch(r -> r.getAuthority().equals("DOCTOR"))) {
                Diagnosis updatedDiagnosis = doctor_service.updateDiagnosis(patient_id, diagnosis);
                return ResponseEntity.ok(updatedDiagnosis);
            }else {

                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}