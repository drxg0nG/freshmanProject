// Amount of Buttons
const buttons = 50

// Pick one to be special
const specialButtonIndex = Math.floor(Math.random() * buttons)

// Create Buttons
function createButton(e) {
  const button = document.createElement("img")
  button.className = "random-button"
  button.src = 'button.png'
  document.body.appendChild(button)
  moveButtonRandomly(button)

  // Make each button move randomly when clicked
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

// Special button function
function clickSpecialButton() {
  alert("Special Button Clicked!")
}