package com.example.healthcare.service;

import com.example.healthcare.controller.RegistrationRequest;
import com.example.healthcare.doctor_details.Doctor_details;
import com.example.healthcare.doctor_details.Doctor_details_repo;
import com.example.healthcare.login.Login;
import com.example.healthcare.login.Login_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Doctor_service {
    @Autowired
    Doctor_details_repo doctor_details_repo;
    @Autowired
    Login_repo login_repo;

    public Doctor_details registerDoctor(RegistrationRequest request) {
        Doctor_details doctorDetails = request.getDoctorDetails();

        // Check if the Doctor_details object is null
        if (doctorDetails == null) {
            throw new IllegalArgumentException("Doctor_details object is null");
        }
        Doctor_details savedDoctorDetails = doctor_details_repo.save(request.getDoctorDetails());
        Login login = request.getLogin();
        if (login == null) {
            throw new IllegalArgumentException("Login object is null");
        }

        login.setDoctor_details(savedDoctorDetails);
        login_repo.save(login);
        return savedDoctorDetails;
    }
}
