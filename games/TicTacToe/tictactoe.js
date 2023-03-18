const board = document.querySelector(".board");
let mark;

for (let i = 0; i < 9; i++) {
  const div = document.createElement("div");
  div.classList.add("square");
  board.appendChild(div);
}

const squares = Array.from(document.querySelectorAll(".square"));
//if true, your turn, otherwise AI's turn.
let currentPlayer = true;

const checkEndOfGame = () => {
  if (isGameOver()) {
    console.log("it's over");

    if (isDraw()) {
      console.log(`It's a draw`);
    } else {
      console.log(`The winner is: ${mark}`);
    }

    squares.forEach((square) => {
      square.removeEventListener("click", playerTurn);
    });
  }
};

const playerTurn = (e) => {
  if (!isGameOver()) {
    currentPlayer ? (mark = "X") : (mark = "O");

    const square = e.target;

    if (square.textContent !== "") {
      console.log("invalid square. Try again");
    } else {
      square.textContent = mark;

      checkEndOfGame();
      currentPlayer = !currentPlayer;

      if (!isGameOver()) {
        aiMove();
      }
    }
  }
};

const aiMove = () => {
  currentPlayer ? (mark = "X") : (mark = "O");

  const emptySquares = squares.filter((square) => square.textContent === "");

  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  emptySquares[randomIndex].textContent = mark;

  checkEndOfGame();
  currentPlayer = !currentPlayer;
};

squares.forEach((square) => {
  square.addEventListener("click", playerTurn);
});

const isDraw = () => {
  return squares.every((square) => square.textContent !== "");
};

const isGameOver = () => {
  const sq = [
    [squares[0], squares[1], squares[2]],
    [squares[3], squares[4], squares[5]],
    [squares[6], squares[7], squares[8]],
    [squares[0], squares[3], squares[6]],
    [squares[1], squares[4], squares[7]],
    [squares[2], squares[5], squares[8]],
    [squares[0], squares[4], squares[8]],
    [squares[2], squares[4], squares[6]],
  ];

  if (isDraw()) {
    return true;
  }

  return sq.some((cond) => {
    console.log(cond);
    cond.every((element) => {
      element.textContent === "X" || element.textContent === "O";
    });
  });
};

// Menu
document.getElementById("play").addEventListener("click", function () {});

document.getElementById("stats").addEventListener("click", function () {});

document.getElementById("settings").addEventListener("click", function () {});

const menuButtons = document.querySelectorAll("#menu .button");
const menu = document.querySelector("#menu");

menuButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    menu.style.display = "none";
  });
});

menuButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    menu.style.display = "none";
    overlay.style.display = "none";
  });
});

document.querySelector("#play").addEventListener("click", function () {
  overlay.style.display = "none";
});
