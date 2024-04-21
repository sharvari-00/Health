package com.example.healthcare.controller;
import com.example.healthcare.DTO.patientInfoDTO;
import com.example.healthcare.diagnosis.Diagnosis;
import com.example.healthcare.nurse_details.Nurse_details;
import com.example.healthcare.patient_registration.Patient_registration;
import com.example.healthcare.prescription.Prescription;
import com.example.healthcare.service.Doctor_service;
import com.example.healthcare.service.Nurse_service;
import com.example.healthcare.service.Patient_service;
import com.example.healthcare.symptoms.Symptoms;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/nurse")
public class Nurse_Controller {
    private final Nurse_service nurse_service;
    private final Patient_service patientRegistrationService;
    private final Doctor_service doctor_service;
    public Nurse_Controller(Nurse_service nurseService, Patient_service patientRegistrationService, Doctor_service doctorService){this.nurse_service=nurseService;
        this.patientRegistrationService = patientRegistrationService;
        doctor_service = doctorService;
    }
    @PutMapping("/{nurseEmail}")
    public ResponseEntity<Nurse_details> updateNurseDetailsByAdmin(@PathVariable String nurseEmail, @RequestBody Nurse_details updatedNurseDetails) {
       Nurse_details updatedNurseDetailsByAdmin = nurse_service.updateNurseDetailsByAdmin(nurseEmail,updatedNurseDetails);
        return ResponseEntity.ok(updatedNurseDetailsByAdmin);
    }
    @GetMapping("/onRoundPatients")
    public List<patientInfoDTO> getPatientsWithBedId() {
        try {
            // Get the authentication object from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.getAuthorities().stream()
                    .anyMatch(r -> r.getAuthority().equals("NURSE"))) {
                return patientRegistrationService.getPatientsWithBedId();
            }else {
                return (List<patientInfoDTO>) ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return (List<patientInfoDTO>) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<Patient_registration> getPatientById(@PathVariable Long patientId) {
        try {
            // Get the authentication object from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // Check if the authentication object contains the doctor role
            if (authentication != null && authentication.getAuthorities().stream()
                    .anyMatch(r -> r.getAuthority().equals("NURSE"))) {
                // If the user is authenticated as a doctor, proceed to get the patient details
                return (ResponseEntity<Patient_registration>) doctor_service.getPatientById(patientId)
                        .map(patient -> ResponseEntity.ok().body(patient))
                        .orElse(ResponseEntity.notFound().build());
            } else {
                // If the user is not authenticated as a doctor, return unauthorized status
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/symptoms_patient/{patientId}")
    public ResponseEntity<List<Symptoms>> getSymptomsByPatientId(@PathVariable Integer patientId) {
        try {
            // Get the authentication object from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // Check if the authentication object contains the doctor role
            if (authentication != null && authentication.getAuthorities().stream()
                    .anyMatch(r -> r.getAuthority().equals("NURSE"))) {
                // If the user is authenticated as a doctor, proceed to get the symptoms
                List<Symptoms> symptoms = doctor_service.getSymptomsByPatientId(patientId);
                return ResponseEntity.ok().body(symptoms);
            } else {
                // If the user is not authenticated as a doctor, return unauthorized status
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/prescriptions_patient/{patientId}")
    public ResponseEntity<List<Prescription>> getPrescriptionsByPatientId(@PathVariable Integer patientId) {
        try {
            // Get the authentication object from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // Check if the authentication object contains the doctor role
            if (authentication != null && authentication.getAuthorities().stream()
                    .anyMatch(r -> r.getAuthority().equals("NURSE"))) {
                // If the user is authenticated as a doctor, proceed to get the prescriptions
                List<Prescription> prescriptions = doctor_service.getPrescriptionsByPatientId(patientId);
                return ResponseEntity.ok().body(prescriptions);
            } else {
                // If the user is not authenticated as a doctor, return unauthorized status
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/diagnosis_patient/{patientId}")
    public ResponseEntity<List<Diagnosis>> getDiagnosesByPatientId(@PathVariable Integer patientId) {
        try {
            // Get the authentication object from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // Check if the authentication object contains the doctor role
            if (authentication != null && authentication.getAuthorities().stream()
                    .anyMatch(r -> r.getAuthority().equals("NURSE"))) {
                // If the user is authenticated as a doctor, proceed to get the diagnoses
                List<Diagnosis> diagnoses = doctor_service.getDiagnosesByPatientId(patientId);
                return ResponseEntity.ok().body(diagnoses);
            } else {
                // If the user is not authenticated as a doctor, return unauthorized status
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
