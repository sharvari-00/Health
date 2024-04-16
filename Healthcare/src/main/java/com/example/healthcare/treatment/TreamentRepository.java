
package com.example.healthcare.treatment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TreamentRepository extends JpaRepository<Treament, Integer> {
    public Treament findByPatientId(Integer patientId);
}