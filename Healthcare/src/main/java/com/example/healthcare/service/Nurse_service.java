package com.example.healthcare.service;

import com.example.healthcare.doctor_details.Doctor_details_repo;
import com.example.healthcare.nurse_details.Nurse_details;
import com.example.healthcare.nurse_details.Nurse_details_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Nurse_service {
    @Autowired
    Nurse_details_repo nurse_details_repo;
    public Nurse_details updateNurseDetailsByAdmin(String nurseEmail, Nurse_details updatedNurseDetails) {
        Nurse_details existingNurseDetails = nurse_details_repo.findByEmail(nurseEmail)
                .orElseThrow(() -> new RuntimeException("Nurse not found with email: " + nurseEmail));

        existingNurseDetails.setFname(updatedNurseDetails.getFname());
        existingNurseDetails.setLname(updatedNurseDetails.getLname());
        existingNurseDetails.setShift_starts(updatedNurseDetails.getShift_starts());
        existingNurseDetails.setShift_ends(updatedNurseDetails.getShift_ends());

        return nurse_details_repo.save(existingNurseDetails);
    }
}
