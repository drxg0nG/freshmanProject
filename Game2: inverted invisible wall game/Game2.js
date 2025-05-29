const maze = document.getElementById("maze")

// 0 = open; 1 = wall
const layout = [
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

const size = 10
let player = { x: 0, y: 0 }

// Create the grid
let cellsHTML = ''
for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
        cellsHTML += `<div class="cell" data-x="${x}" data-y="${y}"></div>`
    }
}
maze.innerHTML = cellsHTML

// Draw the red dot
function drawDot() {
    // Remove any existing dots
    document.querySelectorAll(".dot").forEach(dot => dot.remove())

    // Make dot at where you are
    const cell = document.querySelector(`.cell[data-x="${player.x}"][data-y="${player.y}"]`)
    const dot = document.createElement("div")
    dot.className = "dot"
    cell.appendChild(dot)
}

// Leave a trail at (x, y)
function leaveTrail(x, y) {
    const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`)
    const trail = document.createElement("div")
    trail.className = "trail fade1"
    trail.setAttribute("data-stage", "1")
    cell.appendChild(trail)
}

// Update all trail stages (fade1 → fade2 → fade3 → remove)
function updateTrails() {
    const trails = document.querySelectorAll(".trail")
    trails.forEach(trail => {
        let stage = parseInt(trail.getAttribute("data-stage"))
        if (stage === 1) {
            trail.className = "trail fade2"
            trail.setAttribute("data-stage", "2")
        } else if (stage === 2) {
            trail.className = "trail fade3"
            trail.setAttribute("data-stage", "3")
        } else {
            trail.remove() // Remove stage 3 trails
        }
    })
}

// Check if player can move to (x, y)
function canMove(x, y) {
    return x >= 0 && x < size && y >= 0 && y < size && layout[y][x] === 0
}

// Listen to arrow keys for movement
document.addEventListener("keydown", function (event) {
    let newX = player.x
    let newY = player.y

    if (event.key === "ArrowUp") newY++
    if (event.key === "ArrowDown") newY--
    if (event.key === "ArrowLeft") newX++
    if (event.key === "ArrowRight") newX--

    if (canMove(newX, newY)) {
        updateTrails()
        leaveTrail(player.x, player.y)
        player.x = newX
        player.y = newY
        drawDot()
        // Check for winning condition
        if (player.x === 9 && player.y === 9) {
            document.body.style.backgroundColor = "green";

            // Optional: flash effect
            setTimeout(() => {
                document.body.style.backgroundColor = "black";
            }, 800);
        }
    }
})

drawDot()