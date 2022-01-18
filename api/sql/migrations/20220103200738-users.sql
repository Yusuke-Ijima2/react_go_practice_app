-- +migrate Up
CREATE TABLE IF NOT EXISTS `users` (
    id bigint AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(255),
    family_name VARCHAR(255),
    email VARCHAR(255),
    user_status_txt VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id)
    );

-- +migrate Down
DROP TABLE IF EXISTS `users`;