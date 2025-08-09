// Quiz Game JavaScript

class QuizGame {
    showPasswordStrength(strength) {
        if (!this.signupPassword) return;
        let indicator = this.signupPassword.parentNode.querySelector('.password-strength');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'password-strength';
            indicator.style.fontSize = '0.95rem';
            indicator.style.marginTop = '4px';
            this.signupPassword.parentNode.appendChild(indicator);
        }
        indicator.textContent = strength.text;
        indicator.style.color = strength.color;
    }

    evaluatePasswordStrength(password) {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if ((password.match(/[0-9]/g) || []).length >= 3) score++;
        if (/[\@\$\&\!]/.test(password)) score++;
        if (score === 4) return { text: 'Strong password', color: '#28a745' };
        if (score === 3) return { text: 'Medium password', color: '#ffc107' };
        if (score === 2) return { text: 'Weak password', color: '#fd7e14' };
        return { text: 'Very weak password', color: '#dc3545' };
    }
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

        // Tracks shuffled options for the current question
        this.optionOrder = [];
        this.currentCorrectIndex = 0;

        // Start bubbles on initial screen if login is active
        if (this.loginScreen && this.loginScreen.classList.contains('active')) {
            this.toggleAmbientBubbles(true);
            this.togglePerScreenBubbles(true, this.loginBubbles);
        }
    }
    
    initializeElements() {
        // Screen elements
        this.loginScreen = document.getElementById('login-screen');
        this.startScreen = document.getElementById('start-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.resultsScreen = document.getElementById('results-screen');
        
        // Effects containers
        this.ambientBubbles = document.getElementById('ambient-bubbles');
        this.loginBubbles = document.getElementById('login-bubbles');
        this.startBubbles = document.getElementById('start-bubbles');
        this.quizBubbles = document.getElementById('quiz-bubbles');
        this.resultsBubbles = document.getElementById('results-bubbles');
        
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
        
        // Buttons & login inputs
        this.startBtn = document.getElementById('start-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.homeBtn = document.getElementById('home-btn');
        this.loginBtn = document.getElementById('login-btn');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');

        // Signup elements
        this.signupForm = document.getElementById('signup-form');
        this.signupBtn = document.getElementById('signup-btn');
        this.signupUsername = document.getElementById('signup-username');
        this.signupPassword = document.getElementById('signup-password');
        this.signupSuccess = document.getElementById('signup-success');
        this.loginForm = document.getElementById('login-form');
        this.loginTitle = document.getElementById('login-title');
        this.loginDesc = document.getElementById('login-desc');
        
        // NEW: Welcome screen elements
        this.welcomeScreen = document.getElementById('welcome-screen');
        this.gotoSignupBtn = document.getElementById('goto-signup-btn');
        this.gotoLoginBtn = document.getElementById('goto-login-btn');

        // Decorative: add glow to main headings if present
        document.querySelectorAll('.start-content h1, .results-content h1').forEach(h => h.classList.add('glow-text'));
    }
    
    bindEvents() {
        if (this.startBtn) this.startBtn.addEventListener('click', () => {
            this.requestNativeFullscreen(true);
            this.startQuiz();
        });
        if (this.restartBtn) this.restartBtn.addEventListener('click', () => this.restartQuiz());
        if (this.homeBtn) this.homeBtn.addEventListener('click', () => this.goToStart());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextQuestion());
        

        if (this.signupBtn) this.signupBtn.addEventListener('click', () => this.handleSignup());
        if (this.loginBtn) this.loginBtn.addEventListener('click', () => this.handleLogin());

        // Password strength indicator for signup
        if (this.signupPassword) {
            this.signupPassword.addEventListener('input', (e) => {
                const val = e.target.value;
                const strength = this.evaluatePasswordStrength(val);
                this.showPasswordStrength(strength);
            });
        }

        // Allow Enter key to submit signup form
        if (this.signupForm) {
            this.signupForm.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleSignup();
                }
            });
        }
        // Allow Enter key to submit login form
        if (this.loginForm) {
            this.loginForm.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleLogin();
                }
            });
        }
        
        // Click ripple for buttons and options
        document.querySelectorAll('.btn, .option').forEach(el => {
            el.addEventListener('click', (e) => {
                const rect = el.getBoundingClientRect();
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.left = (e.clientX - rect.left) + 'px';
                ripple.style.top = (e.clientY - rect.top) + 'px';
                el.appendChild(ripple);
                setTimeout(() => ripple.remove(), 650);
            });
        });
        
        this.options.forEach(option => {
            option.addEventListener('click', (e) => this.selectOption(e));
        });
        
        // Handle ESC or programmatic exit from fullscreen
        const onFsChange = () => this.handleFullscreenChange();
        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);
        document.addEventListener('msfullscreenchange', onFsChange);

        if (this.gotoSignupBtn) this.gotoSignupBtn.addEventListener('click', () => this.showSignup());
        if (this.gotoLoginBtn) this.gotoLoginBtn.addEventListener('click', () => this.showLogin());
    }
    
    // NEW: Function to shuffle the questions array
    shuffleQuestions() {
        // Fisher-Yates (aka Knuth) Shuffle algorithm
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }


    // Signup handling
    handleSignup() {
        const username = (this.signupUsername?.value || '').trim();
        const password = (this.signupPassword?.value || '').trim();
        if (!username || !password) {
            [this.signupUsername, this.signupPassword].forEach(el => {
                if (el && !el.value.trim()) {
                    el.style.borderColor = '#dc3545';
                    setTimeout(() => { el.style.borderColor = ''; }, 800);
                }
            });
            return;
        }
        // Show password strength if not strong
        const strength = this.evaluatePasswordStrength(password);
        if (strength.text === 'Very weak password' || strength.text === 'Weak password') {
            this.showPasswordStrength(strength);
            alert('Too weak! Try again!');
            return;
        } else if (strength.text !== 'Strong password') {
            this.showPasswordStrength(strength);
        }
        // Check if already registered with this username
        const stored = localStorage.getItem('quizUser');
        if (stored) {
            const { username: regUser, password: regPass } = JSON.parse(stored);
            if (regUser === username || regPass === password) {
                alert('Already registered!');
                this.showLogin();
                return;
            }
        }
        // Save credentials to localStorage
        localStorage.setItem('quizUser', JSON.stringify({ username, password }));
        // Show success message
        if (this.signupSuccess) {
            this.signupSuccess.style.display = '';
        }
        // Hide signup, show login form
        if (this.signupForm) this.signupForm.style.display = 'none';
        if (this.loginForm) this.loginForm.style.display = '';
        if (this.loginTitle) this.loginTitle.textContent = '🔐 CodeSpark Login';
        if (this.loginDesc) this.loginDesc.textContent = 'Sign in to begin your quiz.';
        // Optionally, prefill login username
        if (this.usernameInput) this.usernameInput.value = username;
        if (this.passwordInput) this.passwordInput.value = '';
    }

    // Login handling
    handleLogin() {
        const username = (this.usernameInput?.value || '').trim();
        const password = (this.passwordInput?.value || '').trim();
        if (!username || !password) {
            [this.usernameInput, this.passwordInput].forEach(el => {
                if (el && !el.value.trim()) {
                    el.style.borderColor = '#dc3545';
                    setTimeout(() => { el.style.borderColor = ''; }, 800);
                }
            });
            return;
        }
        // Check credentials
        const stored = localStorage.getItem('quizUser');
        if (!stored) {
            alert('No user registered. Please sign up first.');
            if (this.signupForm) this.signupForm.style.display = '';
            if (this.loginForm) this.loginForm.style.display = 'none';
            if (this.loginTitle) this.loginTitle.textContent = '📝 CodeSpark Signup';
            if (this.loginDesc) this.loginDesc.textContent = 'Register to begin your quiz.';
            return;
        }
        const { username: regUser, password: regPass } = JSON.parse(stored);
        if (username !== regUser || password !== regPass) {
            alert('Invalid username or password.');
            return;
        }
        this.showScreen(this.startScreen);
    }

    startQuiz() {
        this.shuffleQuestions(); // Shuffle questions at the start of the quiz
        this.showScreen(this.quizScreen);
        this.requestNativeFullscreen();
        this.loadQuestion();
        this.startTimer();
    }
    
    showScreen(screen) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(s => {
            s.classList.remove('active', 'fullscreen');
        });
        // Show target screen
        screen.classList.add('active');
        // Make quiz screen fullscreen only when shown
        if (screen === this.quizScreen) {
            screen.classList.add('fullscreen');
            // Remove bubbles from quiz screen in fullscreen
            this.togglePerScreenBubbles(false, this.quizBubbles);
            // Retry native fullscreen on first interaction if not yet active
            const retryFullscreenOnce = () => {
                if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                    this.requestNativeFullscreen();
                }
            };
            screen.addEventListener('pointerdown', retryFullscreenOnce, { once: true });
        } else {
            this.exitNativeFullscreen();
        }

        // Start/stop ambient bubbles
        // Show bubbles on welcome, login, and results screens
        const shouldShowAmbient = (screen === this.loginScreen || screen === this.resultsScreen || screen === this.welcomeScreen);
        this.toggleAmbientBubbles(shouldShowAmbient);

        // Per-screen bubbles
        this.togglePerScreenBubbles(screen === this.loginScreen, this.loginBubbles);
        this.togglePerScreenBubbles(screen === this.startScreen, this.startBubbles);
        // Only show quiz bubbles if not fullscreen
        if (screen === this.quizScreen && !this.quizScreen.classList.contains('fullscreen')) {
            this.togglePerScreenBubbles(true, this.quizBubbles);
        } else {
            this.togglePerScreenBubbles(false, this.quizBubbles);
        }
        this.togglePerScreenBubbles(screen === this.resultsScreen, this.resultsBubbles);

        // Ensure viewport top
        window.scrollTo(0, 0);
    }

    // Request browser fullscreen (best effort)
    requestNativeFullscreen(force = false) {
        if (document.fullscreenElement || document.webkitFullscreenElement) return;
        if (force) {
            const elem = this.quizScreen || document.documentElement;
            const req = elem.requestFullscreen || elem.webkitRequestFullscreen || elem.msRequestFullscreen;
            try {
                req && req.call(elem);
            } catch (_) {}
        }
    }

    // Exit browser fullscreen if active
    exitNativeFullscreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen?.().catch(() => {});
        } else if (document.webkitFullscreenElement) {
            document.webkitExitFullscreen?.();
        }
    }

    handleFullscreenChange() {
        const isFull = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
        if (!isFull && this.quizScreen?.classList.contains('active')) {
            // Remove CSS fullscreen so the quiz returns to centered rectangular layout
            this.quizScreen.classList.remove('fullscreen');
            // Show quiz bubbles again when exiting fullscreen
            this.togglePerScreenBubbles(true, this.quizBubbles);
            // Show ambient bubbles (full screen) when ESC is pressed
            this.toggleAmbientBubbles(true);
            // Ensure scroll position is reset
            window.scrollTo(0, 0);
        } else if (isFull && this.quizScreen?.classList.contains('active')) {
            // Hide quiz bubbles and ambient bubbles in fullscreen
            this.togglePerScreenBubbles(false, this.quizBubbles);
            this.toggleAmbientBubbles(false);
        }
    }
    
    loadQuestion() {
        const question = this.questions[this.currentQuestion];
        
        // Update question text
        this.questionText.textContent = question.question;
        this.questionText.classList.remove('question-enter');
        void this.questionText.offsetWidth; // reflow to restart animation
        this.questionText.classList.add('question-enter');
        
        // Prepare and shuffle option order
        const indices = [0, 1, 2, 3];
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        this.optionOrder = indices; // store for keyboard mapping if needed
        // Determine new correct index after shuffle
        const originalCorrect = question.correct;
        this.currentCorrectIndex = indices.indexOf(originalCorrect);

        // Update options (apply shuffled order to displayed buttons A-D)
        this.options.forEach((option, displayIndex) => {
            const optionText = option.querySelector('.option-text');
            const sourceIndex = indices[displayIndex];
            optionText.textContent = question.options[sourceIndex];
            
            // Reset option styles
            option.classList.remove('selected', 'correct', 'incorrect', 'option-enter');
            option.disabled = false;
            void option.offsetWidth; // reflow to restart animation
            option.classList.add('option-enter');
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
        const correctIndex = this.currentCorrectIndex;
        
        this.options.forEach((option, index) => {
            if (index === correctIndex) {
                option.classList.add('correct');
                // Sparkle burst
                const rect = option.getBoundingClientRect();
                for (let i = 0; i < 8; i++) {
                    const s = document.createElement('span');
                    s.className = 'sparkle';
                    const angle = (Math.PI * 2 * i) / 8;
                    const dist = 40 + Math.random() * 20;
                    s.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
                    s.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
                    s.style.left = rect.width / 2 + 'px';
                    s.style.top = rect.height / 2 + 'px';
                    option.appendChild(s);
                    setTimeout(() => s.remove(), 750);
                }
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
        
        // Count up animation for score and percentage
        const animateCount = (el, to, suffix = '') => {
            const from = 0;
            const duration = 700;
            const start = performance.now();
            const update = (t) => {
                const p = Math.min((t - start) / duration, 1);
                const val = Math.round(from + (to - from) * p);
                el.textContent = suffix ? `${val}${suffix}` : `${val}`;
                if (p < 1) requestAnimationFrame(update);
            };
            requestAnimationFrame(update);
        };
        
        this.finalScore.textContent = `${this.score}/${this.questions.length}`;
        this.percentage.textContent = `${percentage}%`;
        animateCount(this.percentage, percentage, '%');
        
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
        
        // Fireworks burst
        this.createFireworks(this.resultsScreen, 3);
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

    toggleAmbientBubbles(enable) {
        const container = this.ambientBubbles;
        if (!container) return;
        if (enable) {
            if (container._bubbleInterval) return;
            container._bubbleInterval = setInterval(() => {
                const b = document.createElement('div');
                // 1 in 10 chance to be a star bubble
                if (Math.random() < 0.1) {
                    b.className = 'bubble star';
                } else {
                    b.className = 'bubble';
                }
                // More size and color variation
                const size = 10 + Math.random() * 32;
                b.style.width = size + 'px';
                b.style.height = size + 'px';
                b.style.left = Math.random() * 100 + '%';
                b.style.top = Math.random() * 100 + '%';
                // Randomize speed
                const duration = 2200 + Math.random() * 3500;
                // Faster float with random rise and drift
                const rise = -60 - Math.random() * 60; // vh
                b.style.setProperty('--rise', rise + 'vh');
                b.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
                b.style.animationName = 'bubbleFloat';
                b.style.animationDuration = duration + 'ms';
                container.appendChild(b);
                setTimeout(() => b.remove(), 7000);
            }, 160);
        } else {
            clearInterval(container._bubbleInterval);
            container._bubbleInterval = null;
            Array.from(container.querySelectorAll('.bubble')).forEach(n => n.remove());
        }
    }

    togglePerScreenBubbles(enable, container) {
        if (!container) return;
        if (enable) {
            if (container._bubbleInterval) return;
            container._bubbleInterval = setInterval(() => {
                const b = document.createElement('div');
                // 1 in 10 chance to be a star bubble
                if (Math.random() < 0.1) {
                    b.className = 'bubble star';
                } else {
                    b.className = 'bubble';
                }
                const size = 10 + Math.random() * 32;
                b.style.width = size + 'px';
                b.style.height = size + 'px';
                b.style.left = Math.random() * 100 + '%';
                b.style.top = Math.random() * 100 + '%';
                const duration = 2200 + Math.random() * 3500;
                const rise = -60 - Math.random() * 60; // vh
                b.style.setProperty('--rise', rise + 'vh');
                b.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
                b.style.animationName = 'bubbleFloat';
                b.style.animationDuration = duration + 'ms';
                container.appendChild(b);
                setTimeout(() => b.remove(), 7000);
            }, 200);
        } else {
            clearInterval(container._bubbleInterval);
            container._bubbleInterval = null;
            Array.from(container.querySelectorAll('.bubble')).forEach(n => n.remove());
        }
    }

    createFireworks(target, bursts = 2) {
        const area = target.querySelector('.results-content') || target;
        for (let b = 0; b < bursts; b++) {
            setTimeout(() => {
                const cx = (area.clientWidth / 2) + (Math.random() * 120 - 60);
                const cy = 100 + Math.random() * 60;
                const count = 12;
                for (let i = 0; i < count; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'firework-dot';
                    const angle = (Math.PI * 2 * i) / count;
                    const dist = 70 + Math.random() * 50;
                    dot.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
                    dot.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
                    dot.style.left = cx + 'px';
                    dot.style.top = cy + 'px';
                    area.appendChild(dot);
                    setTimeout(() => dot.remove(), 900);
                }
            }, b * 500);
        }
    }
    
    restartQuiz() {
    this.resetGame();
    // Always go fullscreen on play again
    this.showScreen(this.quizScreen);
    this.requestNativeFullscreen(true);
    this.loadQuestion();
    this.startTimer();
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
    
    // Show signup form
    showSignup() {
        this.showScreen(this.loginScreen);
        if (this.signupForm) this.signupForm.style.display = '';
        if (this.loginForm) this.loginForm.style.display = 'none';
        if (this.loginTitle) this.loginTitle.textContent = '📝 CodeSpark Signup';
        if (this.loginDesc) this.loginDesc.textContent = 'Register to begin your quiz.';
        if (this.signupSuccess) this.signupSuccess.style.display = 'none';
        if (this.signupUsername) this.signupUsername.value = '';
        if (this.signupPassword) this.signupPassword.value = '';
    }

    // Show login form
    showLogin() {
        this.showScreen(this.loginScreen);
        if (this.signupForm) this.signupForm.style.display = 'none';
        if (this.loginForm) this.loginForm.style.display = '';
        if (this.loginTitle) this.loginTitle.textContent = '🔐 CodeSpark Login';
        if (this.loginDesc) this.loginDesc.textContent = 'Sign in to begin your quiz.';
        if (this.usernameInput) this.usernameInput.value = '';
        if (this.passwordInput) this.passwordInput.value = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.quizGame = new QuizGame();
    const quiz = window.quizGame;
    // Show welcome page on load
    quiz.showScreen(quiz.welcomeScreen);
    // Setup welcome screen buttons
    if (quiz.gotoSignupBtn) {
        quiz.gotoSignupBtn.onclick = () => {
            quiz.showSignup();
        };
    }
    if (quiz.gotoLoginBtn) {
        quiz.gotoLoginBtn.onclick = () => {
            quiz.showLogin();
        };
    }
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
