'use strict';

// Selecting the elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');

// Selecting the buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Setting the initial score & Conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');

// Set the Current Score
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
// after finishing the game the Button will be disabled
let gamePlaying = true;

// Rolling the dice Functionality
btnRoll.addEventListener('click', function () {
  if (gamePlaying) {
    // 1. Generating random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2. Displaying the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    // 3. Checking if the dice is 1
    if (dice !== 1) {
      // 4.1 Adding the dice number to the current score
      currentScore = currentScore + dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // 4.2 Switching the player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;

      // 4.3 Switching the active class
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    }
  }
});

// Holding the score Functionality
btnHold.addEventListener('click', function () {
  if (gamePlaying) {
    // 1. Adding the current score to the Active Player score
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if the player score is greater than 100
    if (scores[activePlayer] >= 100) {
      // 3. Finishing the game
      gamePlaying = false;

      diceElement.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 4. Switching the player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;

      // 4.3 Switching the active class
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    }
  }
});

// New Game Functionality & Resetting the game
btnNew.addEventListener('click', function () {
  // New Game
  // Resetting the scores
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  // Resetting the scores
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  // Resetting the active class
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
});
