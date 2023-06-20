All DB Scripts and Diagrams comes here

CREATE DATABASE IF NOT EXISTS RockPaperScissors;
USE RockPaperScissors;

CREATE TABLE IF NOT EXISTS Players (
  username varchar(50) PRIMARY KEY,
  email varchar(50),
  password varchar(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Score (
  username varchar(50),
  score int DEFAULT 0,
  achievedOn timestamp DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_user_email
    FOREIGN KEY (user_email)
    REFERENCES Players(username),

  CONSTRAINT uq_score_user_email
    UNIQUE (username)
);