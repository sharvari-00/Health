package com.example.healthcare.prescription;

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
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer patientId;
    private String pre_text;

    public Integer getId() {
        return id;
    }
    public Integer getPatientId() {
        return patientId;
    }

    public String getPre_text() {
        return pre_text;
    }

    public void setId(Integer id) {

        this.id = id;
    }

    public void setPre_text(String pre_text) {
        this.pre_text = pre_text;
    }

}
