// ======================================
//              FINAL CODE
// ======================================
const alphabet = "abcdefghijklmnopqrstuvwxyz"
const h1Element = document.getElementById("finalCode")
const hiddenText = h1Element.textContent

// Initial timestamp for calculating elapsed time
let previousTimestamp = 1000
// Total elapsed time in seconds
let elapsedSeconds = 0
// Time in seconds to reveal each character of the hidden text
let secondsPerCharacterReveal = 0.1

// Counter to control the speed of random letter changes
let randomChangeCounter = 0
// Number of frames to skip before changing random letters again
let framesToSkip = 0

// Main animation loop
const animationLoop = (currentTimestamp) => {
    // Calculate the number of seconds passed since the last frame
    let secondsSinceLastFrame = (currentTimestamp - previousTimestamp) / 1000
    previousTimestamp = currentTimestamp
    // Update the total elapsed time
    elapsedSeconds += secondsSinceLastFrame
    // Calculate how many characters should be revealed based on elapsed time
    const charactersToReveal = elapsedSeconds / secondsPerCharacterReveal

    // Control the speed of random letter changes
    if (randomChangeCounter > 0) {
        randomChangeCounter -= 1
    } else {
        // Reset the counter and update the text with random letters
        randomChangeCounter = framesToSkip
        let animatedText = ""
        for (let i = 0; i < hiddenText.length; i++) {
            let character = ""
            // Reveal the actual character if its position is within the charactersToReveal
            if (i < charactersToReveal) {
                character = hiddenText[i];
            } else {
                // Otherwise, use a random letter
                character = alphabet[Math.floor(Math.random() * alphabet.length)];
            }
            animatedText += character
        }
        // Update the display element with the new animated text
        h1Element.innerText = animatedText
    }

    // Request the next animation frame
    window.requestAnimationFrame(animationLoop)
}

// Restart the animation by clicking the text element
h1Element.addEventListener("click", () => {
    elapsedSeconds = 0; // Reset the elapsed time to restart the animation
})

// Start the animation loop
window.requestAnimationFrame(animationLoop)
