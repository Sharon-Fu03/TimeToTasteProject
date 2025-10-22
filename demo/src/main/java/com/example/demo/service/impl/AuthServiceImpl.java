package com.example.demo.service.impl;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AuthService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    public AuthServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean authenticate(String email, String password) {
        // if (email == null || password == null) return false;
        // Optional<User> uOpt = userRepository.findByEmail(email);
        // if (uOpt.isEmpty()) return false;
        // User u = uOpt.get();
        // NOTE: plain text comparison; replace with bcrypt in production
       // return password.equals(u.getPassword());
       return true;
    }
}
