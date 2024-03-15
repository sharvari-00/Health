package com.example.healthcare.doctor_details;

import com.example.healthcare.login.Login;
import com.example.healthcare.patient_registration.Patient_registration;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Set;

@Entity
@Table
@NoArgsConstructor
//@AllArgsConstructor
@Data
public class Doctor_details {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String fname;
    private String lname;
    private Time shift_starts;
    private Time shift_ends;
    private Integer Dept_no;
//    @OneToOne
//    @JoinColumn (name = "login_id" )
//    private Login login;
//    @OneToMany(mappedBy = "doctor_details")
//    private Set<Patient_registration> patient_registration;
    public Doctor_details(Integer id, String fname, String lname, Time shift_starts, Time shift_ends, Integer dept_no) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.shift_starts = shift_starts;
        this.shift_ends = shift_ends;
        Dept_no = dept_no;
    }
}
