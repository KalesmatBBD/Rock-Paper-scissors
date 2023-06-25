USE master
GO

DROP DATABASE IF EXISTS RockPaperScissors
GO

CREATE DATABASE RockPaperScissors
GO

USE RockPaperScissors
GO

CREATE TABLE Players (
  email varchar(50) PRIMARY KEY,
  username varchar(50) UNIQUE NOT NULL,
  password varchar(50) NOT NULL
);

CREATE TABLE Score (
  username varchar(50) UNIQUE,
  wins int DEFAULT 0,
  losses int DEFAULT 0,
);

ALTER TABLE [Score] ADD FOREIGN KEY ([username]) REFERENCES [Players] ([username])
GO

