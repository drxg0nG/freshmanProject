let allowExitE = false

document.getElementById('check').addEventListener('click', function() {
    const inputElemE = document.getElementById('finalInput');
    const inputE = inputElemE.value.trim().toLowerCase();
    const correctWordE = "game" 

    if (inputE === correctWordE) {
        allowExitE = true
        exitFullscreen()

        // Congratulations
        const containerE = document.querySelector('.container');
        const congratsE = document.querySelector('.congrats');
        congratsE.style.display = 'block';
        containerE.style.display = 'none';
    } else {
        inputElemE.style.borderBottom = '5px solid red'
    }
})

document.getElementById('finalInput').addEventListener('input', function() {
    this.style.borderBottom = '' // Reset to default as user types
})

document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement && !allowExitE) {
        window.close();
    }
});