SELECT m.*
FROM mesas m
    LEFT JOIN mesas_categories mc ON m.id = mc.mesa_id
    INNER JOIN categories c ON c.id = mc.category_id
WHERE m.is_active IS TRUE
    AND m.id IN (
        SELECT a.mesa_id
        FROM (
                SELECT mc.mesa_id,
                    COUNT(mc.category_id) as count_cat_id
                FROM mesas_categories mc
                    INNER JOIN categories c ON mc.category_id = c.id
                WHERE c.name_category IN ('quo', 'odio')
                GROUP BY mc.mesa_id
            ) AS a
        WHERE a.count_cat_id >= ALL (
                SELECT b.count_cat
                FROM (
                        SELECT COUNT(*) as count_cat
                        FROM categories cc
                        WHERE cc.name_category IN ('quo', 'odio')
                    ) b
            )
    )
GROUP BY m.id;