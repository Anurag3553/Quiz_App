import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

function Results() {
  const navigate = useNavigate();
  const { state, dispatch, ACTIONS } = useQuiz();
  const { questions, selectedAnswers, score, highScore } = state;

  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  const getScoreMessage = () => {
    if (percentage >= 90) return { message: "Outstanding! 🏆", color: "text-green-600" };
    if (percentage >= 80) return { message: "Excellent! 🌟", color: "text-blue-600" };
    if (percentage >= 70) return { message: "Good job! 👍", color: "text-yellow-600" };
    if (percentage >= 60) return { message: "Not bad! 😊", color: "text-orange-600" };
    return { message: "Keep practicing! 💪", color: "text-red-600" };
  };

  const scoreInfo = getScoreMessage();

  const handleRestart = () => {
    dispatch({ type: ACTIONS.RESET_QUIZ });
    navigate('/');
  };

  const handleViewDetails = () => {
    // Scroll to details section
    document.getElementById('quiz-details').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Results Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 text-center animate-fade-in">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '😊' : '💪'}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
          <p className={`text-xl font-semibold ${scoreInfo.color} mb-4`}>
            {scoreInfo.message}
          </p>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {score}/{totalQuestions}
            </div>
            <div className="text-lg text-gray-600 mb-2">
              {percentage}% Correct
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          {score >= highScore && score > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 font-medium">
                🏆 New High Score! You've improved your best performance!
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="btn-primary text-lg px-8 py-3"
            >
              Take Another Quiz
            </button>
            <button
              onClick={handleViewDetails}
              className="btn-secondary text-lg px-8 py-3"
            >
              View Details
            </button>
          </div>
        </div>

        {/* Quiz Details */}
        <div id="quiz-details" className="bg-white rounded-2xl shadow-lg p-8 animate-slide-in">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quiz Review</h2>
          
          <div className="space-y-6">
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correct_answer;
              
              return (
                <div
                  key={index}
                  className={`border-2 rounded-lg p-6 ${
                    isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-600 mr-2">
                        Question {index + 1}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isCorrect 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>
                    <div className="text-2xl">
                      {isCorrect ? '✅' : '❌'}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {question.question}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="font-medium text-gray-700">Your Answer:</span>
                      <span className={`font-medium ${
                        isCorrect ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {userAnswer || 'No answer selected'}
                      </span>
                    </div>
                    
                    {!isCorrect && (
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <span className="font-medium text-gray-700">Correct Answer:</span>
                        <span className="font-medium text-green-600">
                          {question.correct_answer}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <button
              onClick={handleRestart}
              className="btn-primary text-lg px-8 py-3"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
