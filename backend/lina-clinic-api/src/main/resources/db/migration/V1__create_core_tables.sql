CREATE TABLE treatment_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(160) NOT NULL,
    display_order INTEGER NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_treatment_categories_slug UNIQUE (slug)
);

CREATE TABLE treatment_services (
    id BIGSERIAL PRIMARY KEY,
    category_id BIGINT NOT NULL,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(160) NOT NULL,
    short_description VARCHAR(500) NOT NULL,
    detail_description TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    requires_doctor BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_treatment_services_slug UNIQUE (slug),
    CONSTRAINT ck_treatment_services_duration_positive CHECK (duration_minutes > 0),
    CONSTRAINT fk_treatment_services_category
        FOREIGN KEY (category_id) REFERENCES treatment_categories (id)
);

CREATE TABLE staff_members (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    title VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE staff_services (
    id BIGSERIAL PRIMARY KEY,
    staff_member_id BIGINT NOT NULL,
    treatment_service_id BIGINT NOT NULL,
    CONSTRAINT uk_staff_services_staff_member_treatment_service
        UNIQUE (staff_member_id, treatment_service_id),
    CONSTRAINT fk_staff_services_staff_member
        FOREIGN KEY (staff_member_id) REFERENCES staff_members (id),
    CONSTRAINT fk_staff_services_treatment_service
        FOREIGN KEY (treatment_service_id) REFERENCES treatment_services (id)
);

CREATE TABLE working_hours (
    id BIGSERIAL PRIMARY KEY,
    day_of_week VARCHAR(20) NOT NULL,
    opening_time TIME NOT NULL,
    closing_time TIME NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT uk_working_hours_day_of_week UNIQUE (day_of_week),
    CONSTRAINT ck_working_hours_time_range CHECK (opening_time < closing_time)
);

CREATE TABLE appointments (
    id BIGSERIAL PRIMARY KEY,
    customer_first_name VARCHAR(100) NOT NULL,
    customer_last_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    treatment_service_id BIGINT NOT NULL,
    staff_member_id BIGINT NOT NULL,
    appointment_start TIMESTAMP NOT NULL,
    appointment_end TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL,
    kvkk_approved BOOLEAN NOT NULL DEFAULT FALSE,
    note TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ck_appointments_time_range CHECK (appointment_start < appointment_end),
    CONSTRAINT fk_appointments_treatment_service
        FOREIGN KEY (treatment_service_id) REFERENCES treatment_services (id),
    CONSTRAINT fk_appointments_staff_member
        FOREIGN KEY (staff_member_id) REFERENCES staff_members (id)
);

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role VARCHAR(20) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_users_username UNIQUE (username)
);

CREATE INDEX idx_treatment_services_category_id
    ON treatment_services (category_id);

CREATE INDEX idx_staff_services_staff_member_id
    ON staff_services (staff_member_id);

CREATE INDEX idx_staff_services_treatment_service_id
    ON staff_services (treatment_service_id);

CREATE INDEX idx_appointments_staff_member_start_end
    ON appointments (staff_member_id, appointment_start, appointment_end);

CREATE INDEX idx_appointments_status
    ON appointments (status);

CREATE INDEX idx_appointments_treatment_service_id
    ON appointments (treatment_service_id);
