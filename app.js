const $userInput = document.querySelector("#userInput");
const $submitBtn = document.querySelector("#submitBtn");
const $resetBtn = document.querySelector("#resetBtn");
const $prevNum = document.querySelector("#prevNum");
const $result = document.querySelector("#result");
const $attempts = document.querySelector("#attempts");

let secretNum = [];
let attemptsLeft = 10;

// 정답 생성 (중복 없는 4자리 숫자)
function makeRandomNum() {
  secretNum = [];
  while (secretNum.length < 4) {
    const rand = Math.floor(Math.random() * 10);
    if (!secretNum.includes(rand)) {
      secretNum.push(rand);
    }
  }
}

makeRandomNum();
console.log(secretNum); // 테스트용 정답 출력

// 스트라이크와 볼 계산 함수
function calculateResult(input) {
  let strike = 0;
  let ball = 0;
  const inputArr = input.split("").map(Number);

  inputArr.forEach((num, index) => {
    if (num === secretNum[index]) {
      strike++;
    } else if (secretNum.includes(num)) {
      ball++;
    }
  });
  return { strike, ball };
}

// 게임 초기화 함수
function resetGame() {
  attemptsLeft = 10;
  makeRandomNum();
  $userInput.value = "";
  $prevNum.innerHTML = "";
  $result.textContent = "";
  $attempts.textContent = `남은 기회 : ${attemptsLeft}`;
  $submitBtn.style.display = "inline-block";
  $resetBtn.style.display = "none";
  $userInput.disabled = false;
  console.log(secretNum); // 테스트용 정답 출력
}

// 제출 함수
function submitInput() {
  if (attemptsLeft <= 0) {
    $result.textContent = "기회를 모두 사용하셨습니다. 게임이 종료됩니다.";
    return;
  }

  const userInput = $userInput.value;

  if (userInput.length !== 4 || isNaN(userInput)) {
    $result.textContent = "숫자 4자리를 입력해주세요 😢";
    return;
  }

  const { strike, ball } = calculateResult(userInput);

  attemptsLeft--;
  $attempts.textContent = `남은 기회 : ${attemptsLeft}`;

  if (strike === 4) {
    $result.textContent = "정답을 맞추셨습니다. 축하드립니다 🥳";
    $submitBtn.style.display = "none";
    $resetBtn.style.display = "inline-block";
    $userInput.disabled = true;
  } else if (attemptsLeft > 0) {
    $prevNum.innerHTML += `<p>${userInput} - Strike: ${strike}, Ball: ${ball}</p>`;
    $result.textContent = "아쉽지만 다시 시도해보세요!";
  } else {
    $result.textContent = `기회를 모두 사용했습니다. 정답은 ${secretNum.join("")}였습니다. 😢`;
    $submitBtn.style.display = "none";
    $resetBtn.style.display = "inline-block";
    $userInput.disabled = true;
  }

  $userInput.value = ""; // 입력 필드 초기화
}

// 이벤트 리스너
$submitBtn.addEventListener("click", submitInput);
$userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    submitInput();
  }
});
$resetBtn.addEventListener("click", resetGame);

// 초기 기회 표시
$attempts.textContent = `남은 기회 : ${attemptsLeft}`;