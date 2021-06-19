let canvas = document.querySelector('#snake');
let context = canvas.getContext('2d');
let box = 32;
let p = document.querySelector('p').innerText = '0 pontos';
let num = 0

function score() {
    num += 1
    document.querySelector('p').innerText = num + ' pontos';
}

let snake = [];
snake[0] = {
    x: 7 * box,
    y: 7 * box
}

let direction = 'right';

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = 'lightgreen';
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for(let i = 0; i < snake.length; i++) {
            context.fillStyle = 'red';
            context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

const cor = () => {
    let hexa = '0123456789ABCDEF';
    let cor = '#';
    for(let c = 0; c < 6; c++) {
        cor += hexa[Math.floor(Math.random() * 16)];
    }
    return cor;
}



function drawFood() {
    context.fillStyle = cor();
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 40 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 38 && direction != 'up') direction = 'down';
}

function iniciarJogo() {

    if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == 'up') snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'down') snake[0].y = 16 * box;

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('Game over, com ' + num + ' pontos!');
            setTimeout(document.location.reload(true), 1000)
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX = snakeX += box;
    if (direction == "left") snakeX = snakeX -= box;
    if (direction == "up") snakeY = snakeY += box;
    if (direction == "down") snakeY = snakeY -= box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score()
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
} 

let jogo = setInterval(iniciarJogo, 150);

