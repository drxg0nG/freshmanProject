const buttons = 10;

function createButton(id) {
  const button = document.createElement("img");
  button.className = "random-button";
  button.src = 'button.png'
  document.body.appendChild(button);
  moveButtonRandomly(button);

  // Optional: make each button move when clicked
  button.addEventListener("click", () => moveButtonRandomly(button));
}

function moveButtonRandomly(button) {
  const maxX = window.innerWidth - button.offsetWidth;
  const maxY = window.innerHeight - button.offsetHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  button.style.left = `${randomX}px`;
  button.style.top = `${randomY}px`;
}

// Create all buttons
for (let i = 0; i < buttons; i++) {
  createButton(i);
}
