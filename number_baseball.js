// 인풋 받기 위한 모듈 가져오기
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 서로 다른 3개의 랜덤한 숫자를 배열로 리턴하는 함수
const selectIndex = (totalIndex, selectingNumber) => {
  let randomIndexArray = [];
  for (i = 0; i < selectingNumber; i++) {
    randomNum = Math.floor(Math.random() * totalIndex);

    // randomIndexArray에 중복되지 않는 인덱스 추가
    if (randomIndexArray.indexOf(randomNum) === -1) {
      randomIndexArray.push(randomNum);
    } else {
      i--; // 중복된 인덱스가 선택되었을 경우, 다시 한 번 무작위 인덱스 선택
    }
  }
  return randomIndexArray;
};

// 볼, 스트라이크 변수 정의
let ball = 0; // 볼 개수
let strike = 0; // 스트라이크 개수
let count = 0; // 시도 횟수
const mapfn = (arg) => Number(arg); // 문자열 -> 숫자 변환

// 숫자 3개 무작위로 뽑기
let nums = selectIndex(9, 3);

console.log("컴퓨터가 숫자를 생성하였습니다. 답을 맞춰보세요!");

let N; // 입력값을 저장할 변수
rl.on("line", function (line) {
  // 입력받은 값이 3자리인 경우
  if (line.length === 3) {
    console.log("입력 받았음");
    ++count; // 카운트 증가
    console.log(`${count}번째 시도: ${line}`);
    N = line.split("").map(mapfn); // 입력받은 수를 배열로 변환

    //인덱스와 값을 비교해서 B와 S를 계산한다.
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] === N[i]) {
        strike++;
      } else if (nums.includes(N[i])) {
        ball++;
      }
    }
    console.log(`${ball}B${strike}S`);
    // 스트라이크가 3일 경우 close() 함수를 실행한다.
    if (strike === 3) {
      rl.close();
    } else {
      // 초기화
      ball = 0;
      strike = 0;
    }
    // 입력받은 값이 3자리가 아닌 경우
  } else {
    console.log("3개의 숫자를 입력하세요");
  }
});

rl.on("close", function () {
  // 결과 출력
  console.log(`${count}번만에 맞히셨습니다.\n게임을 종료합니다.`);
});
