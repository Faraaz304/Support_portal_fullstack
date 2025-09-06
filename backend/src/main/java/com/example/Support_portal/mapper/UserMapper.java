package com.example.Support_portal.mapper;

import com.example.Support_portal.dto.UserDto;
import com.example.Support_portal.entity.User;
import com.example.Support_portal.enumeration.Role;

public class UserMapper {
    
    public static UserDto mapToDto(User user) {
        if (user == null) {
            return null;
        }
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        // Don't include password in DTO for security
        userDto.setPassword(null);
        userDto.setRole(user.getRole() != null ? user.getRole().name() : null);
        userDto.setStatus(user.getStatus());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setPhotoUrl(user.getPhotoUrl());
        return userDto;
    }

    public static User mapToEntity(UserDto userDto) {
        if (userDto == null) {
            return null;
        }
        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        
        // Convert string role to enum
        if (userDto.getRole() != null) {
            try {
                user.setRole(Role.valueOf(userDto.getRole().toUpperCase()));
            } catch (IllegalArgumentException e) {
                user.setRole(Role.USER); // Default role if invalid
            }
        } else {
            user.setRole(Role.USER); // Default role
        }
        
        user.setStatus(userDto.getStatus() != null ? userDto.getStatus() : "ACTIVE");
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setPhotoUrl(userDto.getPhotoUrl());
        return user;
    }
}