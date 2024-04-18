package com.example.healthcare.service;

import com.example.healthcare.patient_registration.Patient_registration_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AppointmentService {
        @Autowired
        private Patient_registration_repo patientRegistrationRepository;
//
//        public List getPatientsByDoctorIdAndDate(String docId, LocalDate date) {
//            return patientRegistrationRepository.findByDocIdAndRegistrationDate(docId, date);
//        }
    }

