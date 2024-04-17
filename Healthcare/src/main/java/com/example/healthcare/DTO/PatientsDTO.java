package com.example.healthcare.DTO;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class PatientsDTO {
    private Long patientId;
    private String name;
    private Integer age;
    private String gender;
}