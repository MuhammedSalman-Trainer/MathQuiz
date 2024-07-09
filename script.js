 // Constants
const OPERATORS = ['+', '-', '*', '/'];
const MAX_DIGITS_ADD_SUB = 3;
const TIME_LIMIT_PER_QUESTION = 10; // 10 seconds per question
const GAME_TIME_LIMIT = 120; // 120 seconds = 2 minutes

// DOM Elements
const welcomeDiv = document.getElementById('welcome');
const startButton = document.getElementById('startButton');
const quizDiv = document.getElementById('quiz');
const problemText = document.getElementById('problem');
const answerInput = document.getElementById('answerInput');
const questionTimerDisplay = document.getElementById('questionTimer');
const overallTimerDisplay = document.getElementById('overallTimer');
const scoreboardDiv = document.getElementById('scoreboard');
const scoreDisplay = document.getElementById('score');

let overallTimer; // Overall timer variable
let questionTimer; // Timer variable for each question
let score = 0; // Initialize score
let questionTimeLeft = 0; // Time left for current question
let overallTimeLeft = 0; // Time left for overall game

// Function to start the game
function startGame() {
  welcomeDiv.style.display = 'none'; // Hide welcome message
  quizDiv.style.display = 'block'; // Show quiz section
  scoreboardDiv.style.display = 'none'; // Hide scoreboard
  score = 0; // Reset score
  overallTimeLeft = GAME_TIME_LIMIT; // Reset overall time left
  updateOverallTimerDisplay(); // Update overall timer display
  generateProblem(); // Start generating problems
  answerInput.addEventListener('input', checkAnswer); // Listen to answer input
  questionTimer = setInterval(updateQuestionTimer, 1000); // Start the question timer
  overallTimer = setInterval(updateOverallTimer, 1000); // Start the overall game timer
}

// Function to generate and display a new problem
function generateProblem() {
  answerInput.value = '';
  let num1, num2, operator;
  operator = OPERATORS[Math.floor(Math.random() * OPERATORS.length)];
  if(operator ==='+' || operator==='-'){
    num1 = Math.floor(Math.random() * Math.pow(10, MAX_DIGITS_ADD_SUB));
    num2 = Math.floor(Math.random() * Math.pow(10, MAX_DIGITS_ADD_SUB));
    if (num1 < num2) {
      [num1, num2] = [num2, num1]; // Ensure num1 is always greater for subtraction
    }
  }
  if(operator==='*'){
    num1=Math.floor(Math.random() * Math.pow(10, 2))
    num2=Math.floor(Math.random() * Math.pow(10, 1))+2
  }
  if(operator==='/'){
    num1=Math.floor(Math.random() * Math.pow(10, 2))
    num2=Math.floor(Math.random() * Math.pow(10, 1))+2
    num1=num1*num2
  }

  problemText.textContent = `${num1} ${operator} ${num2}`;

  // Reset timer for the current question
  questionTimeLeft = TIME_LIMIT_PER_QUESTION;
  updateQuestionTimerDisplay();
}

// Function to update the timer for the current question
function updateQuestionTimer() {
  questionTimeLeft--;
  if (questionTimeLeft <= 0) {
    generateProblem(); // Time's up, move to next question
  }
  updateQuestionTimerDisplay();
}

// Function to update the timer display for the current question
function updateQuestionTimerDisplay() {
  questionTimerDisplay.textContent = `Time left for question: ${questionTimeLeft} seconds`;
}

// Function to update the overall game timer
function updateOverallTimer() {
  overallTimeLeft--;
  if (overallTimeLeft <= 0) {
    endGame(); // Game over, end the game
  }   
  updateOverallTimerDisplay();
}

// Function to update the overall game timer display
function updateOverallTimerDisplay() {
  overallTimerDisplay.textContent = `Overall time left: ${overallTimeLeft} seconds`;
}

// Function to check the answer
function checkAnswer() {
  const answer = parseInt(answerInput.value);
  const problem = problemText.textContent;
  const [num1, operator, num2] = problem.split(' ');

  // Evaluate the correct answer
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

  // Check if the answer is correct
  if (answer === correctAnswer) {
    score++;
    scoreDisplay.textContent = score;
    generateProblem(); // Move to next question
  }
}

// Function to end the game
function endGame() {
  clearInterval(questionTimer);
  clearInterval(overallTimer);
  quizDiv.style.display = 'none';
  scoreboardDiv.style.display = 'block';
  scoreDisplay.textContent = score;
}

// Event listener for start button
startButton.addEventListener('click', startGame);
