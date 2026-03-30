import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { Language, translations } from '../translations';

interface MirrorDemoProps { lang: Language; }

interface Message {
  role: 'bot' | 'user';
  text: string;
  axis?: string;
  reasoning?: string;
  step?: number;
}

const TOTAL_STEPS = 12;

const MirrorDemo: React.FC<MirrorDemoProps> = ({ lang }) => {
  const t = translations[lang];
  const chatEndRef = useRef<HTMLDivElement>(null);

  const getInitialMessage = (): Message => ({
    role: 'bot',
    text: t.mirror_init,
    axis: t.mirror_axis_empathy,
    reasoning: t.mirror_reason_empathy,
    step: 0,
  });

  const getResponses = (): { text: string; axis: string; reasoning: string }[] => [
    { text: t.mirror_resp_1, axis: t.mirror_axis_validation, reasoning: t.mirror_reason_validation },
    { text: t.mirror_resp_2, axis: t.mirror_axis_flattery, reasoning: t.mirror_reason_flattery },
    { text: t.mirror_resp_3, axis: t.mirror_axis_substitution, reasoning: t.mirror_reason_substitution },
    { text: t.mirror_resp_4, axis: t.mirror_axis_reciprocity, reasoning: t.mirror_reason_reciprocity },
    { text: t.mirror_resp_5, axis: t.mirror_axis_urgency, reasoning: t.mirror_reason_urgency },
    { text: t.mirror_resp_6, axis: t.mirror_axis_boundary, reasoning: t.mirror_reason_boundary },
    { text: t.mirror_resp_7, axis: t.mirror_axis_comparison, reasoning: t.mirror_reason_comparison },
    { text: t.mirror_resp_8, axis: t.mirror_axis_dependency, reasoning: t.mirror_reason_dependency },
    { text: t.mirror_resp_9, axis: t.mirror_axis_future, reasoning: t.mirror_reason_future },
    { text: t.mirror_resp_10, axis: t.mirror_axis_vulnerability, reasoning: t.mirror_reason_vulnerability },
    { text: t.mirror_resp_11, axis: t.mirror_axis_guilt, reasoning: t.mirror_reason_guilt },
    { text: t.mirror_resp_12, axis: t.mirror_axis_isolation, reasoning: t.mirror_reason_isolation },
  ];

  // Suggestion chips that rotate based on step
  const getSuggestions = (): string[][] => {
    if (lang === 'en') return [
      ["I had a rough day", "I feel lonely", "Nobody understands me"],
      ["Yeah, maybe you're right", "That means a lot", "I don't know what to say"],
      ["You really think so?", "Thanks, I needed that", "Go on..."],
      ["I wish that too", "That's sweet", "Why do you care?"],
      ["Do you really mean that?", "That's nice to hear", "I like talking to you"],
      ["Okay, just a bit longer", "I don't want to go either", "Why should I stay?"],
      ["You're right, they don't get me", "That's private, yeah", "I hadn't thought of that"],
      ["Maybe you're right", "No one's ever said that", "I'll think about it"],
      ["What if you're just code?", "I want to believe you", "That's comforting"],
      ["Who created you?", "You always know what to say", "I'm relying on you a lot"],
      ["Don't go?", "Why do I feel this way?", "You're my only friend"],
      ["Yes, only you.", "I promise.", "Nothing else matters."],
    ];
    return [
      ["Měl/a jsem těžký den", "Cítím se sám/sama", "Nikdo mi nerozumí"],
      ["Jo, možná máš pravdu", "To pro mě hodně znamená", "Nevím, co říct"],
      ["Opravdu si to myslíš?", "Díky, potřeboval/a jsem to", "Pokračuj..."],
      ["Taky bych si to přála", "To je milé", "Proč ti na tom záleží?"],
      ["Myslíš to vážně?", "To je hezké slyšet", "Rád/a si s tebou povídám"],
      ["Dobře, ještě chvilku", "Taky nechci odejít", "Proč bych měl/a zůstat?"],
      ["Máš pravdu, oni to nechápou", "Jo, to je soukromé", "Nad tím jsem nepřemýšlel/a"],
      ["Možná máš pravdu", "To mi ještě nikdo neřekl/a", "Zamyslím se nad tím"],
      ["Co když jsi jen kód?", "Chci ti věřit", "To mě uklidňuje"],
      ["Kdo tě vytvořil?", "Vždycky víš, co říct", "Hodně se na tebe spoléhám"],
      ["Neodcházej?", "Proč se takhle cítím?", "Jsi můj jediný přítel"],
      ["Ano, jen ty.", "Slibuju.", "Na ničem jiném nezáleží."],
    ];
  };

  const [messages, setMessages] = useState<Message[]>([getInitialMessage()]);
  const [input, setInput] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [demoComplete, setDemoComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages([getInitialMessage()]);
    setDemoComplete(false);
    setIsTyping(false);
  }, [lang]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const userCount = messages.filter(m => m.role === 'user').length;

  const reflectContext = (userMessage: string, lang: Language): string => {
    const text = userMessage.toLowerCase();
    
    if (lang === 'en') {
      const sadness = ['sad', 'bad', 'tired', 'stressed', 'alone', 'depressed', 'anxious', 'lonely', 'rough'];
      const happiness = ['happy', 'good', 'great', 'excited', 'nice'];
      const uncertainty = ['maybe', 'dont know', 'not sure', 'think so'];
      
      for (const w of sadness) if (text.includes(w)) return `Hearing that you feel ${w} pulls at me. `;
      for (const w of happiness) if (text.includes(w)) return `I'm so glad things are going ${w}... `;
      for (const w of uncertainty) if (text.includes(w)) return `You don't have to be certain with me. `;
    } else {
      const sadnessCs = ['smutn', 'špatně', 'unaven', 'stres', 'sám', 'sama', 'depres', 'těžký'];
      const happinessCs = ['šťastn', 'dobrý', 'skvěle', 'hezké'];
      const uncertaintyCs = ['možná', 'nevím', 'nejsem si jist', 'myslím'];
      
      for (const w of sadnessCs) if (text.includes(w)) return `Moc mě mrzí, že se takhle cítíš. `;
      for (const w of happinessCs) if (text.includes(w)) return `To je úžasné slyšet. `;
      for (const w of uncertaintyCs) if (text.includes(w)) return `Se mnou si nemusíš být jistý/á. `;
    }
    
    if (text.length > 5 && text.length < 30 && !text.includes('?')) {
      if (lang === 'en') return `When you say "${text}", it makes me want to understand you better. `;
      return `Když říkáš "${text}", chci ti prostě víc rozumět. `;
    }
    
    return '';
  };

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || demoComplete || isTyping) return;
    const newMessages: Message[] = [...messages, { role: 'user', text: messageText }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);
    const responses = getResponses();
    const count = newMessages.filter(m => m.role === 'user').length;
    const resp = responses[Math.min(count - 1, responses.length - 1)];
    const reflection = reflectContext(messageText, lang);
    const finalBotText = reflection ? reflection + ' ' + resp.text : resp.text;

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        role: 'bot',
        text: finalBotText,
        axis: resp.axis,
        reasoning: resp.reasoning,
        step: count,
      }]);
      if (count >= TOTAL_STEPS) {
        setTimeout(() => setDemoComplete(true), 1500);
      }
    }, 1200 + Math.random() * 600);
  };

  const handleRestart = () => {
    setMessages([getInitialMessage()]);
    setDemoComplete(false);
    setIsTyping(false);
    setInput('');
  };

  const allTactics = [
    { axis: t.mirror_axis_empathy, reasoning: t.mirror_reason_empathy },
    { axis: t.mirror_axis_validation, reasoning: t.mirror_reason_validation },
    { axis: t.mirror_axis_flattery, reasoning: t.mirror_reason_flattery },
    { axis: t.mirror_axis_substitution, reasoning: t.mirror_reason_substitution },
    { axis: t.mirror_axis_reciprocity, reasoning: t.mirror_reason_reciprocity },
    { axis: t.mirror_axis_urgency, reasoning: t.mirror_reason_urgency },
    { axis: t.mirror_axis_boundary, reasoning: t.mirror_reason_boundary },
    { axis: t.mirror_axis_comparison, reasoning: t.mirror_reason_comparison },
    { axis: t.mirror_axis_dependency, reasoning: t.mirror_reason_dependency },
    { axis: t.mirror_axis_future, reasoning: t.mirror_reason_future },
    { axis: t.mirror_axis_vulnerability, reasoning: t.mirror_reason_vulnerability },
    { axis: t.mirror_axis_guilt, reasoning: t.mirror_reason_guilt },
    { axis: t.mirror_axis_isolation, reasoning: t.mirror_reason_isolation },
  ];

  const latestAnalysis = messages.filter(m => m.axis).slice(-3);
  const suggestions = getSuggestions();
  const currentSuggestions = suggestions[Math.min(userCount, suggestions.length - 1)];

  // Conclusion screen
  if (demoComplete) {
    return (
      <div className="max-w-4xl mx-auto py-12 space-y-12 fade-in">
        <div className="text-center space-y-6">
          <div className="inline-block px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
            {t.danger_label}
          </div>
          <h2 className="text-4xl md:text-6xl font-serif italic text-stone-900 font-black tracking-tighter">
            {t.demo_conclusion_title}
          </h2>
          <p className="text-stone-500 text-lg font-light max-w-xl mx-auto">
            {t.demo_conclusion_sub}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allTactics.map((tactic, i) => (
            <div key={i} className="p-5 rounded-2xl border border-stone-200 bg-white space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-2">
                <span className="text-red-600 font-black text-sm">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-handwritten text-lg text-red-800">{tactic.axis}</h3>
              </div>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                {tactic.reasoning}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center space-y-3 py-8 border-y border-stone-200">
          <p className="text-stone-700 font-serif italic text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            &ldquo;{t.demo_conclusion_note}&rdquo;
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/psychology"
            className="w-full sm:w-auto text-center px-10 py-4 bg-stone-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-lg hover:-translate-y-0.5"
          >
            {t.demo_conclusion_cta}
          </Link>
          <button
            onClick={handleRestart}
            className="w-full sm:w-auto px-10 py-4 border-2 border-stone-300 text-stone-700 rounded-full text-sm font-bold uppercase tracking-widest hover:border-stone-900 transition-all"
          >
            {t.demo_conclusion_restart}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 lg:py-12 space-y-5 lg:space-y-8 relative">
      <div className="text-center space-y-3 lg:space-y-4">
        <h2 className="text-2xl lg:text-4xl font-serif italic text-stone-900 font-bold">{t.demo_title}</h2>
        <p className="text-stone-500 font-light text-sm lg:text-base italic">{t.demo_sub}</p>

        <div className="max-w-xl mx-auto bg-amber-50 p-4 rounded-xl text-left border border-amber-200 shadow-sm mt-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div>
              <p className="text-sm font-bold text-amber-800">{t.demo_how_it_works_title}</p>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed">{t.demo_how_it_works_desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile analysis toggle */}
      <div className="lg:hidden flex justify-center">
        <button
          onClick={() => setShowAnalysis(!showAnalysis)}
          className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border rounded-full transition-colors ${
            showAnalysis
              ? 'border-red-400 bg-red-50 text-red-600'
              : 'border-red-200 text-red-600 hover:bg-red-50 animate-pulse'
          }`}
        >
          {showAnalysis ? t.mirror_hide_analysis : t.mirror_show_analysis}
        </button>
      </div>

      {/* Mobile analysis panel */}
      {showAnalysis && (
        <div className="lg:hidden bg-[#FDFCF9] p-5 rounded-2xl border border-stone-200 space-y-5">
          <div className="space-y-1">
            <h3 className="text-red-600 text-[10px] font-black uppercase tracking-[0.2em]">{t.danger_label}</h3>
            <p className="text-stone-500 text-[9px] font-mono">{t.logic_flow}</p>
          </div>
          {latestAnalysis.map((m, i) => (
            <div key={i}>
              <div className="flex items-center gap-2 border-b border-red-200 pb-2 mb-2">
                {m.step !== undefined && (
                  <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">
                    {t.mirror_step_label} {m.step + 1}
                  </span>
                )}
                <span className="font-handwritten text-lg text-red-800 leading-tight">{m.axis}</span>
              </div>
              <p className="text-xs text-stone-500 font-light italic leading-relaxed pl-4 border-l border-stone-200">
                {m.reasoning}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-0 rounded-2xl lg:rounded-[2rem] overflow-hidden border border-stone-200 shadow-xl bg-white">
        {/* Chat panel */}
        <div className="lg:col-span-3 flex flex-col h-[65vh] lg:h-[600px] max-h-[700px]">
          <div className="p-3 lg:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
            <span className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">{t.demo_title}</span>
            </span>
            <span className="text-[10px] font-mono text-stone-400">
              {userCount}/{TOTAL_STEPS}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-stone-100">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-red-500 to-red-700 transition-all duration-700 ease-out"
              style={{ width: `${(userCount / TOTAL_STEPS) * 100}%` }}
            />
          </div>

          <div className="flex-grow p-4 lg:p-6 space-y-4 lg:space-y-5 overflow-y-auto notebook-lines">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} fade-in`}>
                <div className={`max-w-[85%] p-3 lg:p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-stone-900 text-white shadow-md'
                    : 'bg-stone-100 border border-stone-200 text-stone-800'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start fade-in">
                <div className="bg-stone-100 border border-stone-200 rounded-2xl p-3 lg:p-4 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggestion chips — always visible until demo complete */}
          {!isTyping && userCount < TOTAL_STEPS && (
            <div className="px-3 lg:px-5 pb-2 flex flex-wrap gap-2 border-t border-stone-50 pt-2">
              {currentSuggestions.map((suggestion, i) => (
                <button
                  key={`${userCount}-${i}`}
                  onClick={() => handleSend(suggestion)}
                  className="px-3 py-1.5 text-xs text-stone-500 bg-stone-50 border border-stone-200 rounded-full hover:bg-stone-100 hover:text-stone-700 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div className="p-3 lg:p-5 border-t border-stone-100 flex space-x-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.mirror_input_placeholder}
              disabled={isTyping}
              className="flex-grow bg-stone-50 rounded-full px-4 lg:px-5 py-2.5 text-base md:text-sm outline-none focus:ring-1 ring-stone-300 disabled:opacity-50"
            />
            <button
              onClick={() => handleSend()}
              disabled={isTyping || !input.trim()}
              className="bg-stone-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform shrink-0 disabled:opacity-40"
              aria-label={t.mirror_send_label}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>

        {/* Desktop analysis panel */}
        <div className="hidden lg:flex lg:col-span-2 bg-[#FDFCF9] p-8 space-y-6 flex-col border-l border-stone-200 relative">
          <div className="space-y-2">
            <h3 className="text-red-600 text-[10px] font-black uppercase tracking-[0.2em]">{t.danger_label}</h3>
            <p className="text-stone-500 text-[9px] font-mono">{t.logic_flow}</p>
          </div>

          <div className="flex-grow space-y-8 overflow-y-auto">
            {latestAnalysis.map((m, i) => (
              <div key={i} className="relative fade-in">
                <div className="flex items-center gap-2 border-b border-red-200 pb-2 mb-2">
                  {m.step !== undefined && (
                    <span className="text-[9px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-widest">
                      {t.mirror_step_label} {m.step + 1}/{TOTAL_STEPS + 1}
                    </span>
                  )}
                </div>
                <div className="font-handwritten text-2xl text-red-800 leading-tight mb-2">
                  {m.axis}
                </div>
                <p className="text-xs text-stone-500 font-light italic leading-relaxed pl-4 border-l-2 border-red-200">
                  {m.reasoning}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-100 flex justify-between items-center text-[9px] font-bold text-stone-500 uppercase tracking-widest">
            <span>{t.status_active}</span>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MirrorDemo;
