const BOARD_SIZE = 15; // 보드판 크기
const BLACK = "●"; // 흑돌
const WHITE = "○"; // 백돌
let currentPlayer = BLACK; // 기본값 현재 플레이어 

const TIMER_LIMIT = 301;//게임에서 각 플레이어의 시작 시간을 301로 설정(30.1초)

let remainingTime1 = TIMER_LIMIT; // 플레이어1 남은시간 초기값으로 TIMER_LIMIT 할당
let remainingTime2 = TIMER_LIMIT; // 플레이어2 남은시간 초기값으로 TIMER_LIMIT 할당
let intervalId1; // 플레이어의 타이머 인터벌 ID를 저장할 변수, 나중에 clearInterval 함수로 타이머를 멈추게 될 때 사용
let intervalId2;

/*타이머를 시작하는 함수. 
흑돌(BLACK) 플레이어 차례인 경우 전체 백돌 플레이어의 타이머(intervalId2)를 정지하고,
흑돌 플레이어의 타이머(intervalId1)를 시작.
백돌 차례인 경우 전체 흑돌 플레이어의 타이머(intervalId1)를 정지하고, 백돌 플레이어의 타이머(intervalId2)를 시작.
이렇게 함으로써 한 플레이어의 차례가 끝나면 다른 플레이어의 타이머가 시작되도록 구현.*/

function startTimer() {
  // 흑돌 플레이어 차례
  if (currentPlayer === BLACK) {
    clearInterval(intervalId2); // 백돌 플레이어의 타이머 정지

    intervalId1 = setInterval(function() {
      updateTime("timer1", remainingTime1, intervalId1);
    }, 100);                  // 흑돌 플레이어의 타이머 시작
  } 
  // 백돌 플레이어 차례 
  else {
    clearInterval(intervalId1); // 흑돌 플레이어의 타이머 정지

    intervalId2 = setInterval(function() {
      updateTime("timer2", remainingTime2, intervalId2);
    }, 100); // 백돌 플레이어의 타이머 시작
  }
}



/* 플레이어의 남은 시간을 업데이트하고 화면에 표시하는 함수.
각 플레이어의 남은 시간(remainingTime)을 1초 간격으로 감소시키고,
남은 시간이 0이 되면 해당 플레이어의 시간이 초과된 것으로 판단하여 게임에서 승리.
이 함수도 플레이어가 바뀔 때마다 startTimer에 의해 호출되어 타이머가 서로 바뀌면서 작동.*/
function updateTime(timerId, remainingTime, intervalId) {
  remainingTime--;
  const timer = document.querySelector("#" + timerId);
  timer.textContent = "남은 시간: " + (remainingTime / 10) + "초";

  if (remainingTime === 0) {
    clearInterval(intervalId);
    alert("시간 초과! " + (currentPlayer === BLACK ? "플레이어 2" : "플레이어 1") + " 승리!")
  }

  if (currentPlayer === BLACK) {
    remainingTime1 = remainingTime;
  } else {
    remainingTime2 = remainingTime;
  }
}


/*플레이어 간의 차례가 바뀔 때마다,
  현재 플레이어의 남은 시간을 리셋하고(startTimer 함수 호출 이후) 새롭게 시작하는 함수.
  플레이어의 남은 시간을 초기값인 TIMER_LIMIT으로 되돌리고,
  다시 startTimer 함수를 호출하여 해당 플레이어의 타이머를 시작
  이렇게 해서 다음 플레이어가 차례가 올 때마다 새로운 타이머가 시작되도록 구현*/ 
function resetTimer() {
  if (currentPlayer === BLACK) {//흑돌일때
    clearInterval(intervalId1);
    remainingTime1 = TIMER_LIMIT;//남은시간을 초기값(30초)로 초기화
  } else {
    clearInterval(intervalId2); //백돌일때
    remainingTime2 = TIMER_LIMIT;
  }
  startTimer();
}


const board = []; // 게임 보드(2차원 배열)를 초기화할 빈 배열 생성
// 게임 보드를 채우기 위해 루프를 사용 (이중 for문)
for (let i = 0; i < BOARD_SIZE; i++) {
  const row = []; // 각 행에 대한 빈 배열 생성
  for (let j = 0; j < BOARD_SIZE; j++) {
    row.push(0); // 각 셀의 초기값을 0으로 설정하여 각 행의 배열에 추가
  }
  board.push(row); // 완성된 행의 배열을 게임 보드에 추가
}


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

// 게임판의 셀을 클릭했을 때 동작하는 이벤트 처리 함수
function handleCellClick(row, col) {
  if (isValidMove(row, col)) {
    makeMove(row, col);/*게임판 상태 업데이트 (makeMove 함수 사용): 좌표가 유효한 경우, 현재 플레이어의 돌을 해당 좌표에 배치.
    board 2차원 배열이 갱신.*/
    const cell = document.querySelector(".board__row:nth-child(" + (row + 1) + ") .board__col:nth-child(" + (col + 1) + ") .col__grid");
    //게임판의 해당 셀에 플레이어의 돌을 그래픽적으로 표시. 
    if (currentPlayer === BLACK) {
      cell.classList.add("black");//이때 플레이어가 BLACK이면 셀에 'black' 클래스를 추가
    } else {
      cell.classList.add("white");//WHITE면 'white' 클래스를 추가하여 돌이 보이게 함.  
    }

    if (isGameOver()) {
      alert("Player " + (currentPlayer === BLACK ? "1" : "2") + " wins!");
      currentPlayer
    }/*현재 착수한 좌표를 기준으로 8 방향( ↗ ↙ ↖ ↘ → ← ↑ ↓)으로 오목이 되었는지 검사. 
      연속된 5개의 돌이 나타나면 게임이 종료되어 그 순간 돌을 놓은 플레이어의 승리로 판단
      승리했다면 경고창(alert으로).*/

    // if (isGameOver()) {
    //   clearInterval(intervalId1);
    //   clearInterval(intervalId2);
    //   alert(`Player ${currentPlayer === BLACK ? "1" : "2"} wins!`);
    // }
    currentPlayer = currentPlayer === BLACK ? WHITE : BLACK;
    document.getElementById("currentTurn").innerText = "Player " + (currentPlayer === BLACK ? "1" : "2") + "'s Turn";
    /*승리하지 않은 경우, 플레이어를 변경하고 현재 플레이어 차례를 화면에 업데이트
     플레이어가 BLACK이었다면 WHITE로 바꾸고, WHITE면 BLACK으로 변경.*/
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

      colGrid.addEventListener("click", function() {
        handleCellClick(i, j);//colGrid 요소에 클릭 이벤트 처리를 위한 핸들러를 추가. 
        //(i, j) 좌표를 전달하며 호출하여, 사용자가 어떤 셀을 클릭할 때 담당하는 행동을 결정
      });
      boardCol.appendChild(colGrid);//colGrid를 boardCol 요소에 추가하고(열과 셀을 연결),
      boardRow.appendChild(boardCol);//각 boardCol 요소를 이전에 생성된 boardRow(행)에 추가합니다.          
    }
    board.appendChild(boardRow);//이를 통해 오목판의 전체 격자 구조가 완성
  }
}


document.addEventListener("DOMContentLoaded", function() {
  createBoard();
  startTimer();
});

