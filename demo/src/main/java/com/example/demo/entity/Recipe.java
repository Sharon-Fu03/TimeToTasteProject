package com.example.demo.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "recipe")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_id", nullable = false)
    private Integer id;

    @Column(name = "recipe_title")
    private String title;

    @Column(name = "recipe_desc", columnDefinition = "TEXT")
    private String description;
    
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "recipe_steps", columnDefinition = "JSON")
    private List<String> steps;

    @Column(name = "recipe_servings")
    private Integer servings;

    @Column(name = "recipe_time")
    private Integer time;

    @Column(name = "users_id", nullable = false)
    private Integer usersId;

    @Column(name = "recipe_status")
    private String status;

    @Column(name = "recipe_created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecipeIngredient> ingredients = new ArrayList<>();
    
    @Lob
    @Column(name = "cover_image", columnDefinition = "LongBlob")
    private byte[] coverImage;
    
    @Transient
    private String coverImageBase64;
    
    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    // Getters and setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getSteps() {
        return steps;
    }

    public void setSteps(List<String> steps) {
        this.steps = steps;
    }

    public Integer getServings() {
        return servings;
    }

    public void setServings(Integer servings) {
        this.servings = servings;
    }

    public Integer getTime() {
        return time;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    public Integer getUsersId() {
        return usersId;
    }

    public void setUsersId(Integer usersId) {
        this.usersId = usersId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<RecipeIngredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<RecipeIngredient> ingredients) {
        this.ingredients = ingredients;
    }

    // Helper method to maintain bidirectional relationship
    public void addIngredient(RecipeIngredient ingredient) {
        ingredients.add(ingredient);
        ingredient.setRecipe(this);
    }

    public void removeIngredient(RecipeIngredient ingredient) {
        ingredients.remove(ingredient);
        ingredient.setRecipe(null);
    }
    public byte[] getCoverImage() {
        return coverImage;
    }
    public void setCoverImage(byte[] coverImage) {
        this.coverImage = coverImage;
    }
    public String getCoverImageBase64() {
        return coverImageBase64;
    }
    public void setCoverImageBase64(String coverImageBase64) {
        this.coverImageBase64 = coverImageBase64;
    }
}