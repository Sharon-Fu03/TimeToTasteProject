package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.dao.IngredientDao;
import com.example.demo.entity.Ingredient;
import java.util.List;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://localhost:3000")  // 允許 React 前端呼叫
public class DemoApplication {
	private final IngredientDao ingredientDao;

	public DemoApplication(IngredientDao ingredientDao) {
		this.ingredientDao = ingredientDao;
	}

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@PostMapping("/getIngredient")
    public Ingredient hello(Ingredient Ingredient) {
		System.out.println("Ingredient: " + Ingredient.getIngredientName());

		Ingredient ingredients = ingredientDao.findByingredientName("egg");
		
		return ingredients;

    }
	// @GetMapping("/api/ingredients/search")
	// public List<String> searchIngredients(@RequestParam String keyword) {
    // return ingredientRepository.findByIngredientNameContainingIgnoreCase(keyword)
    //         .stream()
    //         .map(Ingredient::getIngredientName)
    //         .toList();
	// }


}
