const OPERATORS = ['+', '-', '*', '/'];
const MAX_DIGITS_ADD_SUB = 3;
const TIME_LIMIT_PER_QUESTION = 10;
const GAME_TIME_LIMIT = 120;

const welcomeDiv = document.getElementById('welcome');
const startButton = document.getElementById('startButton');
const quizDiv = document.getElementById('quiz');
const problemText = document.getElementById('problem');
const answerInput = document.getElementById('answerInput');
const questionTimerDisplay = document.getElementById('questionTimer');
const overallTimerDisplay = document.getElementById('overallTimer');
const scoreboardDiv = document.getElementById('scoreboard');
const finalScoreDisplay = document.getElementById('finalScore');
const currentScoreDisplay = document.getElementById('currentScore');

let overallTimer;
let questionTimer;
let score = 0;
let questionTimeLeft = 0;
let overallTimeLeft = 0;

function startGame() {
  welcomeDiv.style.display = 'none';
  quizDiv.style.display = 'block';
  scoreboardDiv.style.display = 'none';
  overallTimeLeft = GAME_TIME_LIMIT;
  updateOverallTimerDisplay();
  updateCurrentScoreDisplay(); // Initialize score display
  generateProblem();
  answerInput.addEventListener('input', checkAnswer);
  questionTimer = setInterval(updateQuestionTimer, 1000);
  overallTimer = setInterval(updateOverallTimer, 1000);
}

function generateProblem() {
  answerInput.value = '';
  let num1, num2, operator;
  operator = OPERATORS[Math.floor(Math.random() * OPERATORS.length)];
  if (operator === '+' || operator === '-') {
    num1 = Math.floor(Math.random() * Math.pow(10, MAX_DIGITS_ADD_SUB));
    num2 = Math.floor(Math.random() * Math.pow(10, MAX_DIGITS_ADD_SUB));
    if (num1 < num2) {
      [num1, num2] = [num2, num1]; // Ensure num1 is always greater for subtraction
    }
  }
  if (operator === '*') {
    num1 = Math.floor(Math.random() * Math.pow(10, 2));
    num2 = Math.floor(Math.random() * Math.pow(10, 1)) + 2;
  }
  if (operator === '/') {
    num1 = Math.floor(Math.random() * Math.pow(10, 2));
    num2 = Math.floor(Math.random() * Math.pow(10, 1)) + 2;
    num1 = num1 * num2;
  }

  problemText.textContent = `${num1} ${operator} ${num2}`;

  questionTimeLeft = TIME_LIMIT_PER_QUESTION;
  updateQuestionTimerDisplay();
}

function updateQuestionTimer() {
  questionTimeLeft--;
  if (questionTimeLeft <= 0) {
    generateProblem();
  }
  updateQuestionTimerDisplay();
}

function updateQuestionTimerDisplay() {
  questionTimerDisplay.textContent = `Time left for question: ${questionTimeLeft} seconds`;
}

function updateOverallTimer() {
  overallTimeLeft--;
  if (overallTimeLeft <= 0) {
    endGame();
  }
  updateOverallTimerDisplay();
}

function updateOverallTimerDisplay() {
  overallTimerDisplay.textContent = `Overall time left: ${overallTimeLeft} seconds`;
}

function updateCurrentScoreDisplay() {
  currentScoreDisplay.textContent = score;
}

function checkAnswer() {
  const answer = parseInt(answerInput.value);
  const problem = problemText.textContent;
  const [num1, operator, num2] = problem.split(' ');

  let correctAnswer;
  switch (operator) {
    case '+':
      correctAnswer = parseInt(num1) + parseInt(num2);
      break;
    case '-':
      correctAnswer = parseInt(num1) - parseInt(num2);
      break;
    case '*':
      correctAnswer = parseInt(num1) * parseInt(num2);
      break;
    case '/':
      correctAnswer = Math.floor(parseInt(num1) / parseInt(num2));
      break;
  }

  if (answer === correctAnswer) {
    score++;
    updateCurrentScoreDisplay(); // Update the score display
    generateProblem();
  }
}

function endGame() {
  clearInterval(questionTimer);
  clearInterval(overallTimer);
  quizDiv.style.display = 'none';
  scoreboardDiv.style.display = 'block';
  finalScoreDisplay.textContent = score;
}

startButton.addEventListener('click', startGame);
