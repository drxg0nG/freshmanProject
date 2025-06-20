function initGame1() {
    let game1 = document.querySelector('#game1')
    let p1 = document.querySelector('#equation')
    let pText1 = p1.textContent //equation
    let numbers1 = [] //empty array
    let interval1
    let correctCount1 = 0

    // Timing for 3 levels
    let intervalLevels1 = [5000, 3000, 1500] //time for each level
    let currentLevel1 = 0

    //1: Making Random Equation
    function equation1() {
        numbers1 = [] //empty array
        let equation1 = '' //empty string

        for (let i1 = 0; i1 < pText1.length; i1++) { // going through Every letter 
            let char1 = pText1[i1] //Char = letter in equation
            if (char1 === '0' || char1 === '?') {
                let randNum1

                // Make index 0 and 2 never 0
                if (numbers1.length === 0 || numbers1.length === 2) {
                    randNum1 = Math.floor(Math.random() * 9) + 1 // 1-9
                } else {
                    randNum1 = Math.floor(Math.random() * 10) // 0-9
                }

                numbers1.push(randNum1) //Push the new random number into the empty array

                equation1 += randNum1 //Equation = equation + randNum

            } else {
                equation1 += char1 //Equation = equation + number in the equation
            }
        }

        p1.innerHTML = equation1 + `<input type="text" id="answerInput">` //updating #equation

        answerInput1()
    }

    //2: Update ?
    function updateQuestionMark1() {
        numbers1[4] = Math.floor(Math.random() * 10)

        let equation1 = (numbers1[0] * 10 + numbers1[1]) + '+' + (numbers1[2] * 10 + numbers1[3]) + '+' + numbers1[4] + '=' // Setting up Equation
        p1.innerHTML = equation1 + '<input type="text" id="answerInput">' //updating #equation

        answerInput1()
    }

    //3: Get correct answer
    function getCorrectAnswer1() {
        return (
            (numbers1[0] * 10 + numbers1[1]) + (numbers1[2] * 10 + numbers1[3]) + numbers1[4] // returns the equation adding all the values
        )
    }

    //4: Secret Code 1
    function getLetter1() {
        const letter1 = 'A'
        return letter1
    }

    //5: Set up input each time
    function answerInput1() {
        const input1 = document.querySelector('#answerInput') //input (answer box) id in html
        input1.focus() // Highlights the input box at the start without having to click on the box

        input1.addEventListener('keydown', (e1) => {
            if (e1.key === 'Enter') { //If pressed enter in the input box
                e1.preventDefault()
                const userInput1 = parseInt(input1.value) // The value of the number in the input box
                if (userInput1 === getCorrectAnswer1()) { //If the users answer is equal to the actual answer
                    // Flashes input green
                    input1.classList.add('input-flash-green')
                    setTimeout(() => {
                        input1.classList.remove('input-flash-green')
                    }, 300)

                    correctCount1++ // correctCount1 + 1

                    // After the third correct answer:
                    if (correctCount1 >= 3) { //If the user gets 3 answers correct
                        clearInterval(interval1) //Stops/clears interval

                        //Container for the letter and button
                        const container1 = document.createElement('div')
                        container1.style.display = 'flex'
                        container1.style.flexDirection = 'column'
                        container1.style.alignItems = 'center'
                        container1.style.justifyContent = 'center'
                        container1.style.height = '100vh'

                        // Letter
                        const letter1 = document.createElement('div')
                        letter1.textContent = getLetter1()
                        letter1.style.fontSize = "5rem"
                        letter1.style.marginBottom = "20px"
                        letter1.style.color = "rgb(0, 255, 0)"
                        letter1.style.fontFamily = "Cutive Mono, monospace"
                        container1.appendChild(letter1)

                        // Next Game btn
                        const nextBtn1 = document.createElement('button')
                        nextBtn1.className = 'btn'
                        nextBtn1.textContent = "The Invisible"
                        nextBtn1.style.fontSize = "2rem"
                        nextBtn1.onclick = function () {
                            localStorage.setItem("escapeLevel", 2)
                            showGame(2)
                        }
                        container1.appendChild(nextBtn1)

                        // Replace content with container
                        game1.innerHTML = ''
                        game1.appendChild(container1)
                        return
                    }

                    // If it has been less then 3 attempts, go to next level speed
                    if (currentLevel1 < intervalLevels1.length - 1) {
                        currentLevel1++
                        level() // Update level display after increment
                    }

                    clearInterval(interval1) //Stops/clears interval
                    equation1() //Starts game
                    interval1 = setInterval(updateQuestionMark1, intervalLevels1[currentLevel1]) //Sets an interval (changes the question mark number) every amount of seconds based on what level the user is on. The current level decides how long the question mark stays before it changes (5s, 3s, 1.5s).
                }
            }
        })

        input1.addEventListener('input', () => {
            if (parseInt(input1.value) === getCorrectAnswer1()) { //If the answer is equal to the user value, there is a bottom border that turns green or red (right or wrong).
                input1.style.border = '2px solid green'
            } else {
                input1.style.border = '2px solid red'
            }
        })
    }

    //6: Display lvl
    function level() {
        const lvlNum = document.querySelector('#game1 .lvlNum')
        if (lvlNum) {
            lvlNum.textContent = currentLevel1 + 1 // Bc currentLevel1 starts from 0
        }
    }

    level()

    //7: Start game
    equation1()
    interval1 = setInterval(updateQuestionMark1, intervalLevels1[currentLevel1]) //Sets an interval (changes the question mark number) every amount of seconds based on what level the user is on. The current level decides how long the question mark stays before it changes (5s, 3s, 1.5s).
}

// ======== Matrix Background ========
const matrixDiv1 = document.getElementById('matrix1')
const fallingCode1 = document.getElementById('fallingCode1')
const growingCode1 = document.getElementById('growingCode1') 
const letters1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]$@!#&*+-=<>?^_~|"

// Append to matrix
matrixDiv1.appendChild(fallingCode1)
matrixDiv1.appendChild(growingCode1)

// Create the code stream
function createCodeStream1() {
  const codeStream1 = document.createElement('div')
  codeStream1.className = 'stream'
  
  // Where its going to fall from
  codeStream1.style.left = `${Math.random() * 100}vw`
  
  // Duration for the animation
  const duration1 = (4 + Math.random() * 4)
  codeStream1.style.animationDuration = duration1 + 's'
  fallingCode1.style.animationDuration = (duration1 / 0.9) + 's'
  
  // Random font size
  const fontSize1 = 14 + Math.random() * 10
  codeStream1.style.fontSize = fontSize1 + 'px'
  
  // Build code stream
  let codeStreamContent1 = ''
  const codeStreamLength1 = 12 + Math.floor(Math.random() * 15)
  for (let iS = 0; iS < codeStreamLength1; iS++) {
    const charS = letters1.charAt(Math.floor(Math.random() * letters1.length))
    codeStreamContent1 += charS + '<br>'
  }
  codeStream1.innerHTML = codeStreamContent1

  // Sorting System
  if (Math.random() < 0.7) {
    fallingCode1.appendChild(codeStream1)
  } else {
    growingCode1.appendChild(codeStream1)
  }
  
  // Remove code stream once finished
  setTimeout(() => codeStream1.parentElement.removeChild(codeStream1), duration1 * 1000)
}

setInterval(createCodeStream1, 200)