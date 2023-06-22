const cards = document.querySelectorAll('.card');

const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');

let playerScore = 0;
let computerScore = 0;

cards.forEach(card => {
  card.addEventListener('click', function () {
    const playerChoice = this.querySelector('img').getAttribute('alt');

    const computerChoice = generateComputerChoice();

    updateSelectedCards(playerChoice, computerChoice);

    const winner = determineWinner(playerChoice, computerChoice);
    if (winner === 'player') {
      playerScore++;
      playerScoreElement.textContent = playerScore;
    } else if (winner === 'computer') {
      computerScore++;
      computerScoreElement.textContent = computerScore;
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
