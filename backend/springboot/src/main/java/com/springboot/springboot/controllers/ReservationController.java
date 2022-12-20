package com.springboot.springboot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import com.springboot.springboot.model.User;
import com.springboot.springboot.model.Mesa;
import com.springboot.springboot.model.Reservation;
import com.springboot.springboot.repository.UserRepository;
import com.springboot.springboot.repository.MesaRepository;
import com.springboot.springboot.repository.ReservationRepository;

@CrossOrigin(origins = "http://localhost:5001")
@RestController
@RequestMapping("/api")
public class ReservationController {

    @Autowired
    private ReservationRepository ReservationRepository;

    @Autowired
    private MesaRepository MesaRepository;

    @Autowired
    private UserRepository UserRepository;

    @PostMapping("/reservation/{id_mesa}")
    public ResponseEntity<Reservation> CreateReservation(@RequestBody Reservation reservation,
            @PathVariable(required = true) Long id_mesa) {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            User user = UserRepository.findByUsername(userDetails.getUsername()).get();

            if (user == null) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            Mesa mesa = MesaRepository.findById(id_mesa).get();

            if (mesa == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Integer mesaAvailable = ReservationRepository.mesaAvailable(id_mesa, reservation.getFecha_reserva(),
                    reservation.getType_reservation());

            if (mesaAvailable > 0) {
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }

            reservation.setAccepted(false);
            reservation.setMesa(mesa);
            reservation.setUser(user);
            ReservationRepository.save(reservation);
            return new ResponseEntity<>(reservation, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/reservation/{id_reserv}")
    public ResponseEntity<Reservation> UpdateReservation(@RequestBody Reservation reservation_,
            @PathVariable(required = true) Long id_reserv) {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            User user = UserRepository.findByUsername(userDetails.getUsername()).get();
            Reservation reservation = ReservationRepository.findById(id_reserv).get();

            if (user.getId() != reservation.getUser().getId()) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            if (reservation.getAccepted()) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }

            Integer mesaAvailable = ReservationRepository.mesaAvailable(reservation.getMesa().getId(),
                    reservation_.getFecha_reserva(),
                    reservation_.getType_reservation());

            if (mesaAvailable > 0) {
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }

            reservation.setFecha_reserva(reservation_.getFecha_reserva());
            reservation.setType_reservation(reservation_.getType_reservation());
            ReservationRepository.save(reservation);
            return new ResponseEntity<>(reservation, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/reservation/{id}")
    public ResponseEntity<?> DeleteReservation(@PathVariable(required = true) Long id) {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            User user = UserRepository.findByUsername(userDetails.getUsername()).get();
            Reservation reservation = ReservationRepository.findById(id).get();

            if (user.getId() != reservation.getUser().getId()) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            if (reservation.getAccepted()) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }

            ReservationRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
}