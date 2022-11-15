package com.springboot.springboot.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.springboot.model.Category;
import com.springboot.springboot.repository.CategoryRepository;

@CrossOrigin(origins = "http://localhost:5001")
@RestController
@RequestMapping("/api")
public class CategoryController {
	@Autowired
	CategoryRepository categoryRepository;

	@GetMapping("/category")
	public ResponseEntity<List<Category>> getAllCategories() {
		try {
			List<Category> categories = new ArrayList<Category>();
			categoryRepository.findAll().forEach(categories::add);
			return new ResponseEntity<>(categories, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}