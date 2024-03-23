package com.example.healthcare;

import com.example.healthcare.login.Login;
import com.example.healthcare.login.Login_repo;
import com.example.healthcare.login.Role;
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

//    @Bean
//    public CommandLineRunner commandLineRunner(Login_repo login_repo){
//        return runner->
//                createLogin(login_repo);
//    }
//
//    private void createLogin(Login_repo login_repo) {
//        System.out.println("Creating new login:......");
//        Login login1 = new Login("Sejal@gmail.com", "1234", Role.ADMIN);
//        System.out.println("Saving the ADMIN...");
//        login_repo.save(login1);
//        System.out.println("Saved student generated ID: " + login1.getId());
//    }

}
