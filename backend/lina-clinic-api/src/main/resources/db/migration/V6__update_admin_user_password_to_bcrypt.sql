INSERT INTO users (username, password, full_name, role, active)
VALUES (
    'admin',
    '$2a$10$5J/gcwzfIxgvQWBeY97hk.tySur9hmKalxlu.XQgNGw4.26S.WxMu',
    'Admin User',
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
