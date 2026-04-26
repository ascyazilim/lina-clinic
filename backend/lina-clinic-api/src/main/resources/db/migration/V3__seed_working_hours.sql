INSERT INTO working_hours (day_of_week, opening_time, closing_time, active)
VALUES
    ('MONDAY', '09:00', '18:00', TRUE),
    ('TUESDAY', '09:00', '18:00', TRUE),
    ('WEDNESDAY', '09:00', '18:00', TRUE),
    ('THURSDAY', '09:00', '18:00', TRUE),
    ('FRIDAY', '09:00', '18:00', TRUE),
    ('SATURDAY', '10:00', '16:00', TRUE),
    ('SUNDAY', '10:00', '16:00', FALSE)
ON CONFLICT (day_of_week) DO UPDATE
SET
    opening_time = EXCLUDED.opening_time,
    closing_time = EXCLUDED.closing_time,
    active = EXCLUDED.active;
