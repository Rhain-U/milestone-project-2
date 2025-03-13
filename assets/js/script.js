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

