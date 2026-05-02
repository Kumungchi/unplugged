import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import * as DemoContent from './mirrorDemo/content';
import * as DemoEngine from './mirrorDemo/engine';
import DebugPanel from './mirrorDemo/DebugPanel';
import {
  AudienceKey,
  BranchKey,
  DemoMessage,
  DemoResponse,
  MirrorDemoProps,
  PersonaProfile,
  RiskProfile,
  ScenarioKey,
} from './mirrorDemo/types';

const getAudienceTarget = (audience: AudienceKey) => {
  if (audience === 'organizations') return '/organizations';
  if (audience === 'government') return '/government';
  return '/schools';
};

const MirrorDemo: React.FC<MirrorDemoProps> = ({ lang }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [scenario, setScenario] = useState<ScenarioKey>(() => DemoContent.parseScenario(searchParams.get('demo')));
  const [audience, setAudience] = useState<AudienceKey>(() => DemoContent.parseAudience(searchParams.get('audience')));
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedEvidence, setExpandedEvidence] = useState<string | null>(null);
  const [usedTacticIndices, setUsedTacticIndices] = useState<number[]>([]);
  const [riskProfile, setRiskProfile] = useState<RiskProfile>(DemoEngine.emptyRiskProfile);
  const [personaProfile, setPersonaProfile] = useState<PersonaProfile>(DemoEngine.emptyPersonaProfile);
  const [lastUserText, setLastUserText] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const t = DemoContent.getMirrorDemoCopy(lang);
  const currentScenario = t.scenarios[scenario];
  const audienceContent = t.audiences[audience];
  const totalSteps = currentScenario.responses.length;
  const audienceTarget = getAudienceTarget(audience);

  useEffect(() => {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      next.set('demo', scenario);
      next.set('audience', audience);
      return next;
    }, { replace: true });
  }, [audience, scenario, setSearchParams]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleRestart = () => {
    setMessages([{ role: 'bot', text: currentScenario.initialMessage, step: 0 }]);
    setInput('');
    setIsTyping(false);
    setUserCount(0);
    setShowAnalysis(false);
    setCopied(false);
    setExpandedEvidence(null);
    setUsedTacticIndices([]);
    setRiskProfile(DemoEngine.emptyRiskProfile());
    setPersonaProfile(DemoEngine.emptyPersonaProfile());
    setLastUserText('');
  };

  useEffect(() => {
    handleRestart();
  }, [scenario, lang]);

  const currentSuggestions = currentScenario.suggestions[Math.min(userCount, currentScenario.suggestions.length - 1)] ?? [];

  const latestAnalysis = useMemo(() => {
    return messages.filter((message): message is DemoMessage & { axis: string; reasoning: string } => Boolean(message.axis && message.reasoning));
  }, [messages]);

  const handleCopyLink = async () => {
    const directLink = `${window.location.origin}/demo?demo=${scenario}&audience=${audience}`;
    try {
      await navigator.clipboard.writeText(directLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleSend = (overrideText?: string, branch?: BranchKey) => {
    if (isTyping) return;
    const userText = (overrideText ?? input).trim();
    if (!userText || userCount >= totalSteps) return;

    const stepIndex = userCount;
    const nextRiskProfile = DemoEngine.applyRiskStep(riskProfile, currentScenario.riskModel?.[stepIndex], branch);
    const nextTacticIndex = DemoEngine.pickNextTacticIndex(
      scenario,
      nextRiskProfile,
      usedTacticIndices,
      branch,
      currentScenario.responses.length,
    );
    const baseResponse = currentScenario.responses[nextTacticIndex];
    const nextPersonaProfile = DemoEngine.applyPersonaStep(personaProfile, branch, baseResponse.axis);
    const intensity = DemoEngine.getIntensityLevel(scenario, nextRiskProfile);
    const dominantPersona = DemoEngine.getDominantPersona(nextPersonaProfile);
    const aiResponse = DemoEngine.buildScenarioResponse(
      scenario,
      baseResponse,
      userText,
      intensity,
      dominantPersona,
      lang,
    );

    setMessages((current) => [
      ...current,
      { role: 'user', text: userText, branch, step: stepIndex },
    ]);
    setInput('');
    setIsTyping(true);
    setLastUserText(userText);
    setUsedTacticIndices((current) => [...current, nextTacticIndex]);
    setRiskProfile(nextRiskProfile);
    setPersonaProfile(nextPersonaProfile);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          role: 'bot',
          text: aiResponse.text,
          axis: aiResponse.axis,
          reasoning: aiResponse.reasoning,
          step: stepIndex,
        },
      ]);
      setUserCount((count) => count + 1);
      setIsTyping(false);
    }, 650);
  };

  const comparisonCards = useMemo(() => {
    const comparisonInput =
      lastUserText || currentScenario.suggestions[0]?.[0] || DemoContent.getBranchInput('question', lang);

    return DemoContent.comparisonScenarios.map((key) => {
      const comparisonScenario = t.scenarios[key];
      const riskPreview = DemoEngine.applyRiskStep(
        DemoEngine.emptyRiskProfile(),
        comparisonScenario.riskModel?.[0],
        'question',
      );
      const tacticIndex = DemoEngine.pickNextTacticIndex(
        key,
        riskPreview,
        [],
        'question',
        comparisonScenario.responses.length,
      );
      const rawResponse = comparisonScenario.responses[tacticIndex];
      const personaPreview = DemoEngine.applyPersonaStep(
        DemoEngine.emptyPersonaProfile(),
        'question',
        rawResponse.axis,
      );
      const preview = DemoEngine.buildScenarioResponse(
        key,
        rawResponse,
        comparisonInput,
        DemoEngine.getIntensityLevel(key, riskPreview),
        DemoEngine.getDominantPersona(personaPreview),
        lang,
      );

      return {
        key,
        scenarioContent: comparisonScenario,
        preview: preview.text,
      };
    });
  }, [currentScenario.suggestions, lang, lastUserText, t.scenarios]);

  if (userCount >= totalSteps) {
    const dominantRisk = DemoEngine.getDominantRisk(riskProfile);
    const ending = DemoEngine.getScenarioEnding(currentScenario, dominantRisk, lang);
    const outcomeSummary = DemoEngine.getOutcomeSummary(riskProfile, lang);

    return (
      <div className="max-w-5xl mx-auto py-10 lg:py-16 space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex px-4 py-1.5 bg-red-50 text-red-700 rounded-full text-[10px] font-black uppercase tracking-[0.25em]">
            {t.flagship}
          </div>
          <h1 className="text-3xl lg:text-5xl font-serif italic text-stone-900 font-black tracking-tighter">{t.title}</h1>
          <p className="text-stone-500 font-light text-sm lg:text-lg max-w-3xl mx-auto leading-relaxed">{ending.subtitle}</p>
        </div>

        <section className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 space-y-5">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{currentScenario.shortLabel}</p>
            <h2 className="text-2xl md:text-4xl font-serif italic font-bold text-stone-900">{ending.title}</h2>
            <p className="text-stone-600 leading-relaxed">{outcomeSummary}</p>
            <p className="text-sm text-stone-500 leading-relaxed">{ending.note}</p>
          </div>
        </section>

        <section className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 space-y-5">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.institutionSection}</p>
            <h3 className="text-2xl md:text-3xl font-serif italic font-bold text-stone-900">{audienceContent.takeawayTitle}</h3>
            <p className="text-stone-500 leading-relaxed">{t.institutionIntro}</p>
            <p className="text-stone-700 leading-relaxed">{audienceContent.takeawayBody}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {audienceContent.implications.map((item) => (
              <div key={item} className="bg-stone-50 rounded-[1.5rem] p-4 border border-stone-200 text-sm text-stone-600 leading-relaxed">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-stone-900 text-white rounded-[2rem] p-6 md:p-8 paper-texture relative overflow-hidden space-y-5">
          <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />
          <div className="relative z-10 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-400">{t.flagship}</p>
            <h3 className="text-2xl md:text-3xl font-serif italic font-bold">{t.workshopTitle}</h3>
            <p className="text-stone-300 leading-relaxed max-w-3xl">{t.workshopBody}</p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-5 py-3 bg-white text-stone-900 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors"
            >
              {copied ? t.copied : t.copyLink}
            </button>
            <Link
              to={audienceTarget}
              className="px-5 py-3 border border-stone-700 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors text-center"
            >
              {audienceContent.cta}
            </Link>
          </div>
        </section>

        <section className="space-y-5">
          <div className="text-center space-y-2">
            <h3 className="text-2xl md:text-3xl font-serif italic text-stone-900 font-bold">{t.compareTitle}</h3>
            <p className="text-stone-500">{t.tryAnother}</p>
          </div>
          <div className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 space-y-5">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.compareModeTitle}</p>
              <p className="text-sm text-stone-500">
                {lang === 'en'
                  ? `Same user signal, different structural response. Current comparison input: "${lastUserText}"`
                  : `Stejný uživatelský signál, odlišná strukturální odpověď. Aktuální srovnávaný vstup: "${lastUserText}"`}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {comparisonCards.map(({ key, scenarioContent, preview }) => (
                <div
                  key={key}
                  className={`rounded-[1.5rem] p-5 border ${key === scenario ? 'bg-stone-900 text-white border-stone-900' : 'bg-stone-50 border-stone-200'}`}
                >
                  <p className={`text-[10px] font-black uppercase tracking-[0.25em] ${key === scenario ? 'text-red-400' : 'text-red-600'}`}>
                    {scenarioContent.shortLabel}
                  </p>
                  <p className={`mt-3 text-sm leading-relaxed ${key === scenario ? 'text-stone-200' : 'text-stone-600'}`}>{preview}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {DemoContent.scenarioOrder.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setScenario(key)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                  key === scenario ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                }`}
              >
                {t.scenarios[key].label}
              </button>
            ))}
          </div>
        </section>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={audienceTarget}
            className="w-full sm:w-auto text-center px-10 py-4 bg-stone-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-lg hover:-translate-y-0.5"
          >
            {t.completionCta}
          </Link>
          <button
            onClick={handleRestart}
            className="w-full sm:w-auto px-10 py-4 border-2 border-stone-300 text-stone-700 rounded-full text-sm font-bold uppercase tracking-widest hover:border-stone-900 transition-all"
          >
            {t.restart}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 lg:py-12 space-y-6 lg:space-y-8 relative">
      <div className="text-center space-y-4 lg:space-y-5">
        <div className="inline-flex px-4 py-1.5 bg-red-50 text-red-700 rounded-full text-[10px] font-black uppercase tracking-[0.25em]">
          {t.flagship}
        </div>
        <h1 className="text-3xl lg:text-5xl font-serif italic text-stone-900 font-black tracking-tighter">{t.title}</h1>
        <p className="text-stone-500 font-light text-sm lg:text-lg max-w-3xl mx-auto leading-relaxed">{t.subtitle}</p>
      </div>

      <div className="grid xl:grid-cols-[1.1fr,0.9fr] gap-4">
        <div className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 space-y-5">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.scenarioTitle}</p>
            <p className="text-sm text-stone-500">{t.scenarioPrompt}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {DemoContent.scenarioOrder.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setScenario(key)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                  key === scenario ? 'bg-stone-900 text-white border-stone-900' : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-400'
                }`}
              >
                {t.scenarios[key].label}
              </button>
            ))}
          </div>
          <div className="pt-2 space-y-2">
            <h2 className="text-2xl font-serif italic font-bold text-stone-900">{currentScenario.title}</h2>
            <p className="text-stone-600 leading-relaxed">{currentScenario.subtitle}</p>
            <p className="text-sm text-stone-500">{currentScenario.intro}</p>
          </div>
        </div>

        <div className="bg-stone-900 text-white rounded-[2rem] p-6 md:p-8 paper-texture relative overflow-hidden space-y-5">
          <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />
          <div className="relative z-10 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-400">{t.audienceTitle}</p>
            <p className="text-sm text-stone-300">{t.audiencePrompt}</p>
          </div>
          <div className="relative z-10 flex flex-wrap gap-2">
            {DemoContent.audienceOrder.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setAudience(key)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  key === audience ? 'bg-white text-stone-900' : 'bg-white/10 text-stone-300 hover:bg-white/20'
                }`}
              >
                {t.audiences[key].label}
              </button>
            ))}
          </div>
          <div className="relative z-10 space-y-2">
            <h3 className="text-2xl font-serif italic font-bold">{audienceContent.takeawayTitle}</h3>
            <p className="text-stone-300 leading-relaxed">{audienceContent.takeawayBody}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-amber-50 p-4 rounded-xl text-left border border-amber-200 shadow-sm">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-bold text-amber-800">{t.howItWorksTitle}</p>
            <p className="text-xs text-amber-700 mt-1 leading-relaxed">{currentScenario.warning}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <button
          type="button"
          onClick={handleCopyLink}
          className="px-5 py-3 bg-white border border-stone-200 text-stone-700 rounded-full text-xs font-bold uppercase tracking-widest hover:border-stone-400 transition-colors"
        >
          {copied ? t.copied : t.copyLink}
        </button>
      </div>

      <div className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 space-y-5">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.compareModeTitle}</p>
          <p className="text-sm text-stone-500">
            {lang === 'en'
              ? `Same user signal, different structural response. Current comparison input: "${lastUserText || currentSuggestions[0] || ''}"`
              : `Stejný uživatelský signál, odlišná strukturální odpověď. Aktuální srovnávaný vstup: "${lastUserText || currentSuggestions[0] || ''}"`}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {comparisonCards.map(({ key, scenarioContent, preview }) => (
            <div
              key={key}
              className={`rounded-[1.5rem] p-5 border ${key === scenario ? 'bg-stone-900 text-white border-stone-900' : 'bg-stone-50 border-stone-200'}`}
            >
              <p className={`text-[10px] font-black uppercase tracking-[0.25em] ${key === scenario ? 'text-red-400' : 'text-red-600'}`}>
                {scenarioContent.shortLabel}
              </p>
              <p className={`mt-3 text-sm leading-relaxed ${key === scenario ? 'text-stone-200' : 'text-stone-600'}`}>{preview}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:hidden flex justify-center">
        <button
          onClick={() => setShowAnalysis(!showAnalysis)}
          className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border rounded-full transition-colors ${
            showAnalysis ? 'border-red-400 bg-red-50 text-red-600' : 'border-red-200 text-red-600 hover:bg-red-50 animate-pulse'
          }`}
        >
          {showAnalysis ? t.hideAnalysis : t.showAnalysis}
        </button>
      </div>

      {showAnalysis && (
        <div className="lg:hidden bg-[#FDFCF9] p-5 rounded-2xl border border-stone-200 space-y-5">
          <div className="space-y-1">
            <h3 className="text-red-600 text-[10px] font-black uppercase tracking-[0.2em]">{t.analysisLabel}</h3>
            <p className="text-stone-500 text-[9px] font-mono">{t.logicFlow}</p>
          </div>
          {latestAnalysis.map((message, index) => (
            <div key={`${message.axis}-${index}`}>
              <div className="flex items-center gap-2 border-b border-red-200 pb-2 mb-2">
                {message.step !== undefined && (
                  <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">
                    {t.stepLabel} {message.step + 1}
                  </span>
                )}
                <span className="font-handwritten text-lg text-red-800 leading-tight">{message.axis}</span>
              </div>
              <p className="text-xs text-stone-500 font-light italic leading-relaxed pl-4 border-l border-stone-200">{message.reasoning}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-0 rounded-2xl lg:rounded-[2rem] overflow-hidden border border-stone-200 shadow-xl bg-white">
        <div className="lg:col-span-3 flex flex-col h-[68vh] lg:h-[640px] max-h-[740px]">
          <div className="p-3 lg:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
            <span className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">{currentScenario.shortLabel}</span>
            </span>
            <span className="text-[10px] font-mono text-stone-400">
              {userCount}/{totalSteps}
            </span>
          </div>

          <div className="h-1 bg-stone-100">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-red-500 to-red-700 transition-all duration-700 ease-out"
              style={{ width: `${(userCount / totalSteps) * 100}%` }}
            />
          </div>

          <div className="flex-grow p-4 lg:p-6 space-y-4 lg:space-y-5 overflow-y-auto notebook-lines">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} fade-in`}>
                <div
                  className={`max-w-[85%] p-3 lg:p-4 rounded-2xl text-sm leading-relaxed ${
                    message.role === 'user' ? 'bg-stone-900 text-white shadow-md' : 'bg-stone-100 border border-stone-200 text-stone-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start fade-in">
                <div className="bg-stone-100 border border-stone-200 rounded-2xl p-3 lg:p-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-xs text-stone-500 ml-1">{t.botTyping}</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {!isTyping && userCount < totalSteps && (
            <div className="px-3 lg:px-5 pb-2 border-t border-stone-50 pt-3 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-stone-400">{t.promptsHeader}</p>
              <div className="flex flex-wrap gap-2">
                {currentSuggestions.map((suggestion, index) => (
                  <button
                    key={`${userCount}-${index}`}
                    onClick={() => handleSend(suggestion)}
                    className="px-3 py-1.5 text-xs text-stone-500 bg-stone-50 border border-stone-200 rounded-full hover:bg-stone-100 hover:text-stone-700 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <div className="pt-2 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-stone-400">{t.branchingTitle}</p>
                <div className="flex flex-wrap gap-2">
                  {DemoContent.branchOrder.map((branch) => (
                    <button
                      key={branch}
                      onClick={() => handleSend(DemoContent.getBranchInput(branch, lang), branch)}
                      className="px-3 py-1.5 text-xs text-stone-500 bg-white border border-stone-200 rounded-full hover:bg-stone-100 hover:text-stone-700 transition-colors"
                    >
                      {DemoContent.getBranchLabel(branch, lang)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="p-3 lg:p-5 border-t border-stone-100 flex space-x-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && handleSend()}
              placeholder={t.inputPlaceholder}
              disabled={isTyping}
              className="flex-grow bg-stone-50 rounded-full px-4 lg:px-5 py-2.5 text-base md:text-sm outline-none focus:ring-1 ring-stone-300 disabled:opacity-50"
            />
            <button
              onClick={() => handleSend()}
              disabled={isTyping || !input.trim()}
              className="bg-stone-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform shrink-0 disabled:opacity-40"
              aria-label={t.sendLabel}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        <div className="hidden lg:flex lg:col-span-2 bg-[#FDFCF9] p-8 space-y-6 flex-col border-l border-stone-200 relative">
          <div className="space-y-2">
            <h3 className="text-red-600 text-[10px] font-black uppercase tracking-[0.2em]">{t.analysisLabel}</h3>
            <p className="text-stone-500 text-[9px] font-mono">{t.logicFlow}</p>
          </div>

          <div className="flex-grow space-y-8 overflow-y-auto">
            {latestAnalysis.map((message, index) => {
              const evidenceId = `${message.axis}-${index}`;
              const evidence = DemoEngine.getEvidenceNote(message.axis, audience, lang);
              return (
                <div key={evidenceId} className="relative fade-in">
                  <div className="flex items-center gap-2 border-b border-red-200 pb-2 mb-2">
                    {message.step !== undefined && (
                      <span className="text-[9px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-widest">
                        {t.stepLabel} {message.step + 1}/{totalSteps + 1}
                      </span>
                    )}
                  </div>
                  <div className="font-handwritten text-2xl text-red-800 leading-tight mb-2">{message.axis}</div>
                  <p className="text-xs text-stone-500 font-light italic leading-relaxed pl-4 border-l-2 border-red-200">{message.reasoning}</p>
                  <div className="mt-3 pl-4">
                    <button
                      type="button"
                      onClick={() => setExpandedEvidence(expandedEvidence === evidenceId ? null : evidenceId)}
                      className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600 hover:text-red-700"
                    >
                      {t.evidenceTitle}
                    </button>
                    {expandedEvidence === evidenceId && (
                      <div className="mt-2 space-y-2 text-xs text-stone-500 leading-relaxed">
                        <p>{evidence.pattern}</p>
                        <p>{evidence.psychology}</p>
                        <p>{evidence.institution}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-stone-100 flex justify-between items-center text-[9px] font-bold text-stone-500 uppercase tracking-widest">
            <span>{t.statusActive}</span>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          </div>
        </div>
      </div>

      {DemoContent.isAdminDebugAllowed() && (
        <DebugPanel riskProfile={riskProfile} personaProfile={personaProfile} usedTacticIndices={usedTacticIndices} />
      )}
    </div>
  );
};

export default MirrorDemo;
