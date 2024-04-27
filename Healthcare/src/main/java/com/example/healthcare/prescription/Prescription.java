package com.example.healthcare.prescription;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer patientId;
    private String pre_text;
    @Temporal(TemporalType.TIMESTAMP) // Optional for database storage as timestamp
    private Date prescriptionDate; // New field for date

    public Integer getId() {
        return id;
    }
    public Integer getPatient_id() {
        return patientId;
    }

    public String getPre_text() {
        return pre_text;
    }

    public Date getPrescriptionDate() {
        return prescriptionDate;
    }

    public void setPrescriptionDate(Date prescriptionDate) {
        this.prescriptionDate = prescriptionDate;
    }

    public void setId(Integer id) {

        this.id = id;
    }

    public void setPre_text(String pre_text) {
        this.pre_text = pre_text;
    }

}
