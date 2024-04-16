package com.example.healthcare.login;

import com.example.healthcare.doctor_details.Doctor_details;
import com.example.healthcare.nurse_details.Nurse_details;
import com.example.healthcare.pharmacist_details.Pharmacist_details;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Builder
@Table
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Login implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", referencedColumnName = "id")
    private Doctor_details doctor_details;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="nurse_id")
    private Nurse_details nurse_details;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="pharmacist_id")
    private Pharmacist_details pharmacist_details;

    public Login(String email, String password, Role role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setDoctor_details(Doctor_details doctor_details) {
        this.doctor_details = doctor_details;
    }

    public void setNurse_details(Nurse_details nurse_details) {
        this.nurse_details = nurse_details;
    }

    public void setPharmacist_details(Pharmacist_details pharmacist_details) {
        this.pharmacist_details = pharmacist_details;
    }

    public Integer getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }

    public Doctor_details getDoctor_details() {
        return doctor_details;
    }

    public Nurse_details getNurse_details() {
        return nurse_details;
    }

    public Pharmacist_details getPharmacist_details() {
        return pharmacist_details;
    }

    public Integer getDoctorId() {
        return id;
    }

//    public void setDocId(Integer id) {
//        this.doctor_details = id;
//    }
}
