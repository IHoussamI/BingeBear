package com.example.bingebeariptv.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "free_trial_requests")
public class FreeTrialRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false , unique = true)
    private String email;

    @Column(nullable = true)
    private String firstName;

    @Column(nullable = false,unique = true)
    private Long whatsappNumber;

    @Column(nullable = false)
    private boolean verified = false;

}
