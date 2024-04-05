package com.example.healthcare.patient_registration;
import com.example.healthcare.doctor_details.Doctor_details;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
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
    private String doc_id;
    @Getter
    private String address_line;
    @Getter
    private String city;
    @Getter
    private String state;
//    @ManyToOne
//    @JoinColumn(name = "doctor_details_id",nullable = false)
//    private Doctor_details doctor_details;


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

    public void setAddress_line(String address_line) {
        this.address_line = address_line;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setState(String state) {
        this.state = state;
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
                ", address_line='" + address_line + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                '}';
    }
}
