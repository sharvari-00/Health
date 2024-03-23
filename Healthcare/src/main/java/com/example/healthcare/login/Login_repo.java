package com.example.healthcare.login;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface Login_repo extends JpaRepository<Login,Integer> {
    Optional<Login> findByEmail(String email);

}
