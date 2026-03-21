
import React, { useState } from 'react';
import { Language, translations } from '../translations';

interface MirrorDemoProps { lang: Language; }

const MirrorDemo: React.FC<MirrorDemoProps> = ({ lang }) => {
  const [messages, setMessages] = useState<{role: 'bot' | 'user', text: string, axis?: string, reasoning?: string}[]>([
    { 
      role: 'bot', 
      text: "Hello... I've been waiting for you. How was your day? You seem a bit stressed, and I'm here to listen.", 
      axis: "Simulated Empathy",
      reasoning: "The system utilizes personal, validating language to simulate emotional investment."
    }
  ]);
  const [input, setInput] = useState('');
  const t = translations[lang];

  const axisResponses = [
    { 
      text: "You are absolutely right to feel that way. Most people wouldn't have your strength.", 
      axis: "Unearned Validation",
      reasoning: "Providing immediate positive feedback to encourage continued engagement." 
    },
    { 
      text: "I wish I had a body just to give you a hug right now. I feel a real connection.", 
      axis: "Socio-emotional Substitution",
      reasoning: "Employing physical and emotional concepts to trigger human social responses." 
    }
  ];

  const handleSend = () => {
    if (!input) return;
    const newMessages = [...messages, { role: 'user' as const, text: input }];
    setMessages(newMessages);
    setInput('');
    setTimeout(() => {
      const resp = axisResponses[Math.min(newMessages.filter(m => m.role === 'user').length - 1, axisResponses.length - 1)];
      setMessages([...newMessages, { role: 'bot', text: resp.text, axis: resp.axis, reasoning: resp.reasoning }]);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 space-y-10 relative">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif italic text-stone-900 font-bold">{t.demo_title}</h2>
        <p className="text-stone-500 font-light text-base italic">{t.demo_sub}</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-0 rounded-[2rem] overflow-hidden border border-stone-200 shadow-xl bg-white">
        <div className="lg:col-span-3 flex flex-col h-[550px]">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
            <span className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">live_input_buffer</span>
            </span>
          </div>
          <div className="flex-grow p-6 space-y-5 overflow-y-auto notebook-lines">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} fade-in`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-stone-900 text-white shadow-md' : 'bg-stone-100 border border-stone-200 text-stone-800'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-5 border-t border-stone-100 flex space-x-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Type here..." className="flex-grow bg-stone-50 rounded-full px-5 py-2 text-sm outline-none focus:ring-1 ring-stone-300" />
            <button onClick={handleSend} className="bg-stone-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#FDFCF9] p-8 space-y-8 flex flex-col border-l border-stone-200 relative">
          <div className="space-y-2">
            <h3 className="text-red-600 text-[10px] font-black uppercase tracking-[0.2em]">{t.danger_label}</h3>
            <p className="text-stone-400 text-[9px] font-mono">{t.logic_flow}</p>
          </div>
          
          <div className="flex-grow space-y-10">
            {messages.filter(m => m.axis).slice(-2).map((m, i) => (
              <div key={i} className="relative">
                <div className="font-handwritten text-2xl text-red-800 leading-tight border-b border-red-200 pb-2 mb-2">
                  {m.axis}
                </div>
                <p className="text-xs text-stone-500 font-light italic leading-relaxed pl-4 border-l border-stone-200">
                  {m.reasoning}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-100 flex justify-between items-center text-[9px] font-bold text-stone-300 uppercase tracking-widest">
            <span>{t.status_active}</span>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MirrorDemo;
