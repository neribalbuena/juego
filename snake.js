const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let food = randomPos();
let dir = "";
let score = 0;

document.addEventListener("keydown", direction);

function direction(event) {
    if (event.key === "ArrowLeft" && dir !== "RIGHT") dir = "LEFT";
    else if (event.key === "ArrowUp" && dir !== "DOWN") dir = "UP";
    else if (event.key === "ArrowRight" && dir !== "LEFT") dir = "RIGHT";
    else if (event.key === "ArrowDown" && dir !== "UP") dir = "DOWN";
}

function randomPos() {
    return {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
}

function draw() {
    ctx.fillStyle = "#120027";
    ctx.fillRect(0, 0, 400, 400);

    // comida
    ctx.fillStyle = "#ff4dff";
    ctx.fillRect(food.x, food.y, box, box);

    // Snake
    ctx.fillStyle = "#a56dff";
    snake.forEach(p => ctx.fillRect(p.x, p.y, box, box));

    // Moveimiento
    let head = { ...snake[0] };

    if (dir === "LEFT") head.x -= box;
    if (dir === "RIGHT") head.x += box;
    if (dir === "UP") head.y -= box;
    if (dir === "DOWN") head.y += box;

    // Colision con bordes
    if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) return gameOver();

    // Colision con cuerpo
    for (let s of snake) {
        if (head.x === s.x && head.y === s.y) return gameOver();
    }

    snake.unshift(head);

    // Eat food
    if (head.x === food.x && head.y === food.y) {
        food = randomPos();
        score++;
    } else {
        snake.pop();
    }
}

function gameOver() {
    alert("Perdiste! Puntuación: " + score);
    document.location.reload();
}

setInterval(draw, 120);
