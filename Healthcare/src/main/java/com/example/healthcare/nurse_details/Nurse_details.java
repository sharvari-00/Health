package com.example.healthcare.nurse_details;

import com.example.healthcare.bed.Bed;
import com.example.healthcare.login.Login;
import io.swagger.v3.oas.annotations.info.Contact;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;

@Entity
@Data
@Table
@NoArgsConstructor
@Builder
@AllArgsConstructor
//@AllArgsConstructor

public class Nurse_details {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String fname;
    private String email;
    private String lname;
    private Time shift_starts;
    private Time shift_ends;

//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "bed_id",referencedColumnName = "id")
//    private Bed bed;
//
//    @OneToOne
//    @JoinColumn (name = "login_id" )
//    private Login login;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFname() {
        return fname;
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
}
