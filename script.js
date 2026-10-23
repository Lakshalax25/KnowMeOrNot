

const questions = [
    {
        question: "What is my favourite colour?",
        options: ["Pink", "Blue", "Black", "Purple"],
        answer: "Blue"
    },
    {
        question: "What is my favourite food?",
        options: ["Pizza", "Biriyani", "Burger", "Fried rice"],
        answer: "Biriyani"
        
    },
    {
        question: "What type of movies do I like?",
        options: ["Horror", "Comedy", "Romance", "Action"],
        answer: "Comedy"
    },
    {
        question: "What do I do when I feel sad?",
        options: [
            "Stay alone",
            "Talk to someone",
            "Listen to music",
            "Sleep"
        ],
        answer: "Listen to music"
    },
    {
        question: "What is my personality type?",
        options: ["Introvert", "Extrovert", "Both", "It depends"],
        answer: "Introvert"
    },
    {
        question: "Which describes my personality best?",
        options: ["Funny and talkative","Quite and caring","Bold and confident","Shy"],
        answer: "Funny and talkative"
    },
    {
        question: "What makes me happy?",
        options: [
            "Good food",
            "Surprise gifts",
            "Going out",
            "All of these"
        ],
        answer: "All of these"
    },
    {
        question: "What would I choose on a free day?",
        options: [
            "Watching movies",
            "Sleeping",
            "Going out",
            "Learning something new"
        ],
        answer: "Watching movies"
    },
    {
        question: "If I could travel anywhere, where would I go?",
        options: [
            "Japan",
            "Switerland",
            "Paris",
            "Maldives"
        ],
        answer: "Switerland"
    },
    {
        question: "Who can easly win my heart?",
        options: [
            "____",
            "____",
            "Mee💗",
            "____"
        ],
        answer: "Teacher or professor"
    }
];

let currentQuestion = 0;
let score = 0;
let friendName = "";
let selectedAnswers = [];

function startQuiz() {
    const nameInput = document.getElementById("friendName");
    friendName = nameInput.value.trim();

    if (friendName === "") {
        alert("Please enter your name first! 💗");
        nameInput.focus();
        return;
    }

    currentQuestion = 0;
    score = 0;
    selectedAnswers = [];

    document.getElementById("welcome").classList.add("hidden");
    document.getElementById("result").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        "Question " + (currentQuestion + 1) + " of " + questions.length;

    document.getElementById("progress").style.width =
        (currentQuestion / questions.length * 100) + "%";

    document.getElementById("questionText").textContent = q.question;

    document.getElementById("feedback").textContent = "";
    document.getElementById("nextButton").classList.add("hidden");

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(function(option) {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option";

        button.onclick = function() {
            checkAnswer(option, button);
        };

        optionsDiv.appendChild(button);
    });
}

function checkAnswer(choice, clickedButton) {
    const q = questions[currentQuestion];
    const buttons = document.querySelectorAll(".option");

    buttons.forEach(function(button) {
        button.disabled = true;

        if (button.textContent === q.answer) {
            button.classList.add("correct");
        }
    });

    if (choice === q.answer) {
        score++;
        clickedButton.classList.add("correct");
        document.getElementById("feedback").textContent =
            "🎉 Correct! You know me well!";
    } else {
        clickedButton.classList.add("wrong");
        document.getElementById("feedback").textContent =
            "💗 Not quite! My answer is: " + q.answer;
    }

    selectedAnswers.push({
        question: q.question,
        chosen: choice,
        correct: q.answer,
        isCorrect: choice === q.answer
    });

    document.getElementById("progress").style.width =
        ((currentQuestion + 1) / questions.length * 100) + "%";

    const nextButton = document.getElementById("nextButton");
    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "See My Result 🎉"
            : "Next Question ➡️";

    nextButton.classList.remove("hidden");
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    document.getElementById("resultGreeting").textContent =
        "Well done, " + friendName + "! 💖";

    document.getElementById("scoreText").textContent =
        "Your score: " + score + " / " + questions.length;

    let message = "";

    if (score === questions.length) {
        message = "Amazing! You know me perfectly! 🥹💕";
    } else if (score >= 7) {
        message = "You know me really well! 🥰";
    } else if (score >= 4) {
        message = "We're friends, but you need to know me better! 😄";
    } else {
        message = "Do we even know each other? 😂💗";
    }

    document.getElementById("resultMessage").textContent = message;

    const review = document.getElementById("answerReview");
    review.innerHTML = "<h2>Answer Review 📝</h2>";

    selectedAnswers.forEach(function(item, index) {
        const div = document.createElement("div");
        div.className = "review-item";

        const title = document.createElement("strong");
        title.textContent = (index + 1) + ". " + item.question;

        const chosen = document.createElement("p");
        chosen.textContent = "Your answer: " + item.chosen;

        const correct = document.createElement("p");
        correct.textContent = "My answer: " + item.correct;

        const status = document.createElement("p");
        status.textContent = item.isCorrect ? "✅ Correct" : "❌ Wrong";

        div.appendChild(title);
        div.appendChild(chosen);
        div.appendChild(correct);
        div.appendChild(status);
        review.appendChild(div);
    });

    document.getElementById("progress").style.width = "100%";
}

function restartQuiz() {
    document.getElementById("result").classList.add("hidden");
    document.getElementById("welcome").classList.remove("hidden");
    document.getElementById("friendName").value = "";
}
