let currentQuestionIndex = 0;
let score = 1;
let totalQuestions = 20; // Set your total number of questions
let questions;
let selectedOption;
let femaleScore = 0;
let maleScore = 0;
let activePlayer = 0; // Add this line to declare activePlayer

const player1 = document.querySelector(".player_0");
const player2 = document.querySelector(".player_1");
const femaleScoreDisplay = document.querySelector("#femaleScore");
const maleScoreDisplay = document.querySelector("#maleScore");

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
    } else {
        // Display a message when all questions are answered
        questionContainer.innerHTML = `<p>All questions answered!</p>`;
    }
}

// ... (Remaining code remains unchanged)


function updateScoreRange() {
    const rangeInput = document.querySelector('#slideRange');
    const scoreDisplay = document.querySelector('.scoreDisplay');

    rangeInput.value = score;
    scoreDisplay.textContent = score;
}

let celebrationTriggered = false;

function checkAnswer() {
    if (selectedOption !== undefined && !celebrationTriggered) {
        // Increment the score every time the user clicks an option
        score++;

        // Check if the score has reached 20
        if (score === 20) { // Use strict equality check
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

const switchPlayer = function () {
    // Switch players
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle("player--active");
    player2.classList.toggle("player--active");
};

const updateScores = function () {
    // Update player scores
    if (activePlayer === 0) {
        femaleScore++;
    } else {
        maleScore++;
    }

    // Update the displayed scores
    femaleScoreDisplay.textContent = femaleScore;
    maleScoreDisplay.textContent = maleScore;
};

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
