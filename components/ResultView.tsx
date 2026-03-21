
import React from 'react';
import { AssessmentResult } from '../types';

interface ResultViewProps {
  result: AssessmentResult;
  onDone: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, onDone }) => {
  return (
    <div className="max-w-2xl mx-auto py-8 space-y-12">
      <header className="text-center space-y-4">
        <span className="inline-block px-3 py-1 bg-stone-100 text-stone-600 text-xs font-semibold rounded-full uppercase tracking-widest">
          {result.mode}
        </span>
        <h2 className="text-4xl italic text-stone-900">Current Reflection</h2>
        <p className="text-stone-600 text-lg leading-relaxed max-w-lg mx-auto font-light">
          {result.analysis}
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="bg-stone-50 p-8 rounded-2xl space-y-6">
          <h3 className="text-xl font-semibold text-stone-800">Human Actions</h3>
          <ul className="space-y-4">
            {result.redirects.actions.map((action, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-sm text-stone-600">
                <span className="text-stone-400 font-serif italic text-lg">{idx + 1}.</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-stone-50 p-8 rounded-2xl space-y-6">
          <h3 className="text-xl font-semibold text-stone-800">Connection Template</h3>
          <p className="text-xs text-stone-400 uppercase tracking-wider italic mb-2">Text this to someone real:</p>
          <div className="bg-white p-4 rounded-lg border border-stone-200 text-sm italic text-stone-700 leading-relaxed shadow-sm">
            "{result.redirects.template}"
          </div>
        </section>

        <section className="bg-stone-900 text-white p-8 rounded-2xl space-y-6">
          <h3 className="text-xl font-semibold text-stone-100">Offline Micro-Task</h3>
          <p className="text-sm font-light text-stone-300">
            {result.redirects.microTask}
          </p>
          <div className="pt-4 flex items-center text-xs text-stone-500 uppercase tracking-widest">
            <span>Intentionality Score: 100%</span>
          </div>
        </section>

        <section className="border border-stone-200 p-8 rounded-2xl space-y-6">
          <h3 className="text-xl font-semibold text-stone-800">Reflection Prompt</h3>
          <p className="text-sm italic text-stone-600 leading-relaxed">
            {result.redirects.reflection}
          </p>
        </section>
      </div>

      <div className="text-center pt-8 border-t border-stone-100">
        <p className="text-stone-500 text-sm mb-8 font-light italic">
          You are ready. The goal is not to stay on this platform, but to re-engage with the world.
        </p>
        <button 
          onClick={onDone}
          className="px-12 py-4 border-2 border-stone-900 text-stone-900 rounded-full font-semibold hover:bg-stone-900 hover:text-white transition-all"
        >
          Exit and Breathe
        </button>
      </div>
    </div>
  );
};

export default ResultView;
