package com.example.demo.service;

import java.util.Map;

import com.example.demo.entity.User;

public interface AuthService {
    public Map<String, Object> authenticate(String email, User user);
}
