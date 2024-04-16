package com.example.healthcare.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class patientInfoDTO {
    // Getters and setters
    private Integer id;
    private Long bedId;
    public patientInfoDTO(Integer id, Long bedId) {
        this.id = id;
        this.bedId = bedId;
    }

}
