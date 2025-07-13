package com.example.bingebeariptv.Controllers;


import com.example.bingebeariptv.Models.FreeTrialRequest;
import com.example.bingebeariptv.Models.IptvPlan;
import com.example.bingebeariptv.Models.Order;
import com.example.bingebeariptv.Respositories.FreeTrialRequestRepository;
import com.example.bingebeariptv.Respositories.OrderRepository;
import com.example.bingebeariptv.Services.IptvPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private IptvPlanService planService;



    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private FreeTrialRequestRepository freeTrialRequestRepository;

    @GetMapping("/plans")
    public List<IptvPlan> getAllPlans() {
        return planService.getAllPlans();
    }

    @GetMapping("/free-trial")
    public ResponseEntity<List<FreeTrialRequest>> getAllTrialRequests() {
        List<FreeTrialRequest> requests = freeTrialRequestRepository.findAll();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
