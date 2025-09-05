import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import Question from './Question';
import ProgressBar from './ProgressBar';
import Timer from './Timer';
import Navigation from './Navigation';

function Quiz() {
  const navigate = useNavigate();
  const { state, dispatch, ACTIONS } = useQuiz();
  const [hasAnswered, setHasAnswered] = useState(false);

  const { questions, currentQuestionIndex, selectedAnswers, isLoading, error } = state;

  // Start timer when component mounts or question changes
  useEffect(() => {
    if (questions.length > 0) {
      dispatch({ type: ACTIONS.SET_TIMER, payload: 30 });
      setHasAnswered(false);
    }
  }, [currentQuestionIndex, questions.length, dispatch, ACTIONS]);

  // Handle quiz completion
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex >= questions.length) {
      dispatch({ type: ACTIONS.SET_QUIZ_COMPLETED, payload: true });
      navigate('/results');
    }
  }, [currentQuestionIndex, questions.length, navigate, dispatch, ACTIONS]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Quiz</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  // Handle no questions
  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-gray-500 text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Questions Available</h2>
          <p className="text-gray-600 mb-6">Please try again later.</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasSelectedAnswer = selectedAnswers[currentQuestionIndex] !== undefined;

  const handleAnswerSelect = (answer) => {
    dispatch({ type: ACTIONS.SET_SELECTED_ANSWER, payload: answer });
    setHasAnswered(true);
  };

  const handleNext = () => {
    dispatch({ type: ACTIONS.STOP_TIMER });
    if (isLastQuestion) {
      dispatch({ type: ACTIONS.SET_QUIZ_COMPLETED, payload: true });
      navigate('/results');
    } else {
      dispatch({ type: ACTIONS.SET_CURRENT_QUESTION, payload: currentQuestionIndex + 1 });
    }
  };

  const handlePrevious = () => {
    dispatch({ type: ACTIONS.STOP_TIMER });
    if (currentQuestionIndex > 0) {
      dispatch({ type: ACTIONS.SET_CURRENT_QUESTION, payload: currentQuestionIndex - 1 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-800">Quiz Time!</h1>
              <p className="text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Timer />
              <div className="text-sm text-gray-600">
                Score: {state.score}/{currentQuestionIndex}
              </div>
            </div>
          </div>
          <ProgressBar 
            current={currentQuestionIndex + 1} 
            total={questions.length} 
          />
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 animate-slide-in">
          <Question
            question={currentQuestion}
            selectedAnswer={selectedAnswers[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            hasAnswered={hasAnswered}
          />
        </div>

        {/* Navigation */}
        <Navigation
          onNext={handleNext}
          onPrevious={handlePrevious}
          hasSelectedAnswer={hasSelectedAnswer}
          isLastQuestion={isLastQuestion}
          canGoBack={currentQuestionIndex > 0}
        />
      </div>
    </div>
  );
}

export default Quiz;
