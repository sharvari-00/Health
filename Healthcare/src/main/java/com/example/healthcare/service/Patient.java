package com.example.healthcare.service;

public class Patient {
    private Integer id;
    private String name;

    private Integer age;
    private String gender;

    // Constructor
    public Patient() {
        // Default constructor
    }



    // Setters
    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }
    public void setAge(Integer age) {
        this.age = age;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
