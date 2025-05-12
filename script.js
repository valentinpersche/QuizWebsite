let currentQuestion = 0;
let answerGiven = false;
let correctAnswersCount = 0;
let AUDIO_RIGHT = new Audio("./assets/audio/right.mp3");
let AUDIO_WRONG = new Audio("./assets/audio/wrong.mp3");

function init() {
  document.getElementById("total-questions-number").innerHTML =questions.length;
  updateProgressBar();
  showQuestion();
}

function showQuestion() {
  if (currentQuestion == questions.length) {
    showQuizResults();
  } else {
    showQuestionAndAnswers();
  }
}

function showQuestionAndAnswers() {
  let question = questions[currentQuestion];
  document.getElementById("question-text").innerHTML = question.question;
  document.getElementById("answer-1").innerHTML = question.answer1;
  document.getElementById("answer-2").innerHTML = question.answer2;
  document.getElementById("answer-3").innerHTML = question.answer3;
  document.getElementById("answer-4").innerHTML = question.answer4;
}

function nextQuestion() {
  currentQuestion++;
  answerGiven = false;
  showQuestion();
  questionCounter();
  updateProgressBar();
  resetColors();
  editNextButton();
  document.getElementById("next-button").disabled = true;
}

function questionCounter() {
  document.getElementById("current-question-number").innerHTML =
    currentQuestion + 1;
}

function checkAnswer(answerIndex) {
  if (answerGiven === true) return;
  
  let rightAnswer = questions[currentQuestion].correctAnswer;
  let answerCard = document.getElementById(`answer-${answerIndex}`).parentElement;
  let rightAnswerCard = document.getElementById(`answer-${rightAnswer}`).parentElement;

  if (answerIndex == rightAnswer) {
    handleRightAnswer(answerCard, rightAnswerCard);
  } else {
    handleWrongAnswer(answerCard, rightAnswerCard);
  }

  document.getElementById("next-button").disabled = false;
  answerGiven = true;
}

function handleRightAnswer(rightAnswerCard) {
  rightAnswerCard.style.backgroundColor = "#00ff2d7d";
  correctAnswersCount++;
  AUDIO_RIGHT.play();
}

function handleWrongAnswer(answerCard, rightAnswerCard) {
  answerCard.style.backgroundColor = "#ff00007d";
  rightAnswerCard.style.backgroundColor = "#00ff2d7d";
  AUDIO_WRONG.play();
}

function resetColors() {
  for (let i = 1; i <= 4; i++) {
    let cardElement = document.getElementById(`answer-${i}`).parentElement;
    cardElement.style.backgroundColor = "";
  }
}

function editNextButton() {
  if (currentQuestion == questions.length - 1) {
    document.getElementById("next-button").innerHTML = "Quiz beenden";
  }
}

function showQuizResults() {
  document.getElementById("quiz-active").style.display = "none";
  document.getElementById("quiz-finished").style.display = "block";
  document.getElementById("quiz-image").src = "./assets/img/well-done.png";
  document.getElementById("quiz-image").style.filter = "hue-rotate(140deg)";
  updateCorrectAnswers();
}

function updateProgressBar() {
  let progress = ((currentQuestion + 1) / questions.length) * 100;
  let progressBar = document.getElementById("progress-bar");
  let progressContainer = progressBar.parentElement;
  progressBar.style.width = `${progress}%`;
  progressContainer.setAttribute("aria-valuenow", progress);
}

function updateCorrectAnswers() {
  let correctAnswers = document.getElementById("correct-answers");
  let totalQuestions = document.getElementById("total-questions");
  correctAnswers.innerHTML = correctAnswersCount;
  totalQuestions.innerHTML = questions.length;
}
