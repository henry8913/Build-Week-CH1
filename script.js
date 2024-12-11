    const questions = [
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "What does CPU stand for?",
        correct_answer: "Central Processing Unit",
        incorrect_answers: [
          "Central Process Unit",
          "Computer Personal Unit",
          "Central Processor Unit",
        ],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
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
        question:
          "Pointers were not used in the original C programming language; they were added later on in C++.",
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "What is the most preferred image format used for logos in the Wikimedia database?",
        correct_answer: ".svg",
        incorrect_answers: [".png", ".jpeg", ".gif"],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "In web design, what does CSS stand for?",
        correct_answer: "Cascading Style Sheet",
        incorrect_answers: [
          "Counter Strike: Source",
          "Corrective Style Sheet",
          "Computer Style Sheet",
        ],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "What is the code name for the mobile operating system Android 7.0?",
        correct_answer: "Nougat",
        incorrect_answers: [
          "Ice Cream Sandwich",
          "Jelly Bean",
          "Marshmallow",
        ],
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
        question:
          "Which programming language shares its name with an island in Indonesia?",
        correct_answer: "Java",
        incorrect_answers: ["Python", "C", "Jakarta"],
      },
    ];

    // Funzione per verificare la risposta
function checkAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    score++;
  }
  // Passa alla domanda successiva
  nextQuestion();
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

// Variabili per tracciare lo stato del quiz
let currentQuestionIndex = 0; // Indice della domanda corrente
let score = 0; // Punteggio dell'utente
let timeLeft = 60; // Tempo rimanente per rispondere a ciascuna domanda (in secondi)
const totalQuestions = questions.length; // Numero totale di domande

// Riferimenti agli elementi HTML che verranno aggiornati dinamicamente
const questionTitle = document.querySelector('.question-title'); // L'elemento che mostrerà la domanda
const answersContainer = document.querySelector('.answers-container'); // Il contenitore che mostrerà le risposte
const timerElement = document.querySelector('.timer-seconds'); // L'elemento del timer per mostrare i secondi rimanenti
const currentQuestionElement = document.querySelector('.current-question'); // Mostra il numero della domanda corrente
const totalQuestionsElement = document.querySelector('.total-questions'); // Mostra il numero totale di domande

// Imposta il numero totale di domande all'inizio del quiz
totalQuestionsElement.textContent = totalQuestions;

// Funzione per mostrare una domanda specifica
function showQuestion(questionIndex) {
  const currentQuestion = questions[questionIndex]; // Ottieni la domanda corrente in base all'indice
  
  // Aggiorna il numero della domanda corrente nel footer
  currentQuestionElement.textContent = questionIndex + 1;

  // Mostra la domanda nel titolo
  questionTitle.innerHTML = currentQuestion.question;

  // Unisci le risposte corrette e sbagliate e mescolale
  let answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
  answers.sort(() => Math.random() - 0.5); // Mescola l'array delle risposte

  // Pulisce le risposte precedenti dall'HTML
  answersContainer.innerHTML = ''; 

  // Crea un pulsante per ogni risposta e lo aggiunge al contenitore
  answers.forEach(answer => {
    const button = document.createElement('button'); // Crea un nuovo elemento 'button'
    button.classList.add('answer-button'); // Aggiungi una classe per lo stile
    button.innerHTML = answer; // Inserisci il testo della risposta nel bottone

    // Aggiungi un evento 'click' al pulsante per gestire la selezione della risposta
    button.addEventListener('click', () => checkAnswer(answer, currentQuestion.correct_answer));

    // Aggiungi il pulsante al contenitore delle risposte
    answersContainer.appendChild(button);
  });
}

// Funzione per verificare se la risposta selezionata è corretta
function checkAnswer(selectedAnswer, correctAnswer) {
  // Se la risposta selezionata è corretta, incrementa il punteggio
  if (selectedAnswer === correctAnswer) {
    score++; // Incrementa il punteggio
  }

  // Passa alla prossima domanda
  nextQuestion();
}

// Funzione per passare alla domanda successiva
function nextQuestion() {
  currentQuestionIndex++; // Passa alla prossima domanda incrementando l'indice

  // Se ci sono ancora domande da mostrare
  if (currentQuestionIndex < totalQuestions) {
    showQuestion(currentQuestionIndex); // Mostra la prossima domanda
    resetTimer(); // Resetta il timer per la nuova domanda
  } else {
    showResults(); // Se non ci sono più domande, mostra i risultati finali
  }
}

// Funzione per mostrare i risultati alla fine del quiz
function showResults() {
  // Mostra un messaggio con il punteggio finale
  questionTitle.innerHTML = `Il risultato finale è ${score} su ${totalQuestions}.`;

  // Pulisce il contenitore delle risposte per rimuovere i pulsanti
  answersContainer.innerHTML = ''; 

  // Nasconde il timer perché il quiz è finito
  document.querySelector('.timer').style.display = 'none';
}

// Funzione per avviare il timer
function startTimer() {
  const timerInterval = setInterval(() => {
    timeLeft--; // Decrementa il tempo rimanente
    timerElement.textContent = timeLeft; // Aggiorna l'elemento del timer con il nuovo valore

    // Se il tempo è finito
    if (timeLeft <= 0) {
      clearInterval(timerInterval); // Ferma il timer
      nextQuestion(); // Passa automaticamente alla prossima domanda
    }
  }, 1000); // Il timer si aggiorna ogni secondo
}

// Funzione per resettare il timer quando si passa a una nuova domanda
function resetTimer() {
  timeLeft = 60; // Resetta il tempo a 16 secondi
  timerElement.textContent = timeLeft; // Aggiorna l'elemento del timer
  startTimer(); // Riavvia il timer
}

// Inizializza il quiz mostrando la prima domanda e avviando il timer
showQuestion(currentQuestionIndex); // Mostra la prima domanda (indice 0)
startTimer(); // Avvia il timer per la prima domanda