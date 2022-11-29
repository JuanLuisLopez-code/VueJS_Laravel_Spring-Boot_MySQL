package com.springboot.springboot.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.springboot.springboot.model.Mesa;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MesaRepository extends JpaRepository<Mesa, Long> {
    @Query(value = "SELECT * FROM mesas m WHERE m.is_active IS TRUE AND m.id IN( SELECT a.mesa_id FROM ( SELECT mc.mesa_id, COUNT(mc.category_id) as count_cat_id FROM mesas_categories mc LEFT JOIN categories c ON mc.category_id = c.id WHERE c.name_category IN :categories GROUP BY mc.mesa_id) AS a WHERE a.count_cat_id >= ALL ( SELECT b.count_cat FROM ( SELECT COUNT(*) as count_cat FROM categories cc WHERE cc.name_category IN :categories ) b ) ) AND m.name_mesa LIKE '%' GROUP BY m.id", nativeQuery = true)
    List<Mesa> findCategoriesOnMesa(@Param("categories") String[] categories);

    @Query(value = "SELECT * FROM mesas m WHERE m.capacity = 3 AND m.is_active IS TRUE AND m.name_mesa LIKE '%'", nativeQuery = true)
    List<Mesa> findByCapacity(@Param("capacity") Number capacity);

    @Query(value = "SELECT * FROM mesas m WHERE m.is_active IS TRUE AND m.id IN( SELECT a.mesa_id FROM ( SELECT mc.mesa_id, COUNT(mc.category_id) as count_cat_id FROM mesas_categories mc LEFT JOIN categories c ON mc.category_id = c.id WHERE c.name_category IN :categories GROUP BY mc.mesa_id) AS a WHERE a.count_cat_id >= ALL ( SELECT b.count_cat FROM ( SELECT COUNT(*) as count_cat FROM categories cc WHERE cc.name_category IN :categories ) b ) ) AND m.capacity = :capacity AND m.name_mesa LIKE '%' GROUP BY m.id", nativeQuery = true)
    List<Mesa> findByCapacityAndCategories(@Param("capacity") Number capacity,
            @Param("categories") String[] categories);

    @Query(value = "SELECT * FROM mesas m WHERE m.is_active IS TRUE AND m.name_mesa LIKE '%'", nativeQuery = true)
    List<Mesa> findActive();

    //Only order ASC
    @Query(value = "SELECT * FROM mesas m WHERE m.is_active IS TRUE ORDER BY m.capacity ASC", nativeQuery = true)
    List<Mesa> findOrderedASC();

    //Only order DESC
    @Query(value = "SELECT * FROM mesas m WHERE m.is_active IS TRUE ORDER BY m.capacity DESC", nativeQuery = true)
    List<Mesa> findOrderedDESC();

    //Categories ASC
    @Query(value = "SELECT * FROM mesas m WHERE m.is_active IS TRUE AND m.id IN( SELECT a.mesa_id FROM ( SELECT mc.mesa_id, COUNT(mc.category_id) as count_cat_id FROM mesas_categories mc LEFT JOIN categories c ON mc.category_id = c.id WHERE c.name_category IN :categories GROUP BY mc.mesa_id) AS a WHERE a.count_cat_id >= ALL ( SELECT b.count_cat FROM ( SELECT COUNT(*) as count_cat FROM categories cc WHERE cc.name_category IN :categories ) b ) ) GROUP BY m.id ORDER BY m.capacity ASC", nativeQuery = true)
    List<Mesa> findCategoriesOnMesaASC(@Param("categories") String[] categories);

    //Categories DESC
    @Query(value = "SELECT * FROM mesas m WHERE m.is_active IS TRUE AND m.id IN( SELECT a.mesa_id FROM ( SELECT mc.mesa_id, COUNT(mc.category_id) as count_cat_id FROM mesas_categories mc LEFT JOIN categories c ON mc.category_id = c.id WHERE c.name_category IN :categories GROUP BY mc.mesa_id) AS a WHERE a.count_cat_id >= ALL ( SELECT b.count_cat FROM ( SELECT COUNT(*) as count_cat FROM categories cc WHERE cc.name_category IN :categories ) b ) ) GROUP BY m.id ORDER BY m.capacity DESC", nativeQuery = true)
    List<Mesa> findCategoriesOnMesaDESC(@Param("categories") String[] categories);
}
