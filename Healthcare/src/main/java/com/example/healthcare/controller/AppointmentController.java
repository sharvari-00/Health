package com.example.healthcare.controller;

import com.example.healthcare.patient_registration.Patient_registration;
import com.example.healthcare.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/auth/authenticate")  // Base path for your API endpoints
public class AppointmentController<patient_registration> {
    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/appointments-for-today/{docId}{today}")
    public List<Patient_registration> getAppointmentsForToday(@RequestParam("docId") String docId) {
        LocalDate today = LocalDate.now();
        return appointmentService.getPatientsByDoctorIdAndDate(docId,today);
    }
}



