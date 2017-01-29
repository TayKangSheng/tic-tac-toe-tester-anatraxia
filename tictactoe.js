
/* global isGameOver, whoWon, playTurn, restart */
/* testing-the-tester.js */
var boxes = document.querySelectorAll('.container > div')
var gameStatusH1 = document.getElementsByClassName('Game Status')[0]
var gameResetBut = document.getElementsByClassName('btn')[0]

var grid = []
var player = 1
var gameStatus = 0
var winMove = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]]

// This script will test the game logic of your tic tac toe game. To use it you will need to include it in your html file after you main tic-tac-toe script. You will need to declare the following functions in the global scope:

// # playTurn(index)
// It should take one parameter which is a zero-based index to your grid,
// indicating where the current player's token should be played.
// It should return a boolean value to indicate whether the move was allowed or not
// - true if it was successful, false otherwise e.g. if the square is already taken or the game is over.

function playTurn (index) {
  if (grid.length < 9 && grid.indexOf(index) === -1) {
    grid.push(index)
    console.log(player)
    console.log(grid)
    return true
  } else {
    return false
  }
}

// # isGameOver()
// It should return a true or false if the game is over.
function isGameOver () {
  if (whoWon() === 0) {
    return false
  } else if (whoWon() === 1) {
    gameStatus = 1
    return true
  } else if (whoWon() === 2) {
    gameStatus = 2
    return true
  } else {
    gameStatus = 3
    return true
  }
}
// winMove
// # whoWon()
// It should return 0 if the game is not yet finished.
// Else it should return either 1 or 2 depending on which player one.
// It should return 3 if the game is a draw.
function checkWinArry (arryGame) {
  var boolResult = false
  for (var j = 0; j < 8; j++) {
    var countMatch = 0
    for (var k = 0; k < 3; k++) {
      for (var i = 0; i < arryGame.length; i++) {
        if (winMove[j][k] == arryGame[i]) {
          countMatch += 1
        }
      }
      if (countMatch === 3) {
        return boolResult = true
      }
    }
  }
  return boolResult
}

function whoWon () {
  var player1move = []
  var player2move = []
  var boolPlayer1 = false
  var boolPlayer2 = false
  for (var i = 0; i < grid.length; i++) {
    if (i % 2 === 0) {
      player1move.push(grid[i])
      console.log('Player1 ' + player1move)
    } else {
      player2move.push(grid[i])
      console.log('Player2 ' + player2move)
    }
  }
  boolPlayer1 = checkWinArry(player1move)
  boolPlayer2 = checkWinArry(player2move)

  console.log(boolPlayer1 + ' ' + boolPlayer2)
  if (boolPlayer1 === true && boolPlayer2 === false) {
    return 1
  } else if (boolPlayer1 === false && boolPlayer2 === true) {
    return 2
  } else if (boolPlayer1 === false && boolPlayer2 === false && grid.length === 9) {
    return 3
  } else {
    return 0
  }
}
// # restart()
// It should restart the game so it can be played again.
//
// It is assumed that the turns of the player will be automatically changed after an allowed move.
//
// The application will console log all the passed or failed test

function restart () {
  player = 1
  grid = []
  gameStatus = 0
  clearGameGrid()
  updateGameStatus('Player 1 place your  X in the box')
}
function clearGameGrid () {
  boxes.forEach(function (box) {
    box.textContent = ''
  })
}
function updatePlayerSign (box) {
  if (player === 1) {
    box.textContent = 'X'
  } else {
    box.textContent = 'O'
  }
}
function playerSwitch () {
  if (player === 1 && gameStatus === 0) {
    player = 2
    updateGameStatus('Player 2 turn')
  } else if (player === 2 && gameStatus === 0) {
    player = 1
    updateGameStatus('Player 1 turn')
  }
}
function updateGameStatus (gameResult) {
  gameStatusH1.textContent = gameResult
}
window.addEventListener('DOMContentLoaded', function () {
  // setlistener for each div
  gameResetBut.addEventListener('click', restart)
  boxes.forEach(function (box) {
    box.addEventListener('click', function (elm) {
      if (isGameOver() === false && gameStatus === 0) {
        if (playTurn(elm.target.id)) {
          updatePlayerSign(box)
          if (isGameOver() === false) {
            playerSwitch()
          } else if (gameStatus === 1) {
            updateGameStatus('Game Over: Player 1 Won')
          } else if (gameStatus === 2) {
            updateGameStatus('Game Over: Player 2 Won')
          } else if (gameStatus === 3) {
            updateGameStatus('Game Over: Draw')
          }
        } else {
          updateGameStatus('Move is taken')
        }
      }
    })
  })
})
