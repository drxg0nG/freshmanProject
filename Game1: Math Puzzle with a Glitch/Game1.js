let p = document.querySelector('p')
let pText = p.textContent

let randomNum = ''
for (let num of pText) {
    if (num === '0') {
        randomNum += Math.floor(Math.random() * 10)
    } else {
        randomNum += num
    }

    if (num === '?') {
        
    }
}
p.textContent = randomNum

setInterval(() => {
    let updatedText = '';
    for (let char of p.textContent) {
        if (char === '?') {
            updatedText += Math.floor(Math.random() * 10);
        } else {
            updatedText += char;
        }
    }
    p.textContent = updatedText;
}, 5000);