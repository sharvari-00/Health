package com.example.healthcare.nurse_details;

import com.example.healthcare.bed.Bed;
import com.example.healthcare.login.Login;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;

@Entity
@Data
@Table
@NoArgsConstructor
//@AllArgsConstructor

public class Nurse_details {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String fname;
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


    public Nurse_details(Integer id, String fname, String lname, Time shift_starts, Time shift_ends) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.shift_starts = shift_starts;
        this.shift_ends = shift_ends;
    }
}
