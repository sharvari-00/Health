package com.example.healthcare.controller;

import com.example.healthcare.doctor_details.Doctor_details;
//import com.example.healthcare.service.AppointmentService;
import com.example.healthcare.service.Doctor_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/doctor")
public class Doctor_Controller {
    @Autowired
    private final Doctor_service doctor_service;

   // @Autowired
    //private AppointmentService appointmentService;

    public Doctor_Controller(Doctor_service doctorService) { this.doctor_service = doctorService;}
    @PutMapping("/{doctorEmail}")
    public ResponseEntity<Doctor_details> updateDoctorDetailsByAdmin(@PathVariable String doctorEmail, @RequestBody Doctor_details updatedDoctorDetails) {
        Doctor_details updatedDoctorDetailsByAdmin = doctor_service.updateDoctorDetailsByAdmin(doctorEmail,updatedDoctorDetails);
        return ResponseEntity.ok(updatedDoctorDetailsByAdmin);
    }

}