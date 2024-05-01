package com.example.healthcare.controller;

import com.example.healthcare.DTO.patientInfoDTO;
import com.example.healthcare.allergy.Allergy;
import com.example.healthcare.diagnosis.Diagnosis;
import com.example.healthcare.doctor_details.Doctor_details;
import com.example.healthcare.login.Login;
import com.example.healthcare.login.Login_repo;
import com.example.healthcare.patient_registration.Patient_registration;
import com.example.healthcare.patient_registration.Patient_registration_repo;
import com.example.healthcare.prescription.Prescription;
import com.example.healthcare.service.Doctor_service;
import com.example.healthcare.service.Patient_service;
import com.example.healthcare.service.Reports_service;
import com.example.healthcare.symptoms.Symptoms;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/v1/doctor")
public class Doctor_Controller {
    private final Doctor_service doctor_service;
    private final Patient_service patientRegistrationService;
    private final Login_repo login_repo;

    private final Patient_registration_repo patient_repo;
    public Doctor_Controller(Doctor_service doctorService, Patient_service patientRegistrationService, Login_repo loginRepo, Patient_registration_repo patientRepo) { this.doctor_service = doctorService;
        this.patientRegistrationService = patientRegistrationService;
        login_repo = loginRepo;
        patient_repo = patientRepo;
    }
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


    @GetMapping("/doctors/{doctorId}/patients")
    public ResponseEntity getPatientsByDoctorIdAndTodayDate(@PathVariable Integer doctorId) {
        try {
            // Get the authentication object from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // Check if the authentication object contains the doctor role
            if (authentication != null && authentication.getAuthorities().stream()
                    .anyMatch(r -> r.getAuthority().equals("DOCTOR"))) {
                // If the user is authenticated as a doctor, retrieve patients
                List patients = doctor_service.getPatientsByDoctorIdAndTodayDate(doctorId);


                // Check if the list of patients is empty
                if (patients.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
                }

                return new ResponseEntity<>(patients, HttpStatus.OK);
            } else {
                // If the user is not authenticated as a doctor, return unauthorized status
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            // If an error occurs, return internal server error status
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/symptoms/{patient_id}") //this api creates the symptoms for a particular patient
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
    @PostMapping("allergy/{patient_id}")
    public ResponseEntity<Allergy> createAllergy(@PathVariable int patient_id, @RequestBody Allergy allergy) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication != null && authentication.getAuthorities().stream()
                    .anyMatch(r -> r.getAuthority().equals("DOCTOR"))) {
                Allergy createdAllergy = doctor_service.createAllergy(patient_id, allergy);
                return ResponseEntity.ok(createdAllergy);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/allergies_patient/{patientId}")
    public ResponseEntity<List<Allergy>> getAllergiesByPatientId(@PathVariable Integer patientId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.getAuthorities().stream()
                    .anyMatch(r -> r.getAuthority().equals("DOCTOR"))) {
                List<Allergy> allergies = doctor_service.findByPatientId(patientId); // Use findByPatientId
                return ResponseEntity.ok().body(allergies);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/onRoundPatients")
    public List<patientInfoDTO> getPatientsWithBedId() {
        try {
            // Get the authentication object from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.getAuthorities().stream()
                    .anyMatch(r -> r.getAuthority().equals("DOCTOR"))) {
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
                    .anyMatch(r -> r.getAuthority().equals("DOCTOR"))) {
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
                    .anyMatch(r -> r.getAuthority().equals("DOCTOR"))) {
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
                    .anyMatch(r -> r.getAuthority().equals("DOCTOR"))) {
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
                    .anyMatch(r -> r.getAuthority().equals("DOCTOR"))) {
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