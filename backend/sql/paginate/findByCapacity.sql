SELECT COUNT(*)
FROM mesas m
WHERE m.capacity = 3
    AND m.is_active IS TRUE
    AND m.name_mesa LIKE '%';