/**Global variables */
const startGame = document.querySelector('#start-button');
const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let currentTime = 60
let hitPosition; 
let timerId = null;


/**Function to start the game */


   
/**function to add good mole to random square */

function addBadMole() {
    squares.forEach(square => {
        square.classList.remove('bad-mole');
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('bad-mole');
    
hitPosition = randomSquare.id;
}

/**Add function for Good mole to pop up in random square */

function addGoodMole() {
    squares.forEach(square => {
        square.classList.remove('good-mole');
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('good-mole');
}


/**function to make score increase once the correct avo has been hit. */

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id === hitPosition) {
            result++;
            score.textContent = result+1;
            hitPosition = null;
        }
    });
});

//function to end game if good avo has been hit.



/**function to move the Avo's to a different square every few seconds */ 

function moveBadMole() {
  timerId = setInterval(addBadMole, 2000); // 3000 milliseconds, 3 seconds
}
moveBadMole();

function moveGoodMole() {
    timerId = setInterval(addGoodMole, 1000); // 3000 milliseconds, 3 seconds
}
moveGoodMole();  




  //* Function to count down the time left */

  timerId = setInterval(countDown, 1000);
  
function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(timerId);
        alert('Game Over! Your final score is ' + result);
        return index.html   
    }
}

