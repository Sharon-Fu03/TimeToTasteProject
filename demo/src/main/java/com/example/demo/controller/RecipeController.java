package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
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
            Recipe newRecipe = new Recipe();
            
            // 設置基本資訊
            newRecipe.setTitle((String) params.get("title"));
            newRecipe.setDescription((String) params.get("description"));
            
            // 處理 steps 陣列 - 轉換為字串（用換行符號分隔）
            if (params.get("steps") != null) {
                @SuppressWarnings("unchecked")
                List<String> stepsList = (List<String>) params.get("steps");
                String stepsText = String.join("\n", stepsList);
                newRecipe.setSteps(stepsText);
            }
            
            // 處理 servings - 轉換字串為 Integer
            if (params.get("servings") != null) {
                String servingsStr = params.get("servings").toString();
                if (!servingsStr.isEmpty()) {
                    newRecipe.setServings(Integer.parseInt(servingsStr));
                }
            }
            
            // 處理 cookingTime - 轉換字串為 Integer
            if (params.get("cookingTime") != null) {
                String timeStr = params.get("cookingTime").toString();
                if (!timeStr.isEmpty()) {
                    newRecipe.setTime(Integer.parseInt(timeStr));
                }
            }
            
            // 處理 ingredients - 建立 RecipeIngredient 關聯
            if (params.get("ingredients") != null) {
                @SuppressWarnings("unchecked")
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
                // TODO: 從 session 或 JWT token 取得真實的使用者 ID
                // 暫時拋出錯誤，要求前端必須提供 usersId
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("缺少必要參數: usersId (使用者 ID)");
            }
            
            // 設置狀態
            if (params.get("status") != null) {
                newRecipe.setStatus((String) params.get("status"));
            } else {
                newRecipe.setStatus("draft"); // 預設為草稿
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
