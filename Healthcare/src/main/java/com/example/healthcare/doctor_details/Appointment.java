package com.example.healthcare.doctor_details;

import com.example.healthcare.patient_registration.Patient_registration;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor_details doctor;
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient_registration patient;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Doctor_details getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor_details doctor) {
        this.doctor = doctor;
    }

    public Patient_registration getPatient() {
        return patient;
    }

    public void setPatient(Patient_registration patient) {
        this.patient = patient;
    }
}
