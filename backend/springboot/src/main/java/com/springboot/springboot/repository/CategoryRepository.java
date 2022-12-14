package com.springboot.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.springboot.springboot.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}