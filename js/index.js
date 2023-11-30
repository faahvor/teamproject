let currentQuestionIndex = 0;
let score = 1;
let totalQuestions = 20; // Set your total number of questions
let questions;
let selectedOption;

var users =[
   {
    id:1,
    score:0,
    fullname:"elizabeth"

   },
   {
    id:1,
    score:0,
    fullname:"wisdom"

   }
]

// Initial load of questions
loadQuestions();

// Event listener to update the range input when the score changes
document.addEventListener('DOMContentLoaded', function () {
    const rangeInput = document.querySelector('#slideRange');
    const scoreDisplay = document.querySelector('.scoreDisplay');

    rangeInput.addEventListener('input', function () {
        score = parseInt(this.value, 10);
        scoreDisplay.textContent = score;
    });
});

function loadQuestions() {
    // Fetch the JSON data directly
    fetch('object.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            questions = data;

            // Load the first question
            loadQuestion();
        });
}

// ... (Previous code remains unchanged)

function selectAnswer(option) {
    // Reset background color for all options
    document.querySelectorAll('.input').forEach(element => {
        element.style.backgroundColor = '';
    });

    // Set background color for the selected option
    selectedOption = option;
    document.querySelector(`.input[data-option="${option}"]`).style.backgroundColor = 'lightgreen';
}

function loadQuestion() {
    const questionContainer = document.querySelector('#white');

    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];

        questionContainer.innerHTML = `
            <div class="average_question"><i class="scoreDisplay">${score}</i><big>/</big><small>${totalQuestions}</small></div>
            <p class="question_appear">${currentQuestion.question}</p>
            <div class="label_input">
                <div class="input" data-option="A" onclick="selectAnswer('A')" ${selectedOption === 'A' ? 'style="background-color: lightgreen;"' : ''}> ${currentQuestion.options.A}</div><br>
                <div class="input" data-option="B" onclick="selectAnswer('B')" ${selectedOption === 'B' ? 'style="background-color: lightgreen;"' : ''}> ${currentQuestion.options.B}</div><br>
                <div class="input" data-option="C" onclick="selectAnswer('C')" ${selectedOption === 'C' ? 'style="background-color: lightgreen;"' : ''}> ${currentQuestion.options.C} </div><br>
                <div class="input" data-option="D" onclick="selectAnswer('D')" ${selectedOption === 'D' ? 'style="background-color: lightgreen;"' : ''}> ${currentQuestion.options.D}</div><br>
                <button onclick="checkAnswer()">Check Answer</button>
            </div>
        `;
    }
}

function updateScoreRange() {
    const rangeInput = document.querySelector('#slideRange');
    const scoreDisplay = document.querySelector('.scoreDisplay');

    rangeInput.value = score;
    scoreDisplay.textContent = score;
}

let celebrationTriggered = false;
function checkAnswer() {
    if (selectedOption !== undefined && !celebrationTriggered) {
        const currentQuestion = questions[currentQuestionIndex];

        // Check if the selected option is correct
        if (selectedOption === currentQuestion.correctOption) {
            // Increment the user's correctAnswers count
            users[currentUserIndex].correctAnswers++;
        }

        // Increment the score every time the user clicks an option
        score++;

        // Check if the score has reached 20
        if (score === 20) {
            celebrate();
            celebrationTriggered = true;

            // Switch players and update scores
            switchPlayer();
            updateScores();

            console.log("balloon balloon");
        }

        // Move to the next question
        currentQuestionIndex++;

        // Load the next question
        loadQuestion();

        // Update the score range display
        updateScoreRange();
    } else {
        alert('Please select an option before checking the answer.');
    }
}
let currentUserIndex = 0;

// ... (rest of your code)

function switchPlayer() {
    currentUserIndex = (currentUserIndex + 1) % users.length;
}

function updateScores() {
    // Update the score display for each user
    users.forEach((user, index) => {
        const scoreElement = document.querySelector(`#score-${index + 1}`);
        scoreElement.textContent = `${user.correctAnswers}`;
    });
}

// ... (rest of your code)


function celebrate() {
    const numberOfBalloons = 50; // Adjust the number of balloons as needed

    for (let i = 0; i < numberOfBalloons; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.backgroundColor = getRandomColor(); // Use a function to get a random color
        balloon.style.width = '20px';
        balloon.style.height = '30px';
        balloon.style.borderRadius = '50%';
        balloon.style.position = 'absolute';
        balloon.style.left = `${Math.random() * window.innerWidth}px`;
        balloon.style.top = `${Math.random() * window.innerHeight}px`;
        balloon.style.animationDelay = `${Math.random() * 5}s`; // Randomize delay for each balloon

        document.body.appendChild(balloon);
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
