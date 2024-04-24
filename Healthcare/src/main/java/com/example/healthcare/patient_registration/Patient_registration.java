package com.example.healthcare.patient_registration;

import com.example.healthcare.doctor_details.Doctor_details;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table
@NoArgsConstructor
@Data
public class Patient_registration {
    @Id
    @GeneratedValue
    private Integer id;

    @Getter
    private String fname;

    @Getter
    private String lname;

    @Getter
    private Integer age;

    @Getter
    private String gender;

    @Getter
    private String phone_number;

    @Getter
    private String email_id;

    @Getter
    private Boolean consent;

    @Getter
    private String docId;

    @Getter
    private String address_line;

    @Getter
    private String city;

    @Getter
    private String state;

    @Getter
    private LocalDate registrationDate=LocalDate.now();
    @Getter
    private LocalTime registrationTime=LocalTime.now();

    @Getter
    private Boolean admitted = false;
    @Getter
    private Long bedId; // Integer to store the bed id
    // Constructor including new fields
    public Patient_registration(Integer id, String fname, String lname, Integer age, String gender, String phone_number,
                                String email_id, Boolean consent, String doc_id, String address_line, String city,
                                String state, LocalDate registrationDate, LocalTime registrationTime) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.age = age;
        this.gender = gender;
        this.phone_number = phone_number;
        this.email_id = email_id;
        this.consent = consent;
        this.docId = docId;
        this.address_line = address_line;
        this.city = city;
        this.state = state;

        this.admitted = admitted;
        this.bedId = bedId;


        // Set registrationDate to current date only if not provided
        this.registrationDate = registrationDate != null ? registrationDate : LocalDate.now();

        // Set registrationTime to current time only if not provided
        this.registrationTime = registrationTime != null ? registrationTime : LocalTime.now();
    }

    // Update setters for new fields
    public void setRegistrationDate(LocalDate registrationDate) {
        this.registrationDate = registrationDate;
    }

    public void setRegistrationTime(LocalTime registrationTime) {
        this.registrationTime = registrationTime;
    }

    // Other existing setters...

    @Override
    public String toString() {
        return "Patient_registration{" +
                "id=" + id +
                ", fname='" + fname + '\'' +
                ", lname='" + lname + '\'' +
                ", age=" + age +
                ", gender='" + gender + '\'' +
                ", phone_number='" + phone_number + '\'' +
                ", email_id='" + email_id + '\'' +
                ", consent=" + consent +
                ", docId='" + docId + '\'' +
                ", address_line='" + address_line + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", registrationDate=" + registrationDate +
                ", registrationTime=" + registrationTime +
                '}';
    }

    public void setPatientId(Integer id) {
    }
}