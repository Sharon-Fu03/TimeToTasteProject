package com.example.demo.service;

import com.example.demo.entity.Recipe;
import java.util.List;

public interface RecipeService {
    Recipe saveRecipe(Recipe recipe);
    List<Recipe> getAllRecipes();
}
