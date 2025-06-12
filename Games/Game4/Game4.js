const game4 = document.querySelector('#game4 #game')
// ======== Snake ========
let snakeBoxSize4 = 20
let cols4
let rows4

function updateGridSize4() {
  cols4 = Math.floor(window.innerWidth / snakeBoxSize4)
  rows4 = Math.floor(window.innerHeight / snakeBoxSize4)
}

window.addEventListener("resize", function() {
  if (document.getElementById('game4').style.display !== 'none') {
    initGame4()
  }
})

let snake4 = []
let loading4 = 0
let length4 = 20
let snakeHistory4 = []
let directionX4 = 0
let directionY4 = 0
let moving4 = false
let intervalId4 = 0
let controls4 = false
let loadingInterval4 = null

function initGame4() {
  console.log("initGame4 called")
  updateGridSize4()
  console.log("updateGridSize4 finished. Rows:", rows4, "Cols:", cols4, "Box Size:", snakeBoxSize4)

  // Clear any existing loading interval before starting a new one
  if (loadingInterval4) {
    clearInterval(loadingInterval4)
    loadingInterval4 = null
  }

  // Loading snake
  length4 = 20
  const centerRow4 = Math.floor(rows4 / 2)
  const startCol4 = Math.max(0, Math.floor((cols4 - length4) / 2))
  loading4 = 0

  snake4 = []
  for (let i4 = 0; i4 < length4; i4++) {
    snake4.push({ x: startCol4 + i4, y: centerRow4 })
  }

  snakeHistory4 = []
  directionX4 = 0
  directionY4 = 0
  moving4 = false
  controls4 = false

  generateObstacles4()
  generateExit4()
  drawSnake4()

  // Start the loading interval
  if (!controls4) {
    loadingInterval4 = setInterval(() => {
      if (!controls4) {
        loading4++
        if (loading4 > length4) {
          loading4 = 0
        }
        drawSnake4()
      }
    }, 100)
  }
}

function drawSnake4() {
  console.log("drawSnake4 called")
  game4.innerHTML = ""
  drawObstacles4()
  drawExit4()
  for (let i4 = 0; i4 < snake4.length; i4++) {
    var block4 = document.createElement("div")
    block4.className = "snake-part"
    block4.style.left = snake4[i4].x * snakeBoxSize4 + "px"
    block4.style.top = snake4[i4].y * snakeBoxSize4 + "px"
    block4.style.position = "absolute"
    block4.style.width = snakeBoxSize4 + "px"
    block4.style.height = snakeBoxSize4 + "px"
    if (controls4) {
      block4.style.background = "rgb(0, 255, 0)"
    } else {
      if (i4 < loading4) {
        block4.style.background = "rgb(0, 255, 0)"
      } else {
        block4.style.background = "#ccc"
      }
    }
  game4.appendChild(block4)
  }
}

function copyPart4(part4) {
  return { x: part4.x, y: part4.y }
}

function moveSnake4() {
  if (!controls4) {
    return
  }

    // Snake history
    snakeHistory4.push(snake4.map(copyPart4))

    let head4 = {
        x: snake4[0].x + directionX4,
        y: snake4[0].y + directionY4
    }

    // left to right
    if (head4.x < 0) {
      head4.x = cols4 - 1
    }

    // right to left
    if (head4.x >= cols4) {
      head4.x = 0
    }

    // top to bottom
    if (head4.y < 0) {
      head4.y = rows4 - 1
    }

    // bottom to top
    if (head4.y >= rows4) {
      head4.y = 0
    }

    // === Check for collisions ===
    let hitObstacle4 = false
    for (let i4 = 0; i4 < obstacles4.length; i4++) {
        if (obstacles4[i4].x === head4.x && obstacles4[i4].y === head4.y) {
            hitObstacle4 = true
            break
        }
    }
    if (hitObstacle4) {
        if (snakeHistory4.length >= 5) {
          snake4 = snakeHistory4[snakeHistory4.length - 5].map(copyPart4)
          snakeHistory4 = snakeHistory4.slice(0, snakeHistory4.length - 5)
        }

        if (snakeHistory4.length > 10) {
          snakeHistory4.shift()
        }

        drawSnake4()
        return
    }

    // === Check for exit ===
    if (head4.x === exit4.x && head4.y === exit4.y) {
      clearInterval(intervalId4)
      moving4 = false
      // Clear Game
      game4.innerHTML = ""

      // create container
      const container4 = document.createElement("div")
      container4.style.display = "flex"
      container4.style.flexDirection = "column"
      container4.style.alignItems = "center"
      container4.style.justifyContent = "center"
      container4.style.height = "100vh"

      // Letter
      const letter4 = document.createElement("div")
      letter4.textContent = "M"
      letter4.style.fontSize = "5rem"
      letter4.style.color = "black"
      letter4.style.background = "rgb(0,255,0)"
      letter4.style.padding = "2rem 4rem"
      letter4.style.borderRadius = "2rem"
      letter4.style.marginBottom = "30px"
      letter4.style.fontFamily = "'Cutive Mono', monospace'"
      container4.appendChild(letter4)

      // Next Game button
      const nextBtn4 = document.createElement("button")
      nextBtn4.className = "btn"
      nextBtn4.textContent = "The Final Code"
      nextBtn4.style.fontSize = "2rem"
      nextBtn4.onclick = function() {
        showGame('end')
      }
      container4.appendChild(nextBtn4)

      game4.style.backgroundColor = "rgb(0,255,0)"
      game4.innerHTML = ""
      game4.appendChild(container4)
      return
    }

    snake4.unshift(head4)

    if (snake4.length > length4) {
      snake4.pop()
    }

    drawSnake4()
}

