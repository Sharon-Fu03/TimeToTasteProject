package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import com.example.demo.repository.UserRepository;
import com.example.util.JwtUtil;
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired AuthService authService;
    @Autowired UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<Object> login(HttpServletRequest request,@RequestBody User loginUser) {
       if(userRepository.findByEmail(loginUser.getEmail())!=null) {
         
           System.out.println("Generating token for user: " + JwtUtil.generateToken(loginUser.getEmail()));
       }
        else {
            throw new RuntimeException("Invalid username or password");
        }

      return new ResponseEntity<>(authService.authenticate(loginUser.getEmail(), loginUser.getPassword()), HttpStatus.OK);            
    }
}
