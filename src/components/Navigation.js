import React from 'react';

function Navigation({ onNext, onPrevious, hasSelectedAnswer, isLastQuestion, canGoBack }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        {/* Previous Button */}
        <button
          onClick={onPrevious}
          disabled={!canGoBack}
          className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            canGoBack
              ? 'btn-secondary hover:bg-gray-300'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          aria-label="Go to previous question"
        >
          <div className="flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </div>
        </button>

        {/* Next/Finish Button */}
        <button
          onClick={onNext}
          disabled={!hasSelectedAnswer}
          className={`w-full sm:w-auto px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
            hasSelectedAnswer
              ? isLastQuestion
                ? 'btn-success hover:bg-green-700'
                : 'btn-primary hover:bg-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          aria-label={isLastQuestion ? 'Finish quiz' : 'Go to next question'}
        >
          <div className="flex items-center justify-center">
            {isLastQuestion ? 'Finish Quiz' : 'Next'}
            {!isLastQuestion && (
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
        </button>
      </div>

      {/* Helper Text */}
      {!hasSelectedAnswer && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Please select an answer to continue
          </p>
        </div>
      )}
    </div>
  );
}

export default Navigation;
