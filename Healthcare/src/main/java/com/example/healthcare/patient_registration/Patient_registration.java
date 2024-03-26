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
@AllArgsConstructor
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


    public Integer getId() {
        return id;
    }

    public String getFname() {
        return fname;
    }

    public String getLname() {
        return lname;
    }

    public Integer getAge() {
        return age;
    }

    public String getGender() {
        return gender;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public String getEmail_id() {
        return email_id;
    }

    public Boolean getConsent() {
        return consent;
    }

    public String getDoc_id() {
        return doc_id;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public void setEmail_id(String email_id) {
        this.email_id = email_id;
    }

    public void setConsent(Boolean consent) {
        this.consent = consent;
    }

    public void setDoc_id(String doc_id) {
        this.doc_id = doc_id;
    }

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
                ", doc_id='" + doc_id + '\'' +
                '}';
    }
}
