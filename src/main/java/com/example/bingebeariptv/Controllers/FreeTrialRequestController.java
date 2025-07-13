package com.example.bingebeariptv.Controllers;

import com.example.bingebeariptv.DTOs.FreeTrialRequestDTO;
import com.example.bingebeariptv.Models.FreeTrialRequest;
import com.example.bingebeariptv.Respositories.FreeTrialRequestRepository;
import com.example.bingebeariptv.Services.FreeTrialRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/free-trial")
public class FreeTrialRequestController {

    @Autowired
    private FreeTrialRequestService freeTrialRequestService;
    @Autowired
    private FreeTrialRequestRepository freeTrialRequestRepository;

    @PostMapping("/request")
    public ResponseEntity<?> requestFreeTrial(@RequestBody FreeTrialRequestDTO requestDTO) {
        try {
            FreeTrialRequest request = freeTrialRequestService.createFreeTrialRequest(
                    requestDTO.getEmail(),
                    requestDTO.getFirstName(),
                    requestDTO.getWhatsappNumber()

            );
            freeTrialRequestService.sendVerificationEmail(requestDTO.getEmail(), requestDTO.getFirstName());
            return ResponseEntity.ok(request);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();

            String errorMessage = e.getMessage();
            String errorCode = null;

            if (errorMessage.contains("Email already in use")) {
                errorCode = "EMAIL_EXISTS";
            } else if (errorMessage.contains("WhatsApp number already in use")) {
                errorCode = "PHONE_EXISTS";
            }

            errorResponse.put("message", errorMessage);
            if (errorCode != null) {
                errorResponse.put("code", errorCode);
            }

            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        }
    }

    @GetMapping()
    public ResponseEntity<List<FreeTrialRequest>> getAllTrialRequests() {
        List<FreeTrialRequest> requests = freeTrialRequestRepository.findAll();
        return ResponseEntity.ok(requests);
    }
    @GetMapping("/verify")
    public String verifyFreeTrial(@RequestParam String token) {
        boolean isVerified = freeTrialRequestService.verifyFreeTrialRequest(token);
        if (isVerified) {
            return "Free trial request verified successfully!";
        }
        return "Verification failed or already verified.";
    }
}

