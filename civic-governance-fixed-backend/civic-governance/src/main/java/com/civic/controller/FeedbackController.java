package com.civic.controller;

import com.civic.entity.Feedback;
import com.civic.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class FeedbackController {
    
    @Autowired
    private FeedbackService feedbackService;
    
    @PostMapping("/submit")
    public ResponseEntity<Feedback> submitFeedback(@RequestBody Map<String, Object> request) {
        Long complaintId = Long.valueOf(request.get("complaintId").toString());
        Long userId = Long.valueOf(request.get("userId").toString());
        Integer rating = Integer.valueOf(request.get("rating").toString());
        String comment = (String) request.get("comment");
        
        Feedback feedback = feedbackService.submitFeedback(complaintId, userId, rating, comment);
        return ResponseEntity.ok(feedback);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        return ResponseEntity.ok(feedbackService.getAllFeedback());
    }
    
    @GetMapping("/average-rating")
    public ResponseEntity<Map<String, Double>> getAverageRating() {
        return ResponseEntity.ok(Map.of("averageRating", feedbackService.getAverageRating()));
    }
}
