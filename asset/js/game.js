const question = document.querySelector('#question');
const choiceContainers = Array.from(document.querySelectorAll('.choice-container'));
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

window.onload = () => {
    startGame()
}

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0; 
let questionCounter = 0; 
let availableQuestions = [];

let questions = [
    {
        question: "Which one of these is a primitive data type??",
        choice1: 'Array',
        choice2: 'Object', 
        choice3: 'String', 
        choice4: 'JSON',
        answer: 3, 
    },
    {
        question: "Which of these methods return a random number between 0 and 1?",
        choice1: 'toExponential()',
        choice2: 'toString()', 
        choice3: 'Math.random()', 
        choice4: 'Math.floor()',
        answer: 3, 
    },
    {
        question: "What does JSON stand for?",
        choice1: 'JavaScript Option Notion',
        choice2: 'JavaScript Option Nation', 
        choice3: 'JavaScript Over Node', 
        choice4: 'JavaScript Over Neatly',
        answer: 1, 
    },
    {
        question: "Which of these is NOT a programming language?",
        choice1: 'Python',
        choice2: 'Ruby', 
        choice3: 'Java', 
        choice4: 'Diamond',
        answer: 4, 
    },
    {
        question: "What does the following expression return? 3 <= 300",
        choice1: '300 is after 3',
        choice2: '3 is less than or equal to 300', 
        choice3: '3 is before 300', 
        choice4: '300 is pointing at 3',
        answer: 2, 
    },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion()

};

function getNewQuestion() {
     if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
         localStorage.setItem('mostRecentScore', score);
         return window.location.assign('./end.html');
     }

     questionCounter++;
     progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
     progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

     const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
     currentQuestion = availableQuestions[questionsIndex];
     question.innerText = currentQuestion.question;  

     choices.forEach(choice => {
         const number = choice.dataset['number']
         choice.innerText = currentQuestion['choice' + number]
     })

     availableQuestions.splice(questionsIndex, 1)

     acceptingAnswers = true
}

choiceContainers.forEach((choice, index) => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        console.log(acceptingAnswers)

        acceptingAnswers = false; 
        const selectedChoice = choices[index];
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect' 

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num 
    scoreText.innerText = score 
}



