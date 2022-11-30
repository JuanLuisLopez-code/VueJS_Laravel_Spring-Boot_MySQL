SELECT *
FROM mesas m
WHERE m.is_active IS TRUE
    AND m.name_mesa LIKE 'co%'
ORDER BY m.capacity ASC