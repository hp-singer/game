let prizes = ["2", "1", "0", "0", "0", "0"];
let attempts = 0;
const maxAttempts = 2;
let gameCount = 0;
const maxGames = 3;
let score = 0;
let timerInterval;
const initialTime = 15;

// Функция загрузки счета из LocalStorage
function loadScore() {
    let savedScore = localStorage.getItem('userScore');
    if (savedScore !== null) {
        score = parseInt(savedScore, 10);
    }
    document.getElementById('score').textContent = `Score: ${score}`;
}

// Функция сохранения счета в LocalStorage
function saveScore() {
    localStorage.setItem('userScore', score);
}

// Функция перемешивания призов
function shufflePrizes() {
    prizes.sort(() => Math.random() - 0.5);
}

// Функция сброса игры
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

// Функция обработки клика по кружочку
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
            score += parseInt(prizes[index], 10);
            document.getElementById('score').textContent = `Score: ${score}`;
            saveScore();
        }

        if (attempts === maxAttempts) {
            setTimeout(() => {
                revealAllPrizes(); // Показываем все призы
                gameCount++;

                if (gameCount < maxGames) {
                    setTimeout(resetGame, 1000); // Если игр меньше трех, сбрасываем игру
                } else {
                    setTimeout(() => {
                        resetGame();
                        startTimer(); // Запуск таймера после третьей игры
                    }, 1000);
                }
            }, 1000);
        }
    }
}

// Функция показа всех оставшихся кружочков
function revealAllPrizes() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, i) => {
        if (!circle.classList.contains('clicked')) {
            circle.classList.add('reveal');
            circle.textContent = prizes[i];
        }
    });
}

// Функция запуска таймера
function startTimer() {
    let timeLeft = initialTime;
    document.getElementById('timer').textContent = timeLeft;

    // Отключаем игровую область на время таймера
    document.getElementById('gameScreen').classList.add('inactive');

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            gameCount = 0; // Сброс количества игр
            resetGame(); // Подготовка к новой игре
        }
    }, 1000);
}

// Функция инициализации игры
function runGame() {
    loadScore();
    shufflePrizes();
    resetGame();
}

// Запуск игры
runGame();
