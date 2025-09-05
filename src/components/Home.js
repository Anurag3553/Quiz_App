import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { fetchQuestions, FALLBACK_QUESTIONS, DIFFICULTY_LEVELS } from '../services/quizService';

function Home() {
  const navigate = useNavigate();
  const { dispatch, state, ACTIONS } = useQuiz();
  const [selectedDifficulty, setSelectedDifficulty] = useState(state.difficulty);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartQuiz = async () => {
    setIsLoading(true);
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.SET_DIFFICULTY, payload: selectedDifficulty });

    try {
      // Try to fetch from API first
      const questions = await fetchQuestions(10, selectedDifficulty);
      dispatch({ type: ACTIONS.SET_QUESTIONS, payload: questions });
      navigate('/quiz');
    } catch (error) {
      console.warn('API failed, using fallback questions:', error);
      // Use fallback questions if API fails
      dispatch({ type: ACTIONS.SET_QUESTIONS, payload: FALLBACK_QUESTIONS });
      navigate('/quiz');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Quiz App</h1>
          <p className="text-gray-600 mb-8">
            Test your knowledge with our interactive quiz!
          </p>
          
          {state.highScore > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 font-medium">
                🏆 Your High Score: {state.highScore}/10
              </p>
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
              Select Difficulty:
            </label>
            <select
              id="difficulty"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            >
              <option value={DIFFICULTY_LEVELS.easy}>Easy</option>
              <option value={DIFFICULTY_LEVELS.medium}>Medium</option>
              <option value={DIFFICULTY_LEVELS.hard}>Hard</option>
            </select>
          </div>

          <button
            onClick={handleStartQuiz}
            disabled={isLoading}
            className="w-full btn-primary text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Loading Questions...
              </div>
            ) : (
              'Start Quiz'
            )}
          </button>

          <div className="mt-6 text-sm text-gray-500">
            <p>• 10 multiple choice questions</p>
            <p>• 30 seconds per question</p>
            <p>• Instant feedback</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
