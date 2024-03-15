package com.example.healthcare.bed;

import com.example.healthcare.consulation_details.Consulation_details;
import com.example.healthcare.nurse_details.Nurse_details;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;

@Entity
@Table
@NoArgsConstructor
//@AllArgsConstructor
@Data
public class Bed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String prescription;
    private String treatment;
    private Blob reports;
//    @OneToOne(mappedBy = "bed")
//    private Nurse_details nurse_details;
//
//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "consultation_details_id",referencedColumnName = "id")
//    private Consulation_details consulation_details;

    public Bed(Integer id, String prescription, String treatment, Blob reports) {
        this.id = id;
        this.prescription = prescription;
        this.treatment = treatment;
        this.reports = reports;
    }
}
