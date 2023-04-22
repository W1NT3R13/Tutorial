const board = document.querySelector(".board");
const statContainer = document.querySelector(".stats");
const restartButton = document.querySelector(".restartBtn");

let stats;
let isModalOpen = false;

let mark;
//if true, your turn, otherwise AI's turn
let currentPlayer = true;
let isDraw = false;

const getSessionStorage = () => {
  let data = sessionStorage.getItem("gameStats");
  stats = JSON.parse(data);

  if (stats === null) {
    stats = {
      playerVictories: 0,
      aiVictories: 0,
      draws: 0,
    };
  }
};

getSessionStorage();

const restart = () => {
  mark = null;
  isDraw = false;
  currentPlayer = true;

  removeSquareListeners();

  squares.forEach((square) => {
    square.textContent = "";
    square.addEventListener("click", playerTurn);
  });
};

const removeSquareListeners = () => {
  squares.forEach((square) => {
    square.removeEventListener("click", playerTurn);
  });
};

const refreshStats = () => {
  statContainer.textContent = `
  Player: ${stats.playerVictories}
  Ai: ${stats.aiVictories}
  Draws: ${stats.draws}
`;
  let stringStats = JSON.stringify(stats);
  sessionStorage.setItem("gameStats", stringStats);
};

refreshStats();

for (let i = 0; i < 9; i++) {
  const div = document.createElement("div");
  div.classList.add("square");
  board.appendChild(div);
}

const squares = Array.from(document.querySelectorAll(".square"));

const checkEndOfGameRemoveListeners = () => {
  if (isGameOver()) {
    console.log(isDraw ? `It's a draw` : `The winner is ${mark}`);

    if (isDraw) {
      stats.draws++;
    } else {
      mark === "X" ? stats.playerVictories++ : stats.aiVictories++;
    }

    refreshStats();
    removeSquareListeners();
  }
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

  const isThereAWinner = sq.some((cond) =>
    cond.every(
      (element) =>
        element.textContent === "X" ||
        cond.every((element) => element.textContent === "O")
    )
  );

  if (squares.every((square) => square.textContent !== "" && !isThereAWinner)) {
    isDraw = true;
    return true;
  } else if (isThereAWinner) {
    return true;
  }
};

// Menu
const menuButtons = document.querySelectorAll("#menu .button");
const menu = document.querySelector("#menu");
const overlay = document.querySelector("#overlay");

const handleOpenModal = (event) => {
  isModalOpen = true;
  selectedModal = event === "Settings" ? modalSettings : modalStats;

  selectedModal.style.display = "block";
  selectedModal.addEventListener("click", (event) =>
    handleCloseModal(event, selectedModal)
  );

  if (event === "Stats") {
    //Load stats
    const statElements = Array.from(document.querySelectorAll(".gameStats"));
    gameStats = Object.values(stats);

    for (let i = 0; i < statElements.length; i++) {
      statElements[i].textContent = gameStats[i];
    }
  }
};

const handleMenu = (event) => {
  let menuButton = event.target.textContent;
  menuButton === "Play" ? turnMenuOnOrOff("none") : handleOpenModal(menuButton);
};

const turnMenuOnOrOff = (displaySetting) => {
  overlay.style.display = displaySetting;

  menuButtons.forEach((button) => {
    button.style.display = displaySetting;
  });
};

// Modal
const modalSettings = document.querySelector(".settingsModal");
const modalStats = document.querySelector(".statsModal");

const handleCloseModal = (event, modal) => {
  if (event.target.textContent === "×" || event.key === "Escape") {
    isModalOpen = false;
    modal.removeEventListener("click", handleCloseModal);
    modal.style.display = "none";
  }
};

squares.forEach((square) => {
  square.addEventListener("click", playerTurn);
});

menu.addEventListener("click", handleMenu);

restartButton.addEventListener("click", () => restart());

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  let openedModal =
    modalSettings.style.display === "block" ? modalSettings : modalStats;

  if (isModalOpen) {
    handleCloseModal(event, openedModal);
  } else {
    turnMenuOnOrOff("block");
    restart();
  }
});
