package com.example.healthcare.symptoms;

import com.example.healthcare.patient_registration.Patient_registration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SymptomsRepository extends JpaRepository<Symptoms, Integer> {
    Symptoms findByPatientId(int patient_id);
}

