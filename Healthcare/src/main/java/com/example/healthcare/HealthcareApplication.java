package com.example.healthcare;

import com.example.healthcare.login.Login;
import com.example.healthcare.login.Login_repo;
import com.example.healthcare.login.Role;
import com.example.healthcare.patient_registration.Patient_registration;
import com.example.healthcare.patient_registration.Patient_registration_repo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
//@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class HealthcareApplication {

    public static void main(String[] args) {
        SpringApplication.run(HealthcareApplication.class, args);
    }
    @Bean
    public CommandLineRunner dataInitializer(Patient_registration_repo patientRegistrationRepo){
        return args -> {
            Patient_registration patientRegistration = new Patient_registration();
            patientRegistration.setFname("Raj");
            patientRegistration.setLname("Sharma");
            patientRegistration.setAge(33);
            patientRegistration.setGender("Male");
            patientRegistration.setPhone_number("1234567890");
            patientRegistration.setEmail_id("raj@gmail.com");
            patientRegistration.setConsent(true);
            patientRegistration.setDoc_id("1");
            patientRegistrationRepo.save(patientRegistration);

            Patient_registration patientRegistration2 = new Patient_registration();
            patientRegistration2.setFname("Shyam");
            patientRegistration2.setLname("Sharma");
            patientRegistration2.setAge(35);
            patientRegistration2.setGender("Male");
            patientRegistration2.setPhone_number("1234567899");
            patientRegistration2.setEmail_id("shyam@gmail.com");
            patientRegistration2.setConsent(false);
            patientRegistration2.setDoc_id("1");
            patientRegistrationRepo.save(patientRegistration2);
        };
    }

}
