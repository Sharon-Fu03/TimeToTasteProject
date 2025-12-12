package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

@Service
public class GoogleGenaiService {
   // private final Client client;

    Client client = Client.builder()
    .apiKey("密鑰")
   // .httpOptions(HttpOptions.builder().apiVersion("v1alpha"))
    .build();

    public String getChatResponse(String prompt) {
      
        // create a chat session for the model
        GenerateContentResponse resp = client.models.generateContent("gemini-2.5-flash", prompt, null);
        
        return resp.text();
    }
}
