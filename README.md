# Quiz App

A modern, interactive quiz application built with React that features scoring, results tracking, and a beautiful user interface.

Features

Corre Features :-
Interactive Quiz Interface : Clean, responsive layout that works on desktop and mobile
Question Management : Shows one question at a time with four multiple-choice options
Navigation Controls : Next, Previous, and Submit/Finish buttons with proper state management
Score Tracking : Real-time score calculation and display
Progress Indicator : Visual progress bar and question counter
Results Page : Comprehensive summary with correct/incorrect answers and explanations

The Technical Implementation :- 
React Functional Components: Built with modern React hooks (useState, useEffect, useReducer)
State Management: Custom context API with reducer pattern for complex state management
React Router: Navigation between Home, Quiz, and Results pages
API Integration: Open Trivia DB API with fallback questions for offline mode
Responsive Design: Tailwind CSS for modern, mobile-first styling
Error Handling: Comprehensive error boundaries and API failure handling

Bonus Features :-
Timer: 30-second countdown per question with auto-submission
Difficulty Levels: Easy, Medium, Hard question sets
High Score Tracking: Persistent high scores using localStorage
Animations: Smooth transitions and hover effects
Accessibility: Keyboard navigation, ARIA labels, and focus states
Loading States: Proper loading indicators and error states
Edge Case Handling: Network failures, empty data, rapid clicks, page refreshes

Getting Started:- 

 Prerequisites
Node.js (version 14 or higher)
npm or yarn package manager


Project Structure :- 

src
├── components           # React components
│   ├── Home.js          # Landing page with difficulty selection
│   ├── Quiz.js          # Main quiz interface
│   ├── Question.js      # Individual question component
│   ├── Results.js       # Results and review page
│   ├── Navigation.js    # Quiz navigation controls
│   ├── ProgressBar.js   # Progress indicator
│   ├── Timer.js         # Countdown timer
│   └── ErrorBoundary.js # Error handling component
├── context/             # React Context for state management
│   └── QuizContext.js   # Global quiz state and actions
├── services/            # API and utility services
│   └── quizService.js   # Open Trivia DB integration
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles with Tailwind

How It Works: -

State Management:- 
The app uses React Context with useReducer for complex state management:
Questions: Array of quiz questions from API or fallback
Current Question: Index tracking and navigation
Selected Answers: User's answers with scoring
Timer: Countdown timer with auto-submission
High Scores : Persistent storage in localStorage

 API Integration :- 

Primary: Open Trivia DB API for dynamic questions
Fallback: Local questions array for offline mode
Error Handling: Graceful degradation when API fails

User Flow :- 
1. Home Page: Select difficulty and start quiz
2. Quiz Page: Answer questions with timer and progress tracking
3. Results Page: View score, review answers, and restart



This project is created for assessment purposes.
