const board = document.querySelector(".board");
let isDraw = false;
let stats = {
  aiVictories: 0,
  draws: 0,
  playerVictories: 0,
};

let mark;
//if true, your turn, otherwise AI's turn.
let currentPlayer = true;

const statContainer = document.querySelector(".stats");
const restartButton = document.querySelector(".restartBtn");
restartButton.addEventListener("click", restart);

function restart() {
  mark = null;
  isDraw = false;
  currentPlayer = true;

  squares.forEach((square) => {
    square.removeEventListener("click", playerTurn);
  });

  squares.forEach((square) => {
    square.textContent = "";
    square.addEventListener("click", playerTurn);
  });
}

const refreshStats = () => {
  statContainer.textContent = `
  Player: ${stats.playerVictories}
  Ai: ${stats.aiVictories}
  Draws: ${stats.draws}
`;
};

refreshStats();

for (let i = 0; i < 9; i++) {
  const div = document.createElement("div");
  div.classList.add("square");
  board.appendChild(div);
}

const squares = Array.from(document.querySelectorAll(".square"));

const checkEndOfGameRemoveListeners = () => {
  if (!isGameOver()) return;
  console.log(isDraw ? `It's a draw` : `The winner is ${mark}`);

  // if (mark === "X") {
  //   stats.playerVictories++;
  // } else {
  //   stats.aiVictories++;
  // }
  mark === "X" ? stats.playerVictories++ : stats.aiVictories++;
  refreshStats();

  squares.forEach((square) => {
    square.removeEventListener("click", playerTurn);
  });
};

const playerTurn = (e) => {
  currentPlayer ? (mark = "X") : (mark = "O");
  const square = e.target;

  if (square.textContent !== "") {
    console.log("invalid square. Try again");
  } else {
    square.textContent = mark;

    checkEndOfGameRemoveListeners();
    currentPlayer = !currentPlayer;

    if (!isGameOver()) {
      aiMove();
    }
  }
};

const aiMove = () => {
  currentPlayer ? (mark = "X") : (mark = "O");

  const emptySquares = squares.filter((square) => square.textContent === "");

  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  emptySquares[randomIndex].textContent = mark;

  checkEndOfGameRemoveListeners();
  currentPlayer = !currentPlayer;
};

squares.forEach((square) => {
  square.addEventListener("click", playerTurn);
});

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

  if (squares.every((square) => square.textContent !== "")) {
    stats.draws++;
    refreshStats();
    isDraw = true;
    return true;
  }

  return sq.some((cond) =>
    cond.every(
      (element) =>
        element.textContent === "X" ||
        cond.every((element) => element.textContent === "O")
    )
  );
};

// Menu
const menuButtons = document.querySelectorAll("#menu .button");
const menu = document.querySelector("#menu");

const modal = document.getElementById("myModal");
const close = document.getElementsByClassName("close")[0];

const startGame = (e) => {
  overlay.style.display = "none";

  menuButtons.forEach((button) => {
    button.style.display = "none";
  });
};

const openStats = () => {
  console.log(stats);
  // console.log(`
  //   Player: ${stats.playerVictories}
  //   Ai: ${stats.aiVictories}
  //   Draws: ${stats.draws}
  // `);
};

const openSettings = () => {
  console.log("hi");
  modal.style.display = "block";
  modal.addEventListener("click", handleModal);
};

const handleMenu = (event) => {
  switch (event.target.textContent) {
    case "Play":
      startGame();
      break;
    case "Stats":
      openStats();
      break;
    case "Settings":
      openSettings();
      break;
  }
};

const handleModal = (event) => {
  switch (event.target.textContent) {
    case "×":
      modal.removeEventListener("click", handleModal);
      modal.style.display = "none";
      break;
  }
};

menu.addEventListener("click", handleMenu);
