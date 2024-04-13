package com.example.healthcare.admin;

import com.example.healthcare.nurse_details.Nurse_details;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Admin_repo extends JpaRepository<Admin,Integer> {
    Optional<Admin> findByEmail(String email);
}
