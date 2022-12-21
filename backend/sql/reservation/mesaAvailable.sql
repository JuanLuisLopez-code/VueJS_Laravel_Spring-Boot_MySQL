SELECT COUNT(*)
FROM reservations
WHERE mesa_id = 1
    AND fecha_reserva = '2022-12-12'
    AND type_reservation = 'dinner';