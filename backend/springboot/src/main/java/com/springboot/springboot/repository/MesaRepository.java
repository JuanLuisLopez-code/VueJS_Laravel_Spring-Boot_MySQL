package com.springboot.springboot.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.springboot.springboot.model.Mesa;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MesaRepository extends JpaRepository<Mesa, Long> {
    @EntityGraph("fetch-mesa-category")
    @Query("SELECT m.name_mesa, c.name_category FROM mesas m  LEFT JOIN mesas_categories mc ON m.id = mc.mesa_id LEFT JOIN categories c ON c.id = mc.category_id WHERE m.is_active IS TRUE AND c.name_category IN (:categories)")
    List<Mesa> findCategoriesOnMesa(@Param("categories") String[] categories);
}