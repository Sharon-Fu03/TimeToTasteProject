package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.dao.IngredientDao;
import com.example.demo.entity.Ingredient;
import java.util.List;

@SpringBootApplication
@RestController
public class DemoApplication {
	private final IngredientDao ingredientDao;

	public DemoApplication(IngredientDao ingredientDao) {
		this.ingredientDao = ingredientDao;
	}

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	@GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		List<Ingredient> ingredients = ingredientDao.findByName("egg");
		
		System.out.println("測試"+ingredients.get(0).getCName());
		System.out.println("測試"+ingredients.get(0).getProtein());
		return String.format("Hello success %s!", ingredients.get(0).getCName()+ingredients.get(0).getProtein());

    }

}
