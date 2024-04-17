package com.example.healthcare.DTO;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class patientInfoDTO {
    // Getters and setters
    private Integer id;
    private String fname;
    private Long bedId;

    public patientInfoDTO(Integer id, String fname, Long bedId) {
        this.id = id;
        this.fname=fname;
        this.bedId = bedId;
    }

}

