const BOARD_SIZE = 15;
const BLACK = "●";
const WHITE = "○";
let currentPlayer = BLACK;
const board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));

function isValidCoordinate(row, col) {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

function checkPattern(row, col, dx, dy) {
  let count = 0;
  let x = row,
      y = col;
  let curPlayer = board[row][col];
  if (curPlayer === 0) return 0;

  while (isValidCoordinate(x, y) && board[x][y] === curPlayer) {
    count++;
    x += dx;
    y += dy;
  }
  return count;
}

function isValidMove(row, col) {
  return isValidCoordinate(row, col) && board[row][col] === 0;
}

function makeMove(row, col) {
  board[row][col] = currentPlayer;
}

function isGameOver() {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] !== 0) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            let count = checkPattern(row, col, dx, dy);

            if (count >= 5) {
              return true;
            }
          }
        }
      }
    }
  }
  return false;
}

function handleCellClick(row, col) {
  if (isValidMove(row, col)) {
    makeMove(row, col);

    const cell = document.querySelector(`.board__row:nth-child(${row + 1}) .board__col:nth-child(${col + 1}) .col__grid`);

	  if (currentPlayer === BLACK) {
		  cell.classList.add('black');	 
	  } else {
		  cell.classList.add('white');	  
	  }

    if (isGameOver()) {
      alert(`Player ${currentPlayer === BLACK ? "1" : "2"} wins!`);
    }
    currentPlayer = currentPlayer === BLACK ? WHITE : BLACK;
    document.getElementById("currentTurn").innerText = `Player ${currentPlayer === BLACK ? "1" : "2"}'s Turn`;
  }
}

function createBoard() {
  const board = document.querySelector(".board");

  for (let i = 0; i < BOARD_SIZE; i++) {
    const boardRow = document.createElement("div");
    boardRow.classList.add("board__row");

    for (let j = 0; j < BOARD_SIZE; j++) {
      const boardCol = document.createElement("div");
      boardCol.classList.add("board__col");

      const colGrid = document.createElement("div");
      colGrid.classList.add("col__grid");
      colGrid.addEventListener("click", () => handleCellClick(i, j));

      boardCol.appendChild(colGrid);
      boardRow.appendChild(boardCol);
    }

    board.appendChild(boardRow);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  createBoard();
});
