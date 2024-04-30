package com.example.healthcare.symptoms;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Builder
@Table
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Symptoms {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer patientId;
    @Setter
    @Getter
    private String sym_text;
    @Getter
    @Setter
    @Temporal(TemporalType.TIMESTAMP) // Optional for database storage as timestamp
    private Date symptomDate;
    public Integer getPatient_id() {
        return patientId;
    }


    public void setSymptomDate(Date symptomDate) {
        this.symptomDate = symptomDate;
    }


    public void setPatient_id(Integer patient_id) {
        this.patientId = patient_id;
    }

}
