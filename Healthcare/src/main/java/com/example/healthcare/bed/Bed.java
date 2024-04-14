package com.example.healthcare.bed;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
