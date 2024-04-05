package com.example.healthcare.doctor_details;

import com.example.healthcare.patient_registration.Patient_registration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Doctor_details_repo extends JpaRepository<Doctor_details,Long> {
}
