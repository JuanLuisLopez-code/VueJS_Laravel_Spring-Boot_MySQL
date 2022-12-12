SELECT COUNT(*)
FROM mesas m
WHERE m.is_active IS TRUE
    AND m.id IN (
        SELECT a.mesa_id
        FROM (
                SELECT mc.mesa_id,
                    COUNT(mc.category_id) as count_cat_id
                FROM mesas_categories mc
                    LEFT JOIN categories c ON mc.category_id = c.id
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
    AND m.name_mesa LIKE '%';