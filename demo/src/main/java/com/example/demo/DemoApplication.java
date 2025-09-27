package com.example.demo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.example.demo.dao.IngredientDao;
import com.example.demo.entity.Ingredient;
import java.util.List;
import java.util.Map;
import java.util.Collections;
import java.net.InetAddress;
@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://localhost:3000")  // 允許 React 前端呼叫
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
