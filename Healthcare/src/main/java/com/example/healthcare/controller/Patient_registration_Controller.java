package com.example.healthcare.controller;

import com.example.healthcare.patient_registration.Patient_registration;
import com.example.healthcare.prescription.Prescription;
import com.example.healthcare.service.Patient_service;
import com.example.healthcare.symptoms.Symptoms;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/patients")
@CrossOrigin(origins = "http://localhost:8081")
public class Patient_registration_Controller {
    private final Patient_service patientService;

    public Patient_registration_Controller(Patient_service patientService) {
        this.patientService = patientService;
    }

    // Endpoint to register a new patient
    @PostMapping("/register_patient")
    public ResponseEntity<Patient_registration> registerPatient(@RequestBody Patient_registration patient) {
        Patient_registration registeredPatient = patientService.registerPatient(patient);
        // Extract the ID of the registered patient
        Integer patientId = registeredPatient.getId();
        // Return the ID along with the registered patient object
        return ResponseEntity.status(HttpStatus.CREATED).header("patientId", String.valueOf(patientId)).body(registeredPatient);
    }


    // Endpoint to update patient details
    @PutMapping("/{id}")
    public ResponseEntity<Patient_registration> updatePatient(@PathVariable Long id, @RequestBody Patient_registration patient) throws Throwable {
        Patient_registration updatedPatient = patientService.updatePatient(id, patient);
        return ResponseEntity.ok(updatedPatient);
    }

    //Endpoint to get all patient's information.
    @GetMapping("/patient_info")
    public ResponseEntity<List<Patient_registration>> getAllPatients() {
        List<Patient_registration> patients = patientService.getAllPatients();
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }
    @GetMapping("exists/{id}")
    public ResponseEntity<Optional<Patient_registration>> getPatientById(@PathVariable Long id) {
        Optional<Patient_registration> patient = patientService.getPatientById(id);
        if (patient != null) {
            return ResponseEntity.ok(patient);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/symptoms/{patient_id}")
    public ResponseEntity<Symptoms> updateSymptoms(@PathVariable int patient_id, @RequestBody Symptoms symptoms) {
        Symptoms updatedSymptoms = patientService.updateSymptoms(patient_id, symptoms);
        return ResponseEntity.ok(updatedSymptoms);
    }

//    @PostMapping("/treatment/{patient_id}")
//    public ResponseEntity<Treament> updateTreatment(@PathVariable int patient_id, @RequestBody Treament treatment) {
//        Treament updatedTreatment = patientService.updateTreatment(patient_id, treatment);
//        return ResponseEntity.ok(updatedTreatment);
//    }

    @PostMapping("/prescription/{patient_id}")
    public ResponseEntity<Prescription> updatePrescription(@PathVariable int patient_id, @RequestBody Prescription prescription) {
        Prescription updatedPrescription = patientService.updatePrescription(patient_id, prescription);
        return ResponseEntity.ok(updatedPrescription);
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<Patient_registration> getPatientDetails(@PathVariable Long id) {
        Optional<Patient_registration> patientOptional = patientService.getPatientById(id);
        return patientOptional.map(patient -> ResponseEntity.ok().body(patient))
                .orElse(ResponseEntity.notFound().build());
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
