package com.example.healthcare.prescription;


import com.example.healthcare.patient_registration.Patient_registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrescriptionRepository extends JpaRepository<Prescription, Integer> {
    List<Prescription> findByPatientId(Integer patient_id);
}
