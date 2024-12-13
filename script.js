// Importante: Attendi che il DOM sia completamente caricato
window.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("promise");
  const proceedLink = document.querySelector(".proceed-button a");

  // Gestione checkbox per abilitare il link
  proceedLink.addEventListener("click", (event) => {
    if (!checkbox.checked) {
      event.preventDefault();
      alert('Devi spuntare "I promise to answer myself without help from anyone" per procedere.');

      checkbox.style.outline = "2px solid red";
      checkbox.style.outlineOffset = "2px";
    } else {
      checkbox.style.outline = "none";
    }
  });
});

// ===============================
// Domande del quiz
// ===============================
const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: ["Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

// ===============================
// Variabili principali del quiz
// ===============================
let currentQuestionIndex = 0; // Indice della domanda corrente
let score = 0; // Punteggio dell'utente
let timeLeft = 60; // Tempo rimanente per rispondere (in secondi)
const totalQuestions = questions.length; // Numero totale di domande

// Elementi del DOM da aggiornare
const questionTitle = document.querySelector(".question-title");
const answersContainer = document.querySelector(".answers-container");
const timerElement = document.querySelector(".timer-seconds");
const currentQuestionElement = document.querySelector(".current-question");
const totalQuestionsElement = document.querySelector(".total-questions");

// Imposta il numero totale di domande
totalQuestionsElement.textContent = totalQuestions;

// ===============================
// Funzioni principali del quiz
// ===============================

// Funzione per verificare la risposta
function checkAnswer(selectedAnswer, correctAnswer) {
  const buttons = document.querySelectorAll(".answer-button");

  // Rimuove la classe "selected" da tutti i bottoni
  buttons.forEach((button) => button.classList.remove("selected"));

  // Aggiunge la classe "selected" al bottone cliccato
  const clickedButton = Array.from(buttons).find((button) => button.textContent === selectedAnswer);
  if (clickedButton) {
    clickedButton.classList.add("selected");
    clickedButton.style.backgroundColor = "#d20094"; // Evidenzia bottone selezionato
    clickedButton.style.color = "white";
    clickedButton.style.borderColor = "#d20094";
  }

  // Verifica la correttezza della risposta
  if (selectedAnswer === correctAnswer) {
    score++;
  }

  // Passa alla prossima domanda con un ritardo
  setTimeout(() => nextQuestion(), 1000);
}

// Funzione per passare alla domanda successiva
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < totalQuestions) {
    showQuestion(currentQuestionIndex);
    resetTimer();
  } else {
    showResults();
  }
}

function showQuestion(questionIndex) {
  const currentQuestion = questions[questionIndex];

  // Aggiorna il numero della domanda corrente
  currentQuestionElement.textContent = questionIndex + 1;

  // Mostra la domanda
  const questionText = currentQuestion.question;

  if (questionText.length > 60) {
    // Trova l'ultimo spazio prima del carattere 60 per non spezzare le parole
    const breakpoint = questionText.lastIndexOf(" ", 60);
    const firstPart = questionText.slice(0, breakpoint).trim();
    const secondPart = questionText.slice(breakpoint).trim();

    // Aggiunge le due parti con stili diversi
    questionTitle.innerHTML = `
      <span class="text-normal">${firstPart}</span><br>
      <span class="text-highlight">${secondPart}</span>
    `;
  } else {
    // Testo normale sotto i 60 caratteri
    questionTitle.innerHTML = `
      <span class="text-normal">${questionText}</span>
    `;
  }

  // Mescola le risposte
  let answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
  answers.sort(() => Math.random() - 0.5);

  // Resetta il contenitore delle risposte
  answersContainer.innerHTML = "";

  // Crea i bottoni per le risposte
  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("answer-button");
    button.innerHTML = answer;

    // Gestisce il clic sui bottoni
    button.addEventListener("click", () => checkAnswer(answer, currentQuestion.correct_answer));

    // Aggiunge il bottone al contenitore
    answersContainer.appendChild(button);
  });
}

// ===============================
// Timer del quiz
// ===============================
let timerInterval;

function startTimer() {
  clearInterval(timerInterval);
  const circle = document.getElementById("timer-circle");
  const totalLength = 2 * Math.PI * 90;
  circle.style.strokeDasharray = totalLength;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    // Aggiorna il cerchio del timer
    const offset = totalLength - (timeLeft / 60) * totalLength;
    circle.style.strokeDashoffset = offset;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 60;
  timerElement.textContent = timeLeft;

  const circle = document.getElementById("timer-circle");
  circle.style.strokeDashoffset = 0;

  startTimer();
}

// ===============================
// Fine del quiz
// ===============================
function showResults() {
  questionTitle.innerHTML = `Il risultato finale è ${score} su ${totalQuestions}.`;
  answersContainer.innerHTML = "";

  // Nasconde elementi non più necessari
  document.querySelector(".timer").style.display = "none";
  document.querySelector(".question-footer").style.display = "none";

  // Mostra i risultati finali con un grafico
  const correctAnswers = score;
  const wrongAnswers = totalQuestions - score;
  const ctx = document.getElementById('resultsChart').getContext('2d');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Corrette', 'Sbagliate'],
      datasets: [{
        data: [correctAnswers, wrongAnswers],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      }
    }
  });
}

// ===============================
// Avvio del quiz
// ===============================
showQuestion(currentQuestionIndex);
startTimer();


console.log