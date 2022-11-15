package com.springboot.springboot.repository;

//import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.springboot.springboot.model.Mesa;

public interface MesaRepository extends JpaRepository<Mesa, Long> {
    // List<Mesa> findMesaByCategoryName(String name_category);
}