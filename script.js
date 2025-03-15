let currentLevel = "";
let currentGrade = 1;
let score = 0;
let totalQuestions = 0;
let consecutiveCorrect = 0;

const correctMessages = [
    "정답이야! 잘했어!",
    "멋져! 맞았어!",
    "좋아, 정답이야!",
    "대단해! 완벽해!",
    "정답! 계속 잘하고 있어!",
    "맞았어! 최고야!",
    "정답이야! 계속 힘내!"
];

function startGame(level, grade) {
    currentLevel = level;
    currentGrade = grade;
    score = 0;
    totalQuestions = 0;
    consecutiveCorrect = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("total").innerText = totalQuestions;
    document.getElementById("feedback").innerText = "";
    document.getElementById("quizArea").style.display = "block";
    generateQuestion();

    document.getElementById("answerInput").addEventListener("keypress", function(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            submitAnswer();
        }
    });
}

function generateQuestion() {
    let question = "";
    let answer;
    let submitButton = document.getElementById("submitButton");

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
            let num1 = Math.floor(Math.random() * 900) + 100;
            let num2 = Math.floor(Math.random() * 900) + 100;
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
        submitButton.disabled = false;
    } else {
        question = "아직 준비 중이에요!";
        answer = "";
        submitButton.disabled = true;
        document.getElementById("feedback").innerText = "이 학년은 준비 중이라 제출이 불가능해요.";
    }

    document.getElementById("question").innerText = question;
    document.getElementById("answerInput").value = "";
    window.correctAnswer = answer;
}

function submitAnswer() {
    let userAnswer = document.getElementById("answerInput").value;
    totalQuestions++;
    document.getElementById("total").innerText = totalQuestions;

    if (userAnswer == window.correctAnswer) {
        score++;
        document.getElementById("score").innerText = score;
        let randomMessage = correctMessages[Math.floor(Math.random() * correctMessages.length)];
        
        if (currentGrade <= 2 && consecutiveCorrect >= 4) {
            randomMessage += " 다음 단계를 도전해볼까?";
            consecutiveCorrect = 0;
        } else {
            consecutiveCorrect++;
        }
        document.getElementById("feedback").innerText = randomMessage;
        setTimeout(generateQuestion, 1000);
    } else {
        let feedback = `틀렸어... 정답은 ${window.correctAnswer}야. `;
        if (currentGrade >= 4 && currentGrade <= 6) {
            feedback += getHint();
        }
        document.getElementById("feedback").innerText = feedback;
        setTimeout(generateQuestion, 2000);
    }
}

function getHint() {
    if (currentGrade === 4) {
        return "힌트: 두 숫자를 한 줄씩 곱한 뒤 더해보세요.";
    } else if (currentGrade === 5) {
        return "힌트: 괄호를 사용해 순서를 정하고 계산하세요.";
    } else if (currentGrade === 6) {
        return "힌트: 분수를 통분한 뒤 나눠보세요.";
    }
    return "";
}