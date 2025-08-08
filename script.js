// Quiz Game JavaScript

class QuizGame {
    constructor() {
        this.questions = [
            {
                question: "What is the time complexity of a binary search algorithm?",
                options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
                correct: 1
            },
            {
                question: "Which data structure uses the Last-In, First-Out (LIFO) principle?",
                options: ["Queue", "Heap", "Tree", "Stack"],
                correct: 3
            },
            {
                question: "In object-oriented programming, what is encapsulation?",
                options: ["Bundling data and methods that operate on the data into a single unit", "The ability of an object to take on many forms", "A mechanism for creating new classes from existing ones", "Hiding the implementation details of an object"],
                correct: 0
            },
            {
                question: "Which of these is NOT a valid SQL data type?",
                options: ["VARCHAR", "BOOLEAN", "DECIMAL", "COMPLEX"],
                correct: 3
            },
            {
                question: "What does the acronym 'API' stand for?",
                options: ["Application Programming Interface", "Automated Program Interaction", "Application Process Integration", "Advanced Programming Input"],
                correct: 0
            },
            {
                question: "Which protocol is fundamental to the World Wide Web (WWW)?",
                options: ["FTP", "SMTP", "TCP/IP", "HTTP"],
                correct: 3
            },
            {
                question: "What is the main purpose of a 'git clone' command?",
                options: ["To create a new branch", "To merge two branches", "To create a local copy of a remote repository", "To upload changes to a repository"],
                correct: 2
            },
            {
                question: "In networking, what does DNS stand for?",
                options: ["Data Network Service", "Domain Name System", "Dynamic Naming Service", "Data Naming Standard"],
                correct: 1
            },
            {
                question: "Which data structure is most suitable for implementing a printer queue?",
                options: ["Stack", "Queue", "Linked List", "Tree"],
                correct: 1
            },
            {
                question: "What is 'Polymorphism' in OOP?",
                options: ["A class having only one form", "The ability of a message to be displayed in more than one form", "A class having multiple child classes", "A class having multiple parent classes"],
                correct: 1
            },
            {
                question: "Which of the following is a 'NoSQL' database?",
                options: ["MySQL", "PostgreSQL", "Oracle", "MongoDB"],
                correct: 3
            },
            {
                question: "What is the purpose of the 'finally' block in a try-catch-finally statement?",
                options: ["To execute code only if an exception occurs", "To execute code regardless of whether an exception occurs", "To catch specific types of exceptions", "To re-throw an exception"],
                correct: 1
            },
            {
                question: "Which sorting algorithm has the worst-case time complexity of O(n^2)?",
                options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"],
                correct: 2
            },
            {
                question: "What is the default port number for HTTPS?",
                options: ["80", "21", "443", "8080"],
                correct: 2
            },
            {
                question: "What does 'CPU' stand for?",
                options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Control Process Unit"],
                correct: 0
            }
        ];
        
        this.currentQuestion = 0;
        this.score = 0;
        this.timer = null;
        this.timeLeft = 30;
        this.selectedAnswer = null;
        this.answered = false;
        
        this.initializeElements();
        this.bindEvents();
    }
    
