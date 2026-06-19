package com.civic.dto;

import com.civic.entity.User;

public class AuthResponse {

    private String token;
    private Long userId;
    private String name;
    private String email;
    private User.Role role;
    private String ward;

    public AuthResponse() {}

    public AuthResponse(String token, Long userId, String name, String email, User.Role role, String ward) {
        this.token = token; this.userId = userId; this.name = name;
        this.email = email; this.role = role; this.ward = ward;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public User.Role getRole() { return role; }
    public void setRole(User.Role role) { this.role = role; }

    public String getWard() { return ward; }
    public void setWard(String ward) { this.ward = ward; }
}
