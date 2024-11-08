// script.js
let score = 0;
let currentQuestionIndex = 0;
let timer;
let timeLeft = 15;
let interval;

// Perguntas do jogo
const questions = [
    {
        question: "Qual é a capital da França?",
        options: {
            a: "Paris",
            b: "Londres",
            c: "Roma",
            d: "Berlim"
        },
        correctAnswer: 'a'
    },
    {
        question: "Qual é o maior planeta do sistema solar?",
        options: {
            a: "Terra",
            b: "Júpiter",
            c: "Marte",
            d: "Saturno"
        },
        correctAnswer: 'b'
    },
    {
        question: "Quem pintou a Mona Lisa?",
        options: {
            a: "Vincent van Gogh",
            b: "Pablo Picasso",
            c: "Leonardo da Vinci",
            d: "Claude Monet"
        },
        correctAnswer: 'c'
    }
];

// Função para carregar uma pergunta
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;

    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach((button, index) => {
        const optionKey = Object.keys(question.options)[index];
        button.innerText = question.options[optionKey];
        button.setAttribute('data-answer', optionKey);
    });

    // Reiniciar o tempo para a pergunta
    timeLeft = 15;
    document.getElementById('time-left').innerText = timeLeft;
    startTimer();
}

// Iniciar o cronômetro
function startTimer() {
    clearInterval(interval);
    interval = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(interval);
            showResult('Errado! Tempo esgotado');
            setTimeout(nextQuestion, 1000);
        }
    }, 1000);
}

// Verificar a resposta
function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    clearInterval(interval); // Parar o cronômetro quando o usuário clicar

    const resultContainer = document.getElementById('result-container');
    if (selectedOption === currentQuestion.correctAnswer) {
        resultContainer.innerText = "Correto!";
        resultContainer.className = 'correct';
        score++;
    } else {
        resultContainer.innerText = "Errado!";
        resultContainer.className = 'wrong';
    }
    document.getElementById('score').innerText = `Pontos: ${score}`;
    setTimeout(nextQuestion, 1000);
}

// Passar para a próxima pergunta
function nextQuestion() {
    currentQuestionIndex++;
    const resultContainer = document.getElementById('result-container');
    resultContainer.className = '';
    resultContainer.innerText = '';

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

// Finalizar o jogo
function endGame() {
    clearInterval(interval);
    document.getElementById('final-result').classList.remove('hidden');
    document.getElementById('final-score-value').innerText = score;

    let message = '';
    if (score === questions.length) {
        message = 'Excelente! Você acertou todas!';
    } else if (score > questions.length / 2) {
        message = 'Bom trabalho! Você acertou a maioria.';
    } else {
        message = 'Precisa melhorar, mas continue tentando!';
    }
    document.getElementById('final-message').innerText = message;
}

// Reiniciar o jogo
function restartGame() {
    score = 0;
    currentQuestionIndex = 0;
    document.getElementById('final-result').classList.add('hidden');
    loadQuestion();
    document.getElementById('score').innerText = `Pontos: ${score}`;
}

// Inicializar o jogo
window.onload = loadQuestion;
