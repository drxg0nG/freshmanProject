let allowExitE = false

document.getElementById('check').addEventListener('click', function() {
    const inputElemE = document.getElementById('finalInput')
    const inputE = inputElemE.value.trim().toLowerCase()
    const correctWordE = "game" 

    if (inputE === correctWordE) {
        allowExitE = true
        exitFullscreen()

        // Congratulations
        const containerE = document.querySelector('.endPageContainer')
        const congratsE = document.querySelector('.congrats')
        congratsE.style.display = 'block'
        containerE.style.display = 'none'
    } else {
        inputElemE.style.borderBottom = '5px solid red'
    }
})

document.getElementById('finalInput').addEventListener('input', function() {
    this.style.borderBottom = '' // Reset to default as user types
})

document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement && !allowExitE) {
        window.close()
    }
})

function restart() {
    document.getElementById('startPage').style.display = 'flex'
    document.getElementById('game1').style.display = 'none'
    document.getElementById('game2').style.display = 'none'
    document.getElementById('game3').style.display = 'none'
    document.getElementById('game4').style.display = 'none'
    document.getElementById('endPage').style.display = 'none'
}