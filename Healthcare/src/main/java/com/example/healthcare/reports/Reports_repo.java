package com.example.healthcare.reports;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface Reports_repo extends JpaRepository<Reports,Integer> {

}