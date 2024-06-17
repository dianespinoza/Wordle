const WORDS = ["apple", "grape", "berry", "melon", "lemon"];
const answer = WORDS[Math.floor(Math.random() * WORDS.length)];

const board = document.getElementById("board");
const keyboard = document.getElementById("keyboard");

let currentRow = 0;
let currentCol = 0;
let guess = Array(5).fill("");

function createBoard() {
  for (let i = 0; i < 30; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
  }
}

function createKeyboard() {
  const keys = "qwertyuiopasdfghjklzxcvbnm";
  for (let char of keys) {
    const key = document.createElement("button");
    key.textContent = char;
    key.classList.add("key");
    key.addEventListener("click", () => handleKey(char));
    keyboard.appendChild(key);
  }

  const enterKey = document.createElement("button");
  enterKey.textContent = "Enter";
  enterKey.classList.add("key");
  enterKey.addEventListener("click", handleEnter);
  keyboard.appendChild(enterKey);

  const deleteKey = document.createElement("button");
  deleteKey.textContent = "Del";
  deleteKey.classList.add("key");
  deleteKey.addEventListener("click", handleDelete);
  keyboard.appendChild(deleteKey);
}

function handleKey(char) {
  if (currentCol < 5) {
    guess[currentCol] = char;
    const cellIndex = currentRow * 5 + currentCol;
    board.children[cellIndex].textContent = char;
    currentCol++;
  }
}

function handleDelete() {
  if (currentCol > 0) {
    currentCol--;
    guess[currentCol] = "";
    const cellIndex = currentRow * 5 + currentCol;
    board.children[cellIndex].textContent = "";
  }
}

function handleEnter() {
  if (currentCol === 5) {
    checkGuess();
    currentRow++;
    currentCol = 0;
    guess = Array(5).fill("");
    if (currentRow === 6) {
      alert(`Game over! The answer was ${answer}`);
    }
  }
}

function checkGuess() {
  for (let i = 0; i < 5; i++) {
    const cellIndex = currentRow * 5 + i;
    const letter = guess[i];
    if (answer[i] === letter) {
      board.children[cellIndex].classList.add("correct");
    } else if (answer.includes(letter)) {
      board.children[cellIndex].classList.add("present");
    } else {
      board.children[cellIndex].classList.add("absent");
    }
  }

  if (guess.join("") === answer) {
    alert("You win!");
  }
}

createBoard();
createKeyboard();
