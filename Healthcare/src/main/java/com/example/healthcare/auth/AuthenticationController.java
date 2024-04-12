package com.example.healthcare.auth;

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
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor

public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }


}
