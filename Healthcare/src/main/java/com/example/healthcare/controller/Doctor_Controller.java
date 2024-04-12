package com.example.healthcare.controller;

import com.example.healthcare.doctor_details.Doctor_details;
import com.example.healthcare.patient_registration.Patient_registration;
import com.example.healthcare.service.Doctor_service;
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
}
