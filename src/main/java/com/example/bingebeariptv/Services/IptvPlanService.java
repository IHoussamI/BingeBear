package com.example.bingebeariptv.Services;

import com.example.bingebeariptv.Models.IptvPlan;
import com.example.bingebeariptv.Respositories.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IptvPlanService {

    @Autowired
    private PlanRepository planRepository;

    public List<IptvPlan> getAllPlans() {
        return planRepository.findAll();

    }
}
