-- +migrate Up
CREATE TABLE IF NOT EXISTS `user_statuses` (
    id bigint AUTO_INCREMENT NOT NULL,
    status_name VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id)
);

-- +migrate Down
DROP TABLE IF EXISTS `user_statuses`;