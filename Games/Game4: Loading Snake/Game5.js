const game = document.getElementById("game")
let snakeBoxSize = 20
const cols = Math.floor(window.innerWidth / snakeBoxSize)
const rows = Math.floor(window.innerHeight / snakeBoxSize)

let snake = [{
    x: 20,
    y: 20
}]

let directionX = 0
let directionY = 0

let moving = false
let intervalId = 0
let length = 20

function drawSnake() {
    game.innerHTML = ""
    for (let i = 0; i < snake.length; i++) {
        var block = document.createElement("div")
        block.className = "snake-part"
        block.style.left = snake[i].x * snakeBoxSize + "px"
        block.style.top = snake[i].y * snakeBoxSize + "px"
        game.appendChild(block)
    }
}

function moveSnake() {
    var head = {
        x: snake[0].x + directionX,
        y: snake[0].y + directionY
    }

    // left to right
    if (head.x < 0) {
      head.x = cols - 1
    }

    // right to left
    if (head.x >= cols) {
      head.x = 0
    }

    // top to bottom
    if (head.y < 0) {
      head.y = rows - 1
    }

    // bottom to top
    if (head.y >= rows) {
      head.y = 0
    }

    snake.unshift(head)

    if (snake.length > length) {
        snake.pop()
    }

    drawSnake();
}

window.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp" && directionY !== 1) {
      directionX = 0
      directionY = -1
    } else if (event.key === "ArrowDown" && directionY !== -1) {
      directionX = 0
      directionY = 1
    } else if (event.key === "ArrowLeft" && directionX !== 1) {
      directionX = -1
      directionY = 0
    } else if (event.key === "ArrowRight" && directionX !== -1) {
      directionX = 1
      directionY = 0
    }

    if (!moving && (directionX !== 0 || directionY !== 0)) {
      moving = true
      intervalId = setInterval(moveSnake, 100)
    }
})

drawSnake()