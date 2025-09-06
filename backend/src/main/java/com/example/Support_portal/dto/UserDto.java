package com.example.Support_portal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String username;
    private String email;
    
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;  // Only for input, won't be returned in response
    
    private String role;      // ADMIN, SUPER_ADMIN, USER, HR
    private String status;    // Active, Inactive
    private String firstName;
    private String lastName;
    private String photoUrl;  // optional for profile image   
}