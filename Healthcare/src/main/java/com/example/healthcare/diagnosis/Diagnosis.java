package com.example.healthcare.diagnosis;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder
public class Diagnosis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer patientId;
    private String dia_text;

    public Integer getId() {
        return id;
    }
    public Integer getPatient_id() {
        return patientId;
    }

    public String getDia_text() {
        return dia_text;
    }

    public void setId(Integer id) {

        this.id = id;
    }

    public void setDia_text(String dia_text) {
        this.dia_text = dia_text;
    }

}


