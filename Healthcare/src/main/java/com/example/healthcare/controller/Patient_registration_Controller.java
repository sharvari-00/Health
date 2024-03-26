package com.example.healthcare.controller;

import com.example.healthcare.patient_registration.Patient_registration;
import com.example.healthcare.patient_registration.Patient_registration_repo;
import com.example.healthcare.service.Patient_service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
public class Patient_registration_Controller {
    @GetMapping("/patients/{fname}")
    public ResponseEntity<Patient_registration> getPatientDetails(@PathVariable String fname) {
        // Logic to retrieve patient details from the repository
        Patient_registration patientDetails = Patient_service.getPatientDetailsByFname(fname);
        if (patientDetails != null) {
            return ResponseEntity.ok(patientDetails);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

//    private void getPatient_registrationById(Integer id) {
//    }
}
