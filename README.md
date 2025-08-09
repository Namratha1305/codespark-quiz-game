# CodeSpark Quiz Game🎉🎮

An interactive, animated web-based quiz game with authentication, password strength validation, and persistent user progress. Built with vanilla HTML, CSS, and JavaScript.

## Features 🤩

- **Welcome Page:** Animated welcome screen with bubbles, inviting users to sign up or log in.
- **Signup/Login Flow:**
  - Secure signup and login with localStorage persistence.
  - Password strength meter with requirements: at least 8 characters, 1 capital letter, 3 numbers, and one of @, $, &, !
- **Quiz Experience:**
  - Multiple-choice questions (15+), randomized order each session.
  - Timer (30 seconds per question) with animated warning.
  - Real-time score and progress bar.
  - Animated transitions between screens (fade, slide, zoom).
  - Option selection with highlight; incorrect answers bounce and shake for feedback.
  - Sparkle burst for correct answers.
  - Keyboard shortcuts for option selection (A/B/C/D or 1/2/3/4).
- **Results & Feedback:**
  - Animated results screen with score, percentage, and performance feedback.
  - Confetti and fireworks for high scores.
  - Animated performance bar and count-up effect for score/percentage.
- **UI/UX & Animations:**
  - Animated bubbles on welcome, login, and results screens, with color, size, and speed variations (including star/sparkle bubbles).
  - Button hover/click effects (scaling, color, shadow transitions).
  - Smooth screen transitions and option entrance animations.
  - Responsive design for desktop and mobile.

## Screenshots📸
<img width="1440" height="757" alt="Login_screen" src="https://github.com/user-attachments/assets/777a0d21-6738-4c2e-a1c9-4ff39e90be57" />

<img width="1011" height="546" alt="Start_screen" src="https://github.com/user-attachments/assets/4445727d-157d-4f04-ba8d-3ff6078836e5" />

<img width="1883" height="1027" alt="Quiz_interface" src="https://github.com/user-attachments/assets/97bd9eff-e16e-436e-86f3-c5d1628593c0" />

<img width="1072" height="812" alt="Result_Screen" src="https://github.com/user-attachments/assets/63a76600-ccc4-40d7-afb1-8750f890f534" />

## Usage

1. **Clone or Download** this repository.
2. Open `index.html` in your browser.
3. Sign up with a username and a strong password (see requirements below).
4. Log in and start the quiz!

## Password Requirements 🔑
- At least 8 characters
- At least 1 capital letter
- At least 3 numbers
- At least one of: `@`, `$`, `&`, `!`

## Tech Stack
- HTML5
- CSS3 (custom animations, transitions, responsive design)
- JavaScript (ES6+, no frameworks)

## Notable Customizations & Modifications
- **Animated Bubbles:** Bubbles with random color, size, speed, and occasional star/sparkle bubbles on welcome, login, and results screens.
- **Screen Transitions:** Fade, slide, and zoom effects for smooth navigation between screens.
- **Button & Option Animations:**
  - Buttons scale and glow on hover/click.
  - Quiz options highlight on selection; only incorrect answers bounce and shake after submission.
- **Password Strength & Visibility:**
  - Real-time password strength meter.
  - Eye icon toggles password visibility.
  - Weak/very weak passwords are blocked with a popup.
- **Persistent Auth:** Credentials are stored in localStorage and persist after refresh/reopen.
- **Accessibility:** Keyboard navigation for quiz options and form submission.

## License
MIT

## Credits 👏👏
- Cursor.ai
- Kilo code
- Gemini AI Pro



