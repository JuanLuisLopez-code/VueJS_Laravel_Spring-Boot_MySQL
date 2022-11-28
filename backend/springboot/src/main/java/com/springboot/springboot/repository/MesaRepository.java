package com.springboot.springboot.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.springboot.springboot.model.Mesa;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MesaRepository extends JpaRepository<Mesa, Long> {
    @Query(value = "SELECT * FROM mesas m WHERE m.is_active IS TRUE AND m.id IN( SELECT a.mesa_id FROM ( SELECT mc.mesa_id, COUNT(mc.category_id) as count_cat_id FROM mesas_categories mc LEFT JOIN categories c ON mc.category_id = c.id WHERE c.name_category IN :categories GROUP BY mc.mesa_id) AS a WHERE a.count_cat_id >= ALL ( SELECT b.count_cat FROM ( SELECT COUNT(*) as count_cat FROM categories cc WHERE cc.name_category IN :categories ) b ) ) GROUP BY m.id", nativeQuery = true)
    List<Mesa> findCategoriesOnMesa(@Param("categories") String[] categories);

    // @Query(value = "", nativeQuery = true)
    // List<Mesa> findByCapacity(@Param("catacity") Number capacity);

}
