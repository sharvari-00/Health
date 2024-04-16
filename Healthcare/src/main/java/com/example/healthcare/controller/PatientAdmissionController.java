package com.example.healthcare.controller;

import com.example.healthcare.service.PatientAdmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/v1/admission")
public class PatientAdmissionController {
    private final PatientAdmissionService patientAdmissionService;

    @Autowired
    public PatientAdmissionController(PatientAdmissionService patientAdmissionService) {
        this.patientAdmissionService = patientAdmissionService;
    }
// Import other necessary classes

    @PostMapping("/admit/{patientId}")
    public ResponseEntity<?> admitPatient(@PathVariable Long patientId) {
        try {
            // Get the authentication object from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // Check if the authentication object contains the doctor role
            if (authentication != null && authentication.getAuthorities().stream()
                    .anyMatch(r -> r.getAuthority().equals("DOCTOR"))) {
                // If the user is authenticated as a doctor, admit the patient
                patientAdmissionService.admitPatient(patientId);
                return ResponseEntity.ok().build();
            } else {
                // If the user is not authenticated as a doctor, return a forbidden response
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to admit patient: " + e.getMessage());
        }
    }

    @PostMapping("/discharge/{patientId}")
    public ResponseEntity<?> dischargePatient(@PathVariable Integer patientId) {
        try {
            // Get the authentication object from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // Check if the authentication object contains the doctor role
            if (authentication != null && authentication.getAuthorities().stream()
                    .anyMatch(r -> r.getAuthority().equals("DOCTOR"))) {
                // If the user is authenticated as a doctor, discharge the patient
                patientAdmissionService.dischargePatient(patientId);
                return ResponseEntity.ok().build();
            } else {
                // If the user is not authenticated as a doctor, return a forbidden response
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to discharge patient: " + e.getMessage());
        }
    }

}
