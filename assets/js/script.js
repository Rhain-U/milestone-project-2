/**General styles */
const  square = document.querySelectorAll('.square');
const goodMole = document.querySelectorAll('.good-mole');
const badMole = document.querySelectorAll('.bad-mole');
const timeLeft = document.querySelector('#time-left');
let score = document.querySelector('#score');
const startGame = document.querySelector('#start-game');
const endGame = document.querySelector('#end-game');

/**Game variables */
let result = 0;
let hitPosition;
let currentTime = 60;   //60 seconds
let timerId = null;