    initializeElements() {
        // Screen elements
        this.startScreen = document.getElementById('start-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.resultsScreen = document.getElementById('results-screen');
        
        // Quiz elements
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.querySelector('.options-container');
        this.options = document.querySelectorAll('.option');
        this.progressFill = document.getElementById('progress-fill');
        this.progressText = document.getElementById('progress-text');
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById('timer');
        this.nextBtn = document.getElementById('next-btn');
        
        // Results elements
        this.finalScore = document.getElementById('final-score');
        this.percentage = document.getElementById('percentage');
        this.performance = document.getElementById('performance');
        this.performanceFill = document.getElementById('performance-fill');
        
        // Buttons
        this.startBtn = document.getElementById('start-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.homeBtn = document.getElementById('home-btn');
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startQuiz());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
        this.homeBtn.addEventListener('click', () => this.goToStart());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        
        this.options.forEach(option => {
            option.addEventListener('click', (e) => this.selectOption(e));
        });
    }
    
    // NEW: Function to shuffle the questions array
    shuffleQuestions() {
        // Fisher-Yates (aka Knuth) Shuffle algorithm
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    startQuiz() {
        this.shuffleQuestions(); // Shuffle questions at the start of the quiz
        this.showScreen(this.quizScreen);
        this.loadQuestion();
        this.startTimer();
    }
    
    showScreen(screen) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        // Show target screen
        screen.classList.add('active');
    }
    
    loadQuestion() {
        const question = this.questions[this.currentQuestion];
        
        // Update question text
        this.questionText.textContent = question.question;
        
        // Update options
        this.options.forEach((option, index) => {
            const optionText = option.querySelector('.option-text');
            optionText.textContent = question.options[index];
            
            // Reset option styles
            option.classList.remove('selected', 'correct', 'incorrect');
            option.disabled = false;
        });
        
        // Update progress
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.progressText.textContent = `Question ${this.currentQuestion + 1} of ${this.questions.length}`;
        
        // Reset state
        this.selectedAnswer = null;
        this.answered = false;
        this.nextBtn.disabled = true;
        
        // Reset timer
        this.timeLeft = 30;
        this.updateTimer();
    }
    
    selectOption(event) {
        if (this.answered) return;
        
        const option = event.currentTarget;
        const selectedIndex = parseInt(option.dataset.index);
        
        // Remove previous selection
        this.options.forEach(opt => opt.classList.remove('selected'));
        
        // Add selection
        option.classList.add('selected');
        this.selectedAnswer = selectedIndex;
        this.nextBtn.disabled = false;
    }
    
    nextQuestion() {
        if (this.selectedAnswer === null) return;
        
        this.answered = true;
        this.checkAnswer();
        
        // Disable all options
        this.options.forEach(option => {
            option.disabled = true;
        });
        
        // Wait 1.5 seconds before moving to next question
        setTimeout(() => {
            this.currentQuestion++;
            
            if (this.currentQuestion < this.questions.length) {
                this.loadQuestion();
                this.startTimer();
            } else {
                this.endQuiz();
            }
        }, 1500);
    }
    
    checkAnswer() {
        const question = this.questions[this.currentQuestion];
        const correctIndex = question.correct;
        
        this.options.forEach((option, index) => {
            if (index === correctIndex) {
                option.classList.add('correct');
            } else if (index === this.selectedAnswer && this.selectedAnswer !== correctIndex) {
                option.classList.add('incorrect');
            }
        });
        
        // Update score with animation
        if (this.selectedAnswer === correctIndex) {
            this.score++;
            this.scoreElement.textContent = this.score;
            this.scoreElement.style.animation = 'scoreUpdate 0.5s ease-out';
            setTimeout(() => {
                this.scoreElement.style.animation = '';
            }, 500);
        }
    }
    
    startTimer() {
        clearInterval(this.timer); 
        this.timeLeft = 30;
        this.updateTimer();
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();
            
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }
    
    updateTimer() {
        this.timerElement.textContent = this.timeLeft;
        
        if (this.timeLeft <= 10) {
            this.timerElement.classList.add('timer-warning');
        } else {
            this.timerElement.classList.remove('timer-warning');
        }
    }
    
    timeUp() {
        clearInterval(this.timer);
        this.showTimeUpMessage();
        
        if (!this.answered) {
            this.selectedAnswer = -1; // Indicate no answer was selected
            this.nextQuestion();
        }
    }
    
    showTimeUpMessage() {
        const timeUpOverlay = document.createElement('div');
        timeUpOverlay.className = 'time-up-overlay';
        timeUpOverlay.innerHTML = `
            <div class="time-up-content">
                <h2>Time's Up!</h2>
                <p>Moving to next question...</p>
            </div>
        `;
        
        this.quizScreen.appendChild(timeUpOverlay);
        
        setTimeout(() => {
            if (timeUpOverlay.parentNode) {
                timeUpOverlay.parentNode.removeChild(timeUpOverlay);
            }
        }, 2000);
    }
    
    endQuiz() {
        clearInterval(this.timer);
        this.showResults();
    }
    
    showResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        this.finalScore.textContent = `${this.score}/${this.questions.length}`;
        this.percentage.textContent = `${percentage}%`;
        
        let performanceText = '';
        let emoji = '';
        if (percentage >= 90) {
            performanceText = 'Excellent!';
            emoji = '🏆';
        } else if (percentage >= 80) {
            performanceText = 'Great Job!';
            emoji = '🎉';
        } else if (percentage >= 70) {
            performanceText = 'Good Work!';
            emoji = '👍';
        } else if (percentage >= 60) {
            performanceText = 'Not Bad!';
            emoji = '😊';
        } else {
            performanceText = 'Keep Practicing!';
            emoji = '💪';
        }
        this.performance.textContent = `${performanceText} ${emoji}`;
        
        // Animate performance bar with delay
        setTimeout(() => {
            this.performanceFill.style.width = `${percentage}%`;
        }, 500);
        
        this.showScreen(this.resultsScreen);
        
        // Add confetti for high scores
        if (percentage >= 80) {
            this.createConfetti();
        }
    }
    
    createConfetti() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#28a745', '#20c997'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '9999';
                confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 5000);
            }, i * 50);
        }
    }
    
    restartQuiz() {
        this.resetGame();
        this.startQuiz();
    }
    
    goToStart() {
        this.resetGame();
        this.showScreen(this.startScreen);
    }
    
    resetGame() {
        this.currentQuestion = 0;
        this.score = 0;
        this.timeLeft = 30;
        this.selectedAnswer = null;
        this.answered = false;
        
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        this.scoreElement.textContent = '0';
        this.timerElement.textContent = '30';
        this.timerElement.classList.remove('timer-warning');
        this.progressFill.style.width = '0%';
        this.performanceFill.style.width = '0%';
        
        this.options.forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
            option.disabled = false;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.quizGame = new QuizGame();
});

document.addEventListener('keydown', (event) => {
    const quiz = window.quizGame;
    if (!quiz || quiz.quizScreen.classList.contains('active') === false) return;
    
    switch(event.key) {
        case '1':
        case 'a':
        case 'A':
            if (!quiz.answered) {
                quiz.options[0].click();
            }
            break;
        case '2':
        case 'b':
        case 'B':
            if (!quiz.answered) {
                quiz.options[1].click();
            }
            break;
        case '3':
        case 'c':
        case 'C':
            if (!quiz.answered) {
                quiz.options[2].click();
            }
            break;
        case '4':
        case 'd':
        case 'D':
            if (!quiz.answered) {
                quiz.options[3].click();
            }
            break;
        case 'Enter':
            if (quiz.selectedAnswer !== null && !quiz.answered) {
                quiz.nextBtn.click();
            }
            break;
    }
});
