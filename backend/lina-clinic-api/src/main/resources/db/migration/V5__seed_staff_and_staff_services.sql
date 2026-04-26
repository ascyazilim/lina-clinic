WITH demo_staff (first_name, last_name, title, phone, active) AS (
    VALUES
        ('Ayşe', 'Yılmaz', 'Uzman Estetisyen', '05550000001', TRUE),
        ('Zeynep', 'Demir', 'Cilt Bakım Uzmanı', '05550000002', TRUE),
        ('Elif', 'Kaya', 'Estetik Uygulama Uzmanı', '05550000003', TRUE),
        ('Mehmet', 'Arslan', 'Saç Ekimi Uzmanı', '05550000004', TRUE)
)
UPDATE staff_members sm
SET
    first_name = ds.first_name,
    last_name = ds.last_name,
    title = ds.title,
    active = ds.active,
    updated_at = CURRENT_TIMESTAMP
FROM demo_staff ds
WHERE sm.phone = ds.phone;

INSERT INTO staff_members (first_name, last_name, title, phone, active)
SELECT
    ds.first_name,
    ds.last_name,
    ds.title,
    ds.phone,
    ds.active
FROM (
    VALUES
        ('Ayşe', 'Yılmaz', 'Uzman Estetisyen', '05550000001', TRUE),
        ('Zeynep', 'Demir', 'Cilt Bakım Uzmanı', '05550000002', TRUE),
        ('Elif', 'Kaya', 'Estetik Uygulama Uzmanı', '05550000003', TRUE),
        ('Mehmet', 'Arslan', 'Saç Ekimi Uzmanı', '05550000004', TRUE)
) AS ds(first_name, last_name, title, phone, active)
WHERE NOT EXISTS (
    SELECT 1
    FROM staff_members sm
    WHERE sm.phone = ds.phone
);

WITH staff_service_mapping (staff_phone, service_slug) AS (
    VALUES
        ('05550000001', 'lazer-epilasyon'),
        ('05550000001', 'dovme-sildirme'),
        ('05550000001', 'lazer-cilt-uygulamalari'),
        ('05550000001', 'bolgesel-incelme'),
        ('05550000001', 'vucut-sekillendirme'),
        ('05550000001', 'selulit-bakimi'),
        ('05550000002', 'leke-tedavileri'),
        ('05550000002', 'sivilce-tedavisi'),
        ('05550000002', 'medikal-cilt-bakimi'),
        ('05550000002', 'lazer-cilt-uygulamalari'),
        ('05550000003', 'dudak-dolgusu'),
        ('05550000003', 'dolgu-tedavileri'),
        ('05550000003', 'ameliyatsiz-estetik-uygulamalari'),
        ('05550000004', 'sac-ekimi'),
        ('05550000004', 'sac-mezoterapisi'),
        ('05550000004', 'prp-sac-uygulamalari')
)
INSERT INTO staff_services (staff_member_id, treatment_service_id)
SELECT
    sm.id,
    ts.id
FROM staff_service_mapping ssm
JOIN staff_members sm
    ON sm.phone = ssm.staff_phone
JOIN treatment_services ts
    ON ts.slug = ssm.service_slug
ON CONFLICT (staff_member_id, treatment_service_id) DO NOTHING;
