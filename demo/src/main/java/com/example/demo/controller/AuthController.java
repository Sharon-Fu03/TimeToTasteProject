package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;


@RestController
public class AuthController {
    
    @Autowired AuthService authService;
    

    @PostMapping("/login")
    public ResponseEntity<Object> login(HttpServletRequest request, @RequestBody User user) {
        try{
            Boolean result=authService.authenticate(user.getEmail(), user.getPassword());
            // authentication logic here
            if(!result){
                return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                      "status", false,
                      "message", "登入失敗"
                    ));
            }

        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                      "status", false,
                      "message", "登入失敗"
                    ));
        }

        return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(Map.of(
                      "status", true,
                      "message", "登入成功"
                    ));
    }
}
