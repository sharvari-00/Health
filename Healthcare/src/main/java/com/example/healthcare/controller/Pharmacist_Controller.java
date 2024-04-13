package com.example.healthcare.controller;

import com.example.healthcare.nurse_details.Nurse_details;
import com.example.healthcare.pharmacist_details.Pharmacist_details;
import com.example.healthcare.service.Nurse_service;
import com.example.healthcare.service.Pharmacist_service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}