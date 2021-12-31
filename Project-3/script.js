'use strict';

const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const diceEl = document.querySelector(`.dice`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const btnNew = document.querySelector(`.btn--new`);

//starting condition
let currentScore, scores, playing, activeplayer;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);

  currentScore = 0;
  activeplayer = 0;
  scores = [0, 0];
  playing = true;

  diceEl.classList.add('hidden');
};
init();

const switchPlayer = function () {
  document.querySelector(`#current--${activeplayer}`).textContent = 0;
  currentScore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

//ROlling the dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generting a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);
    console.log(dice);

    //Display the dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;

    //Check for rolled.1: if true switch to next player
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activeplayer}`).textContent =
        currentScore;
    } else {
      //switching the active player
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    //Add current score to active player score
    scores[activeplayer] += currentScore;
    document.querySelector(`#score--${activeplayer}`).textContent =
      scores[activeplayer];
    //check it is >=100;
    //finish the game
    if (scores[activeplayer] >= 100) {
      playing = false;
      diceEl.classList.add(`hidden`);
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove(`player--active`);
    } else {
      // switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
