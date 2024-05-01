package com.example.healthcare.allergy;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AllergyRepository extends JpaRepository<Allergy, Integer> {

    List<Allergy> findAllByPatientId(Integer patientId);
}