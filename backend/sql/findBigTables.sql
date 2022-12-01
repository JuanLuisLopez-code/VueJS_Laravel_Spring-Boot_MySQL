SELECT m.*
FROM mesas m
WHERE m.is_active IS TRUE
ORDER BY m.capacity DESC
LIMIT 3;