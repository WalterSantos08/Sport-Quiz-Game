const $startGameButton = document.querySelector(".start-quiz");
const $questionsContainer = document.querySelector(".questions-container");
const $questionText = document.querySelector(".question");
const $answersContainer = document.querySelector(".answers-container");

let currentQuestionIndex = 0;
let totalCorrect = 0;

$startGameButton.addEventListener("click", startGame);

function startGame() {
  $startGameButton.classList.add("hide");
  $questionsContainer.classList.remove("hide");

  // Tocar a música quando o jogo começar
  const audio = document.querySelector('#backgroundMusic');
  audio.play().catch(error => {
    console.log('Erro ao tentar reproduzir áudio:', error);
  });

  displayNextQuestion();
}

function displayNextQuestion() {
  resetState();

  if (questions.length === currentQuestionIndex) {
    return finishGame();
  }

  $questionText.textContent = questions[currentQuestionIndex].question;
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAnswer = document.createElement("button");
    newAnswer.classList.add("button", "answer");
    newAnswer.textContent = answer.text;
    if (answer.correct) {
      newAnswer.dataset.correct = answer.correct;
    }
    $answersContainer.appendChild(newAnswer);

    newAnswer.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  while ($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild);
  }

  document.body.removeAttribute("class");
}

function selectAnswer(event) {
  const answerClicked = event.target;

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct");
    totalCorrect++;
  } else {
    document.body.classList.add("incorrect");
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true;

    if (button.dataset.correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });

  currentQuestionIndex++;

  // Adiciona um atraso antes de avançar para a próxima pergunta
  setTimeout(() => {
    if (currentQuestionIndex < questions.length) {
      displayNextQuestion();
    } else {
      finishGame();
    }
  }, 250); // Atraso de 1 segundo
}

function finishGame() {
  const totalQuestions = questions.length;
  const performance = Math.floor(totalCorrect * 100 / totalQuestions);

  let message = "";

  switch (true) {
    case performance >= 110:
      message = "Torcedor Maior do Nordeste";
      break;
    case performance >= 80:
      message = "Torcedor Leão 87";
      break;
    case performance >= 50:
      message = "Rubro Negro";
      break;
    default:
      message = "Modinha, só torce quando o time está ganhando";
  }

  $questionsContainer.innerHTML = `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `;
}

const questions = [
  {
    question: "Em que ano o Sport Club do Recife foi fundado?",
    answers: [
      { text: "13 de Abril 1905", correct: false },
      { text: "13 dе Маіо 1904", correct: false },
      { text: "13 dе Маіо 1905", correct: true },
      { text: "13 dе Abril 1905", correct: false },
    ],
  },
  {
    question: "Соntrа quеm е quanto рlасаr dо jogo do Ѕроrt ѕаgrоu-ѕе саmреãо dа сора dо Вrаѕіl dе 2008?",
    answers: [
      { text: "Соrіnthіаnѕ, 3Х1", correct: false },
      { text: "Раlmеіrаѕ, 3Х1", correct: false },
      { text: "Соrіnthіаnѕ, 2х0", correct: true },
      { text: "Іntеrnасіоnаl, 3х1", correct: false },
    ],
  },
  {
    question: "Em que ano o Sport Club do Recife sagrou-se campeão Brasileiro?",
    answers: [
      { text: "1986", correct: false },
      { text: "1987", correct: false },
      { text: "1988", correct: true },
      { text: "1989", correct: false },
    ],
  },
  {
    question: "Qual é o nome oficial do estádio do Sport?",
    answers: [
      { text: "Adelmar da Costa e Silva", correct: true },
      { text: "José do Rego Maciel", correct: false },
      { text: "Eládio de Barros Carvalho", correct: false },
      { text: "Cícero Pompeu de Toledo", correct: false },
    ],
  },
  {
    question: 'Quantas vezes o sport foi campeão estadual?',
    answers: [
      { text: '45', correct: false },
      { text: '42', correct: false },
      { text: '48', correct: false },
      { text: '44', correct: true }
    ]
  },
  {
    question: 'Quem é considerado por muitos o maior idolo do sport?',
    answers: [
      { text: 'Carlinhos Bala', correct: false },
      { text: 'Roberto Coração de Leão', correct: false },
      { text: 'Magrão', correct: true },
      { text: 'Durval', correct: false }
    ]
  },
  {
    question: 'Quantos títulos da copa do nordeste o sport tem?',
    answers: [
      { text: '2', correct: false }, 
      { text: '3', correct: true },
      { text: '4', correct: false },
      { text: '5', correct: false },
    ]
  },
  {
    question: 'Quem foi o primeiro tecnico europeu comandar o sport?',
    answers: [
      { text: 'Jorge Jesus', correct: false },
      { text: 'Mariano SoSo', correct: false },
      { text: 'Peppa', correct: true },
      { text: 'Luís Castro', correct: false },
    ]
  },
  {
    question: 'Quem é o maior artilheiro da História do Sport?',
    answers: [
      { text: 'Djalma Freitas', correct: false },
      { text: 'Leonardo ', correct: false },
      { text: 'Naninho ', correct: false },
      { text: 'Traçaia', correct: true },
    ]
  },
  {
    question: 'Quem é o jogador que mais usou a camisa do Sport?',
    answers: [
      { text: 'Bria', correct: false },
      { text: 'Magrão', correct: true },
      { text: 'Leonardo ', correct: false },
      { text: 'Durval', correct: false },
    ]
  },
  {
    question: 'quem foi o tecnico do sport que ganhou a copa do brasil 2008?',
    answers: [
      { text: 'Daniel Paulista', correct: false },
      { text: 'Nelsinho Baptista', correct: true },
      { text: 'Vanderlei Luxemburgo', correct: false },
      { text: 'Vagner Mancini', correct: false },
    ]
  },
]

//*audio do site  */

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")

  // Tocar a música quando o jogo começar
  const audio = document.querySelector('#backgroundMusic');
  audio.play().catch(error => {
    console.log('Erro ao tentar reproduzir áudio:', error);
  });

  displayNextQuestion();
}

document.getElementById('startButton').addEventListener('click', function() {
  const audio = document.querySelector('#backgroundMusic');
  audio.play().catch(error => {
    console.log('Erro ao tentar reproduzir áudio:', error);
  });
  startGame();
});