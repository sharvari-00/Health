package com.example.healthcare.symptoms;

import jakarta.persistence.*;
import lombok.*;

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

    public Integer getPatient_id() {
        return patientId;
    }

    public void setPatient_id(Integer patient_id) {
        this.patientId = patient_id;
    }

}
