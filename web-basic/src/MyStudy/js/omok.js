const BOARD_SIZE = 15;
const BLACK = "●";
const WHITE = "○";
let currentPlayer = BLACK;
const board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));

function isValidCoordinate(row, col) {//현재 좌표(row, col)가 게임판 내에 있는지 검사하는 로직 
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

function checkPattern(row, col, dx, dy) {//특정 방향(dx, dy)으로 같은 돌이 몇 개인지 카운트 하는 로직
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

function isValidMove(row, col) {//현재 좌표(row, col)에 플레이어가 착수할 수 있는지 확인하는 로직
  return isValidCoordinate(row, col) && board[row][col] === 0;
}

function makeMove(row, col) {//현재 플레이어의 돌을 게임판에 놓는 로직
  board[row][col] = currentPlayer;
}

function isGameOver() {// 게임이 종료되었는지, 즉 연속 5개의 돌이 놓였는지 검사(33,44,6목 x)
  for (let row = 0; row < BOARD_SIZE; row++) { //row 가로줄(열), col 세로줄(행) 
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] !== 0) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            let count = checkPattern(row, col, dx, dy);
			//게임판의 모든 위치와 8 방향( ↗ ↙ ↖ ↘ → ← ↑ ↓) 검사를 통해 5개 이상의 돌이 연속되어 있는지 확인
            if (count >= 5) {//5개 이상일경우 true 리턴
              return true;
            }
          }
        }
      }
    }
  }
  return false;
}

//게임판의 셀을 클릭했을 때 동작하는 이벤트 처리 함수
function handleCellClick(row, col) {
  if (isValidMove(row, col)) {
    makeMove(row, col);/*게임판 상태 업데이트 (makeMove 함수 사용): 좌표가 유효한 경우, 현재 플레이어의 돌을 해당 좌표에 배치.
    board 2차원 배열이 갱신.*/ 
    const cell = document.querySelector(`.board__row:nth-child(${row + 1}) .board__col:nth-child(${col + 1}) .col__grid`);
    //게임판의 해당 셀에 플레이어의 돌을 그래픽적으로 표시합니다. 
     
	  if (currentPlayer === BLACK) {
		  cell.classList.add('black');//이때 플레이어가 BLACK이면 셀에 'black' 클래스를 추가
	  } else {
		  cell.classList.add('white');//WHITE면 'white' 클래스를 추가하여 돌이 보이게 함.  
	  }

    if (isGameOver()) {
      alert(`Player ${currentPlayer === BLACK ? "1" : "2"} wins!`);
      /*현재 착수한 좌표를 기준으로 8 방향으로 오목이 되었는지 검사합니다. 
      연속된 5개의 돌이 나타나면 게임이 종료되어 그 순간 돌을 놓은 플레이어의 승리로 판단
      승리했다면 경고창(alert으로).*/
    }
    currentPlayer = currentPlayer === BLACK ? WHITE : BLACK;
    document.getElementById("currentTurn").innerText = `Player ${currentPlayer === BLACK ? "1" : "2"}'s Turn`;
    /*승리하지 않은 경우, 플레이어를 변경하고 현재 플레이어 차례를 화면에 업데이트
     플레이어가 BLACK이었다면 WHITE로 바꾸고, WHITE면 BLACK으로 변경됩니다.*/
  }
}


function createBoard() {
  const board = document.querySelector(".board");//.board 클래스를 가진 HTML 요소를 가져와 변수 board에 할당

  for (let i = 0; i < BOARD_SIZE; i++) {//이중 for 루프를 사용하여 각 행과 열에 대해 동작을 반복
    const boardRow = document.createElement("div");
    boardRow.classList.add("board__row");//boardRow 변수에 새 div 요소를 생성하고, 이에 .board__row 클래스를 추가.

    for (let j = 0; j < BOARD_SIZE; j++) {
      const boardCol = document.createElement("div");
      boardCol.classList.add("board__col");//boardCol 변수에 새 div 요소를 생성하고, 이에 .board__col 클래스를 추가

      const colGrid = document.createElement("div");//이 클래스는 오목판의 각 셀의 스타일과 격자 모양을 적용하는 데 사용.
      colGrid.classList.add("col__grid");
      colGrid.addEventListener("click", () => handleCellClick(i, j));
      /*colGrid 요소에 클릭 이벤트 처리를 위한 핸들러를 추가.
      이때, handleCellClick 함수에 (i, j) 좌표를 전달하며 호출.
      이를 통해 사용자가 특정 셀을 클릭할 때 어떤 동작을 수행할지 결정.*/ 
      boardCol.appendChild(colGrid); //colGrid를 boardCol 요소에 추가하고(열과 셀을 연결),
      boardRow.appendChild(boardCol);//각 boardCol 요소를 이전에 생성된 boardRow(행)에 추가합니다.                 
    }
    board.appendChild(boardRow);//이를 통해 오목판의 전체 격자 구조가 완성
  }
}
document.addEventListener("DOMContentLoaded", () => {
  createBoard();
});
