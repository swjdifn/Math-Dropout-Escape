let currentLevel = "";
let currentGrade = 1;
let score = 0;
let totalQuestions = 0;
let isLimitedMode = true;
const maxQuestions = 20;

const correctMessages = [
    "정답이야! 잘했어!",
    "멋져! 맞았어!",
    "좋아, 정답이야!",
    "대단해! 완벽해!",
    "정답! 계속 잘하고 있어!",
    "맞았어! 최고야!",
    "정답이야! 계속 힘내!"
];

// 게임 시작
function startGame(level, grade) {
    currentLevel = level;
    currentGrade = grade;
    score = 0;
    totalQuestions = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("total").innerText = totalQuestions;
    document.getElementById("feedback").innerText = "";
    document.getElementById("quizArea").style.display = "block";
    generateQuestion();

    // 엔터키 이벤트 리스너 추가
    document.getElementById("answerInput").addEventListener("keypress", function(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            submitAnswer();
        }
    });
}

// 문제 생성
function generateQuestion() {
    if (isLimitedMode && totalQuestions >= maxQuestions) {
        endGame();
        return;
    }

    let question = "";
    let answer;
    let submitButton = document.getElementById("submitButton");
    let modeButton = document.getElementById("modeButton");

    if (currentLevel === "elementary") {
        if (currentGrade === 1) {
            let total = Math.floor(Math.random() * 10) + 5;
            let num1 = Math.floor(Math.random() * (total - 1)) + 1;
            let num2 = total - num1;
            question = `${total} = ${num1} + ?`;
            answer = num2;
        } else if (currentGrade === 2) {
            let num1 = Math.floor(Math.random() * 20) + 10;
            let num2 = Math.floor(Math.random() * 10) + 1;
            question = `${num1} + ${num2} = ?`;
            answer = num1 + num2;
        } else if (currentGrade === 3) {
            let num1 = (Math.floor(Math.random() * 9) + 1) * 100;
            let num2 = (Math.floor(Math.random() * 9) + 1) * 100;
            question = `${num1} + ${num2} = ?`;
            answer = num1 + num2;
        } else if (currentGrade === 4) {
            let num1 = Math.floor(Math.random() * 90) + 10;
            let num2 = (Math.floor(Math.random() * 9) + 1) * 100;
            question = `${num1} × ${num2} = ?`;
            answer = num1 * num2;
        } else if (currentGrade === 5) {
            let num1 = Math.floor(Math.random() * 50) + 10;
            let num2 = Math.floor(Math.random() * 50) + 10;
            let num3 = Math.floor(Math.random() * 30) + 10;
            let num4 = Math.floor(Math.random() * 30) + 10;
            question = `${num1} + ${num2} - ${num3} + ${num4} = ?`;
            answer = num1 + num2 - num3 + num4;
        } else if (currentGrade === 6) {
            let whole = 1;
            let num = Math.floor(Math.random() * 13) + 1;
            let denom = 14;
            let divisor = Math.floor(Math.random() * 5) + 2;
            let mixedFraction = `${whole} ${num}/${denom}`;
            question = `${mixedFraction} ÷ ${divisor} = ?`;

            let improperNum = whole * denom + num;
            let resultNum = improperNum;
            let resultDenom = denom * divisor;
            let gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
            let divisorGcd = gcd(resultNum, resultDenom);
            resultNum /= divisorGcd;
            resultDenom /= divisorGcd;
            answer = `${resultNum}/${resultDenom}`;
        }
        // 초등 과정에서는 버튼 활성화
        submitButton.disabled = false;
        modeButton.disabled = false;
    } else {
        // 중고 과정에서는 버튼 비활성화
        question = "아직 준비 중이에요!";
        answer = "";
        submitButton.disabled = true;
        modeButton.disabled = true;
        document.getElementById("feedback").innerText = "이 학년은 준비 중이라 제출과 모드 변경이 불가능해요.";
    }

    document.getElementById("question").innerText = question;
    document.getElementById("answerInput").value = "";
    window.correctAnswer = answer;
}

// 답 제출
function submitAnswer() {
    let userAnswer = document.getElementById("answerInput").value;
    totalQuestions++;
    document.getElementById("total").innerText = totalQuestions;

    if (userAnswer == window.correctAnswer) {
        score++;
        document.getElementById("score").innerText = score;
        let randomMessage = correctMessages[Math.floor(Math.random() * correctMessages.length)];
        document.getElementById("feedback").innerText = randomMessage;
    } else {
        document.getElementById("feedback").innerText = `틀렸어... 정답은 ${window.correctAnswer}야.`;
    }

    setTimeout(generateQuestion, 50);
}

// 모드 전환
function switchMode() {
    isLimitedMode = !isLimitedMode;
    document.getElementById("modeDisplay").innerText = isLimitedMode ? "20문항" : "무한";
}

// 게임 종료
function endGame() {
    document.getElementById("question").innerText = "게임 끝!";
    document.getElementById("answerInput").style.display = "none";
    document.getElementById("buttons").style.display = "none";
    document.getElementById("feedback").innerText = `최종 점수: ${score}/${maxQuestions}`;
}