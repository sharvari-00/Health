package com.example.healthcare.service;

import com.example.healthcare.patient_registration.Patient_registration;
import com.example.healthcare.patient_registration.Patient_registration_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Patient_service {
    @Autowired
    static Patient_registration_repo patientRepo;

    public static Patient_registration getPatientDetailsByFname(String fname) {
        return patientRepo.getPatient_registrationByFname(fname);
    }
}
