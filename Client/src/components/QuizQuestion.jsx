import React from 'react';

function QuizQuestion({ question, onAnswer, selectedAnswers }) {
    // Filter out options that have already been selected
    const filteredOptions = question.options.filter(option =>
        !selectedAnswers.includes(option)
    );

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">{question.text}</h3>
            <div className="space-y-2">
                {filteredOptions.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswer(option)}
                        className="w-full text-left px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default QuizQuestion;
