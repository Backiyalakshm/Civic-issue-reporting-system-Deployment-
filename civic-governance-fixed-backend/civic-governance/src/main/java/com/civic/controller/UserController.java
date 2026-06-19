package com.civic.controller;

import com.civic.entity.User;
import com.civic.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user);
    }
    
    @GetMapping("/officers")
    public ResponseEntity<List<User>> getAllOfficers() {
        return ResponseEntity.ok(userRepository.findByRole(User.Role.OFFICER));
    }
    
    @GetMapping("/citizens")
    public ResponseEntity<List<User>> getAllCitizens() {
        return ResponseEntity.ok(userRepository.findByRole(User.Role.CITIZEN));
    }
}
