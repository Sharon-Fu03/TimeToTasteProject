package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.Recipe;

public interface RecipeDao extends JpaRepository<Recipe, Integer> {

}
