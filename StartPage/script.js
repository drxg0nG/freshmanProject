// Start New Game
function startNewGame() {
    localStorage.setItem("escapeLevel", 1)
}

// Continue Game
function continueGame() {
    const level = localStorage.getItem("escapeLevel")
    if (level) {

    } else {

    }
}

// ======== Matrix Background ========
const overlay = document.querySelector('.overlay')
const container = document.querySelector('.container')
const matrixDiv = document.getElementById('matrix')
const fallingCode = document.getElementById('fallingCode')
const growingCode = document.getElementById('growingCode') 
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]$@!#&*+-=<>?^_~|"

// Append to matrix
matrixDiv.appendChild(fallingCode)
matrixDiv.appendChild(growingCode)

// Create the code stream
function createCodeStream() {
  const codeStream = document.createElement('div')
  codeStream.className = 'stream'
  
  // Where its going to fall from
  codeStream.style.left = `${Math.random() * 100}vw`
  
  // Duration for the animation
  const duration = (4 + Math.random() * 4)
  codeStream.style.animationDuration = duration + 's' // !!!!!!!!!!!!!!!!!!!!!!!!!!
  fallingCode.style.animationDuration = (duration / 0.7) + 's'
  
  // Random font size
  const fontSize = 14 + Math.random() * 10
  codeStream.style.fontSize = fontSize + 'px'
  
  // Build code stream
  let codeStreamContent = ''
  const codeStreamLength = 12 + Math.floor(Math.random() * 15)
  for (let i = 0; i < codeStreamLength; i++) {
      const char = letters.charAt(Math.floor(Math.random() * letters.length))
      codeStreamContent += char + '<br>'
  }
  codeStream.innerHTML = codeStreamContent

  // Sorting System
  if (Math.random() < 0.8) {
    fallingCode.appendChild(codeStream)
  } else {
    growingCode.appendChild(codeStream)
  }
  
  // Remove code stream once finished
  setTimeout(() => codeStream.parentElement.removeChild(codeStream), duration * 1000)
}

// ======== Overlay ========
// Show overlay on load
window.addEventListener('load', () => {
  overlay.style.display = 'flex'
  container.style.display = 'none'
})

// Close overlay and start game
document.getElementById('close-overlay').addEventListener('click', () => {
  overlay.style.display = 'none'
  container.style.display = 'block'
  setInterval(createCodeStream, 50)
})