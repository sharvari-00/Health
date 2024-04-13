package com.example.healthcare.service;

import com.example.healthcare.admin.Admin;
import com.example.healthcare.admin.Admin_repo;
import com.example.healthcare.doctor_details.Doctor_details;
import com.example.healthcare.doctor_details.Doctor_details_repo;
import com.example.healthcare.login.Login;
import com.example.healthcare.login.Login_repo;
import com.example.healthcare.nurse_details.Nurse_details;
import com.example.healthcare.nurse_details.Nurse_details_repo;
import com.example.healthcare.pharmacist_details.Pharmacist_details;
import com.example.healthcare.pharmacist_details.Pharmacist_details_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class Login_service {
    private final Login_repo loginRepository;
    private final Doctor_details_repo doctor_details_repo;
    private final Pharmacist_details_repo pharmacistDetailsRepo;
    private final Nurse_details_repo nurse_details_repo;
    private final Admin_repo adminRepo;

    @Autowired
    public Login_service(Login_repo loginRepository, Doctor_details_repo doctor_details_repo, Pharmacist_details_repo pharmacistDetailsRepo, Nurse_details_repo nurse_details_repo, Admin_repo adminRepo) {
        this.loginRepository = loginRepository;
        this.doctor_details_repo = doctor_details_repo;
        this.pharmacistDetailsRepo = pharmacistDetailsRepo;
        this.nurse_details_repo = nurse_details_repo;
        this.adminRepo = adminRepo;
    }

    public Login getUserByEmail(String email) {
        return loginRepository.findByEmail(email).orElse(null);
    }

    public Doctor_details getDoctorDetailsByEmail(String email) {
        return doctor_details_repo.findByEmail(email).orElse(null);
    }

    public Pharmacist_details getPharmacistDetailsByEmail(String email) {
        return pharmacistDetailsRepo.findByEmail(email).orElse(null);
    }

    public Nurse_details getNurseDetailsByEmail(String email) {
        return nurse_details_repo.findByEmail(email).orElse(null);
    }

    public Admin getFrontDeskDetailsByEmail(String email) {
        return adminRepo.findByEmail(email).orElse(null);
    }
}
