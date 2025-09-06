package com.example.Support_portal.service;

import com.example.Support_portal.dto.UserDto;
import java.util.List;
public interface UserService {
    public UserDto CreateUser(UserDto userDto);
    public UserDto getUserById(Long id);
    public List<UserDto> getAllUsers();
    public UserDto updateUser(Long id, UserDto userDto);
    public void deleteUser(Long id);
    
}
