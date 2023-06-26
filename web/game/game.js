const cards = document.querySelectorAll('.card');
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const timerElement = document.getElementById('timer');
const resultElement = document.getElementById('result');

const accessToken = sessionStorage.getItem("Authorization")
const refreshToken = sessionStorage.getItem("RefreshToken")

let playerScore = 0;
let computerScore = 0;
let round = 0;
let timer;

function handleClick() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

cards.forEach(card => {
  card.addEventListener('click', function () {

    if (playerScore === 3 || computerScore === 3 || timer ===null) {
      return; 
    }

    const playerChoice = this.querySelector('img').getAttribute('alt');
    const computerChoice = generateComputerChoice();
    updateSelectedCards(playerChoice, computerChoice);
    timer=startTimer(15);

    const winner = determineWinner(playerChoice, computerChoice);
    if (winner === 'player') {
      playerScore++;
      playerScoreElement.textContent = playerScore;
    } else if (winner === 'computer') {
      computerScore++;
      computerScoreElement.textContent = computerScore;
    }
    round++;

    if (playerScore === 3 || computerScore === 3 ) {
      endGame();
    } else {
      timer = startTimer(15);
    }
    
  });
});

function generateComputerChoice() {
  const choices = ['Rock', 'Paper', 'Scissor'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function updateSelectedCards(playerChoice, computerChoice) {
  const playerSelectedCard = document.querySelector('.player .selected-card img');
  if (playerChoice) {
    playerSelectedCard.setAttribute('src', `${playerChoice.toLowerCase()}.png`);
    playerSelectedCard.setAttribute('alt', playerChoice);
  }

  const computerSelectedCard = document.querySelector('.computer .selected-card img');
  if (computerChoice) {
    computerSelectedCard.setAttribute('src', `${computerChoice.toLowerCase()}.png`);
    computerSelectedCard.setAttribute('alt', computerChoice);
  }
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'tie';
  } else if (
    (playerChoice === 'Rock' && computerChoice === 'Scissor') ||
    (playerChoice === 'Paper' && computerChoice === 'Rock') ||
    (playerChoice === 'Scissor' && computerChoice === 'Paper')
  ) {
    return 'player';
  } else {
    return 'computer';
  }
}

function startTimer() {
  resetTimer();
  let time = 15;
  timerElement.textContent = time;

  return setInterval(() => {
    time--;
    timerElement.textContent = time;

    if (time === 0) {
      endGame();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timerElement.textContent = '';
}

function endGame() {
  resetTimer();
  cards.forEach(card => card.removeEventListener('click',handleClick));

  if (playerScore > computerScore) {
    resultElement.textContent = "Congratulations! You won the game.";
    submitScore('player1', 'win');
  } else if (playerScore < computerScore) {
    resultElement.textContent = "Oops! You lost the game.";
    submitScore('player1', 'loss');
  } else {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
      resultElement.textContent = "Oops! You lost the game.";
      submitScore('player1', 'loss');
    }
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  round = 0;
  resetTimer();
  cards.forEach(card => {
    card.removeEventListener('click', handleClick);
  });
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
  resultElement.textContent = '';
  updateSelectedCards('', '');
  timer = startTimer(15);
}

 const replayButton = document.getElementById('replay-button');
  replayButton.addEventListener('click', resetGame);

const submitScore= (username,state) => {
  fetch('http://localhost:4040/api/scores/postScore', {
      method: 'POST',
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AccessToken': accessToken,
        'RefreshToken': refreshToken,
      },
      body: JSON.stringify({username,state})
  })
  .then(response => {
      console.log("Failed",response);
      if (response.status === 200) {
        console.log("Success",response);
      }
  });
}

