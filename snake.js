const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

let velocityX = 0;
let velocityY = 0;
let lastDirection = "";

function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 400, 400);

    // COMIDA
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // SNAKE
    ctx.fillStyle = "lime";
    snake.forEach(seg => ctx.fillRect(seg.x, seg.y, box, box));

    update();
}

function update() {
    let head = {
        x: snake[0].x + velocityX * box,
        y: snake[0].y + velocityY * box
    };

    if (velocityX === 0 && velocityY === 0) return;

    // PAREDES
    if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
        return gameOver();
    }

    // CHOQUE CON CUERPO
    for (let seg of snake) {
        if (head.x === seg.x && head.y === seg.y) return gameOver();
    }

    // COMER
    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head);
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
        snake.unshift(head);
    }
}

// TECLADO
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && lastDirection !== "DOWN") {
        velocityX = 0; velocityY = -1; lastDirection = "UP";
    }
    if (e.key === "ArrowDown" && lastDirection !== "UP") {
        velocityX = 0; velocityY = 1; lastDirection = "DOWN";
    }
    if (e.key === "ArrowLeft" && lastDirection !== "RIGHT") {
        velocityX = -1; velocityY = 0; lastDirection = "LEFT";
    }
    if (e.key === "ArrowRight" && lastDirection !== "LEFT") {
        velocityX = 1; velocityY = 0; lastDirection = "RIGHT";
    }
});

// TOUCH CONTROLS
window.setDirectionFromTouch = function(dir) {
    if (dir === "UP" && lastDirection !== "DOWN") {
        velocityX = 0; velocityY = -1; lastDirection = "UP";
    }
    if (dir === "DOWN" && lastDirection !== "UP") {
        velocityX = 0; velocityY = 1; lastDirection = "DOWN";
    }
    if (dir === "LEFT" && lastDirection !== "RIGHT") {
        velocityX = -1; velocityY = 0; lastDirection = "LEFT";
    }
    if (dir === "RIGHT" && lastDirection !== "LEFT") {
        velocityX = 1; velocityY = 0; lastDirection = "RIGHT";
    }
};

function gameOver() {
    alert("¡Perdiste! Recargá la página para jugar de nuevo.");
    location.reload();
}

setInterval(draw, 120);
