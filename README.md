# 🚀 CodeSpark Quiz Game

<div align="center">

![Quiz Game Demo](https://img.shields.io/badge/Status-Live%20Demo-brightgreen)
![Tech Stack](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JavaScript-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)

*A modern, interactive computer science quiz game built with vanilla JavaScript*

[🎮 Live Demo](#) • [📖 Documentation](#features) • [🚀 Getting Started](#getting-started) • [🤝 Contributing](#contributing)

</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🎮 Live Demo](#-live-demo)
- [🚀 Getting Started](#-getting-started)
- [📱 Screenshots](#-screenshots)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🎯 How to Play](#-how-to-play)
- [⚙️ Customization](#️-customization)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🎮 Core Functionality
- **15 Computer Science Questions** - Covering algorithms, OOP, databases, networking, and more
- **Randomized Questions** - Unique experience every time with question shuffling
- **Real-time Timer** - 30-second countdown with visual warnings
- **Score Tracking** - Animated score updates with visual feedback
- **Progress Indicator** - Visual progress bar showing quiz completion

### 🎨 User Experience
- **Modern Glassmorphism UI** - Beautiful backdrop blur effects and gradients
- **Responsive Design** - Perfect on desktop, tablet, and mobile devices
- **Smooth Animations** - Hover effects, transitions, and micro-interactions
- **Keyboard Support** - Use A/B/C/D keys or 1/2/3/4 for navigation
- **Accessibility** - Screen reader friendly with proper ARIA labels

### 🎉 Special Effects
- **Confetti Celebration** - Special effects for high scores (80%+)
- **Animated Background** - Subtle particle animations
- **Gradient Text** - Animated title with color shifts
- **Performance Feedback** - Personalized messages with emojis
- **"Time's Up!" Display** - Clear overlay when timer expires

---

## 🎮 Live Demo

**[Play the Quiz Game Here](#)** *(Coming Soon)*

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required!

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/codespark-quiz.git
   cd codespark-quiz
   ```

2. **Open the project**
   ```bash
   # Simply open index.html in your browser
   open index.html
   ```

3. **Or use a local server** (recommended)
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

4. **Navigate to the application**
   ```
   http://localhost:8000
   ```

---

## 📱 Screenshots

<div align="center">

### 🏠 Start Screen
<img width="1153" height="711" alt="Start_screen" src="https://github.com/user-attachments/assets/6b6f868a-b751-484f-953f-514122fe6f24" />


### 🎯 Quiz Interface
<img width="968" height="882" alt="Quiz_interface" src="https://github.com/user-attachments/assets/2f304471-0b16-4c31-b8f8-d111dc2a8389" />


### 🏆 Results Screen
<img width="983" height="787" alt="Result_Screen" src="https://github.com/user-attachments/assets/9eefdc62-aa99-4df3-9fc3-9d559411299d" />


</div>

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, CSS Animations
- **Design**: Glassmorphism, Gradient Effects, Responsive Design
- **Performance**: Optimized animations, efficient DOM manipulation
- **Compatibility**: Cross-browser support, mobile-responsive

---

## 📁 Project Structure

```
codespark-quiz/
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── script.js           # Game logic and functionality
├── README.md           # Project documentation
└── .gitignore          # Git ignore file
```

---

## 🎯 How to Play

1. **Start the Game** - Click "🚀 Start Coding Quiz" on the welcome screen
2. **Answer Questions** - Click on your chosen answer or use keyboard shortcuts
3. **Watch the Timer** - You have 30 seconds per question
4. **See Results** - Get immediate feedback on correct/incorrect answers
5. **Complete the Quiz** - View your final score and performance
6. **Play Again** - Restart the quiz or return to the home screen

### ⌨️ Keyboard Controls

| Key | Action |
|-----|--------|
| `A` or `1` | Select option A |
| `B` or `2` | Select option B |
| `C` or `3` | Select option C |
| `D` or `4` | Select option D |
| `Enter` | Submit answer |

---

## ⚙️ Customization

### Adding New Questions

Edit the `questions` array in `script.js`:

```javascript
{
    question: "Your question here?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correct: 0  // Index of correct answer (0-3)
}
```

### Changing Timer Duration

Modify the `timeLeft` variable in the `startTimer()` method:

```javascript
this.timeLeft = 45; // Change to desired seconds
```

### Styling Customization

The game uses modern CSS features. You can customize:

- **Colors**: Modify gradient values in CSS
- **Fonts**: Change the Google Fonts import
- **Animations**: Adjust timing and effects
- **Layout**: Modify container sizes and spacing

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Reporting Bugs
1. Check existing issues first
2. Create a new issue with detailed description
3. Include steps to reproduce the bug

### 💡 Suggesting Features
1. Open a new issue with the "enhancement" label
2. Describe the feature and its benefits
3. Provide mockups if possible

### 🔧 Submitting Code
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📝 Code Style
- Use consistent indentation (2 spaces)
- Follow existing naming conventions
- Add comments for complex logic
- Test your changes thoroughly

---

## 🏆 Performance Levels

| Score Range | Performance | Emoji |
|-------------|-------------|-------|
| 90%+ | Excellent! | 🏆 |
| 80-89% | Great Job! | 🎉 |
| 70-79% | Good Work! | 👍 |
| 60-69% | Not Bad! | 😊 |
| Below 60% | Keep Practicing! | 💪 |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Fonts** - Beautiful typography
- **CSS Grid & Flexbox** - Modern layout techniques
- **ES6+ JavaScript** - Modern JavaScript features
- **GitHub Community** - Inspiration and support

---

<div align="center">

**Made with ❤️ for the coding community**

[⭐ Star this repo](#) • [🐛 Report issues](#) • [💡 Request features](#)


</div> 
