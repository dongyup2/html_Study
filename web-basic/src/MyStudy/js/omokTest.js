const BOARD_SIZE = 15; // 보드판 크기
const BLACK = "●"; // 흑돌
const WHITE = "○"; // 백돌
const TIMER_LIMIT = 301;//시간

let currentPlayer = BLACK; // 기본값 현재 플레이어 

let remainingTime1 = TIMER_LIMIT; // 플레이어1 남은시간
let remainingTime2 = TIMER_LIMIT; // 플레이어2 남은시간 
let intervalId1;
let intervalId2;

function startTimer() {
  if (currentPlayer === BLACK) {
    clearInterval(intervalId2);
    intervalId1 = setInterval(() => {
      updateTime("timer1", remainingTime1, intervalId1);
    }, 100);
  } else {
    clearInterval(intervalId1);
    intervalId2 = setInterval(() => {
      updateTime("timer2", remainingTime2, intervalId2);
    }, 100);
  }
}


function updateTime(timerId, remainingTime, intervalId) {
  remainingTime--;
  const timer = document.querySelector(`#${timerId}`);
  timer.textContent = `남은 시간: ${remainingTime / 10}초`;

  if (remainingTime === 0) {
    clearInterval(intervalId);
    alert(`시간 초과! ${currentPlayer === BLACK ? "플레이어 2" : "플레이어 1"} 승리!`);
    resetTimer();
  }

  if (currentPlayer === BLACK) {
    remainingTime1 = remainingTime;
  } else {
    remainingTime2 = remainingTime;
  }
}


function resetTimer() {
  if (currentPlayer === BLACK) {
    clearInterval(intervalId1);
    remainingTime1 = TIMER_LIMIT;
  } else {
    clearInterval(intervalId2);
    remainingTime2 = TIMER_LIMIT;
  }
  startTimer();
}


const board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));

function isValidCoordinate(row, col) {//현재 좌표(row, col)가 게임판 내에 있는지 검사하는 로직 
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

function checkPattern(row, col, dx, dy) {
    const curPlayer = board[row][col];
    if (curPlayer === 0) return 0;
  
    let count = 1;
    let x = row + dx;
    let y = col + dy;
  
    while (
      isValidCoordinate(x, y) &&
      board[x][y] === curPlayer
    ) {
      count++;
      x += dx;
      y += dy;
    }
  
    return count;
  }
  

function countConsecutiveStones(row, col, dx, dy) {
    let count = 0;
    let x = row,
      y = col;
    let curPlayer = board[row][col];
    if (curPlayer === 0) return 0;
  
    while (isValidCoordinate(x + dx, y + dy) && board[x + dx][y + dy] === curPlayer) {
      count++;
      x += dx;
      y += dy;
    }
    return count;
  }
  
function checkForRestrictedPatterns(row, col, dx, dy) {
    const count_forward = countConsecutiveStones(row, col, dx, dy);
    const count_backward = countConsecutiveStones(row, col, -dx, -dy);
    const totalCount = count_forward + count_backward + 1;
  
    if (totalCount > 5) {
      return true; // 6목
    }
  
    if (totalCount === 4) {
      const forward_blocked = !isValidCoordinate(row + (dx * 4), col + (dy * 4)) || board[row + (dx * 4)][col + (dy * 4)] !== 0;
      const backward_blocked = !isValidCoordinate(row - dx, col - dy) || board[row - dx][col - dy] !== 0;
  
      if (forward_blocked && backward_blocked) {
        return true; // 44
      }
    }
  
    if (totalCount === 3) {
      const forward_blocked = !isValidCoordinate(row + (dx * 3), col + (dy * 3)) || board[row + (dx * 3)][col + (dy * 3)] !== 0;
      const backward_blocked = !isValidCoordinate(row - dx, col - dy) || board[row - dx][col - dy] !== 0;
  
      if (forward_blocked && backward_blocked) {
        return true; // 33
      }
    }
  }
  
function isValidMove(row, col) {//현재 좌표(row, col)에 플레이어가 착수할 수 있는지 확인하는 로직
  return isValidCoordinate(row, col) && board[row][col] === 0;
}

function makeMove(row, col) {//현재 플레이어의 돌을 게임판에 놓는 로직
  board[row][col] = currentPlayer;
}

function isGameOver() {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col] !== 0) {
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              if (dx === 0 && dy === 0) continue;
  
              if (checkForRestrictedPatterns(row, col, dx, dy)) {
                return false; 
              }
  
              let count = checkPattern(row, col, dx, dy);
              if (count === 5) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }
  function countOpenThree(row, col, dx, dy) {
    const curPlayer = BLACK;
    if (board[row][col] !== curPlayer) return 0;
  
    const count_forward = countConsecutiveStones(row, col, dx, dy);
    const count_backward = countConsecutiveStones(row, col, -dx, -dy);
    const totalCount = count_forward + count_backward + 1;
  
    if (totalCount !== 3) return 0;
  
    const forward_blocked = !isValidCoordinate(row + (dx * 3), col + (dy * 3)) || board[row + (dx * 3)][col + (dy * 3)] !== 0;
    const backward_blocked = !isValidCoordinate(row - dx, col - dy) || board[row - dx][col - dy] !== 0;
  
    if (!forward_blocked && !backward_blocked) {
      return 1;
    }
    return 0;
  }
  
  function is33(row, col) {
    let openThrees = 0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        openThrees += countOpenThree(row, col, dx, dy);
        if (openThrees >= 2) {
          return true;
        }
      }
    }
    return false;
  }
  
  function checkForRestrictedPatterns(row, col) {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        if (
          checkSixStones(row, col, dx, dy) ||
          checkFourFour(row, col, dx, dy) ||
          checkThreeThree(row, col, dx, dy)
        ) {
          return true;
        }
      }
    }
    return false;
  }
  

