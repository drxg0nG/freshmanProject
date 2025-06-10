const game = document.getElementById("game")
// ======== Snake ========
let snakeBoxSize = 20
const cols = Math.floor(window.innerWidth / snakeBoxSize)
const rows = Math.floor(window.innerHeight / snakeBoxSize)

// Loading snake
let length = 20
const centerRow = Math.floor(rows / 2)
const startCol = Math.floor((cols - length) / 2)
let loading = 0

let snake = []
for (let i = 0; i < length; i++) {
    snake.push({ x: startCol + i, y: centerRow })
}

let directionX = 0
let directionY = 0
let moving = false
let intervalId = 0
let controls = false

function drawSnake() {
    game.innerHTML = ""
    drawObstacles()
    for (let i = 0; i < snake.length; i++) {
        var block = document.createElement("div")
        block.className = "snake-part"
        block.style.left = snake[i].x * snakeBoxSize + "px"
        block.style.top = snake[i].y * snakeBoxSize + "px"
        block.style.position = "absolute"
        block.style.width = snakeBoxSize + "px"
        block.style.height = snakeBoxSize + "px"
        if (controls) {
          block.style.background = "rgb(0, 255, 0)"
        } else {
            if (i < loading) {
                block.style.background = "rgb(0, 255, 0)"
            } else {
                block.style.background = "#ccc"
            }
        }
        game.appendChild(block)
    }
}

let loadingInterval = setInterval(() => {
    if (!controls) {
        loading++
        if (loading > length) {
          loading = 0
        }
        drawSnake()
    }
}, 100)

function moveSnake() {
    let head = {
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

    // === Check for collisions ===
    let hitObstacle = obstacles.some(obstacle => obstacle.x === head.x && obstacle.y === head.y)
    if (hitObstacle) {
        
    }

    snake.unshift(head)

    if (snake.length > length) {
        snake.pop()
    }

    drawSnake()
}

window.addEventListener("keydown", function(event) {
    if (!controls && (
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
    )) {
        controls = true
        clearInterval(loadingInterval)
        drawSnake()
    }

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

// ======== Obstacles ========
function drawObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        let obstacle = document.createElement("div")
        obstacle.className = "obstacle"
        obstacle.style.left = obstacles[i].x * snakeBoxSize + "px"
        obstacle.style.top = obstacles[i].y * snakeBoxSize + "px"
        obstacle.style.position = "absolute"
        obstacle.style.width = snakeBoxSize + "px"
        obstacle.style.height = snakeBoxSize + "px"
        obstacle.style.background = "#333"
        obstacle.style.borderRadius = "4px"
        game.appendChild(obstacle)
    }
}

let obstacles = []
let obstacleCount = 10

function generateObstacles() {
    obstacles = []
    while (obstacles.length < obstacleCount) {
        let ox = Math.floor(Math.random() * cols)
        let oy = Math.floor(Math.random() * rows)
        // Avoid placing obstacles on the initial snake
        let overlap = snake.some(part => part.x === ox && part.y === oy)
        let duplicate = obstacles.some(ob => ob.x === ox && ob.y === oy)
        if (!overlap && !duplicate) {
            obstacles.push({ x: ox, y: oy })
        }
    }
}

generateObstacles()
drawSnake()