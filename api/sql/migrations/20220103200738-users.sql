-- +migrate Up
CREATE TABLE IF NOT EXISTS `users` (
    --  bigint 広範囲整数 AUTO_INCREMENT データを追加した時にカラムに対して現在格納されている最大の数値に 1 を追加した数値を自動で格納することができる
    id bigint AUTO_INCREMENT NOT NULL,
    -- 可変長文字列（中に最大文字数を設定）
    first_name VARCHAR(255),
    family_name VARCHAR(255),
    email VARCHAR(255),
    User_status_id int(64),
    -- デフォルトはCURRENT_TIMESTAMPが設定されている
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    -- 主キー（重複することはできない）
    PRIMARY KEY (id)
    );

-- +migrate Down
DROP TABLE IF EXISTS `users`;