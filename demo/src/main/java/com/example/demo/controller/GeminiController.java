package com.example.demo.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.GoogleGenaiService;

@RestController
@RequestMapping("/api/gemini")
@CrossOrigin(origins = "http://localhost:3000")
public class GeminiController {

    private final GoogleGenaiService googleGenaiService;

    public GeminiController(GoogleGenaiService googleGenaiService) {
        this.googleGenaiService = googleGenaiService;
    }

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, String> body) {
        String prompt = body.get("prompt");
        if (prompt == null || prompt.isBlank()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "prompt is required"));
        }

        try {
            String reply = googleGenaiService.getChatResponse(prompt);
            return ResponseEntity.ok(Collections.singletonMap("reply", reply));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(Collections.singletonMap("error", ex.getMessage()));
        }
    }
}
