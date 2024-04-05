package com.example.healthcare.controller;

import com.example.healthcare.doctor_details.Doctor_details;
import com.example.healthcare.login.Login;

public class RegistrationRequest {
    private Doctor_details doctorDetails;
    private Login login;

    public Doctor_details getDoctorDetails() {
        return doctorDetails;
    }

    public void setDoctorDetails(Doctor_details doctorDetails) {
        this.doctorDetails = doctorDetails;
    }

    public Login getLogin() {
        return login;
    }

    public void setLogin(Login login) {
        this.login = login;
    }
}
