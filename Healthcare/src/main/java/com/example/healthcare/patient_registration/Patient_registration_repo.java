package com.example.healthcare.patient_registration;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface Patient_registration_repo extends JpaRepository<Patient_registration,Long> {
   // List<Patient_registration> findByDocIdAndRegistrationDate(String docId, LocalDate registrationDate);

   List findByDocId(String docId);

    @Query("SELECT p FROM Patient_registration p WHERE p.admitted = true")
    List<Patient_registration> findAdmittedPatients();
    List<Patient_registration> findByBedIdNotNull();
    // List<Patient_registration> findByDoctorId(Integer doctorId);
}
