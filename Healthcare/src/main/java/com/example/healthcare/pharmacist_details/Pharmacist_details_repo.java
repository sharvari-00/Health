package com.example.healthcare.pharmacist_details;

import com.example.healthcare.doctor_details.Doctor_details;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface Pharmacist_details_repo extends  JpaRepository<Pharmacist_details,Integer> {
    Optional<Pharmacist_details> findByEmail(String email);
}
