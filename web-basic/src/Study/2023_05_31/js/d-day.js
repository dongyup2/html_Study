var now = new Date();
var firstDay = new Date("2023-03-08"); // 처음 만난 날

var toNow = now.getTime(); // 오늘의 시간을 밀리초로 변환
var toFirst = firstDay.getTime(); // 처음 만난 날 시간을 밀리초로 변환

var passedTime = toNow - toFirst; // 처음 만난 날과 오늘 사이의 차이를 밀리초로 표현

var passedDay = Math.round(passedTime / (24 * 60 * 60 *1000)); // 밀리초를 일로 변환 후 반올림
document.querySelector("#accent").innerText = passedDay + "일";

function calcDate(days) {
  var future = toFirst + days * (24 * 60 * 60 * 1000);
  var someday = new Date(future);
  var year = someday.getFullYear( );
  var month = someday.getMonth( ) + 1;
  var date = someday.getDate( );
  document.querySelector("#date"+days).innerText = year + "년 " + month + "월 " + date + "일 ";
}

// document.querySelector("#date100").innerText = calcDate(100); // 100일 기념일 계산 및 남은 일수 추가
// document.querySelector("#date200").innerText = calcDate(200); // 200일 기념일 계산 및 남은 일수 추가
// document.querySelector("#date365").innerText = calcDate(365); // 1년 기념일 계산 및 남은 일수 추가
// document.querySelector("#date500").innerText = calcDate(500); // 500일념일 계산 및 남은 일수 추가
