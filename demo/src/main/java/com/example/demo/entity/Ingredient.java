package com.example.demo.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
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
    
    public Double getProtein() { 
        if (protein == null) return null;
        return new BigDecimal(protein).setScale(4, RoundingMode.HALF_UP).doubleValue();
    }
    public void setProtein(Double protein) { this.protein = protein; }
    
    public Double getFat() { 
        if (fat == null) return null;
        return new BigDecimal(fat).setScale(4, RoundingMode.HALF_UP).doubleValue();
    }
    public void setFat(Double fat) { this.fat = fat; }
    
    public Double getCarbs() { 
        if (carbs == null) return null;
        return new BigDecimal(carbs).setScale(4, RoundingMode.HALF_UP).doubleValue();
    }
    public void setCarbs(Double carbs) { this.carbs = carbs; }
    
    public Double getSugar() {
        if (sugar == null) return null;
        return new BigDecimal(sugar).setScale(4, RoundingMode.HALF_UP).doubleValue();
    }
    public void setSugar(Double sugar) {
        this.sugar = sugar;
    }
    
    public Double getSodium() { 
        if (sodium == null) return null;
        return new BigDecimal(sodium).setScale(4, RoundingMode.HALF_UP).doubleValue();
    }
    public void setSodium(Double sodium) { this.sodium = sodium; }
    
    public Double getWater() { 
        if (water == null) return null;
        return new BigDecimal(water).setScale(4, RoundingMode.HALF_UP).doubleValue();
    }
    public void setWater(Double water) { this.water = water; }
}