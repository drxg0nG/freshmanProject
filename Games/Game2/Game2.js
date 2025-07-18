let game2 = document.querySelector("#game2")
const maze2 = document.querySelector("#maze")

// 0 = open; 1 = wall
const layout2 = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0]
]

const size2 = 10
let player2 = { x: 0, y: 0 }

function buildGrid2() {
    let cellsHTML2 = ''
    for (let y2 = 0; y2 < size2; y2++) {
        for (let x2 = 0; x2 < size2; x2++) {
            cellsHTML2 += `<div class="cell" data-x="${x2}" data-y="${y2}"></div>`
        }
    }
    maze2.innerHTML = cellsHTML2
}

// Draw the red dot
function drawDot2() {
    // Remove any existing dots
    maze2.querySelectorAll(".dot").forEach(dot2 => dot2.remove())

    // Make dot at where you are
    const cell2 = maze2.querySelector(`.cell[data-x="${player2.x}"][data-y="${player2.y}"]`)
    if (cell2) {
        const dot2 = document.createElement("div")
        dot2.className = "dot"
        cell2.appendChild(dot2)
    }
}

// Leave a trail at (x, y)
function leaveTrail2(x2, y2) {
    const cell2 = maze2.querySelector(`.cell[data-x="${x2}"][data-y="${y2}"]`)
    if (cell2) {
        const trail2 = document.createElement("div")
        trail2.className = "trail fade1"
        trail2.setAttribute("data-stage", "1")
        cell2.appendChild(trail2)
    }
}

// Update all trail stages (fade1 → fade2 → fade3 → remove)
function updateTrails2() {
    const trails2 = maze2.querySelectorAll(".trail")
    trails2.forEach(trail2 => {
        let stage2 = parseInt(trail2.getAttribute("data-stage"))
        if (stage2 === 1) {
            trail2.className = "trail fade2"
            trail2.setAttribute("data-stage", "2")
        } else if (stage2 === 2) {
            trail2.className = "trail fade3"
            trail2.setAttribute("data-stage", "3")
        } else {
            trail2.remove() // Remove stage 3 trails
        }
    })
}

function flashRed2() {
    game2.classList.add('flash-red')
    setTimeout(() => {
        game2.classList.remove('flash-red')
    }, 300)
}

// Check if player can move to (x, y)
function canMove2(x2, y2) {
    return x2 >= 0 && x2 < size2 && y2 >= 0 && y2 < size2 && layout2[y2][x2] === 0
}

// Listen to arrow keys for movement
function mazeKeydown2(event2) {
    event2.preventDefault() // Prevent default arrow key scrolling
    let newX2 = player2.x
    let newY2 = player2.y

    if (event2.key === "ArrowUp") newY2++
    if (event2.key === "ArrowDown") newY2--
    if (event2.key === "ArrowLeft") newX2++
    if (event2.key === "ArrowRight") newX2--

    if (canMove2(newX2, newY2)) {
        updateTrails2()
        leaveTrail2(player2.x, player2.y)
        player2.x = newX2
        player2.y = newY2
        drawDot2()

        // Check for winning condition
        if (player2.x === 9 && player2.y === 9) {
            // Clear the maze
            game2.innerHTML = ""

            // Create a container for the letter and button
            const container2 = document.createElement('div')
            container2.style.display = 'flex'
            container2.style.flexDirection = 'column'
            container2.style.alignItems = 'center'
            container2.style.justifyContent = 'center'
            container2.style.height = '100vh'

            // Letter "I"
            const letter2 = document.createElement('div')
            letter2.textContent = "E"
            letter2.style.fontSize = "5rem"
            letter2.style.color = "black"
            letter2.style.background = "rgb(0,255,0)"
            letter2.style.padding = "2rem 4rem"
            letter2.style.borderRadius = "2rem"
            letter2.style.marginBottom = "30px"
            letter2.style.fontFamily = "'Cutive Mono', monospace"
            container2.appendChild(letter2)

            // Next Game button
            const nextBtn2 = document.createElement('button')
            nextBtn2.className = 'btn'
            nextBtn2.textContent = "Buttons"
            nextBtn2.style.fontSize = "2rem"
            nextBtn2.onclick = function () {
                localStorage.setItem("escapeLevel", 3)
                showGame(3)
            }
            container2.appendChild(nextBtn2)

            // Replace body content with container
            game2.style.backgroundColor = "rgb(0,255,0)"
            game2.innerHTML = ""
            game2.appendChild(container2)
            return
        }
    }

    if (canMove2(newX2, newY2)) {

    } else {
        flashRed2()
    }
}

// Initialize game2
function initGame2() {
    player2 = { x: 0, y: 0 }
    game2.style.backgroundColor = ""
    buildGrid2()
    drawDot2()

    maze2.setAttribute("tabindex", "0")
    maze2.removeEventListener("keydown", mazeKeydown2)
    maze2.addEventListener("keydown", mazeKeydown2)
    maze2.focus()
}

// ======== Matrix Background ========
const matrixDiv2 = document.getElementById('matrix2')
const fallingCode2 = document.getElementById('fallingCode2')
const growingCode2 = document.getElementById('growingCode2') 
const letters2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]$@!#&*+-=<>?^_~|"

// Append to matrix
matrixDiv2.appendChild(fallingCode2)
matrixDiv2.appendChild(growingCode2)

// Create the code stream
function createCodeStream2() {
  const codeStream2 = document.createElement('div')
  codeStream2.className = 'stream'
  
  // Where its going to fall from
  codeStream2.style.left = `${Math.random() * 100}vw`
  
  // Duration for the animation
  const duration2 = (4 + Math.random() * 4)
  codeStream2.style.animationDuration = duration2 + 's'
  fallingCode2.style.animationDuration = (duration2 / 0.9) + 's'
  
  // Random font size
  const fontSize2 = 14 + Math.random() * 10
  codeStream2.style.fontSize = fontSize2 + 'px'
  
  // Build code stream
  let codeStreamContent2 = ''
  const codeStreamLength2 = 12 + Math.floor(Math.random() * 15)
  for (let iS = 0; iS < codeStreamLength2; iS++) {
    const charS = letters2.charAt(Math.floor(Math.random() * letters2.length))
    codeStreamContent2 += charS + '<br>'
  }
  codeStream2.innerHTML = codeStreamContent2

  // Sorting System
  if (Math.random() < 0.7) {
    fallingCode2.appendChild(codeStream2)
  } else {
    growingCode2.appendChild(codeStream2)
  }
  
  // Remove code stream once finished
  setTimeout(() => codeStream2.parentElement.removeChild(codeStream2), duration2 * 1000)
}

setInterval(createCodeStream2, 200)