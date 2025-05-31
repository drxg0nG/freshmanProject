let fullScreen = document.documentElement

/* View in fullscreen */
function startFullscreen() {
    if (fullScreen.requestFullscreen) {
        fullScreen.requestFullscreen()
    } else if (fullScreen.webkitRequestFullscreen) { /* Safari */
        fullScreen.webkitRequestFullscreen()
    } else if (fullScreen.msRequestFullscreen) { /* IE11 */
        fullScreen.msRequestFullscreen()
    }
}

/* Listen for fullscreen change */
document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement) {
        // Try to close the window if fullscreen is exited
        window.close()
    }
})
