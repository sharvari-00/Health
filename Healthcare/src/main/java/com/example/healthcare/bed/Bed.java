package com.example.healthcare.bed;
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
    private Long BedId;

    private Boolean occupied = false;

//    @OneToOne(mappedBy = "bed")
//    private Nurse_details nurse_details;
//
//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "consultation_details_id",referencedColumnName = "id")
//    private Consulation_details consulation_details;


//    @Override
//    public String toString() {
//        return "Bed{" +
//                "id=" + id +
//                ", nurse_id=" + nurse_id +
//                ", doc_id=" + doc_id +
//                '}';
//    }
}
