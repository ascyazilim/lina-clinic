INSERT INTO users (username, password, full_name, role, active)
VALUES (
    'admin',
    '{noop}Admin123!',
    'Lina Clinic Admin',
    'ADMIN',
    TRUE
)
ON CONFLICT (username) DO UPDATE
SET
    password = EXCLUDED.password,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    active = EXCLUDED.active,
    updated_at = CURRENT_TIMESTAMP;
