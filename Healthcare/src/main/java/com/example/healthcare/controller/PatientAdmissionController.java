package com.example.healthcare.controller;

import com.example.healthcare.service.PatientAdmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admission")
public class PatientAdmissionController {
    private final PatientAdmissionService patientAdmissionService;

    @Autowired
    public PatientAdmissionController(PatientAdmissionService patientAdmissionService) {
        this.patientAdmissionService = patientAdmissionService;
    }

    @PostMapping("/admit/{patientId}")
    public ResponseEntity<?> admitPatient(@PathVariable Long patientId) {
        try {
            patientAdmissionService.admitPatient(patientId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to admit patient: " + e.getMessage());
        }
    }

    @PostMapping("/discharge/{patientId}")
    public ResponseEntity<?> dischargePatient(@PathVariable Integer patientId) {
        try {
            patientAdmissionService.dischargePatient(patientId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to discharge patient: " + e.getMessage());
        }
    }
}
