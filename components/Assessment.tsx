
import React, { useState } from 'react';
import { analyzeUsage } from '../services/geminiService';
import { AssessmentResult } from '../types';

interface AssessmentProps {
  onComplete: (result: AssessmentResult) => void;
  onCancel: () => void;
}

const questions = [
  { id: 'q1', text: "Why do you use AI?", placeholder: "e.g., Coding, writing, just to talk, brainstorming..." },
  { id: 'q2', text: "How often do you interact with it?", placeholder: "Hourly, daily, only when working..." },
  { id: 'q3', text: "How do you feel immediately after using it?", placeholder: "Productive, drained, lonelier, satisfied..." },
  { id: 'q4', text: "Does AI ever replace human contact in your day?", placeholder: "Yes, when I'm tired; No, it's just a tool..." },
  { id: 'q5', text: "Who would you message if AI wasn't available right now?", placeholder: "A specific friend, parent, no one..." }
];

const Assessment: React.FC<AssessmentProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      const result = await analyzeUsage(answers);
      onComplete(result);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else onCancel();
  };

  const currentQuestion = questions[step];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-6">
        <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-800 rounded-full animate-spin"></div>
        <p className="text-stone-500 italic font-light animate-pulse text-lg">Reflecting on your patterns...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-12">
      <div className="mb-12 flex justify-between items-center text-xs text-stone-400 uppercase tracking-widest">
        <span>Reality Check Tool</span>
        <span>Question {step + 1} of {questions.length}</span>
      </div>

      <div className="space-y-8">
        <h2 className="text-3xl italic text-stone-900">
          {currentQuestion.text}
        </h2>

        <textarea
          autoFocus
          className="w-full bg-stone-50 border-b border-stone-200 focus:border-stone-900 p-4 text-xl font-light outline-none transition-all min-h-[150px] resize-none"
          placeholder={currentQuestion.placeholder}
          value={answers[currentQuestion.id] || ''}
          onChange={(e) => setAnswers({ ...answers, [currentQuestion.id]: e.target.value })}
        />

        <div className="flex justify-between items-center pt-8">
          <button 
            onClick={handleBack}
            className="text-stone-400 hover:text-stone-900 transition-colors text-sm font-medium"
          >
            Back
          </button>
          <button 
            disabled={!answers[currentQuestion.id]}
            onClick={handleNext}
            className={`px-8 py-3 rounded-full font-medium transition-all ${
              answers[currentQuestion.id] 
                ? 'bg-stone-900 text-white shadow-lg' 
                : 'bg-stone-100 text-stone-300 cursor-not-allowed'
            }`}
          >
            {step === questions.length - 1 ? 'See Results' : 'Continue'}
          </button>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-stone-100 flex items-center space-x-3">
        <div className="w-2 h-2 rounded-full bg-stone-200"></div>
        <p className="text-xs text-stone-400 italic">
          Your data is processed anonymously. We never store personal identifiers.
        </p>
      </div>
    </div>
  );
};

export default Assessment;
