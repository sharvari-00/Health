package com.example.healthcare.patient_registration;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface Patient_registration_repo<patient_registration> extends JpaRepository<Patient_registration,Long> {
   // List<Patient_registration> findByDocIdAndRegistrationDate(String docId, LocalDate registrationDate);

   List findByDocId(String docId);

   // List<Patient_registration> findByDoctorId(Integer doctorId);
}
