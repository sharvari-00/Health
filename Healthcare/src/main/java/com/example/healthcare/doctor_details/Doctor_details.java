package com.example.healthcare.doctor_details;


import com.example.healthcare.login.Login;
import com.example.healthcare.patient_registration.Patient_registration;
import io.swagger.v3.oas.annotations.info.Contact;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Time;
import java.util.List;
import java.util.Set;

@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Doctor_details {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String fname;
    private String lname;
    private String email;
    private Time shift_starts;
    private Time shift_ends;
    private String dept_name;



    @OneToOne(mappedBy = "doctor_details", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Login login;

<<<<<<< HEAD
=======
    @OneToMany(mappedBy = "doctor")
>>>>>>> 341eff551180fd7182610c02ba89c9c0d7a59ce5


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFname() {
        return fname;
    }

    public Login getLogin() {
        return login;
    }

    public void setLogin(Login login) {
        this.login = login;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public Time getShift_starts() {
        return shift_starts;
    }

    public void setShift_starts(Time shift_starts) {
        this.shift_starts = shift_starts;
    }

    public Time getShift_ends() {
        return shift_ends;
    }

    public void setShift_ends(Time shift_ends) {
        this.shift_ends = shift_ends;
    }

    public String getDept_name() {
        return dept_name;
    }

    public void setDept_name(String dept_name) {

        this.dept_name = dept_name;
    }

<<<<<<< HEAD
//    public List<Appointment> getAppointments() {
//        return appointments;
//    }
//
//    public void setAppointments(List<Appointment> appointments) {
//        this.appointments = appointments;
//    }

    //    @OneToOne
//    @JoinColumn (name = "login_id" )
//    private Login login;
//    @OneToMany(mappedBy = "doctor_details")
//    private Set<Patient_registration> patient_registration;

=======
>>>>>>> 341eff551180fd7182610c02ba89c9c0d7a59ce5
}
