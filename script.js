const apiUrl = 'https://opentdb.com/api.php?amount=50&category=9&difficulty=medium&type=multiple'; // Adjust 'amount' for the number of questions
let currentQuestionIndex = 0;
let score = 0;

async function fetchQuizQuestions() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        return null;
    }
}

function displayQuestion(question) {
    const questionElement = document.querySelector('.question');
    questionElement.innerHTML = question.question;

    const optionsElement = document.querySelector('.options');
    optionsElement.innerHTML = '';

    const allOptions = question.incorrect_answers.concat(question.correct_answer);
    allOptions.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => {
            checkAnswer(option, question.correct_answer);
        });
        optionsElement.appendChild(optionElement);
    });
}

function checkAnswer(selectedOption, correctOption) {
    if (selectedOption === correctOption) {
        score++;
        updateScore();
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion(quizQuestions[currentQuestionIndex]);
    } else {
        endQuiz();
    }
}

function updateScore() {
    const scoreElement = document.querySelector('.score');
    scoreElement.textContent = `Score: ${score}`;
}

function endQuiz() {
    alert(`Quiz ended! Your score: ${score}`);
    // Additional logic to handle end of quiz
}

let quizQuestions = [];

fetchQuizQuestions().then(questions => {
    if (questions) {
        quizQuestions = questions;
        displayQuestion(quizQuestions[currentQuestionIndex]);
    }
});