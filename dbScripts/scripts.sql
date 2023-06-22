USE master
GO

DROP DATABASE IF EXISTS RockPaperScissors
GO

CREATE DATABASE RockPaperScissors
GO

USE RockPaperScissors
GO

CREATE TABLE Players (
  username varchar(50) PRIMARY KEY,
  email varchar(50),
  password varchar(50) NOT NULL
);

CREATE TABLE Score (
  username varchar(50),
  score int DEFAULT 0,
  achievedOn datetime DEFAULT GETDATE(),

  CONSTRAINT fk_user_name
    FOREIGN KEY (username)
    REFERENCES Players(username),

  CONSTRAINT uq_score_user_email
    UNIQUE (username)
);
