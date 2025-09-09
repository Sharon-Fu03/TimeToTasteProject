package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "ingredient")
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "ingredient_name", nullable = false)
    private String ingredientName;
    
    @Column(name = "c_name", nullable = false)
    private String cName;
    
    @Column(name = "energy_kcal")
    private Double energyKcal;
    
    private Double protein;
    private Double fat;
    private Double carbs;
    private Double sugar;
    private Double sodium;
    private Double water;
    
    // 建構子
    public Ingredient() {}
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getIngredientName() { return ingredientName; }
    public void setIngredientName(String ingredientName) { this.ingredientName = ingredientName; }
    
    public String getCName() { return cName; }
    public void setCName(String cName) { this.cName = cName; }
    
    public Double getEnergyKcal() { return energyKcal; }
    public void setEnergyKcal(Double energyKcal) { this.energyKcal = energyKcal; }
    
    public Double getProtein() { return protein; }
    public void setProtein(Double protein) { this.protein = protein; }
    
    public Double getFat() { return fat; }
    public void setFat(Double fat) { this.fat = fat; }
    
    public Double getCarbs() { return carbs; }
    public void setCarbs(Double carbs) { this.carbs = carbs; }
    
    public Double getSugar() { return sugar; }
    public void setSugar(Double sugar) { this.sugar = sugar; }
    
    public Double getSodium() { return sodium; }
    public void setSodium(Double sodium) { this.sodium = sodium; }
    
    public Double getWater() { return water; }
    public void setWater(Double water) { this.water = water; }
}