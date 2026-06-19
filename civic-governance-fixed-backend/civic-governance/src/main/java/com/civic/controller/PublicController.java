package com.civic.controller;

import com.civic.entity.Complaint;
import com.civic.repository.ComplaintRepository;
import com.civic.service.ComplaintService;
import com.civic.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class PublicController {
    
    @Autowired
    private ComplaintService complaintService;
    
    @Autowired
    private ComplaintRepository complaintRepository;
    
    @Autowired
    private FeedbackService feedbackService;
    
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getPublicDashboard() {
        Map<String, Object> dashboard = new HashMap<>();
        
        Map<String, Long> stats = complaintService.getComplaintStatistics();
        dashboard.put("statistics", stats);
        
        // Category distribution
        List<Object[]> categoryData = complaintRepository.countByCategory();
        Map<String, Long> categoryDistribution = new HashMap<>();
        for (Object[] row : categoryData) {
            categoryDistribution.put((String) row[0], (Long) row[1]);
        }
        dashboard.put("categoryDistribution", categoryDistribution);
        
        // Resolution percentage
        long total = stats.get("total");
        long resolved = stats.get("resolved");
        double resolutionPercentage = total > 0 ? (resolved * 100.0 / total) : 0;
        dashboard.put("resolutionPercentage", resolutionPercentage);
        
        // Average rating
        dashboard.put("averageRating", feedbackService.getAverageRating());
        
        return ResponseEntity.ok(dashboard);
    }
    
    @GetMapping("/complaints")
    public ResponseEntity<List<Complaint>> getPublicComplaints() {
        return ResponseEntity.ok(complaintRepository.findAll());
    }
}
