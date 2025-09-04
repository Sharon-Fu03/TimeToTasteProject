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
    private Float energyKcal;
    
    private Float protein;
    private Float fat;
    private Float carbs;
    private Float sugar;
    private Float sodium;
    private Float water;
    
    // 建構子
    public Ingredient() {}
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getIngredientName() { return ingredientName; }
    public void setIngredientName(String ingredientName) { this.ingredientName = ingredientName; }
    
    public String getCName() { return cName; }
    public void setCName(String cName) { this.cName = cName; }
    
    public Float getEnergyKcal() { return energyKcal; }
    public void setEnergyKcal(Float energyKcal) { this.energyKcal = energyKcal; }
    
    public Float getProtein() { return protein; }
    public void setProtein(Float protein) { this.protein = protein; }
    
    public Float getFat() { return fat; }
    public void setFat(Float fat) { this.fat = fat; }
    
    public Float getCarbs() { return carbs; }
    public void setCarbs(Float carbs) { this.carbs = carbs; }
    
    public Float getSugar() { return sugar; }
    public void setSugar(Float sugar) { this.sugar = sugar; }
    
    public Float getSodium() { return sodium; }
    public void setSodium(Float sodium) { this.sodium = sodium; }
    
    public Float getWater() { return water; }
    public void setWater(Float water) { this.water = water; }
}