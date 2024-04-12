package com.example.healthcare.controller;
import com.example.healthcare.nurse_details.Nurse_details;
import com.example.healthcare.service.Nurse_service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/nurse")
public class Nurse_Controller {
    private final Nurse_service nurse_service;

    public Nurse_Controller(Nurse_service nurseService){this.nurse_service=nurseService;}
    @PutMapping("/{nurseEmail}")
    public ResponseEntity<Nurse_details> updateNurseDetailsByAdmin(@PathVariable String nurseEmail, @RequestBody Nurse_details updatedNurseDetails) {
       Nurse_details updatedNurseDetailsByAdmin = nurse_service.updateNurseDetailsByAdmin(nurseEmail,updatedNurseDetails);
        return ResponseEntity.ok(updatedNurseDetailsByAdmin);
    }
}
