import React from 'react';
import { useQuiz } from '../context/QuizContext';

function Question({ question, selectedAnswer, onAnswerSelect, hasAnswered }) {
  const { dispatch, ACTIONS } = useQuiz();
  if (!question) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading question...</p>
      </div>
    );
  }

  const getOptionClass = (option) => {
    let baseClass = 'option-button';
    
    if (selectedAnswer === option) {
      baseClass += ' selected';
    }
    
    if (hasAnswered) {
      if (option === question.correct_answer) {
        baseClass += ' correct';
      } else if (selectedAnswer === option && option !== question.correct_answer) {
        baseClass += ' incorrect';
      }
    }
    
    return baseClass;
  };

  const getOptionIcon = (option) => {
    if (!hasAnswered) return null;
    
    if (option === question.correct_answer) {
      return <span className="text-green-600 font-bold">✓</span>;
    } else if (selectedAnswer === option && option !== question.correct_answer) {
      return <span className="text-red-600 font-bold">✗</span>;
    }
    
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Question Header */}
      <div className="text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
          {question.category}
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              if (!hasAnswered) {
                dispatch({ type: ACTIONS.STOP_TIMER });
                onAnswerSelect(option);
              }
            }}
            disabled={hasAnswered}
            className={getOptionClass(option)}
            aria-label={`Option ${index + 1}: ${option}`}
          >
            <div className="flex items-center justify-between">
              <span className="flex-1 text-left">{option}</span>
              {getOptionIcon(option)}
            </div>
          </button>
        ))}
      </div>

      {/* Answer Feedback */}
      {hasAnswered && (
        <div className="mt-6 p-4 rounded-lg bg-gray-50 border-l-4 border-blue-500">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {selectedAnswer === question.correct_answer ? (
                <span className="text-green-600 text-xl">🎉</span>
              ) : (
                <span className="text-red-600 text-xl">😔</span>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">
                {selectedAnswer === question.correct_answer ? 'Correct!' : 'Incorrect!'}
              </p>
              {selectedAnswer !== question.correct_answer && (
                <p className="text-sm text-gray-600 mt-1">
                  The correct answer is: <span className="font-medium text-green-600">
                    {question.correct_answer}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Question;
