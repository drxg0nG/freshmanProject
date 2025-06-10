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

/* Exit fullscreen on click */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen()
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen()
    }
}

/* Listen for fullscreen change */
document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement) {
        // Try to close the window if fullscreen is exited
        window.close()
    }
})