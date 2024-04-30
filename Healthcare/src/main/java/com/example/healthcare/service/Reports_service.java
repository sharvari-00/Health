package com.example.healthcare.service;

import com.example.healthcare.reports.Reports;
import com.example.healthcare.reports.Reports_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.healthcare.patient_registration.Patient_registration;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class Reports_service {
    @Autowired
    private Reports_repo reportsRepo;
    @Autowired
    private Patient_service patientService;

    public Reports uploadImage(Long patientId, MultipartFile file) throws IOException {
        // Retrieve patient information
        Patient_registration patient = patientService.getPatientById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        // Create a new report
        Reports report = new Reports();
        report.setPatient_id(Math.toIntExact(patientId)); // Set the patientId
        report.setPatient(patient);
        report.setImages(file.getBytes()); // Convert MultipartFile to byte[]

        // Save the report
        return reportsRepo.save(report);
    }

    public List<Reports> getPatientImages(Long patientId) {
        // Retrieve patient information
        Optional<Patient_registration> patient = patientService.getPatientById(patientId);
        if (!patient.isPresent()) {
            throw new RuntimeException("Patient not found with ID: " + patientId);
        }

        // Retrieve reports associated with the patient
        List<Reports> patientImages = reportsRepo.findByPatientId(Math.toIntExact(patientId));
        if (patientImages.isEmpty()) {
            throw new RuntimeException("No images found for patient with ID: " + patientId);
        }

        return patientImages;
    }

}