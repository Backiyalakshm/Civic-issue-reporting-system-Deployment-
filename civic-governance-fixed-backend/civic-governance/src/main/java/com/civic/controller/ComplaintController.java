package com.civic.controller;

import com.civic.dto.ComplaintRequest;
import com.civic.entity.Complaint;
import com.civic.entity.ComplaintUpdate;
import com.civic.service.ComplaintService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ComplaintController {
    
    @Autowired
    private ComplaintService complaintService;
    
    @PostMapping("/create")
    public ResponseEntity<Complaint> createComplaint(@Valid @RequestBody ComplaintRequest request) {
        Complaint complaint = complaintService.createComplaint(request);
        return ResponseEntity.ok(complaint);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        return ResponseEntity.ok(complaintService.getAllComplaints());
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Complaint>> getComplaintsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(complaintService.getComplaintsByUser(userId));
    }
    
    @GetMapping("/officer/{officerId}")
    public ResponseEntity<List<Complaint>> getComplaintsByOfficer(@PathVariable Long officerId) {
        return ResponseEntity.ok(complaintService.getComplaintsByOfficer(officerId));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getComplaintById(@PathVariable Long id) {
        return ResponseEntity.ok(complaintService.getComplaintById(id));
    }
    
    @PutMapping("/{id}/assign")
    public ResponseEntity<Complaint> assignComplaint(
            @PathVariable Long id,
            @RequestBody Map<String, Long> request) {
        Complaint complaint = complaintService.assignComplaint(id, request.get("officerId"));
        return ResponseEntity.ok(complaint);
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<Complaint> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, Object> request) {
        Complaint.Status status = Complaint.Status.valueOf((String) request.get("status"));
        String remarks = (String) request.get("remarks");
        Long updatedBy = Long.valueOf(request.get("updatedBy").toString());
        
        Complaint complaint = complaintService.updateComplaintStatus(id, status, remarks, updatedBy);
        return ResponseEntity.ok(complaint);
    }
    
    @GetMapping("/{id}/updates")
    public ResponseEntity<List<ComplaintUpdate>> getComplaintUpdates(@PathVariable Long id) {
        return ResponseEntity.ok(complaintService.getComplaintUpdates(id));
    }
    
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Long>> getStatistics() {
        return ResponseEntity.ok(complaintService.getComplaintStatistics());
    }
}
