-- +migrate Up
CREATE TABLE IF NOT EXISTS `User_status` (
    id bigint AUTO_INCREMENT NOT NULL,
    status_name VARCHAR(255),
    PRIMARY KEY (id)
    );

-- +migrate Down
DROP TABLE IF EXISTS `User_status`;