package com.example.demo.service.impl;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AuthService;
import com.example.util.JwtUtil;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    public AuthServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Map<String, Object> authenticate(String email, User user) {
        Map<String, Object> response = new java.util.HashMap<>();
         String token = JwtUtil.generateToken(user.getEmail());
          response.put("token", token);
          Map<String, Object> userMap = new java.util.HashMap<>();
          userMap.put("email", user.getEmail());
          userMap.put("id", user.getId());
          userMap.put("role", user.getRole());
          userMap.put("username", user.getUserName());

          response.put("user", userMap);

       return response;
    }
}
