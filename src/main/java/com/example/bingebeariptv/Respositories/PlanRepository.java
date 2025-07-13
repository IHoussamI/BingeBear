package com.example.bingebeariptv.Respositories;

import com.example.bingebeariptv.Models.IptvPlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<IptvPlan, Long> {
}
