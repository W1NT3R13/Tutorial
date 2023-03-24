const board = document.querySelector('.board')
let isDraw = false

let mark

for (let i = 0; i < 9; i++) {
  const div = document.createElement('div')
  div.classList.add('square')
  board.appendChild(div)
}

const squares = Array.from(document.querySelectorAll('.square'))
//if true, your turn, otherwise AI's turn.
let currentPlayer = true

const checkEndOfGameRemoveListeners = () => {
  if (!isGameOver()) return
  console.log(isDraw ? `It's a draw` : `The winner is ${mark}`)

  squares.forEach(square => {
    square.removeEventListener('click', playerTurn)
  })
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

  if (squares.every(square => square.textContent !== '')) {
    isDraw = true
    return true
  }

  return sq.some(cond =>
    cond.every(
      element =>
        element.textContent === 'X' ||
        cond.every(element => element.textContent === 'O')
    )
  )
}

// Menu
const menuButtons = document.querySelectorAll('#menu .button')
const menu = document.querySelector('#menu')

const startGame = e => {
  overlay.style.display = 'none'

  menuButtons.forEach(button => {
    button.style.display = 'none'
  })
}

const openStats = () => {
  console.log('open stats')
}

const openSettings = () => {
  console.log('open settings')
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
