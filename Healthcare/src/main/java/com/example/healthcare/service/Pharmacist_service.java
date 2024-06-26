package com.example.healthcare.service;

import com.example.healthcare.pharmacist_details.Pharmacist_details;
import com.example.healthcare.pharmacist_details.Pharmacist_details_repo;
import com.example.healthcare.prescription.Prescription;
import com.example.healthcare.prescription.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class Pharmacist_service {
    @Autowired
    Pharmacist_details_repo pharmacist_details_repo;
    @Autowired
    PrescriptionRepository prescriptionRepository;
    public Pharmacist_details updatePharmacistDetailsByAdmin(String pharmaEmail, Pharmacist_details updatedPharaDetails) {
        Pharmacist_details existingPharmaDetails = pharmacist_details_repo.findByEmail(pharmaEmail)
                .orElseThrow(() -> new RuntimeException("Doctor not found with email: " + pharmaEmail));

        existingPharmaDetails.setName(updatedPharaDetails.getName());

        return pharmacist_details_repo.save(existingPharmaDetails);
    }

    public List<Prescription> getPrescriptionsByPatientId(Integer patientId) {
        return prescriptionRepository.findByPatientId(patientId);
    }
}
