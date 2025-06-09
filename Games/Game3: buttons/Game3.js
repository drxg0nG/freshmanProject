// Amount of Buttons
const buttons = 100

// Special Button
const specialButtonIndex = Math.floor(Math.random() * buttons)

let specialButton

// Level speeds
const levelSpeeds = [1100, 899, 750]
let currentLevel = 0
let specialButtonInterval

let specialButtonClickCount = 0

// Start interval for special button
function startSpecialButtonInterval() {
  if (specialButtonInterval) clearInterval(specialButtonInterval)
  specialButtonInterval = setInterval(() => {
    if (specialButton) {
      moveButtonRandomly(specialButton)
    }
  }, levelSpeeds[currentLevel])
}

// Create Buttons
function createButton(e) {
  const button = document.createElement("img")
  button.className = "random-button"

  if (e === specialButtonIndex) {
    button.className = "random-button special-button"
    button.src = 'green-button.png'
    specialButton = button
  } else {
    button.src = 'button.png'
  }
  document.body.appendChild(button)
  moveButtonRandomly(button)

  // Make each button move when clicked
  button.addEventListener("click", () => {
    if (e === specialButtonIndex) {
      clickSpecialButton()
    } else {
      moveButtonRandomly(button)
    }
  })
}

// Move button randomly
function moveButtonRandomly(button) {
  const maxX = window.innerWidth - button.offsetWidth
  const maxY = window.innerHeight - button.offsetHeight

  const randomX = Math.random() * maxX
  const randomY = Math.random() * maxY

  button.style.left = `${randomX}px`
  button.style.top = `${randomY}px`
}

// Create all buttons
for (let i = 0; i < buttons; i++) {
  createButton(i)
}

// Start first interval after buttons are created
startSpecialButtonInterval()

// Special button function
function clickSpecialButton() {
  specialButtonClickCount++

  if (specialButtonClickCount === 3) {
    document.body.innerHTML = ""
    document.body.style.backgroundColor = "black"

    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.alignItems = "center"
    container.style.justifyContent = "center"
    container.style.height = "100vh"

    const letter = document.createElement("div")
    letter.textContent = "I"
    letter.style.color = "rgb(0, 255, 0)"
    letter.style.fontSize = "100px"
    letter.style.fontFamily = "'Cutive Mono', monospace"
    letter.style.marginBottom = "20px"
    container.appendChild(letter)

    document.body.appendChild(container)
    return
  }

  // Normal flash / level up
  document.body.classList.add('flash-green')
  setTimeout(() => {
    document.body.classList.remove('flash-green')
    if (currentLevel < levelSpeeds.length - 1) {
      currentLevel++
      startSpecialButtonInterval()
    } else {
      clearInterval(specialButtonInterval)
    }
  }, 300)
}