// Инициализация переменных
let prizes = ["2", "1", "0", "0", "0", "0"];
let attempts = 0;
const maxAttempts = 2;
let gameCount = 0;
const maxGames = 3;
let score = 0;
let timerInterval;
const initialTime = 30;

// Функция для загрузки счета из LocalStorage
function loadScore() {
    let savedScore = localStorage.getItem('userScore');
    if (savedScore !== null) {
        score = parseInt(savedScore);
    }
    document.getElementById('score').textContent = `Score: ${score}`;
}

// Функция для сохранения счета в LocalStorage
function saveScore() {
    localStorage.setItem('userScore', score);
}

// Функция для перемешивания призов
function shufflePrizes() {
    prizes.sort(() => Math.random() - 0.5);
}

// Функция для сброса игры
function resetGame() {
    attempts = 0;
    shufflePrizes();
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
        circle.className = 'circle';
        circle.textContent = '';
        circle.style.transform = "scale(1)";
    });
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('gameScreen').classList.remove('inactive');
}

// Функция для обработки нажатия на кружочек
function revealPrize(element, index) {
    if (attempts < maxAttempts && !element.classList.contains('clicked')) {
        attempts++;
        element.classList.add('clicked');
        element.textContent = prizes[index];
        element.style.transform = "scale(1.25)";

        if (prizes[index] === "0") {
            element.classList.add('incorrect');
        } else {
            element.classList.add('correct');
            score += parseInt(prizes[index]);
            document.getElementById('score').textContent = `Score: ${score}`;
            saveScore(); // Сохранить счет после обновления
        }

        if (attempts === maxAttempts) {
            setTimeout(revealAllPrizes, 2000);
            gameCount++;

            if (gameCount < maxGames) {
                setTimeout(resetGame, 3000);
            } else {
                setTimeout(() => {
                    resetGame();
                    startTimer();
                }, 3000);
            }
        }
    }
}

// Функция для показа всех оставшихся кружочков
function revealAllPrizes() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, i) => {
        if (!circle.classList.contains('clicked')) {
            circle.classList.add('reveal');
            circle.textContent = prizes[i];
        }
    });
}

// Функция для запуска таймера
function startTimer() {
    let timeLeft = initialTime;
    document.getElementById('timer').textContent = timeLeft;
    document.getElementById('gameScreen').classList.add('inactive');
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            resetGame();
        }
    }, 1000);
}

// Загрузка начального счета и запуск первой игры
loadScore();
shufflePrizes();
resetGame();
startTimer();
