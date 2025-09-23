package com.example.demo.dao;
import com.example.demo.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IngredientDao extends JpaRepository<Ingredient, Long> {

   // public List<Ingredient> findBycName(String cName);
    // 如果還是有問題，可以用 @Query 註解
    @Query("SELECT i FROM Ingredient i WHERE i.ingredientName = :ingredientName")
    Ingredient findByingredientName(@Param("ingredientName") String ingredientName);
      @Query("SELECT i FROM Ingredient i " +
           "WHERE LOWER(i.ingredientName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "   OR LOWER(i.cName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Ingredient> searchByKeyword(@Param("keyword") String keyword);

}
