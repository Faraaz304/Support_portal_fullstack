

package com.example.Support_portal.service.impl;

import com.example.Support_portal.dto.UserDto;
import com.example.Support_portal.entity.User;
import com.example.Support_portal.enumeration.Role;
import com.example.Support_portal.mapper.UserMapper;
import com.example.Support_portal.repository.UserRepository;
import com.example.Support_portal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDto CreateUser(UserDto userDto) {
        // Check if username already exists
        if (userRepository.findByUsername(userDto.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists: " + userDto.getUsername());
        }
        
        // Check if email already exists
        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists: " + userDto.getEmail());
        }

        User user = UserMapper.mapToEntity(userDto);
        // Encrypt password
        if (user.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        // Set default status if not provided
        if (user.getStatus() == null || user.getStatus().isEmpty()) {
            user.setStatus("ACTIVE");
        }
        
        User savedUser = userRepository.save(user);
        return UserMapper.mapToDto(savedUser);
    }

    @Override
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return UserMapper.mapToDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto updateUser(Long id, UserDto userDto) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Check if username is being changed and if it already exists
        if (!existingUser.getUsername().equals(userDto.getUsername())) {
            if (userRepository.findByUsername(userDto.getUsername()).isPresent()) {
                throw new RuntimeException("Username already exists: " + userDto.getUsername());
            }
        }
        
        // Check if email is being changed and if it already exists
        if (!existingUser.getEmail().equals(userDto.getEmail())) {
            if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
                throw new RuntimeException("Email already exists: " + userDto.getEmail());
            }
        }

        existingUser.setFirstName(userDto.getFirstName());
        existingUser.setLastName(userDto.getLastName());
        existingUser.setUsername(userDto.getUsername());
        existingUser.setEmail(userDto.getEmail());
        
        // Only update password if it's provided and not null
        if (userDto.getPassword() != null && !userDto.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        }
        
        // Convert string role to enum if role is being updated
        if (userDto.getRole() != null) {
            try {
                existingUser.setRole(Role.valueOf(userDto.getRole().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid role: " + userDto.getRole());
            }
        }
        
        existingUser.setStatus(userDto.getStatus());
        existingUser.setPhotoUrl(userDto.getPhotoUrl());

        User updatedUser = userRepository.save(existingUser);
        return UserMapper.mapToDto(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        userRepository.delete(existingUser);
    }
}