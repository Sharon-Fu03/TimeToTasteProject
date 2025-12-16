package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

@Service
public class GoogleGenaiService {
    private final Client genaiClient;

    @Autowired
    public GoogleGenaiService(Client genaiClient) {
        this.genaiClient = genaiClient;
    }

    public String getChatResponse(String prompt) {
        // create a chat session for the model
        String dprompt = "你是一個營養師，需幫使用者解決問題，請用中文回答，每次回答100字以內，若與食物營養偏離太多的問題，請回答說，很抱歉無法回答。" + prompt;
  
        GenerateContentResponse resp = genaiClient.models.generateContent("gemini-2.5-flash", dprompt, null);

        return resp.text();
    }
}
