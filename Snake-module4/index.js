//Completed on Sunday August 30, 2020 08:37PM From scrimba.com.  MOdule 4 of FE Career Path.  Need to read back through code one more time to get idea.

const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const scoreDisplay = document.getElementById("score");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;

function createGrid() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
}

createGrid();

currentSnake.forEach((index) => squares[index].classList.add("snake"));

function startGame() {
  currentSnake.forEach((segment) => squares[segment].classList.remove("snake"));
  clearInterval(timerId); 
  currentSnake = [2, 1, 0];
  squares[appleIndex].classList.remove("apple");
  score = 0;
  scoreDisplay.textContent = score;
  direction = 1;
  intervalTime = 1000;
  generateApples();
  currentSnake.forEach((segment) => squares[segment].classList.add("snake"));
  timerId = setInterval(move, intervalTime);
}
generateApples;

function move() {
  //This first if statement checks to see if the snake hit the bottom, the right, then left then top walls
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width < 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains("snake")
  ) {
    return clearInterval(timerId);
  }

  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);
  squares[currentSnake[0]].classList.add("snake");

  //===============  snake eating apple  =============
  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    currentSnake.push(tail);
    generateApples();
    score++;
    scoreDisplay.textContent = score;
    clearInterval(timerId);
    intervalTime = intervalTime * speed;
    timerId = setInterval(move, intervalTime);
  }
}

function generateApples() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}
generateApples();

function control(event) {
  if (event.keyCode === 39) {
    direction = 1;
  } else if (event.keyCode === 38) {
    direction = -width;
  } else if (event.keyCode === 37) {
    direction = -1;
  } else if (event.keyCode === 40) {
    direction = +width;
  }
}

document.addEventListener("keyup", control);
startButton.addEventListener("click", startGame);
