let game3 = document.getElementById('game3')
let buttonGame3 = document.getElementById('buttonGame3')

// Append thingy
game3.appendChild(buttonGame3)

// Amount of Buttons
const buttons3 = 100

// Special Button
let specialButtonIndex3
let specialButton3

// Level speeds
const levelSpeeds3 = [1100, 999, 850] // time in ms
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
  }, levelSpeeds3[currentLevel3])
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
  buttonGame3.appendChild(button3)
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
  const buttonGameContainer3 = buttonGame3

  const containerWidth = buttonGameContainer3.offsetWidth
  const containerHeight = buttonGameContainer3.offsetHeight

  const randomX3 = Math.random() * containerWidth
  const randomY3 = Math.random() * containerHeight

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
  buttonGame3.classList.add('flash-green')
  setTimeout(() => {
    buttonGame3.classList.remove('flash-green')
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
  buttonGame3 = document.querySelector("#buttonGame3")
  buttonGame3.innerHTML = ""
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

// ======== Matrix Background ========
const matrixDiv3 = document.getElementById('matrix3')
const fallingCode3 = document.getElementById('fallingCode3')
const growingCode3 = document.getElementById('growingCode3') 
const letters3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]$@!#&*+-=<>?^_~|"

// Append to matrix
matrixDiv3.appendChild(fallingCode3)
matrixDiv3.appendChild(growingCode3)

// Create the code stream
function createCodeStream3() {
  const codeStream3 = document.createElement('div')
  codeStream3.className = 'stream'
  
  // Where its going to fall from
  codeStream3.style.left = `${Math.random() * 100}vw`
  
  // Duration for the animation
  const duration3 = (4 + Math.random() * 4)
  codeStream3.style.animationDuration = duration3 + 's'
  fallingCode3.style.animationDuration = (duration3 / 0.9) + 's'
  
  // Random font size
  const fontSize3 = 14 + Math.random() * 10
  codeStream3.style.fontSize = fontSize3 + 'px'
  
  // Build code stream
  let codeStreamContent3 = ''
  const codeStreamLength3 = 12 + Math.floor(Math.random() * 15)
  for (let iS = 0; iS < codeStreamLength3; iS++) {
    const charS = letters3.charAt(Math.floor(Math.random() * letters3.length))
    codeStreamContent3 += charS + '<br>'
  }
  codeStream3.innerHTML = codeStreamContent3

  // Sorting System
  if (Math.random() < 0.7) {
    fallingCode3.appendChild(codeStream3)
  } else {
    growingCode3.appendChild(codeStream3)
  }
  
  // Remove code stream once finished
  setTimeout(() => codeStream3.parentElement.removeChild(codeStream3), duration3 * 1000)
}

setInterval(createCodeStream3, 200)