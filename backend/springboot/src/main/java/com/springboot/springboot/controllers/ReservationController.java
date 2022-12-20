package com.springboot.springboot.controllers;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

    @GetMapping("/reservation")
    public ResponseEntity<List<Reservation>> allReservation() {
        try {
            List<Reservation> reservation = new ArrayList<Reservation>();
            ReservationRepository.findAll().forEach(reservation::add);
            return new ResponseEntity<>(reservation, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/reservation/{id_mesa}")
    public ResponseEntity<Reservation> CreateReservation(@RequestBody Reservation reservation,
            @PathVariable(required = true) Long id_mesa) {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            User user = UserRepository.findByUsername(userDetails.getUsername()).get();
            Mesa mesa = MesaRepository.findById(id_mesa).get();
            Integer mesaAvailable = ReservationRepository.mesaAvailable(id_mesa, reservation.getFecha_reserva(),
                    reservation.getType_reservation());

            if (user == null) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            if (mesa == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
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
}
