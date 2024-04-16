package com.example.healthcare.bed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class BedDataInitializer implements CommandLineRunner {

    private final BedRepository bedRepository;

    @Autowired
    public BedDataInitializer(BedRepository bedRepository) {
        this.bedRepository = bedRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        initializeDefaultBeds();
    }

    private void initializeDefaultBeds() {
        for (int i = 0; i < 5; i++) {
            Bed bed = new Bed();
            // Customize other properties if needed
            bedRepository.save(bed);
        }
    }
}
