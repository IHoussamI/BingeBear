package com.example.bingebeariptv.DTOs;

import lombok.Data;

@Data
public class FreeTrialRequestDTO {
    private String email;
    private String firstName;
    private Long whatsappNumber;
}