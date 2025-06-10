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
    drawExit()
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
        for (let i = 0; i < snake.length; i++) {
            snake[i].x -= directionX * 5
            snake[i].y -= directionY * 5

            if (snake[i].x < 0) {
                snake[i].x = cols - 1
            }
            if (snake[i].x >= cols) {
                snake[i].x = 0
            }
            if (snake[i].y < 0) {
                snake[i].y = rows - 1
            }
            if (snake[i].y >= rows) {
                snake[i].y = 0
            }
            drawSnake()
            return
        }
    }

    // === Check for exit ===
    if (head.x === exit.x && head.y === exit.y) {
      clearInterval(intervalId)
      // Clear Game
      game.innerHTML = ""

      // create container
      const container = document.createElement("div")
      container.style.display = "flex"
      container.style.flexDirection = "column"
      container.style.alignItems = "center"
      container.style.justifyContent = "center"
      container.style.height = "100vh"

      // Letter
      const letter = document.createElement("div")
      letter.textContent = "S"
      letter.style.fontSize = "5rem"
      letter.style.color = "black"
      letter.style.background = "rgb(0,255,0)"
      letter.style.padding = "2rem 4rem"
      letter.style.borderRadius = "2rem"
      letter.style.marginBottom = "30px"
      letter.style.fontFamily = "'Cutive Mono', monospace"
      container.appendChild(letter)

      // Next Game button
      const nextBtn = document.createElement("button")
      nextBtn.className = "btn"
      nextBtn.textContent = "The Final Code"
      nextBtn.style.fontSize = "2rem"
      nextBtn.onclick = function() {
          window.location.href = ""
      }
      container.appendChild(nextBtn)

      document.body.style.backgroundColor = "rgb(0,255,0)"
      document.body.innerHTML = ""
      document.body.appendChild(container)
      return
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
        obstacle.style.background = "rgb(255, 0, 0)"
        obstacle.style.borderRadius = "4px"
        game.appendChild(obstacle)
    }
}

let obstacles = []
let obstacleCount = 100

function generateObstacles() {
    obstacles = []
    while (obstacles.length < obstacleCount) {
        let ox = Math.floor(Math.random() * cols)
        let oy = Math.floor(Math.random() * rows)
        // Avoid placing obstacles on the initial snake
        let overlap = false
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === ox && snake[i].y === oy) {
                overlap = true
                break
            }
        }
        let duplicate = false
        for (let i = 0; i < obstacles.length; i++) {
            if (obstacles[i].x === ox && obstacles[i].y === oy) {
                duplicate = true
                break
            }
        }
        if (!overlap && !duplicate) {
            obstacles.push({ x: ox, y: oy })
        }
    }
}

let exit = { x: 0, y: 0 }
function generateExit() {
  while(true) {
    let exitX = Math.floor(Math.random() * cols)
    let exitY = Math.floor(Math.random() * rows)
    
    let overlapSnake = false
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === exitX && snake[i].y === exitY) {
        overlapSnake = true
        break
      }
    }

    let overlapObstacle = false
    for (let i = 0; i < obstacles.length; i++) {
      if (obstacles[i].x === exitX && obstacles[i].y === exitY) {
        overlapObstacle = true
        break
      }
    }

    if (!overlapSnake && !overlapObstacle) {
      exit.x = exitX
      exit.y = exitY
      break
    }
  }
}

function drawExit() {
  let exitBlock = document.createElement("div")
  exitBlock.className = "exit"
  exitBlock.style.left = exit.x * snakeBoxSize + "px"
  exitBlock.style.top = exit.y * snakeBoxSize + "px"
  exitBlock.style.position = "absolute"
  exitBlock.style.width = snakeBoxSize + "px"
  exitBlock.style.height = snakeBoxSize + "px"
  exitBlock.style.background = "rgb(0, 0, 255)"
  exitBlock.style.borderRadius = "4px"
  exitBlock.style.boxShadow = "0 0 10px rgba(0, 0, 255, 0.5)"
  game.appendChild(exitBlock)
}

generateObstacles()
generateExit()
drawSnake()