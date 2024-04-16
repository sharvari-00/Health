package com.example.healthcare.controller;
import com.example.healthcare.dto.PatientDetailsDTO;
import com.example.healthcare.dto.patientInfoDTO;
import com.example.healthcare.nurse_details.Nurse_details;
import com.example.healthcare.patient_registration.Patient_registration;
import com.example.healthcare.service.Nurse_service;
import com.example.healthcare.service.Patient_service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/nurse")
public class Nurse_Controller {
    private final Nurse_service nurse_service;
    private Patient_service patientRegistrationService;
    public Nurse_Controller(Nurse_service nurseService){this.nurse_service=nurseService;}
    @PutMapping("/{nurseEmail}")
    public ResponseEntity<Nurse_details> updateNurseDetailsByAdmin(@PathVariable String nurseEmail, @RequestBody Nurse_details updatedNurseDetails) {
       Nurse_details updatedNurseDetailsByAdmin = nurse_service.updateNurseDetailsByAdmin(nurseEmail,updatedNurseDetails);
        return ResponseEntity.ok(updatedNurseDetailsByAdmin);
    }
    @GetMapping("/patients")                //displays admitted patient details in short hand
    public List<patientInfoDTO> getPatientsWithBedId() {
        return patientRegistrationService.getPatientsWithBedId();
    }
    @GetMapping("/patient-details")          //displays all the admitted patient details along with history
    public PatientDetailsDTO getPatientDetails(@RequestParam Long patientId) {
        return patientRegistrationService.getPatientDetailsById(Math.toIntExact(patientId));
    }
}
