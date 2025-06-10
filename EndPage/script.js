let allowExit = false

document.getElementById('check').addEventListener('click', function() {
    const inputElem = document.getElementById('finalInput');
    const input = inputElem.value.trim().toLowerCase();
    const correctWord = "game" 

    if (input === correctWord) {
        allowExit = true
        exitFullscreen()

        // Congratulations screen
        const container = document.querySelector('.container');
        const congrats = document.querySelector('.congrats');
        congrats.style.display = 'block';
        container.style.display = 'none';
    } else {
        inputElem.style.borderBottom = '5px solid red'
    }
})

document.getElementById('finalInput').addEventListener('input', function() {
    this.style.borderBottom = '' // Reset to default as user types
})

document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement && !allowExit) {
        window.close()
    }
})