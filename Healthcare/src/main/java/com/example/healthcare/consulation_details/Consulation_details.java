package com.example.healthcare.consulation_details;

import com.example.healthcare.bed.Bed;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
//@AllArgsConstructor
@NoArgsConstructor
@Data
public class Consulation_details {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String fname;
    private String lname;
    private Integer age;
    private String gender;
    private boolean consent;
//    @OneToOne(mappedBy = "consultation_details")
//    private Bed bed;

    public Consulation_details(Integer id, String fname, String lname, Integer age, String gender, boolean consent) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.age = age;
        this.gender = gender;
        this.consent = consent;
    }
}
