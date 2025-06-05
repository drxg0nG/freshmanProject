const loadingBar = document.getElementById('loading-bar')
const loadingText = document.getElementById('loading-text')
let width = 0

function updateProgress() {
    width++
    loadingText.innerText = width + '%'
    loadingBar.style.width = width + '%'
}

const interval = setInterval(updateProgress, 50)