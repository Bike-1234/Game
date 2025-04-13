const colors = ["red", "blue", "orange", "green"];
let gameSequence = [];
let userSequence = [];
let level = 0;
let started = false;

const statusText = document.getElementById("status");
const buttons = document.querySelectorAll(".button");

document.addEventListener("keydown", startGame);

function startGame() {
    if (!started) {
        started = true;
        level = 0;
        gameSequence = [];
        nextSequence();
    }
}

function nextSequence() {
    userSequence = [];
    level++;
    statusText.textContent = `Level ${level}`;

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);
    
    playSequence();
}

function playSequence() {
    let delay = 500;

    gameSequence.forEach((color, index) => {
        setTimeout(() => {
            flashButton(color);
        }, index * delay);
    });
}

function flashButton(color) {
    const button = document.getElementById(color);
    button.classList.add("active");
    setTimeout(() => {
        button.classList.remove("active");
    }, 300);
}

buttons.forEach(button => {
    button.addEventListener("click", handleClick);
});

function handleClick(event) {
    const color = event.target.getAttribute("data-color");
    userSequence.push(color);
    flashButton(color);

    if (userSequence[userSequence.length - 1] !== gameSequence[userSequence.length - 1]) {
        gameOver();
        return;
    }

    if (userSequence.length === gameSequence.length) {
        setTimeout(nextSequence, 1000);
    }
}

function gameOver() {
    statusText.textContent = `Game Over! Your score was ${level - 1}. Press any key to restart.`;
    started = false;
}
