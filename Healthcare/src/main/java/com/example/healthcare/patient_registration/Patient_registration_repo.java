package com.example.healthcare.patient_registration;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Patient_registration_repo extends JpaRepository<Patient_registration,Integer> {

    Patient_registration getPatient_registrationByFname(String fname);
}
