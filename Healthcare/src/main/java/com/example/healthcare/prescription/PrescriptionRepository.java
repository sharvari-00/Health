package com.example.healthcare.prescription;


import com.example.healthcare.patient_registration.Patient_registration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrescriptionRepository extends JpaRepository<Prescription, Integer> {
    Prescription findByPatientId(int patient_id);
}
