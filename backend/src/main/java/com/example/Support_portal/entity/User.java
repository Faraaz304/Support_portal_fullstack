package com.example.Support_portal.entity;

import lombok.*;
import jakarta.persistence.*;
import com.example.Support_portal.enumeration.Role;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;  // encrypted

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;  // Using enum

    private String status = "ACTIVE";    // Active, Inactive
    private String photoUrl;  // optional for profile image
}