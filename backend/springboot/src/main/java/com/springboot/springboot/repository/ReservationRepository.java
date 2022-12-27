package com.springboot.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springboot.springboot.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query(value = "SELECT COUNT(*) FROM reservations WHERE mesa_id = :mesa_id AND fecha_reserva = :fecha_reserva AND type_reservation = :type_reservation", nativeQuery = true)
    Integer mesaAvailable(@Param("mesa_id") Long mesa_id, @Param("fecha_reserva") String fecha_reserva,
            @Param("type_reservation") String type_reservation);

    @Query(value = "SELECT * FROM reservations WHERE mesa_id = :mesa_id AND user_id = :user_id", nativeQuery = true)
    List<Reservation> showReservationsOfMesa(@Param("user_id") Long user_id, @Param("mesa_id") Long mesa_id);
}