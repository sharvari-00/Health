package com.example.healthcare.reports;

import com.example.healthcare.patient_registration.Patient_registration;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;

@Entity
@Builder
@Table
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Reports {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer patient_id;
    @Lob
    @Column(length = 2000)
    private byte[] images;

    public Integer getPatient_id() {
        return patient_id;
    }

    public byte[] getImages() {
        return images;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setPatient_id(Integer patient_id) {
        this.patient_id = patient_id;
    }

    public void setImages(byte[] images) {
        this.images = images;
    }

    public void setPatient(Patient_registration patient_registration) {
    }
}