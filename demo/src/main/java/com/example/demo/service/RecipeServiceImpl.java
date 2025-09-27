package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.demo.entity.Recipe;
import com.example.demo.service.RecipeService;
import com.example.demo.dao.RecipeDao;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RecipeServiceImpl implements RecipeService {
    
    private final RecipeDao recipeDao;
    
    @Autowired
    public RecipeServiceImpl(RecipeDao recipeDao) {
        this.recipeDao = recipeDao;
    }
    
    @Override
    public Recipe saveRecipe(Recipe recipe) {
        try {
            //validateRecipe(recipe);
            return recipeDao.save(recipe);
        } catch (Exception e) {
            throw new RuntimeException("保存食譜失敗: " + e.getMessage(), e);
        }
    }
    
}