/**Global variables */
const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let currentTime = 60
let hitPosition; 
let timerId = null;

/**function to add mole to random square */

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('good-avo');
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('good-avo');

    hitPosition = randomSquare.id;

}

randomSquare();

/**function to make score increase once the correct avo has been hit. */

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id === hitPosition) {
            result++;
            score.textContent = result+1;
            hitPosition = null;
        }
    })
})

/**function to move the Avo's to a different square every second */ 

function moveGoodAvo() {
    timerId = setInterval(randomSquare, 2000);
}

moveGoodAvo(); 
