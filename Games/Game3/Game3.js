let game3

// Amount of Buttons
const buttons3 = 100

// Special Button
let specialButtonIndex3
let specialButton3

// Level speeds
const levelSpeeds3 = [1100, 999, 850]
let currentLevel3 = 0
let specialButtonTime3

let specialButtonClickCount3 = 0

// Start time limit for special button
function startSpecialButtonTime3() {
  if (specialButtonTime3) {
    clearInterval(specialButtonTime3)
  } else {
    // nothing to clear since no time set
  }

  specialButtonTime3 = setInterval(() => {
    if (specialButton3) {
      moveButtonRandomly3(specialButton3)
    } else {
      // nothing to do
    }
  }, levelSpeeds3[currentLevel3]);
}

// Create Buttons
function createButton3(e3) {
  const button3 = document.createElement("img")
  button3.className = "random-button"

  if (e3 === specialButtonIndex3) {
    button3.className = "random-button special-button"
    button3.src = 'Games/Game3/green-button.png'
    specialButton3 = button3
  } else {
    button3.src = 'Games/Game3/button.png'
  }
  game3.appendChild(button3)
  moveButtonRandomly3(button3)

  // Make each button move when clicked
  button3.addEventListener("click", () => {
    if (e3 === specialButtonIndex3) {
      clickSpecialButton3()
    } else {
      moveButtonRandomly3(button3)
    }
  })
}

// Move button randomly
function moveButtonRandomly3(button3) {
  const maxX3 = window.innerWidth - button3.offsetWidth
  const maxY3 = window.innerHeight - button3.offsetHeight

  const randomX3 = Math.random() * maxX3
  const randomY3 = Math.random() * maxY3

  button3.style.left = `${randomX3}px`
  button3.style.top = `${randomY3}px`
}

// Special button function
function clickSpecialButton3() {
  specialButtonClickCount3++

  if (specialButtonClickCount3 === 3) {
    game3.innerHTML = ""
    game3.style.backgroundColor = "black"

    // Create a centered container
    const container3 = document.createElement("div")
    container3.style.display = "flex"
    container3.style.flexDirection = "column"
    container3.style.alignItems = "center"
    container3.style.justifyContent = "center"
    container3.style.height = "100vh"
    container3.style.width = "100vw"

    // Letter
    const letter3 = document.createElement("div")
    letter3.textContent = "G"
    letter3.style.fontSize = "5rem"
    letter3.style.marginBottom = "20px"
    letter3.style.color = "rgb(0, 255, 0)"
    letter3.style.fontFamily = "'Cutive Mono', monospace"
    container3.appendChild(letter3)

    // Next Game button
    const nextBtn3 = document.createElement("button")
    nextBtn3.className = "btn"
    nextBtn3.textContent = "Loading"
    nextBtn3.style.fontSize = "2rem"
    nextBtn3.onclick = function () {
      localStorage.setItem("escapeLevel", 4)
      showGame(4)
    }
    container3.appendChild(nextBtn3)

    game3.appendChild(container3)
    return
  }

  // flash / level up
  game3.classList.add('flash-green')
  setTimeout(() => {
    game3.classList.remove('flash-green')
    if (currentLevel3 < levelSpeeds3.length - 1) {
      currentLevel3++
      startSpecialButtonTime3()
    } else {
      clearInterval(specialButtonTime3)
    }
  }, 300)
}

// Create all buttons
function initGame3() {
  game3 = document.querySelector("#game3")
  game3.innerHTML = ""
  specialButtonClickCount3 = 0
  currentLevel3 = 0

  // Clear any old interval
  if (specialButtonTime3) {
    clearInterval(specialButtonTime3)
  }

  // Pick a new special button each time
  specialButtonIndex3 = Math.floor(Math.random() * buttons3)
  specialButton3 = null

  for (let i3 = 0; i3 < buttons3; i3++) {
    createButton3(i3)
  }
  startSpecialButtonTime3()
}