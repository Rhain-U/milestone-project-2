/** Global variables */
const startGameButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");
const menuScreen = document.querySelector("#menu-screen");
const gameScreen = document.querySelector("#game-screen");
const squares = document.querySelectorAll(".square");
const timeLeft = document.querySelector("#time-left");
const scoreDisplay = document.querySelector("#score");
const splatterSound = document.getElementById("splatter");
const resultScreen = document.getElementById("result-screen");
const endGameResult = document.getElementById("end-game-result");
let result = 0;
let currentTime = 60;
let hitPositionCorrect = null;
let hitPositionWrong = null;
let gameInterval = null;
let timerId = null;
gameScreen.style.display = "none";
resultScreen.style.display = "none";
restartButton.style.display = "none";
/** Start Game */
startGameButton.addEventListener("click", () => {
  menuScreen.style.display = "none";
  gameScreen.style.display = "block";
  startGame();
});
function startGame() {
  result = 0;
  currentTime = 60;
  scoreDisplay.textContent = result;
  timeLeft.textContent = currentTime;
  // Play sound
  splatterSound.play();
  // Start moving moles
  moveBadMole();
  moveGoodMole();
  // Start countdown
  if (timerId) clearInterval(timerId);
  timerId = setInterval(countDown, 1000);
}
/** Function to add bad mole */
function addBadMole() {
  squares.forEach((square) => square.classList.remove("bad-mole"));
  let randomSquare = squares[Math.floor(Math.random() * squares.length)];
  randomSquare.classList.add("bad-mole");
  hitPositionCorrect = randomSquare.id;
}
/** Function to add good mole */
function addGoodMole() {
  squares.forEach((square) => square.classList.remove("good-mole"));
  let randomSquare = squares[Math.floor(Math.random() * squares.length)];
  randomSquare.classList.add("good-mole");
  hitPositionWrong = randomSquare.id;
}
/** Move bad moles */
function moveBadMole() {
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(addBadMole, 2000);
}
/** Move good moles */
function moveGoodMole() {
  setInterval(addGoodMole, 1000);
}
/** Score update */
squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id === hitPositionCorrect) {
      result++;
      scoreDisplay.textContent = result;
      hitPositionCorrect = null;
    }
    if (square.id === hitPositionWrong) {
      message = `
            <h2>And so it ends...</h2>
            <p>You hit good mole, You bad, Your score is ${result},
            I'm sure you can do a lot better than that!</p>
            `;
      endGame(message);
    }
  });
});
/** Countdown Timer */
function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;
  if (currentTime === 0) {
    clearInterval(timerId);
    clearInterval(gameInterval);

    message = `
        <h2>And so it ends...</h2>
        <p>You managed to last a minute, not bad at all. Your score 
        was ${result}, Maybe you can do a lot better next time!</p>
        `;
    endGame(message);
  }
}
function endGame(message) {
  gameScreen.style.display = "none";
  endGameResult.innerHTML = message;
  resultScreen.style.display = "block";
}
/**
 * Restart the game by reloading the page
 */
function restartTheGame() {
  window.location.reload();
}
