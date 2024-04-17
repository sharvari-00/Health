package com.example.healthcare.diagnosis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface DiagnosisRepository extends JpaRepository<Diagnosis, Long> {
    Diagnosis findByPatientId(int patientId);

    Diagnosis save(Diagnosis diagnosis);

    // Diagnosis save(Diagnosis diagnosis);
}
