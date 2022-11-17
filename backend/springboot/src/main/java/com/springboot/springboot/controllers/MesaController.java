package com.springboot.springboot.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.springboot.model.Mesa;
import com.springboot.springboot.repository.MesaRepository;

@CrossOrigin(origins = "http://localhost:5001")
@RestController
@RequestMapping("/api")
public class MesaController {

	@Autowired
	MesaRepository mesaRepository;

	@GetMapping("/mesa")
	public ResponseEntity<List<Mesa>> getAllMesas() {
		try {
			List<Mesa> mesas = new ArrayList<Mesa>();
			mesaRepository.findAll().forEach(mesas::add);
			return new ResponseEntity<>(mesas, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/mesa/{id}")
	public ResponseEntity<Mesa> getOneLinkMesa(@PathVariable(required = true) Long id) {
		try {
			Optional<Mesa> mesa = mesaRepository.findById(id);
			if (mesa.isPresent()) {
				return new ResponseEntity<>(mesa.get(), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}// get one

	
}