package com.civic.service;

import com.civic.entity.Complaint;
import com.civic.entity.Feedback;
import com.civic.entity.User;
import com.civic.repository.ComplaintRepository;
import com.civic.repository.FeedbackRepository;
import com.civic.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {
    
    @Autowired
    private FeedbackRepository feedbackRepository;
    
    @Autowired
    private ComplaintRepository complaintRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Feedback submitFeedback(Long complaintId, Long userId, Integer rating, String comment) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Feedback feedback = new Feedback();
        feedback.setComplaint(complaint);
        feedback.setUser(user);
        feedback.setRating(rating);
        feedback.setComment(comment);
        
        return feedbackRepository.save(feedback);
    }
    
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAllByOrderByCreatedAtDesc();
    }
    
    public Double getAverageRating() {
        Double avg = feedbackRepository.getAverageRating();
        return avg != null ? avg : 0.0;
    }
}
