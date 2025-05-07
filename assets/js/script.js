/* jshint esversion: 6 */

/** Global variables */
const startGameButton = document.querySelector("#start-button");
const restartButton = document.querySelectorAll(".restart-button");
const menuScreen = document.querySelector("#menu-screen");
const gameScreen = document.querySelector("#game-screen");
const squares = document.querySelectorAll(".square");
const timeLeft = document.querySelector("#time-left");
const scoreDisplay = document.querySelector("#score");
const splatterSound = document.getElementById("splatter");
const resultScreen = document.getElementById("result-screen");
const endGameResult = document.getElementById("end-game-result");
const cursor = document.querySelector(".cursor");


/** Cursor movement (Credited from Angle Brace video) mentioned in read me */
function updateCursorPosition(e) {
  if (cursor) {
    cursor.style.top = e.pageY + "px";
    cursor.style.left = e.pageX + "px";
  }
}

window.addEventListener("mousemove", updateCursorPosition);

function activateCursor() {
  if (cursor) {
    cursor.classList.add("active");
  }
}

window.addEventListener("mousedown", activateCursor);

window.addEventListener("mouseup", () => {
  cursor.classList.remove("active");
});

let result = 0;
let currentTime = 60;
let hitPositionCorrect = null;
let hitPositionWrong = null;
let gameInterval = null;
let timerId = null;

/**Function to hide restart button until user lands on results page. */
gameScreen.style.display = "none";
resultScreen.style.display = "none";
function hideRestartButtons() {
  restartButton.forEach((button) => {
    button.style.display = "none";
  });
}

hideRestartButtons();

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
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  timerId = setInterval(countDown, 1000);
}
/** Function to add bad mole */
function addBadMole() {
  squares.forEach((square) => square.classList.remove("bad-mole"));
  let randomSquare = squares[Math.floor(Math.random() * squares.length)];
  /**
   * While loop added to prevent good mole from appearing in the same square as bad mole
   */

  while (randomSquare.id == hitPositionWrong) {
    randomSquare = squares[Math.floor(Math.random() * squares.length)];
  }
  randomSquare.classList.add("bad-mole");
  hitPositionCorrect = randomSquare.id;

  console.log(
    "hitPositionWrong:",
    hitPositionWrong,
    "hitPositionCorrect:",
    hitPositionCorrect
  );
}

/** Function to add good mole */
function addGoodMole() {
  squares.forEach((square) => square.classList.remove("good-mole"));
  let randomSquare = squares[Math.floor(Math.random() * squares.length)];

  /**
   * While loop added to prevent good mole from appearing in the same square as bad mole
   * */
  while (randomSquare.id == hitPositionCorrect) {
    randomSquare = squares[Math.floor(Math.random() * squares.length)];
  }
  randomSquare.classList.add("good-mole");
  hitPositionWrong = randomSquare.id;

  console.log(
    "hitPositionWrong:",
    hitPositionWrong,
    "hitPositionCorrect:",
    hitPositionCorrect
  );
}

/** Move bad moles */
function moveBadMole() {
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(addBadMole, 1000);
}

/** Move good moles */
function moveGoodMole() {
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(addGoodMole, 2000);
}
function moveGoodMole() {
  setInterval(addGoodMole, 2000);
}
/** Score update */
squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id === hitPositionCorrect) {
      result++;
      scoreDisplay.textContent = result;
      hitPositionCorrect = null;
      splatterSound.play();
    }
    if (square.id === hitPositionWrong) {
      let message = `
            <h2>Game over...</h2>
            <p class="game-over">You hit good mole, Your score is ${result}
            </p>
        
            <p class =" game-over" >Maybe you can do a lot better next time!</p>
            `;
      endGame(message);
      splatterSound.play();
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

    let message = `
        <h2>Game over...</h2>
        <p class ="game-over">
        You managed to last a minute, not bad at all. Your score
        was ${result},</p>
        
        <p class="game-over"
        >Maybe you can do a lot better next time!</p>
        `;
    endGame(message);
  }
}
function endGame(message) {
  gameScreen.style.display = "none";
  endGameResult.innerHTML = message;
  resultScreen.style.display = "block";
  restartButton.forEach((button) => {
    button.style.display = "block";
  });
}

restartButton.forEach((button) => {
  button.addEventListener("click", () => {
    goToHome();
  });
});


/**404 reload page to take the user back to the landing page. */

function goToHome() {
  document.getElementById("menu-screen").style.display = "block";
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "none";
}
