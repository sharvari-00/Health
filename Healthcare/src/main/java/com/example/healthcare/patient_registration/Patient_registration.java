package com.example.healthcare.patient_registration;

import com.example.healthcare.consulation_details.Consulation_details;
import com.example.healthcare.doctor_details.Doctor_details;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@NoArgsConstructor
//@AllArgsConstructor
@Data
public class Patient_registration {
    @Id
    @GeneratedValue
    private Integer id;
    private String fname;
    private String lname;
    private Integer age;
    private String gender;
    private String phone_number;
    private String email_id;
    private Boolean consent;
    private String doc_id;
//    @ManyToOne
//    @JoinColumn(name = "doctor_details_id",nullable = false)
//    private Doctor_details doctor_details;

    public Patient_registration(Integer id, String fname, String lname, Integer age, String gender, String phone_number, String email_id, Boolean consent, String doc_id) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.age = age;
        this.gender = gender;
        this.phone_number = phone_number;
        this.email_id = email_id;
        this.consent = consent;
        this.doc_id = doc_id;
    }
}
