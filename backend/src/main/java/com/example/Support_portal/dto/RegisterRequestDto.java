package com.example.Support_portal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDto {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private String role = "USER"; // Default role
    private String photoUrl;
}