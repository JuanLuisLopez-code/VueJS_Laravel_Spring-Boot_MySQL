package com.springboot.springboot.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.springboot.springboot.model.Mesa;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MesaRepository extends JpaRepository<Mesa, Long> {
    @Query(value = "SELECT m.* FROM mesas m LEFT JOIN mesas_categories mc ON m.id = mc.mesa_id INNER JOIN categories c ON c.id = mc.category_id WHERE m.is_active IS TRUE AND m.id IN( SELECT a.mesa_id FROM ( SELECT mc.mesa_id, COUNT(mc.category_id) as count_cat_id FROM mesas_categories mc INNER JOIN categories c ON mc.category_id = c.id WHERE c.name_category IN :categories GROUP BY mc.mesa_id) AS a WHERE a.count_cat_id >= ALL ( SELECT b.count_cat FROM ( SELECT COUNT(*) as count_cat FROM categories cc WHERE cc.name_category IN :categories ) b ) ) GROUP BY m.id", nativeQuery = true)
    List<Mesa> findCategoriesOnMesa(@Param("categories") String[] categories);
}