window.addEventListener("keydown", function(event4) {
  if (!controls4 && (event4.key === "ArrowUp" || event4.key === "ArrowDown" || event4.key === "ArrowLeft" || event4.key === "ArrowRight")) {
    controls4 = true
    if (loadingInterval4) {
      clearInterval(loadingInterval4)
      loadingInterval4 = null
    }
    drawSnake4()
  }

  if (event4.key ==="ArrowUp" && directionY4 !== 1) {
    directionX4 = 0
    directionY4 = -1
  } else if (event4.key === "ArrowDown" && directionY4 !== -1) {
    directionX4 = 0
    directionY4 = 1
  } else if (event4.key === "ArrowLeft" && directionX4 !== 1) {
    directionX4 = -1
    directionY4 = 0
  } else if (event4.key === "ArrowRight" && directionX4 !== -1) {
    directionX4 = 1
    directionY4 = 0
  }

  if (!moving4 && (directionX4 !== 0 || directionY4 !== 0)) {
    moving4 = true
    intervalId4 = setInterval(moveSnake4, 200)
  }
})

// ======== Obstacles ========
let obstacles4 = []
let obstacleCount4 = 250


function generateObstacles4() {
  obstacles4 = []
  while (obstacles4.length < obstacleCount4) {
    let ox4 = Math.floor(Math.random() * cols4)
    let oy4 = Math.floor(Math.random() * rows4)
    // Avoid placing obstacles on the initial snake
    let overlap4 = false
    for (let i4 = 0; i4 < snake4.length; i4++) {
      if (snake4[i4].x === ox4 && snake4[i4].y === oy4) {
        overlap4 = true
        break
      }
    }
    let duplicate4 = false
    for (let i4 = 0; i4 < obstacles4.length; i4++) {
      if (obstacles4[i4].x === ox4 && obstacles4[i4].y === oy4) {
        duplicate4 = true
        break
      }
    }
    if (!overlap4 && !duplicate4) {
      obstacles4.push({ x: ox4, y: oy4 })
    }
  }
}

function drawObstacles4() {
    for (let i4 = 0; i4 < obstacles4.length; i4++) {
        let obstacle4 = document.createElement("div")
        obstacle4.className = "obstacle"
        obstacle4.style.left = obstacles4[i4].x * snakeBoxSize4 + "px"
        obstacle4.style.top = obstacles4[i4].y * snakeBoxSize4 + "px"
        obstacle4.style.position = "absolute"
        obstacle4.style.width = snakeBoxSize4 + "px"
        obstacle4.style.height = snakeBoxSize4 + "px"
        obstacle4.style.background = "rgb(255, 0, 0)"
        obstacle4.style.borderRadius = "4px"
        game4.appendChild(obstacle4)
    }
}

let exit4 = { x: 0, y: 0 }
function generateExit4() {
  while(true) {
    let exitX4 = Math.floor(Math.random() * cols4)
    let exitY4 = Math.floor(Math.random() * rows4)
    
    let overlapSnake4 = false
    for (let i4 = 0; i4 < snake4.length; i4++) {
      if (snake4[i4].x === exitX4 && snake4[i4].y === exitY4) {
        overlapSnake4 = true
        break
      }
    }

    let overlapObstacle4 = false
    for (let i4 = 0; i4 < obstacles4.length; i4++) {
      if (obstacles4[i4].x === exitX4 && obstacles4[i4].y === exitY4) {
        overlapObstacle4 = true
        break
      }
    }

    if (!overlapSnake4 && !overlapObstacle4) {
      exit4.x = exitX4
      exit4.y = exitY4
      break
    }
  }
}

function drawExit4() {
  let exitBlock4 = document.createElement("div")
  exitBlock4.className = "exit"
  exitBlock4.style.left = exit4.x * snakeBoxSize4 + "px"
  exitBlock4.style.top = exit4.y * snakeBoxSize4 + "px"
  exitBlock4.style.position = "absolute"
  exitBlock4.style.width = snakeBoxSize4 + "px"
  exitBlock4.style.height = snakeBoxSize4 + "px"
  exitBlock4.style.background = "rgb(0, 0, 255)"
  exitBlock4.style.borderRadius = "4px"
  exitBlock4.style.boxShadow = "0 0 10px rgba(0, 0, 255, 0.5)"
  game4.appendChild(exitBlock4)
}

// generateObstacles4()
// generateExit4()
// drawSnake4()
