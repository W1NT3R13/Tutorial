const board = document.querySelector('.board')
const statContainer = document.querySelector('.stats')
const restartButton = document.querySelector('.restartBtn')

let stats

const getSessionStorage = () => {
  let data = sessionStorage.getItem('gameStats')
  stats = JSON.parse(data)

  if (stats === null) {
    stats = {
      playerVictories: 0,
      aiVictories: 0,
      draws: 0,
    }
  }
}

getSessionStorage()

let mark
//if true, your turn, otherwise AI's turn
let currentPlayer = true
let isDraw = false

function restart() {
  mark = null
  isDraw = false
  currentPlayer = true

  squares.forEach(square => {
    square.removeEventListener('click', playerTurn)
  })

  squares.forEach(square => {
    square.textContent = ''
    square.addEventListener('click', playerTurn)
  })
}

const refreshStats = () => {
  statContainer.textContent = `
  Player: ${stats.playerVictories}
  Ai: ${stats.aiVictories}
  Draws: ${stats.draws}
`
  let stringStats = JSON.stringify(stats)
  sessionStorage.setItem('gameStats', stringStats)
}

refreshStats()

for (let i = 0; i < 9; i++) {
  const div = document.createElement('div')
  div.classList.add('square')
  board.appendChild(div)
}

const squares = Array.from(document.querySelectorAll('.square'))

const checkEndOfGameRemoveListeners = () => {
  if (isGameOver()) {
    console.log(isDraw ? `It's a draw` : `The winner is ${mark}`)

    if (isDraw) {
      stats.draws++
    } else {
      mark === 'X' ? stats.playerVictories++ : stats.aiVictories++
    }

    refreshStats()

    squares.forEach(square => {
      square.removeEventListener('click', playerTurn)
    })
  }
}

const playerTurn = e => {
  currentPlayer ? (mark = 'X') : (mark = 'O')
  const square = e.target

  if (square.textContent !== '') {
    console.log('invalid square. Try again')
  } else {
    square.textContent = mark

    checkEndOfGameRemoveListeners()
    currentPlayer = !currentPlayer

    if (!isGameOver()) {
      aiMove()
    }
  }
}

const aiMove = () => {
  currentPlayer ? (mark = 'X') : (mark = 'O')

  const emptySquares = squares.filter(square => square.textContent === '')
  const randomIndex = Math.floor(Math.random() * emptySquares.length)
  emptySquares[randomIndex].textContent = mark

  checkEndOfGameRemoveListeners()
  currentPlayer = !currentPlayer
}

squares.forEach(square => {
  square.addEventListener('click', playerTurn)
})

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
  ]

  const isThereAWinner = sq.some(cond =>
    cond.every(
      element =>
        element.textContent === 'X' ||
        cond.every(element => element.textContent === 'O')
    )
  )

  if (squares.every(square => square.textContent !== '' && !isThereAWinner)) {
    isDraw = true
    return true
  } else if (isThereAWinner) {
    return true
  }
}

// Menu
const menuButtons = document.querySelectorAll('#menu .button')
const menu = document.querySelector('#menu')
const overlay = document.querySelector('#overlay')

const startGame = () => {
  overlay.style.display = 'none'

  menuButtons.forEach(button => {
    button.style.display = 'none'
  })
}

const openStats = () => {
  modalStats.style.display = 'block'
  modalStats.addEventListener('click', event =>
    handleCloseModal(event, modalStats)
  )

  const statElements = Array.from(document.querySelectorAll('.gameStats'))
  gameStats = Object.values(stats)

  for (let i = 0; i < statElements.length; i++) {
    statElements[i].textContent = gameStats[i]
  }
}

const openSettings = () => {
  modalSettings.style.display = 'block'
  modalSettings.addEventListener('click', event =>
    handleCloseModal(event, modalSettings)
  )
}

const handleMenu = event => {
  switch (event.target.textContent) {
    case 'Play':
      startGame()
      break
    case 'Stats':
      openStats()
      break
    case 'Settings':
      openSettings()
      break
  }
}

menu.addEventListener('click', handleMenu)

// Modal
const modalSettings = document.querySelector('.settingsModal')
const modalStats = document.querySelector('.statsModal')

const handleCloseModal = (event, modal) => {
  if (event.target.textContent === '×') {
    modal.removeEventListener('click', handleCloseModal)
    modal.style.display = 'none'
  }
}

restartButton.addEventListener('click', () => restart())
