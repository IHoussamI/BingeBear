package com.example.bingebeariptv.Respositories;

import com.example.bingebeariptv.Models.FreeTrialRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FreeTrialRequestRepository extends JpaRepository<FreeTrialRequest, Long> {
    FreeTrialRequest findByEmail(String email);


    FreeTrialRequest findByWhatsappNumber(Long whatsappNumber);
}
