package com.example.healthcare.service;

import com.example.healthcare.reports.Reports;
import com.example.healthcare.reports.Reports_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.healthcare.patient_registration.Patient_registration;

import java.io.IOException;

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



}