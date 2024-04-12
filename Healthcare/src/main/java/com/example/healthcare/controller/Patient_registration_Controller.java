package com.example.healthcare.controller;

import com.example.healthcare.patient_registration.Patient_registration;
import com.example.healthcare.service.Patient_service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/patients")
public class Patient_registration_Controller {
    private final Patient_service patientService;

    public Patient_registration_Controller(Patient_service patientService) {
        this.patientService = patientService;
    }

    // Endpoint to register a new patient
    @PostMapping("/register_patient")
    public ResponseEntity<Patient_registration> registerPatient(@RequestBody Patient_registration patient) {
        Patient_registration registeredPatient = patientService.registerPatient(patient);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredPatient);
    }

    // Endpoint to update patient details
    @PutMapping("/{id}")
    public ResponseEntity<Patient_registration> updatePatient(@PathVariable Long id, @RequestBody Patient_registration patient) {
        Patient_registration updatedPatient = patientService.updatePatient(id, patient);
        return ResponseEntity.ok(updatedPatient);
    }

    //Endpoint to get all patient's information.
    @GetMapping("/patient_info")
    public ResponseEntity<List<Patient_registration>> getAllPatients() {
        List<Patient_registration> patients = patientService.getAllPatients();
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

//    @GetMapping("/patients/{fname}")
//    public ResponseEntity<Patient_registration> getPatientDetails(@PathVariable String fname) {
//        // Logic to retrieve patient details from the repository
//        Patient_registration patientDetails = Patient_service.getPatientDetailsByFname(fname);
//        if (patientDetails != null) {
//            return ResponseEntity.ok(patientDetails);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

//    private void getPatient_registrationById(Integer id) {
//    }
}
