SELECT
    DISTINCT m.*
FROM
    mesas m
    INNER JOIN reservations r
WHERE
    m.id = r.mesa_id
    AND r.user_id = 6;