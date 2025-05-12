let currentQuestion = 0;
let answerGiven = false;
let correctAnswersCount = 0;

function init() {
  document.getElementById("total-questions-number").innerHTML = questions.length;
  updateProgressBar();
  showQuestion();
}

function showQuestion() {
  let question = questions[currentQuestion];
  answerGiven = false;

  if (currentQuestion == questions.length - 1) {
    document.getElementById("next-button").innerHTML = "Quiz beenden";
  }

  if (currentQuestion == questions.length) {
    finishQuiz();
  } else {
    document.getElementById("question-text").innerHTML = question.question;
    document.getElementById("answer-1").innerHTML = question.answer1;
    document.getElementById("answer-2").innerHTML = question.answer2;
    document.getElementById("answer-3").innerHTML = question.answer3;
    document.getElementById("answer-4").innerHTML = question.answer4;
  }
}

function nextQuestion() {
  currentQuestion++;
  showQuestion();
  showCurrentQuestion();
  updateProgressBar();
  resetColors();

  document.getElementById("next-button").disabled = true;
}

function showCurrentQuestion() {
  document.getElementById("current-question-number").innerHTML =
    currentQuestion + 1;
}

function checkAnswer(answerIndex) {
  if (answerGiven === true) return;

  let question = questions[currentQuestion];
  let answer = document.getElementById(`answer-${answerIndex}`);
  let answerElement = answer.parentElement;
  let rightAnswer = question.correctAnswer;
  let rightAnswerElement = document.getElementById(
    `answer-${rightAnswer}`
  ).parentElement;

  if (answerIndex == rightAnswer) {
    answerElement.style.backgroundColor = "#00ff2d7d";
    correctAnswersCount++;
  } else {
    answerElement.style.backgroundColor = "#ff00007d";
    rightAnswerElement.style.backgroundColor = "#00ff2d7d";
  }

  document.getElementById("next-button").disabled = false;
  answerGiven = true;
}

function resetColors() {
  for (let i = 1; i <= 4; i++) {
    let cardElement = document.getElementById(`answer-${i}`).parentElement;
    cardElement.style.backgroundColor = "";
  }
}

function finishQuiz() {
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
