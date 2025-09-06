
package com.example.Support_portal.service.impl;

import com.example.Support_portal.config.JwtService;
import com.example.Support_portal.dto.AuthRequestDto;
import com.example.Support_portal.dto.AuthResponseDto;
import com.example.Support_portal.dto.RegisterRequestDto;
import com.example.Support_portal.dto.UserDto;
import com.example.Support_portal.entity.User;
import com.example.Support_portal.enumeration.Role;
import com.example.Support_portal.mapper.UserMapper;
import com.example.Support_portal.repository.UserRepository;
import com.example.Support_portal.service.AuthService;
import com.example.Support_portal.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    public AuthResponseDto register(RegisterRequestDto registerRequest) {
        // Check if username already exists
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            return new AuthResponseDto(null, null, null, "Username already exists");
        }

        // Check if email already exists
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            return new AuthResponseDto(null, null, null, "Email already exists");
        }

        // Create new user
        User user = new User();
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        
        // Convert string role to enum
        try {
            user.setRole(Role.valueOf(registerRequest.getRole().toUpperCase()));
        } catch (IllegalArgumentException e) {
            user.setRole(Role.USER); // Default role if invalid
        }
        
        user.setStatus("ACTIVE");
        user.setPhotoUrl(registerRequest.getPhotoUrl());

        User savedUser = userRepository.save(user);

        // Generate JWT token
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(savedUser.getUsername());
        String token = jwtService.generateToken(userDetails);

        return new AuthResponseDto(token, savedUser.getUsername(), savedUser.getRole().name(), "User registered successfully");
    }

    @Override
    public AuthResponseDto login(AuthRequestDto authRequest) {
        try {
            // Authenticate user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getUsername(),
                            authRequest.getPassword()
                    )
            );

            // Load user details
            User user = userRepository.findByUsername(authRequest.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Check if user is active
            if (!"ACTIVE".equalsIgnoreCase(user.getStatus())) {
                return new AuthResponseDto(null, null, null, "User account is inactive");
            }

            // Generate JWT token
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getUsername());
            String token = jwtService.generateToken(userDetails);

            return new AuthResponseDto(token, user.getUsername(), user.getRole().name(), "Login successful");

        } catch (Exception e) {
            return new AuthResponseDto(null, null, null, "Invalid username or password");
        }
    }

    @Override
    public UserDto getCurrentUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return UserMapper.mapToDto(user);
    }
}