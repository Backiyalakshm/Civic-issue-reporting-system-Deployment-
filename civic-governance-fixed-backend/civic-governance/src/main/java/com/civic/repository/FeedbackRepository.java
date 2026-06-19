package com.civic.repository;

import com.civic.entity.Complaint;
import com.civic.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    Optional<Feedback> findByComplaint(Complaint complaint);
    
    @Query("SELECT AVG(f.rating) FROM Feedback f")
    Double getAverageRating();
    
    List<Feedback> findAllByOrderByCreatedAtDesc();
}
