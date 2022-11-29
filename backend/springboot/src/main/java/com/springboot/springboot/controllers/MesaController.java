package com.springboot.springboot.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.springboot.model.Mesa;
import com.springboot.springboot.model.MesaQueryParam;
import com.springboot.springboot.repository.MesaRepository;

@CrossOrigin(origins = "http://localhost:5001")
@RestController
@RequestMapping("/api")
public class MesaController {

	@Autowired
	MesaRepository mesaRepository;

	@GetMapping("/mesa")
	public ResponseEntity<List<Mesa>> getAllMesas(@ModelAttribute MesaQueryParam mesaQueryParam) {
		try {
			List<Mesa> mesas = new ArrayList<Mesa>();
			if (mesaQueryParam.getCategories().length == 0 && mesaQueryParam.getCapacity() > 0) {
				System.out.println("capacity");
				mesaRepository.findByCapacity(mesaQueryParam.getCapacity()).forEach(mesas::add);
			} else if (mesaQueryParam.getCategories().length > 0 && mesaQueryParam.getCapacity() == 0) {
				System.out.println("categories");
				mesaRepository.findCategoriesOnMesa(mesaQueryParam.getCategories()).forEach(mesas::add);
			} else if (mesaQueryParam.getCategories().length > 0 && mesaQueryParam.getCapacity() > 0) {
				System.out.println("categories capacity");
				mesaRepository.findByCapacityAndCategories(mesaQueryParam.getCapacity(), mesaQueryParam.getCategories())
						.forEach(mesas::add);
}

			if (mesaQueryParam.getOrder() != 0 && mesaQueryParam.getCategories().length > 0) {
				if (mesaQueryParam.getOrder() == 1) {
					mesaRepository.findCategoriesOnMesaASC(mesaQueryParam.getCategories()).forEach(mesas::add);
				} else {
					mesaRepository.findCategoriesOnMesaDESC(mesaQueryParam.getCategories()).forEach(mesas::add);
				}
			} else if (mesaQueryParam.getOrder() == 0 && mesaQueryParam.getCategories().length > 0) {
				mesaRepository.findCategoriesOnMesa(mesaQueryParam.getCategories()).forEach(mesas::add);
			} else if (mesaQueryParam.getOrder() != 0 && mesaQueryParam.getCategories().length == 0) {
				if (mesaQueryParam.getOrder() == 1) {
					mesaRepository.findOrderedASC().forEach(mesas::add);
				} else {
					mesaRepository.findOrderedDESC().forEach(mesas::add);
				}
			} else {
				System.out.println("else");
				mesaRepository.findActive().forEach(mesas::add);
			}
			return new ResponseEntity<>(mesas, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
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
			System.err.println(e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}// get one

}