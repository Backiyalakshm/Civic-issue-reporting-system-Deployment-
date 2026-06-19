package com.civic.service;

import com.civic.dto.ComplaintRequest;
import com.civic.entity.Complaint;
import com.civic.entity.ComplaintUpdate;
import com.civic.entity.User;
import com.civic.repository.ComplaintRepository;
import com.civic.repository.ComplaintUpdateRepository;
import com.civic.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class ComplaintService {
    
    @Autowired
    private ComplaintRepository complaintRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ComplaintUpdateRepository complaintUpdateRepository;
    
    public Complaint createComplaint(ComplaintRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Complaint complaint = new Complaint();
        complaint.setUser(user);
        complaint.setTitle(request.getTitle());
        complaint.setDescription(request.getDescription());
        complaint.setCategory(request.getCategory());
        complaint.setLocation(request.getLocation());
        complaint.setLatitude(request.getLatitude());
        complaint.setLongitude(request.getLongitude());
        complaint.setPriority(request.getPriority() != null ? request.getPriority() : Complaint.Priority.MEDIUM);
        complaint.setImageUrl(request.getImageUrl());
        complaint.setStatus(Complaint.Status.SUBMITTED);
        
        return complaintRepository.save(complaint);
    }
    
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }
    
    public List<Complaint> getComplaintsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return complaintRepository.findByUser(user);
    }
    
    public List<Complaint> getComplaintsByOfficer(Long officerId) {
        User officer = userRepository.findById(officerId)
                .orElseThrow(() -> new RuntimeException("Officer not found"));
        return complaintRepository.findByAssignedOfficer(officer);
    }
    
    public Complaint assignComplaint(Long complaintId, Long officerId) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
        User officer = userRepository.findById(officerId)
                .orElseThrow(() -> new RuntimeException("Officer not found"));
        
        complaint.setAssignedOfficer(officer);
        complaint.setStatus(Complaint.Status.ASSIGNED);
        
        return complaintRepository.save(complaint);
    }
    
    public Complaint updateComplaintStatus(Long complaintId, Complaint.Status status, String remarks, Long updatedBy) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
        User user = userRepository.findById(updatedBy)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        complaint.setStatus(status);
        if (status == Complaint.Status.RESOLVED) {
            complaint.setResolvedAt(LocalDateTime.now());
        }
        
        Complaint savedComplaint = complaintRepository.save(complaint);
        
        // Create update log
        ComplaintUpdate update = new ComplaintUpdate();
        update.setComplaint(complaint);
        update.setUpdatedBy(user);
        update.setStatus(status);
        update.setRemarks(remarks);
        complaintUpdateRepository.save(update);
        
        return savedComplaint;
    }
    
    public List<ComplaintUpdate> getComplaintUpdates(Long complaintId) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
        return complaintUpdateRepository.findByComplaintOrderByUpdatedAtDesc(complaint);
    }
    
    public Complaint getComplaintById(Long id) {
        return complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
    }
    
    public Map<String, Long> getComplaintStatistics() {
        Long total = complaintRepository.count();
        Long submitted = complaintRepository.countByStatus(Complaint.Status.SUBMITTED);
        Long assigned = complaintRepository.countByStatus(Complaint.Status.ASSIGNED);
        Long inProgress = complaintRepository.countByStatus(Complaint.Status.IN_PROGRESS);
        Long resolved = complaintRepository.countByStatus(Complaint.Status.RESOLVED);
        Long escalated = complaintRepository.countByStatus(Complaint.Status.ESCALATED);
        
        return Map.of(
            "total", total,
            "submitted", submitted,
            "assigned", assigned,
            "inProgress", inProgress,
            "resolved", resolved,
            "escalated", escalated
        );
    }
}
