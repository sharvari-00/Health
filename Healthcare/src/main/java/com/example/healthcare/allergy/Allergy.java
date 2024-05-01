package com.example.healthcare.allergy;

        import jakarta.persistence.*;
        import lombok.*;

        import java.util.Date;
@Setter
@Getter
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder
public class Allergy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer patientId;
    private String allergen;

    @Temporal(TemporalType.TIMESTAMP) // Optional for database storage as timestamp
    private Date diagnosisDate; // New field for date

}