
const questions = [
    {
        question: "Which planet is known as the Blue Planet??",
        answers: [
            { text: "Jupiter", correct: false },
            { text: "Earth", correct: true },
            { text: "Venus", correct: false },
            { text: "Neptune", correct: false }
        ]
    },
    {
        question: "Which fruit is yellow when ripe and high in potassium?",
        answers: [
            { text: "Kiwi", correct: false },
            { text: "Grape", correct: false },
            { text: "Apple", correct: false },
            { text: "Banana", correct: true }
        ]
    },
    {
        question: "Which planet is closest to the Sun?",
        answers: [
            { text: "Mercury", correct: true },
            { text: "Mars", correct: false },
            { text: "Venus", correct: false },
            { text: "Neptune", correct: false }
        ]
    },
    {
        question: "What is the main organ of the circulatory system?",
        answers: [
            { text: "Brain", correct: false },
            { text: "Heart", correct: true },
            { text: "Kidney", correct: false },
            { text: "Liver", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionsIndex = 0;
let score = 0;

function startQuiz()  {
    currentQuestionsIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionsIndex];
    let questionNo = currentQuestionsIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn"); // Corrected class name
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = 'none'
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect"); 
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again'
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionsIndex++;
    if (currentQuestionsIndex < questions.length) {
        showQuestion();

    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionsIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();
