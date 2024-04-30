package com.example.healthcare.controller;
import com.example.healthcare.DTO.patientInfoDTO;
import com.example.healthcare.diagnosis.Diagnosis;
import com.example.healthcare.diagnosis.DiagnosisRepository;
import com.example.healthcare.nurse_details.Nurse_details;
import com.example.healthcare.patient_registration.Patient_registration;
import com.example.healthcare.prescription.Prescription;
import com.example.healthcare.prescription.PrescriptionRepository;
import com.example.healthcare.service.Doctor_service;
import com.example.healthcare.service.Nurse_service;
import com.example.healthcare.service.Patient_service;
import com.example.healthcare.service.Reports_service;
import com.example.healthcare.symptoms.Symptoms;
import com.example.healthcare.symptoms.SymptomsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.DataSource;
import java.io.IOException;
import java.util.*;
import com.example.healthcare.reports.Reports;
@RestController
@RequestMapping("/api/v1/nurse")
@CrossOrigin(origins = "*")
public class Nurse_Controller {
    private final Nurse_service nurse_service;
    private final Patient_service patientRegistrationService;
    @Autowired
    private final Doctor_service doctor_service;
    @Autowired
    private DataSource dataSource;
    @Autowired
    private final Reports_service reports_service;

    private final PrescriptionRepository prescriptionRepository;
    private final SymptomsRepository symptomRepository;
    private final  DiagnosisRepository diagnosisRepository;

    public Nurse_Controller(Nurse_service nurseService, Patient_service patientRegistrationService, Doctor_service doctorService, Reports_service reportsService, PrescriptionRepository prescriptionRepository, SymptomsRepository symptomRepository1, DiagnosisRepository diagnosisRepository){this.nurse_service=nurseService;
        this.patientRegistrationService = patientRegistrationService;
        doctor_service = doctorService;
        reports_service = reportsService;

        this.prescriptionRepository = prescriptionRepository;
        this.symptomRepository = symptomRepository1;
        this.diagnosisRepository = diagnosisRepository;
    }
    @PutMapping("/{nurseEmail}")
    public ResponseEntity<Nurse_details> updateNurseDetailsByAdmin(@PathVariable String nurseEmail, @RequestBody Nurse_details updatedNurseDetails) {
       Nurse_details updatedNurseDetailsByAdmin = nurse_service.updateNurseDetailsByAdmin(nurseEmail,updatedNurseDetails);
        return ResponseEntity.ok(updatedNurseDetailsByAdmin);
    }
    @GetMapping("/onRoundPatients")
    public List<patientInfoDTO> getPatientsWithBedId() {
        try {
            // Get the authentication object from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.getAuthorities().stream()
                    .anyMatch(r -> r.getAuthority().equals("NURSE"))) {
                return patientRegistrationService.getPatientsWithBedId();
            }else {
                return (List<patientInfoDTO>) ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return (List<patientInfoDTO>) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<Patient_registration> getPatientById(@PathVariable Long patientId) {
        try {
            // Get the authentication object from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // Check if the authentication object contains the doctor role
            if (authentication != null && authentication.getAuthorities().stream()
                    .anyMatch(r -> r.getAuthority().equals("NURSE"))) {
                // If the user is authenticated as a doctor, proceed to get the patient details
                return (ResponseEntity<Patient_registration>) doctor_service.getPatientById(patientId)
                        .map(patient -> ResponseEntity.ok().body(patient))
                        .orElse(ResponseEntity.notFound().build());
            } else {
                // If the user is not authenticated as a doctor, return unauthorized status
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/patient_history/{patientId}")
    public ResponseEntity<List<List<Map<String, Object>>>> getVisitsByPatient(@PathVariable int patientId) {
        List<Prescription> prescriptions = prescriptionRepository.findByPatientIdOrderByPrescriptionDate(patientId);
        List<Diagnosis> diagnoses = diagnosisRepository.findByPatientIdOrderByDiagnosisDate(patientId);
        List<Symptoms> symptoms = symptomRepository.findByPatientIdOrderBySymptomDate(patientId);

        // Organize entries into visits based on their order of occurrence
        List<List<Map<String, Object>>> visits = new ArrayList<>();
        int index = 0;

        while (true) {
            // Check if there are any more entries in any of the lists
            boolean hasNext = false;
            List<Map<String, Object>> visitEntries = new ArrayList<>();

            // Add the next available entry from each list to the visit
            if (index < prescriptions.size()) {
                visitEntries.add(createEntry(prescriptions.get(index)));
                hasNext = true;
            }
            if (index < diagnoses.size()) {
                visitEntries.add(createEntry(diagnoses.get(index)));
                hasNext = true;
            }
            if (index < symptoms.size()) {
                visitEntries.add(createEntry(symptoms.get(index)));
                hasNext = true;
            }

            // If there are no more entries in any list, stop iterating
            if (!hasNext) {
                break;
            }

            // Add the current visit to the list of visits
            visits.add(visitEntries);
            index++;
        }

        // Return the organized visits
        return ResponseEntity.ok(visits);
    }
    @CrossOrigin(origins = "*")
    @PostMapping("/uploadImage/{patientId}")
    public ResponseEntity<?> uploadImage(@PathVariable("patientId") Long patientId,
                                         @RequestParam("file") MultipartFile file) {
        try {
            Reports savedReport = reports_service.uploadImage(patientId, file);
            return ResponseEntity.ok(savedReport);
        } catch (IOException e) {
            e.printStackTrace(); // Log the exception for debugging purposes
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while processing the file: " + e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found");
        }
    }
    @GetMapping("/patientImages/{patientId}")
    public ResponseEntity<?> getPatientImages(@PathVariable("patientId") Long patientId) {
        try {
            List<Reports> patientImages = reports_service.getPatientImages(patientId);
            return ResponseEntity.ok(patientImages);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging purposes
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while retrieving patient images: " + e.getMessage());
        }
    }



    private Map<String, Object> createEntry(Object entity) {
        Map<String, Object> entry = new HashMap<>();
        if (entity instanceof Prescription) {
            Prescription prescription = (Prescription) entity;
            entry.put("type", "prescription");
            entry.put("data", prescription);
        } else if (entity instanceof Diagnosis) {
            Diagnosis diagnosis = (Diagnosis) entity;
            entry.put("type", "diagnosis");
            entry.put("data", diagnosis);
        } else if (entity instanceof Symptoms) {
            Symptoms symptom = (Symptoms) entity;
            entry.put("type", "symptom");
            entry.put("data", symptom);
        }
        return entry;
    }

}

