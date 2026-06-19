package com.civic.repository;

import com.civic.entity.Complaint;
import com.civic.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByUser(User user);
    List<Complaint> findByAssignedOfficer(User officer);
    List<Complaint> findByStatus(Complaint.Status status);
    List<Complaint> findByCategory(String category);
    
    @Query("SELECT COUNT(c) FROM Complaint c WHERE c.status = ?1")
    Long countByStatus(Complaint.Status status);
    
    @Query("SELECT c.category, COUNT(c) FROM Complaint c GROUP BY c.category")
    List<Object[]> countByCategory();
}
