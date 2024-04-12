package com.example.healthcare.nurse_details;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public interface Nurse_details_repo extends JpaRepository<Nurse_details,Integer> {
    Optional<Nurse_details> findByEmail(String email);
}
