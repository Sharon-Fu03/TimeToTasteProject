package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import java.util.Base64;
import com.example.demo.entity.Recipe;
import com.example.demo.entity.RecipeIngredient;
import com.example.demo.service.RecipeService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/recipe")
@CrossOrigin(origins = "http://localhost:3000")
public class RecipeController {

    private final RecipeService recipeService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping("/saveRecipe")
    public ResponseEntity<?> saveRecipe(@RequestBody Map<String, Object> params) {
        try {
            Recipe newRecipe ;
            //編輯
            if ("Y".equals(params.get("isEdited")) && params.get("id") != null) {
                Integer recipeId = Integer.valueOf(params.get("id").toString());
                newRecipe = recipeService.getRecipeById(recipeId);
                if (newRecipe == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("找不到 ID 為 " + recipeId + " 的食譜，無法編輯");
                }
            }else{//新增
                newRecipe = new Recipe();
            }
            newRecipe.setTitle((String) params.get("title"));
            newRecipe.setDescription((String) params.get("description"));
            
            if (params.get("steps") != null) {
                List<String> stepsList = (List<String>) params.get("steps");
                newRecipe.setSteps(stepsList);
            }
        
            if (params.get("servings") != null) {
                String servingsStr = params.get("servings").toString();
                if (!servingsStr.isEmpty()) {
                    newRecipe.setServings(Integer.parseInt(servingsStr));
                }
            }
             
            if (params.get("cookingTime") != null) {
                String timeStr = params.get("cookingTime").toString();
                if (!timeStr.isEmpty()) {
                    newRecipe.setTime(Integer.parseInt(timeStr));
                }
            }
            
            // 處理 ingredients - 建立 RecipeIngredient 關聯
            if (params.get("ingredients") != null) {
                List<Map<String, Object>> ingredientsList = (List<Map<String, Object>>) params.get("ingredients");
                
                for (Map<String, Object> ingredientData : ingredientsList) {
                    String name = (String) ingredientData.get("name");
                    String amount = (String) ingredientData.get("amount");
                    
                    if (name != null && !name.trim().isEmpty()) {
                        RecipeIngredient ingredient = new RecipeIngredient(name, amount);
                        newRecipe.addIngredient(ingredient);
                    }
                }
            }
            
            // 設置必填欄位 usersId
            if (params.get("usersId") != null) {
                newRecipe.setUsersId(Integer.valueOf(params.get("usersId").toString()));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("缺少必要參數: usersId (使用者 ID)");
            }
            
            // 設置狀態
            if (params.get("status") != null) {
                newRecipe.setStatus((String) params.get("status"));
            } else {
                newRecipe.setStatus("draft"); // 預設為草稿
            }
            if (params.get("coverImage") != null) {
                String[] images = params.get("coverImage").toString().split(",");
                if (images.length > 1 && images[1] != null && !images[1].trim().isEmpty()) {
                    try {
                        byte[] imageBytes = Base64.getDecoder().decode(images[1].trim());
                        //newRecipe.setCoverImage(imageBytes);
                    } catch (IllegalArgumentException iae) {
                        // invalid base64 - ignore or handle as needed
                        System.err.println("Invalid base64 image data: " + iae.getMessage());
                    }
                }
            }
            
            Recipe saved = recipeService.saveRecipe(newRecipe);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
            
        } catch (NumberFormatException nfe) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("數字格式錯誤: " + nfe.getMessage());
        } catch (IllegalArgumentException iae) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(iae.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("保存失敗: " + e.getMessage());
        }
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("pong");
    }

    @GetMapping("/getRecipeById/{id}")
    public ResponseEntity<?> getRecipeById(@PathVariable Integer id) {
        try {
            Recipe recipe = recipeService.getRecipeById(id);
            if (recipe != null) {
                return ResponseEntity.ok(recipe);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("找不到 ID 為 " + id + " 的食譜");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Get recipe by ID failed: " + e.getMessage());
        }
    }
    @GetMapping("/list")
    public ResponseEntity<?> getAllRecipes() {
        try {
            List<Recipe> recipes = recipeService.getAllRecipes();
            return ResponseEntity.ok(recipes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("取得食譜列表失敗: " + e.getMessage());
        }
    }
}
