package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpHeaders;
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
    public Map<String,Object> login(HttpServletRequest request, @RequestBody User loginUser) {
      User user = userRepository.findByEmail(loginUser.getEmail());
      Map<String,Object> response = new java.util.HashMap<>();
      if (user != null) {
        if (user.getPassword() != null && user.getPassword().equals(loginUser.getPassword())) {
          // generate token and return it in the response body
          String token = JwtUtil.generateToken(loginUser.getEmail());
          response.put("token", token);

          // build user object to return (do not include password)
          Map<String, Object> userMap = new java.util.HashMap<>();
          userMap.put("email", user.getEmail());
          userMap.put("id", user.getId());
          userMap.put("role", user.getRole());
          userMap.put("username", user.getUserName());

          response.put("user", userMap);
          return response;
        } else {
          response.put("login result","登入失敗 帳號密碼錯誤");
          return response;
        }
      } else {
        response.put("login result","登入失敗 帳號不存在");
        return response;
      }
    }
}
