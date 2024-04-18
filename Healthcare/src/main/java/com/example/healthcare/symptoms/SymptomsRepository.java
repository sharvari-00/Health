package com.example.healthcare.symptoms;

import com.example.healthcare.patient_registration.Patient_registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;



public interface SymptomsRepository extends JpaRepository<Symptoms, Integer> {
    List<Symptoms> findByPatientId(Integer patientId);
}


