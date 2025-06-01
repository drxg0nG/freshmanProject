let p = document.querySelector('#equation')
let pText = p.textContent //equation
let numbers = [] //empty array
let interval
let correctCount = 0

// Timing for 3 levels
let intervalLevels = [5000, 3000, 1500] //time for each level
let currentLevel = 0

//1: Making Random Equation
function equation() {
    numbers = [] //empty array
    let equation = '' //empty string

    for (let i = 0; i < pText.length; i++) { // going through Every letter 
        let char = pText[i]; //Char = letter in equation
        if (char === '0' || char === '?') {
            let randNum;
            
            // Make index 0 and 2 never 0
            if (numbers.length === 0 || numbers.length === 2) {
                randNum = Math.floor(Math.random() * 9) + 1; // 1-9
            } else {
                randNum = Math.floor(Math.random() * 10); // 0-9
            }
            
            numbers.push(randNum); //Push the new random number into the empty array
            
            equation += randNum; //Equation = equation + randNum
        
        } else {
            equation += char; //Equation = equation + number in the equation
        }
    }

    p.innerHTML = equation + `<input type="text" id="answerInput">` //updating #equation
    
    answerInput()
}

//2: Update ?
function updateQuestionMark() {
    numbers[4] = Math.floor(Math.random() * 10)

    let equation = (numbers[0] * 10 + numbers[1]) + '+' + (numbers[2] * 10 + numbers[3]) + '+' + numbers[4] + '=' // Setting up Equation
    p.innerHTML = equation + '<input type="text" id="answerInput">' //updating #equation
    
    answerInput()
}

//3: Get correct answer
function getCorrectAnswer() {
    return (
        (numbers[0] * 10 + numbers[1]) + (numbers[2] * 10 + numbers[3]) + numbers[4] // returns the equation adding all the values
    )
}

//4: Secret Code 1
function getLetter() {
    const letter = 'I'
    return letter
}

//5: Set up input each time
function answerInput() {
    const input = document.querySelector('#answerInput') //input (answer box) id in html
    input.focus() // Highlights the input box at the start without having to click on the box

    input.addEventListener('keydown', (e) => { 
        if (e.key === 'Enter') { //If pressed enter in the input box
            e.preventDefault(); // <-- Add this line to prevent page refresh
            const userInput = parseInt(input.value) // The value of the number in the input box
            if (userInput === getCorrectAnswer()) { //If the users answer is equal to the actual answer
                correctCount++ //correctCount is declared to be 0 at the top of the js file, getting updated to 1 next, and then so on.

                // After the third correct answer:
                if (correctCount >= 3) { //If the user gets 3 answers correct
                    clearInterval(interval) //Stops/clears interval
                    pText = getLetter() // Show the 1st Secret Code Letter
                    return
                }

                // If it has been less then 3 attempts, go to next level speed
                if (currentLevel < intervalLevels.length - 1) {
                    currentLevel++ //correctCount is declared to be 0 at the top of the js file, getting updated to 1 next, and then so on.
                }

                clearInterval(interval) //Stops/clears interval
                equation() //Starts game
                interval = setInterval(updateQuestionMark, intervalLevels[currentLevel]) //Sets an interval (changes the question mark number) every amount of seconds based on what level the user is on. The current level decides how long the question mark stays before it changes (5s, 3s, 1.5s).
            }
        }
    })

    input.addEventListener('input', () => {
        if (parseInt(input.value) === getCorrectAnswer()) { //If the answer is equal to the user value, there is a bottom border that turns green or red (right or wrong).
            input.style.border = '2px solid green'
        } else {
            input.style.border = '2px solid red'
        }
    })
}

//6: Start game
equation()
interval = setInterval(updateQuestionMark, intervalLevels[currentLevel]) //Sets an interval (changes the question mark number) every amount of seconds based on what level the user is on. The current level decides how long the question mark stays before it changes (5s, 3s, 1.5s).