package com.example.demo;
import java.net.InetAddress;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.IngredientDao;
import com.example.demo.entity.Ingredient;
@SpringBootApplication
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost", "http://localhost:80"}, allowCredentials = "true")
public class DemoApplication {

    private static final Logger logger = LoggerFactory.getLogger(DemoApplication.class);
    private final IngredientDao ingredientDao;

	public DemoApplication(IngredientDao ingredientDao) {
		this.ingredientDao = ingredientDao;
	}

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);

        try {
            InetAddress ip = InetAddress.getLocalHost();
            logger.info("\nApplication started successfully."+"\nLocal IP Address: " + ip.getHostAddress());
        } catch (java.net.UnknownHostException e) {
            logger.error("Unable to get local host address", e);
        }
    }

@PostMapping("/getIngredient")
public ResponseEntity<Ingredient> getIngredient(@RequestBody Map<String, Object> payload) {

    String name = (String) payload.get("cname");
    Double gram = Double.parseDouble(payload.get("gram").toString());

    Ingredient dbIngredient = ingredientDao.findByingredientName(name);

    if (dbIngredient == null) {
        // 回傳 404，前端可依此顯示找不到食材
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    // 計算比例
    Double factor = gram / 100.0f;

    Ingredient result = new Ingredient();
    result.setCName(name);
    result.setIngredientName(dbIngredient.getIngredientName());
    result.setEnergyKcal((dbIngredient.getEnergyKcal() != null ? dbIngredient.getEnergyKcal() : 0.0) * factor);
    result.setProtein(dbIngredient.getProtein() * factor);
    result.setFat(dbIngredient.getFat() * factor);
    result.setCarbs(dbIngredient.getCarbs() * factor);
    result.setSugar(dbIngredient.getSugar() * factor);
    result.setSodium(dbIngredient.getSodium() * factor);
    result.setWater(dbIngredient.getWater() * factor);
    return ResponseEntity.ok(result);
}
    @GetMapping("/api/searchIngredients")
    public List<Ingredient> searchFoodse(@RequestParam("keyword") String keyword) {

        if (keyword == null || keyword.trim().isEmpty()) {
            return Collections.emptyList();
        }
        return ingredientDao.searchByKeyword(keyword);
    }

}
