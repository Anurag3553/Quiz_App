import React from 'react';
import { useQuiz } from '../context/QuizContext';

function Timer() {
  const { state } = useQuiz();
  const { timeRemaining } = state;

  const getTimerColor = () => {
    if (timeRemaining <= 5) return 'text-red-600';
    if (timeRemaining <= 10) return 'text-yellow-600';
    return 'text-blue-600';
  };

  const getTimerBgColor = () => {
    if (timeRemaining <= 5) return 'bg-red-100';
    if (timeRemaining <= 10) return 'bg-yellow-100';
    return 'bg-blue-100';
  };

  return (
    <div className={`flex items-center px-3 py-2 rounded-lg ${getTimerBgColor()}`}>
      <svg 
        className={`w-5 h-5 mr-2 ${getTimerColor()}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <span className={`font-mono font-bold ${getTimerColor()}`}>
        {timeRemaining}s
      </span>
    </div>
  );
}

export default Timer;

