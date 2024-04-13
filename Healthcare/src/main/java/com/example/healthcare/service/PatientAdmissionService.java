package com.example.healthcare.service;

import com.example.healthcare.bed.Bed;
import com.example.healthcare.bed.BedRepository;
import com.example.healthcare.patient_registration.Patient_registration;
import com.example.healthcare.patient_registration.Patient_registration_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PatientAdmissionService {
    private final Patient_registration_repo patientRegistrationRepo;
    private final BedRepository bedRepository;

    @Autowired
    public PatientAdmissionService(Patient_registration_repo patientRegistrationRepo, BedRepository bedRepository) {
        this.patientRegistrationRepo = patientRegistrationRepo;
        this.bedRepository = bedRepository;
    }

    public void admitPatient(Long patientId) {
        Optional<Patient_registration> patientOptional = patientRegistrationRepo.findById(patientId);
        if (patientOptional.isPresent()) {
            Patient_registration patient = patientOptional.get();
            patient.setAdmitted(true);
            patientRegistrationRepo.save(patient);
            allocateBed(patient);
        } else {
            throw new RuntimeException("Patient with ID " + patientId + " not found.");
        }
    }

    public void dischargePatient(Integer patientId) {
        Optional<Patient_registration> optionalPatient = patientRegistrationRepo.findById(patientId.longValue());
        if (optionalPatient.isPresent()) {
            Patient_registration patient = optionalPatient.get();
            if (patient.getAdmitted()) {
                patient.setAdmitted(false); // Mark the patient as discharged
                patient.setBedId(null); // Release the bed
                patientRegistrationRepo.save(patient);

                // Find the bed assigned to the discharged patient and mark it as unoccupied
                Long bedId = patient.getBedId();
                if (bedId != null) {
                    Optional<Bed> optionalBed = bedRepository.findById(bedId);
                    if (optionalBed.isPresent()) {
                        Bed bed = optionalBed.get();
                        bed.setOccupied(false);
                        bedRepository.save(bed);
                    }
                }
            } else {
                throw new IllegalStateException("Patient is not admitted");
            }
        } else {
            throw new IllegalArgumentException("Patient not found with ID: " + patientId);
        }
    }

    private void allocateBed(Patient_registration patient) {
        Optional<Bed> availableBedOptional = bedRepository.findFirstByOccupiedFalse();
        if (availableBedOptional.isPresent()) {
            Bed bed = availableBedOptional.get();
            bed.setOccupied(true);
            patient.setBedId(bed.getBedId()); // Set bedId directly without converting to int
            bedRepository.save(bed);
            patientRegistrationRepo.save(patient);
        } else {
            throw new RuntimeException("No available beds.");
        }
    }

//    private void allocateBed(Patient_registration patient) {
//        Optional<Bed> availableBedOptional = bedRepository.findFirstByOccupiedFalse();
//        if (availableBedOptional.isPresent()) {
//            Bed bed = availableBedOptional.get();
//            bed.setOccupied(true);
//            patient.setBedId(bed.getBedId());
//            bedRepository.save(bed);
//            patientRegistrationRepo.save(patient);
//        } else {
//            throw new RuntimeException("No available beds.");
//        }
//    }
}
