package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.example.demo.dao.IngredientDao;
import com.example.demo.entity.Recipe;
import java.util.List;
import java.util.Map;
import java.util.Collections;

@SpringBootApplication
@RestController
@RequestMapping("/api/recipe")

public class RecipeApplication {

    @PostMapping("/saveRecipe")
    public Recipe saveRecipe(@RequestBody Recipe recipe ) {
        
        return recipe;
    }


}
