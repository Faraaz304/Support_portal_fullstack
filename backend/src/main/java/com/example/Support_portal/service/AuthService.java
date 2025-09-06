package com.example.Support_portal.service;

import com.example.Support_portal.dto.AuthRequestDto;
import com.example.Support_portal.dto.AuthResponseDto;
import com.example.Support_portal.dto.RegisterRequestDto;
import com.example.Support_portal.dto.UserDto;

public interface AuthService {
    AuthResponseDto register(RegisterRequestDto registerRequest);
    AuthResponseDto login(AuthRequestDto authRequest);
    UserDto getCurrentUserProfile();
}