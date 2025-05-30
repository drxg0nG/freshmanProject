function startNewGame() {
    localStorage.setItem("escapeLevel", 1);
    alert("New game started! (This is just the start page.)");
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

    codeStream.style.transform = `translateX(${Math.random() * 100}vw)`
    
}


