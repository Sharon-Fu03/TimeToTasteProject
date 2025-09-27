package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "recipe")
public class Recipe {

   
   

    @Column(name = "recipe_body", columnDefinition = "TEXT")
    private String body;

    @ManyToOne
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "recipe_status", columnDefinition = "ENUM('draft','published','archived') DEFAULT 'draft'")
    private Status status = Status.draft;

    @Column(name = "recipe_created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    private String title;
    
    public enum Status {
        draft, published, archived
    }

    // Getters and Setters

    @Id
    @Column(name = "recipe_id", length = 36)
    private String id; // UUID
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}