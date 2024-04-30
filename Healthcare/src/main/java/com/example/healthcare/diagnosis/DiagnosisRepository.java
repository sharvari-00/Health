package com.example.healthcare.diagnosis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiagnosisRepository extends JpaRepository<Diagnosis, Integer> {
    List<Diagnosis> findByPatientId(Integer patient_id);

    Diagnosis save(Diagnosis diagnosis);

    List<Diagnosis> findByPatientIdOrderByDiagnosisDate(int patientId);

    // Diagnosis save(Diagnosis diagnosis);
}
