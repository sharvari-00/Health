package com.example.healthcare.dto;

import com.example.healthcare.patient_registration.Patient_registration;
import com.example.healthcare.prescription.Prescription;
import com.example.healthcare.symptoms.Symptoms;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Setter
@Getter

public class PatientDetailsDTO {
    private Patient_registration patientRegistration;
    private List<Symptoms> symptoms;
    private List<Prescription> prescriptions;

    public PatientDetailsDTO() {
    }

    public PatientDetailsDTO(Patient_registration patientRegistration, List<Symptoms> symptoms, List<Prescription> prescriptions) {
        this.patientRegistration = patientRegistration;
        this.symptoms = symptoms;
        this.prescriptions = prescriptions;
    }

}
