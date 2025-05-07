let currentQuestion = 0;
let answerGiven = false;

function init() {
  document.getElementById("question-number").innerHTML = questions.length;
  showQuestion();
}

function showQuestion() {
  let question = questions[currentQuestion];
  answerGiven = false;

  document.getElementById("question-text").innerHTML = question.question;
  document.getElementById("answer-1").innerHTML = question.answer1;
  document.getElementById("answer-2").innerHTML = question.answer2;
  document.getElementById("answer-3").innerHTML = question.answer3;
  document.getElementById("answer-4").innerHTML = question.answer4;
}

function nextQuestion() {
  currentQuestion++;
  showQuestion();
  showCurrentQuestion();
  resetColors();
}

function showCurrentQuestion() {
  document.getElementById("current-question").innerHTML = currentQuestion + 1;
}

function checkAnswer(answerIndex) {
  if (answerGiven === true) return;
  
  let question = questions[currentQuestion];
  let answer = document.getElementById(`answer-${answerIndex}`);
  let answerElement = answer.parentElement;
  let rightAnswer = question.correctAnswer;
  let rightAnswerElement = document.getElementById(`answer-${rightAnswer}`).parentElement;

  if (answerIndex == rightAnswer) {
    answerElement.style.backgroundColor = "#00ff2d7d";
  } else {
    answerElement.style.backgroundColor = "#ff00007d";
    rightAnswerElement.style.backgroundColor = "#00ff2d7d";
  }

  answerGiven = true;
}

function resetColors() {
  for (let i = 1; i <= 4; i++) {
    let cardElement = document.getElementById(`answer-${i}`).parentElement;
    cardElement.style.backgroundColor = "";
  }
}