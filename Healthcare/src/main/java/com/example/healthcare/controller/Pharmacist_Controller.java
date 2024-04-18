package com.example.healthcare.controller;

import com.example.healthcare.pharmacist_details.Pharmacist_details;
import com.example.healthcare.prescription.Prescription;
import com.example.healthcare.service.Pharmacist_service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pharmacist")
public class Pharmacist_Controller {
    private final Pharmacist_service pharmacist_service;

    public Pharmacist_Controller(Pharmacist_service pharmacistService){this.pharmacist_service=pharmacistService;}
    @PutMapping("/{pharmaEmail}")
    public ResponseEntity<Pharmacist_details> updatePharmacistDetailsByAdmin(@PathVariable String pharmaEmail, @RequestBody Pharmacist_details updatedPharaDetails) {
        Pharmacist_details updatedPharaDetailsByAdmin = pharmacist_service.updatePharmacistDetailsByAdmin(pharmaEmail,updatedPharaDetails);
        return ResponseEntity.ok(updatedPharaDetails);
    }
    @GetMapping("/prescriptions/{patientId}")
    public ResponseEntity<List<Prescription>> getPrescriptionsByPatientId(@PathVariable Integer patientId) {
        try {
            // Get the authentication object from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // Check if the authentication object contains the doctor role
            if (authentication != null && authentication.getAuthorities().stream()
                    .anyMatch(r -> r.getAuthority().equals("PHARMACIST"))) {
                // If the user is authenticated as a doctor, proceed to get the prescriptions
                List<Prescription> prescriptions = pharmacist_service.getPrescriptionsByPatientId(patientId);
                return ResponseEntity.ok().body(prescriptions);
            } else {
                // If the user is not authenticated as a doctor, return unauthorized status
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