//게임판의 셀을 클릭했을 때 동작하는 이벤트 처리 함수
function handleCellClick(row, col) {
  if (isValidMove(row, col) && (currentPlayer === WHITE || !is33(row, col))) {
  if (isValidMove(row, col)) {
    makeMove(row, col);/*게임판 상태 업데이트 (makeMove 함수 사용): 좌표가 유효한 경우, 현재 플레이어의 돌을 해당 좌표에 배치.
    board 2차원 배열이 갱신.*/ 
    const cell = document.querySelector(`.board__row:nth-child(${row + 1}) .board__col:nth-child(${col + 1}) .col__grid`);
    //게임판의 해당 셀에 플레이어의 돌을 그래픽적으로 표시. 
     
	  if (currentPlayer === BLACK) {
		  cell.classList.add('black');//이때 플레이어가 BLACK이면 셀에 'black' 클래스를 추가
	  } else {
		  cell.classList.add('white');//WHITE면 'white' 클래스를 추가하여 돌이 보이게 함.  
	  }
    }
    if (isGameOver()) {
      alert(`Player ${currentPlayer === BLACK ? "1" : "2"} wins!`);
      /*현재 착수한 좌표를 기준으로 8 방향( ↗ ↙ ↖ ↘ → ← ↑ ↓)으로 오목이 되었는지 검사합니다. 
      연속된 5개의 돌이 나타나면 게임이 종료되어 그 순간 돌을 놓은 플레이어의 승리로 판단
      승리했다면 경고창(alert으로).*/
    }
    if (isGameOver()) {
      clearInterval(intervalId1);
      clearInterval(intervalId2);
      alert(`Player ${currentPlayer === BLACK ? "1" : "2"} wins!`);
    }
    currentPlayer = currentPlayer === BLACK ? WHITE : BLACK;
    document.getElementById("currentTurn").innerText = `Player ${currentPlayer === BLACK ? "1" : "2"}'s Turn`;
    /*승리하지 않은 경우, 플레이어를 변경하고 현재 플레이어 차례를 화면에 업데이트
     플레이어가 BLACK이었다면 WHITE로 바꾸고, WHITE면 BLACK으로 변경됩니다.*/
     resetTimer();
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
  startTimer();
});
