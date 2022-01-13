-- +migrate Up
CREATE TABLE IF NOT EXISTS `user_statuses` (
    id bigint AUTO_INCREMENT NOT NULL,
    status_name VARCHAR(255),
    PRIMARY KEY (id)
);

-- +migrate Down
DROP TABLE IF EXISTS `user_statuses`;