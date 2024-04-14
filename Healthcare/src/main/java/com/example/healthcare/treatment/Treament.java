package com.example.healthcare.treatment;

import com.example.healthcare.patient_registration.Patient_registration;
import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Entity
@Builder
@Table
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Treament {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer patientId;
    @ManyToOne
    @JoinColumn(name = "Patient_registration_id",referencedColumnName = "id", nullable = false) // Assuming foreign key column is named patient_registration_id
    private Patient_registration patientRegistration;
    private String tre_text;

    public void setPatientId(int patientId) {

    }
}
