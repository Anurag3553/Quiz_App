import React, { createContext, useContext, useReducer, useEffect } from 'react';

const QuizContext = createContext();

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_QUESTIONS: 'SET_QUESTIONS',
  SET_ERROR: 'SET_ERROR',
  SET_CURRENT_QUESTION: 'SET_CURRENT_QUESTION',
  SET_SELECTED_ANSWER: 'SET_SELECTED_ANSWER',
  SET_QUIZ_COMPLETED: 'SET_QUIZ_COMPLETED',
  SET_DIFFICULTY: 'SET_DIFFICULTY',
  SET_TIMER: 'SET_TIMER',
  STOP_TIMER: 'STOP_TIMER',
  RESET_QUIZ: 'RESET_QUIZ',
  SET_HIGH_SCORE: 'SET_HIGH_SCORE'
};

// Initial state
const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswers: {},
  score: 0,
  isCompleted: false,
  isLoading: false,
  error: null,
  difficulty: 'medium',
  timeRemaining: 30,
  isTimerActive: false,
  highScore: 0
};

// Reducer function
function quizReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case ACTIONS.SET_QUESTIONS:
      return { 
        ...state, 
        questions: action.payload, 
        isLoading: false, 
        error: null,
        currentQuestionIndex: 0,
        selectedAnswers: {},
        score: 0,
        isCompleted: false
      };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    
    case ACTIONS.SET_CURRENT_QUESTION:
      return { ...state, currentQuestionIndex: action.payload };
    
    case ACTIONS.SET_SELECTED_ANSWER:
      const newSelectedAnswers = {
        ...state.selectedAnswers,
        [state.currentQuestionIndex]: action.payload
      };
      
      // Calculate score
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const isCorrect = currentQuestion && action.payload === currentQuestion.correct_answer;
      const newScore = isCorrect ? state.score + 1 : state.score;
      
      return {
        ...state,
        selectedAnswers: newSelectedAnswers,
        score: newScore
      };
    
    case ACTIONS.SET_QUIZ_COMPLETED:
      return { 
        ...state, 
        isCompleted: true,
        isTimerActive: false,
        highScore: Math.max(state.highScore, state.score)
      };
    
    case ACTIONS.SET_DIFFICULTY:
      return { ...state, difficulty: action.payload };
    
    case ACTIONS.SET_TIMER:
      return { ...state, timeRemaining: action.payload, isTimerActive: true };
    
    case ACTIONS.STOP_TIMER:
      return { ...state, isTimerActive: false };
    
    case ACTIONS.RESET_QUIZ:
      return {
        ...initialState,
        highScore: state.highScore
      };
    
    case ACTIONS.SET_HIGH_SCORE:
      return { ...state, highScore: action.payload };
    
    default:
      return state;
  }
}

// Provider component
export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Load high score from localStorage on mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('quizHighScore');
    if (savedHighScore) {
      dispatch({ type: ACTIONS.SET_HIGH_SCORE, payload: parseInt(savedHighScore) });
    }
  }, []);

  // Save high score to localStorage when it changes
  useEffect(() => {
    if (state.highScore > 0) {
      localStorage.setItem('quizHighScore', state.highScore.toString());
    }
  }, [state.highScore]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (state.isTimerActive && state.timeRemaining > 0) {
      interval = setInterval(() => {
        dispatch({ type: ACTIONS.SET_TIMER, payload: state.timeRemaining - 1 });
      }, 1000);
    } else if (state.timeRemaining === 0 && state.isTimerActive) {
      // Auto-submit when timer runs out
      const currentQuestion = state.questions[state.currentQuestionIndex];
      if (currentQuestion && !state.selectedAnswers[state.currentQuestionIndex]) {
        dispatch({ 
          type: ACTIONS.SET_SELECTED_ANSWER, 
          payload: null // No answer selected
        });
        dispatch({ type: ACTIONS.STOP_TIMER });
      }
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [state.isTimerActive, state.timeRemaining, state.questions, state.currentQuestionIndex, state.selectedAnswers]);

  const value = {
    state,
    dispatch,
    ACTIONS
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
}

// Custom hook to use the quiz context
export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}

