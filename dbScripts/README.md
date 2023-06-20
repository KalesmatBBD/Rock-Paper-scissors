All DB Scripts and Diagrams comes here

CREATE DATABASE RockPaperScissors;
USE RockPaperScissors;

CREATE TABLE Players (
  id INT PRIMARY KEY IDENTITY,
  username VARCHAR(50) UNIQUE,
  password VARCHAR(50),
);

CREATE TABLE Games (
  id INT PRIMARY KEY IDENTITY,
  player_id INT,
  timestamp DATETIME,
  FOREIGN KEY (player_id) REFERENCES Players(id)
);

CREATE TABLE Rounds (
  id INT PRIMARY KEY IDENTITY,
  game_id INT,
  player_choice VARCHAR(50),
  computer_choice VARCHAR(50),
  result VARCHAR(50),
  timestamp DATETIME,
  FOREIGN KEY (game_id) REFERENCES Games(id)
);