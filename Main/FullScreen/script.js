let fullScreen = document.documentElement;

/* View in fullscreen */
function startFullscreen() {
    if (fullScreen.requestFullscreen) {
        fullScreen.requestFullscreen();
    } else if (fullScreen.webkitRequestFullscreen) { /* Safari */
        fullScreen.webkitRequestFullscreen();
    } else if (fullScreen.msRequestFullscreen) { /* IE11 */
        fullScreen.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

