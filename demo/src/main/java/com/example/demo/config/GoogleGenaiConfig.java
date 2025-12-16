package com.example.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.genai.Client;

@Configuration
public class GoogleGenaiConfig {

    @Value("${GOOGLE_API_KEY:${GEMINI_API_KEY:${GOOGLE_GEMINI_API_KEY:}}}")
    private String apiKey;

    @Bean
    public Client genaiClient() {
        if (apiKey == null || apiKey.isEmpty()) {
            throw new IllegalStateException(
                "Google API Key not found. Please set GOOGLE_API_KEY, GEMINI_API_KEY, or GOOGLE_GEMINI_API_KEY environment variable."
            );
        }

        return Client.builder()
                .apiKey(apiKey)
                .build();
    }
}
