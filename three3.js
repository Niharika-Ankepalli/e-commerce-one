// Global variables to manage cart and quiz
let cart = [];
let totalPrice = 0;
let currentQuestionIndex = 0;
let score = 0;

const quizQuestions = [
    { question: "What is 2 + 2?", answer: "4", options: ["3", "4", "5"] },
    { question: "What is the capital of France?", answer: "Paris", options: ["Paris", "London", "Berlin"] },
    { question: "What is the color of the sky?", answer: "Blue", options: ["Blue", "Red", "Green"] }
];

// Function to add products to the cart
function addToCart(price) {
    cart.push(price);
    totalPrice += price;
    updateCart();
}

// Update the cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `Product ${index + 1}: $${item}`;
        cartItems.appendChild(li);
    });
    document.getElementById('total-price').textContent = totalPrice;
}

// Fetch a random joke from the Joke API
function getJoke() {
    fetch('https://official-joke-api.appspot.com/random_joke')
        .then(response => response.json())
        .then(data => {
            const jokeElement = document.getElementById('joke');
            jokeElement.innerHTML = `<strong>${data.setup}</strong> <br> <em>${data.punchline}</em>`;
        })
        .catch(error => {
            console.error(error);
            alert("Failed to fetch a joke!");
        });
}

// Display quiz question and options
function showQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    const quizQuestionElement = document.getElementById('quiz-question');
    const quizOptionsElement = document.getElementById('quiz-options');

    quizQuestionElement.textContent = question.question;
    quizOptionsElement.innerHTML = '';

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        quizOptionsElement.appendChild(button);
    });
}

// Check if the answer is correct
function checkAnswer(answer) {
    const correctAnswer = quizQuestions[currentQuestionIndex].answer;
    if (answer === correctAnswer) {
        score += 1;
    }

    currentQuestionIndex += 1;

    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        document.getElementById('quiz-question').textContent = `Quiz Over! Your score is ${score}`;
        document.getElementById('quiz-options').innerHTML = '';
        document.getElementById('score').textContent = `Final Score: ${score}`;
    }
}

// Load the first question
showQuestion();
