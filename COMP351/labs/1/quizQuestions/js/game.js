const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question:'<span class="variable">let</span> sum = (a, b) => a + b; <span class="variable">let</span> sum = function(a, b) { <br><span class="keyword">return</span> a + b;<br>};<br><span class="keyword">alert</span> sum(1, 2) );',
        choice1: '2',
        choice2: '1',
        choice3: '4',
        choice4: '3',
        answer: 4,
    },
    {
        question:'What is the correct JavaScript syntax to change the content of the HTML element below? <p id="demo">This is a demonstration.</p>',
        choice1: 'document.getElementById("demo").innerHTML = "Hello World!";',
        choice2: 'document.getElementByName("p").innerHTML = "Hello World!";',
        choice3: '#demo.innerHTML = "Hello World!";',
        choice4: 'document.getElement("p").innerHTML = "Hello World!";',
        answer: 1,
    },
    {
        question:'How do you write "Hello World" in an alert box?' ,
        choice1: 'msg("Hello World");  ',
        choice2: 'alertBox("Hello World");',
        choice3: 'msgBox("Hello World");',
        choice4: 'alert("Hello World");  ',
        answer: 4,
    },
    {
        question:'<span class="variable">let</span> x = (1 && 2) ?? 3; <br><span class="keyword">alert(x);</span>' ,
        choice1: '2',
        choice2: '3',
        choice3: '1',
        choice4: 'None',
        answer: 1,
    },
    {
        question:'How do you create a function in JavaScript?' ,
        choice1: 'function:myFunction()',
        choice2: 'function myFunction()',
        choice3: 'function = myFunction()',
        choice4: 'function is myFunction()',
        answer: 2,
    },
    {
        question:'How to write an IF statement in JavaScript?' ,
        choice1: 'if i = 5 then  ',
        choice2: 'if (i == 5)  ',
        choice3: 'if i = 5',
        choice4: 'if i == 5 then',
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 6

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/COMP351/labs/1/quizQuestions/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerHTML = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
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

startGame()