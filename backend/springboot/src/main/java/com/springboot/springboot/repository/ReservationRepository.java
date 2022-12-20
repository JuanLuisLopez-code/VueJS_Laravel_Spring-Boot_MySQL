package com.springboot.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springboot.springboot.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query(value = "SELECT COUNT(*) FROM reservations WHERE mesa_id = :mesa_id AND fecha_reserva = :fecha_reserva AND type_reservation = :type_reservation", nativeQuery = true)
    Integer mesaAvailable(@Param("mesa_id") Long mesa_id, @Param("fecha_reserva") String fecha_reserva,
            @Param("type_reservation") String type_reservation);
}