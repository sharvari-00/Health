package com.example.healthcare.controller;

import com.example.healthcare.admin.Admin;
import com.example.healthcare.admin.Admin_repo;
import com.example.healthcare.doctor_details.Doctor_details;
import com.example.healthcare.doctor_details.Doctor_details_repo;
import com.example.healthcare.login.Login;
import com.example.healthcare.login.Login_repo;
import com.example.healthcare.login.Role;
import com.example.healthcare.nurse_details.Nurse_details;
import com.example.healthcare.nurse_details.Nurse_details_repo;
import com.example.healthcare.pharmacist_details.Pharmacist_details;
import com.example.healthcare.pharmacist_details.Pharmacist_details_repo;
import com.example.healthcare.service.Login_service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class Login_Controller {
    private final Login_service login_service;
    private final Admin_repo adminRepo;
    private final Nurse_details_repo nurseDetailsRepo;
    private final Pharmacist_details_repo pharmacistDetailsRepo;
    private final Doctor_details_repo doctorDetailsRepo;
    private final Login_repo loginRepository;
    @GetMapping("/user/details")
    public ResponseEntity<?> getUserDetails() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        // Check if the user is authenticated
        if (userEmail != null && !userEmail.isEmpty()) {
            Login_service loginService = new Login_service(loginRepository, doctorDetailsRepo, pharmacistDetailsRepo, nurseDetailsRepo, adminRepo);
            Login user = loginService.getUserByEmail(userEmail);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            Role userRole = user.getRole();
            return switch (userRole) {
                case DOCTOR -> {
                    Doctor_details doctorDetails = loginService.getDoctorDetailsByEmail(userEmail);
                    yield ResponseEntity.ok(doctorDetails);
                }
                case PHARMACIST -> {
                    Pharmacist_details pharmacistDetails = loginService.getPharmacistDetailsByEmail(userEmail);
                    yield ResponseEntity.ok(pharmacistDetails);
                }
                case NURSE -> {
                    Nurse_details nurseDetails = loginService.getNurseDetailsByEmail(userEmail);
                    yield ResponseEntity.ok(nurseDetails);
                }
                case ADMIN -> {
                    Admin frontDeskDetails = loginService.getFrontDeskDetailsByEmail(userEmail);
                    yield ResponseEntity.ok(frontDeskDetails);
                }
                default -> ResponseEntity.badRequest().body("Unknown role");
            };
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }

    }
}
