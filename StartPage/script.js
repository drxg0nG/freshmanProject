let startPage = document.querySelector('#startPage')

// Start New Game
function startNewGame() {
  localStorage.setItem("escapeLevel", 1)
  startPage.style.display = 'none'
  showGame(1)
}

// Continue Game
function continueGameS() {
  const levelS = localStorage.getItem("escapeLevel")
  if (levelS) {
    if (levelS === '1') {
      showGame(1)
    } else if (levelS === '2') {
      showGame(2)
    } else if (levelS === '3') {
      showGame(3)
    } else if (levelS === '4') {
      showGame(4)
    }
  } else {

  }
}

// ======== Matrix Background ========
const overlayS = document.querySelector('.overlay')
const containerS = document.querySelector('.container')
const matrixDivS = document.getElementById('matrix')
const errorCodeS = document.getElementById('errorCode')
const fallingCodeS = document.getElementById('fallingCode')
const growingCodeS = document.getElementById('growingCode') 
const lettersS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]$@!#&*+-=<>?^_~|"

// Append to matrix
matrixDivS.appendChild(errorCodeS)
matrixDivS.appendChild(fallingCodeS)
matrixDivS.appendChild(growingCodeS)

// Create the code stream
function createCodeStreamS() {
  const codeStreamS = document.createElement('div')
  codeStreamS.className = 'stream'
  
  // Where its going to fall from
  codeStreamS.style.left = `${Math.random() * 100}vw`
  
  // Duration for the animation
  const durationS = (4 + Math.random() * 4)
  codeStreamS.style.animationDuration = durationS + 's'
  fallingCodeS.style.animationDuration = (durationS / 0.9) + 's'
  errorCodeS.style.animationDuration = durationS+ 's'
  
  // Random font size
  const fontSizeS = 14 + Math.random() * 10
  codeStreamS.style.fontSize = fontSizeS + 'px'
  
  // Build code stream
  let codeStreamContentS = ''
  const codeStreamLengthS = 12 + Math.floor(Math.random() * 15)
  for (let iS = 0; iS < codeStreamLengthS; iS++) {
    const charS = lettersS.charAt(Math.floor(Math.random() * lettersS.length))
    codeStreamContentS += charS + '<br>'
  }
  codeStreamS.innerHTML = codeStreamContentS

  // Sorting System
  if (Math.random() < 0.02) {
    errorCodeS.appendChild(codeStreamS)
  } else if (Math.random() < 0.7) {
    fallingCodeS.appendChild(codeStreamS)
  } else {
    growingCodeS.appendChild(codeStreamS)
  }
  
  // Remove code stream once finished
  setTimeout(() => codeStreamS.parentElement.removeChild(codeStreamS), durationS * 1000)
}

// ======== Overlay ========
// Show overlay on load
window.addEventListener('load', () => {
  overlayS.style.display = 'flex'
  containerS.style.display = 'none'
})

// Close overlay and start game
document.getElementById('close-overlay').addEventListener('click', () => {
  overlayS.style.display = 'none'
  containerS.style.display = 'block'
  setInterval(createCodeStreamS, 50)
})
