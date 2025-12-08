package com.example.demo.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.demo.entity.Recipe;
import com.example.demo.service.RecipeService;
import com.example.demo.dao.RecipeDao;
import java.util.List;

@Service
@Transactional
public class RecipeServiceImpl implements RecipeService {

    private final RecipeDao recipeDao;

    public RecipeServiceImpl(RecipeDao recipeDao) {
        this.recipeDao = recipeDao;
    }


    @Override
    public Recipe saveRecipe(Recipe recipe) {
        if (recipe == null) {
            throw new IllegalArgumentException("recipe cannot be null");
        }
        if (recipe.getTitle() == null || recipe.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("recipe title is required");
        }
        return recipeDao.save(recipe);
    }

    @Override
    public List<Recipe> getAllRecipes() {
        return recipeDao.findAll();
    }
    @Override
    public Recipe getRecipeById(Integer id) {
        if(id!=null && id<=0){
            throw new IllegalArgumentException("Invalid recipe ID");
        }
        else{
            return recipeDao.findById(id).orElse(null);
        }
    }
}
