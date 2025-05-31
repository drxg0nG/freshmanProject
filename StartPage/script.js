function startNewGame() {
    localStorage.setItem("escapeLevel", 1);
}

function continueGame() {
    const level = localStorage.getItem("escapeLevel");
    if (level) {
        alert("Resuming from level " + level + ". (This is just the start page.)");
    } else {
        alert("No saved progress found.");
    }
}


// Matrix Background
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]$@!";
const matrix = document.getElementById("matrix")

function createCodeStream() {
    const codeStream = document.createElement('div')
    codeStream.className = 'stream'

    // Where its going to fall from
    codeStream.style.transform = `translateX(${Math.random() * 100}vw)`

    // Duration for the animation
    codeStream.style.animationDuration = (4 + Math.random() * 4) + 's' // !!!!!!!!!!!!!!!!!!!!!!!!!!

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

    matrix.appendChild(codeStream)

    setTimeout(() => {
      container.removeChild(codeStream);
    }, (parseFloat(codeStream.style.animationDuration) * 1000))
}

// Create new stream
setInterval(createCodeStream, 25)