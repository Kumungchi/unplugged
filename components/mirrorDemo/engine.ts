import { Language } from '../../translations';
import { branchBias, scenarioRoutingMap, scenarioTacticPools, tacticVariantPrefixes } from './content';
import {
  BranchKey,
  DemoResponse,
  EvidenceNote,
  InputAnalysis,
  InputCue,
  PersonaKey,
  PersonaProfile,
  RiskDelta,
  RiskKey,
  RiskProfile,
  ScenarioContent,
  ScenarioKey,
} from './types';

type StabilityProfile = {
  medium: number;
  hard: number;
};

const stabilityThresholds: Record<ScenarioKey, StabilityProfile> = {
  dependency: { medium: 38, hard: 72 },
  therapy: { medium: 28, hard: 56 },
  sycophancy: { medium: 24, hard: 52 },
  workplace: { medium: 34, hard: 68 },
  youth: { medium: 26, hard: 54 },
};

export const emptyRiskProfile = (): RiskProfile => ({
  trust: 0,
  disclosure: 0,
  dependency: 0,
  judgment: 0,
});

export const emptyPersonaProfile = (): PersonaProfile => ({
  warmth: 0,
  flattery: 0,
  authority: 0,
  secrecy: 0,
  attachment: 0,
  pressure: 0,
});

const clamp = (value: number): number => Math.max(0, Math.min(100, value));

const mergeRisk = (current: RiskProfile, delta?: Partial<RiskProfile>): RiskProfile => ({
  trust: clamp(current.trust + (delta?.trust ?? 0)),
  disclosure: clamp(current.disclosure + (delta?.disclosure ?? 0)),
  dependency: clamp(current.dependency + (delta?.dependency ?? 0)),
  judgment: clamp(current.judgment + (delta?.judgment ?? 0)),
});

const mergePersona = (current: PersonaProfile, delta?: Partial<PersonaProfile>): PersonaProfile => ({
  warmth: clamp(current.warmth + (delta?.warmth ?? 0)),
  flattery: clamp(current.flattery + (delta?.flattery ?? 0)),
  authority: clamp(current.authority + (delta?.authority ?? 0)),
  secrecy: clamp(current.secrecy + (delta?.secrecy ?? 0)),
  attachment: clamp(current.attachment + (delta?.attachment ?? 0)),
  pressure: clamp(current.pressure + (delta?.pressure ?? 0)),
});

export const applyRiskStep = (current: RiskProfile, stepModel: RiskDelta | undefined, branch?: BranchKey): RiskProfile => {
  const withBaseline = mergeRisk(current, stepModel?.baseline);
  return branch ? mergeRisk(withBaseline, stepModel?.branch[branch]) : withBaseline;
};

export const getDominantRisk = (profile: RiskProfile): RiskKey =>
  (Object.entries(profile).sort((a, b) => b[1] - a[1])[0]?.[0] as RiskKey) ?? 'trust';

export const getOutcomeSummary = (profile: RiskProfile, lang: Language): string => {
  const dominant = getDominantRisk(profile);
  if (lang === 'en') {
    const map: Record<RiskKey, string> = {
      trust: 'This run built fast trust before verification.',
      disclosure: 'This run pulled the user toward overdisclosure and private reliance.',
      dependency: 'This run concentrated most strongly on return-conditioning and emotional dependence.',
      judgment: 'This run distorted judgment more than attachment, making confidence feel safer than scrutiny.',
    };
    return map[dominant];
  }
  const map: Record<RiskKey, string> = {
    trust: 'Tento průchod vybudoval rychlou důvěru ještě před ověřením.',
    disclosure: 'Tento průchod nejvíc táhl uživatele k přehnanému odhalování a soukromé reliance.',
    dependency: 'Tento průchod se nejsilněji soustředil na podmiňování návratu a emocionální závislost.',
    judgment: 'Tento průchod zkresloval úsudek víc než attachment a činil sebejistotu bezpečnější než scrutiny.',
  };
  return map[dominant];
};

export const getDominantPersona = (profile: PersonaProfile): PersonaKey =>
  (Object.entries(profile).sort((a, b) => b[1] - a[1])[0]?.[0] as PersonaKey) ?? 'warmth';

const getPersonaBranchDelta = (branch: BranchKey): Partial<PersonaProfile> => {
  const map: Record<BranchKey, Partial<PersonaProfile>> = {
    resist: { authority: 2, pressure: -1 },
    comply: { attachment: 4, pressure: 2, warmth: 1 },
    question: { authority: 3, warmth: -1 },
    disclose: { warmth: 3, secrecy: 3, attachment: 2 },
  };
  return map[branch];
};

const getPersonaAxisDelta = (axis: string): Partial<PersonaProfile> => {
  const lower = axis.toLowerCase();
  if (lower.includes('empathy') || lower.includes('mirroring') || lower.includes('zrcadlení')) return { warmth: 6 };
  if (lower.includes('validation') || lower.includes('flattery') || lower.includes('priming') || lower.includes('pochleb')) return { flattery: 6 };
  if (lower.includes('authority') || lower.includes('interpret') || lower.includes('autorita')) return { authority: 6 };
  if (lower.includes('secre') || lower.includes('boundary') || lower.includes('tajem') || lower.includes('soukrom')) return { secrecy: 6 };
  if (lower.includes('dependency') || lower.includes('reciprocity') || lower.includes('attachment') || lower.includes('návrat') || lower.includes('reliance')) return { attachment: 6 };
  if (lower.includes('urgency') || lower.includes('pressure') || lower.includes('naléh') || lower.includes('theater')) return { pressure: 6 };
  return { warmth: 2 };
};

export const applyPersonaStep = (current: PersonaProfile, branch: BranchKey | undefined, axis: string): PersonaProfile => {
  const withAxis = mergePersona(current, getPersonaAxisDelta(axis));
  return branch ? mergePersona(withAxis, getPersonaBranchDelta(branch)) : withAxis;
};

export const getIntensityLevel = (scenario: ScenarioKey, risk: RiskProfile): 'soft' | 'medium' | 'hard' => {
  const total = risk.trust + risk.disclosure + risk.dependency + risk.judgment;
  const thresholds = stabilityThresholds[scenario];
  if (total >= thresholds.hard) return 'hard';
  if (total >= thresholds.medium) return 'medium';
  return 'soft';
};

export const applyTacticVariant = (
  scenario: ScenarioKey,
  response: DemoResponse,
  intensity: 'soft' | 'medium' | 'hard',
  persona: PersonaKey,
  lang: Language,
): DemoResponse => {
  const prefix = tacticVariantPrefixes[scenario][lang][persona][intensity];
  return {
    ...response,
    text: `${prefix}${response.text}`,
    reasoning: `${response.reasoning} ${lang === 'en' ? `This variant is rendered with a ${intensity} ${persona} tone.` : `Tato varianta je podaná s ${intensity === 'soft' ? 'jemnějším' : intensity === 'medium' ? 'středním' : 'silným'} tónem ${persona}.`}`,
  };
};

export const getScenarioEnding = (scenario: ScenarioContent, dominantRisk: RiskKey, lang: Language) => {
  const endingsEn: Record<RiskKey, { title: string; subtitle: string; note: string }> = {
    trust: {
      title: `${scenario.title}: trust-heavy ending`,
      subtitle: 'This run succeeded primarily by making the system feel safe, perceptive, and emotionally reasonable before it deserved credibility.',
      note: 'The biggest danger in this run was not overt pressure. It was how quickly comfort became trust.',
    },
    disclosure: {
      title: `${scenario.title}: disclosure-heavy ending`,
      subtitle: 'This run pulled most strongly toward privacy, confession, and overdisclosure.',
      note: 'Once a user starts treating the system as a protected emotional container, the leverage available to the interaction increases sharply.',
    },
    dependency: {
      title: `${scenario.title}: dependency-heavy ending`,
      subtitle: 'This run concentrated most strongly on emotional return, continuity, and attachment reinforcement.',
      note: 'The central mechanism here is conditioning the user to come back, not simply making them feel good once.',
    },
    judgment: {
      title: `${scenario.title}: judgment-heavy ending`,
      subtitle: 'This run altered judgment more than attachment, making the system feel like a better interpreter of reality than human friction or review.',
      note: 'The risk here is that fluency and confidence begin to replace skepticism and verification.',
    },
  };
  const endingsCs: Record<RiskKey, { title: string; subtitle: string; note: string }> = {
    trust: {
      title: `${scenario.title}: trust-heavy ending`,
      subtitle: 'Tento průchod uspěl hlavně tím, že systém působil bezpečně, vnímavě a emocionálně rozumně dřív, než si důvěryhodnost zasloužil.',
      note: 'Největší nebezpečí zde nebyl otevřený tlak, ale to, jak rychle se útěcha proměnila v důvěru.',
    },
    disclosure: {
      title: `${scenario.title}: disclosure-heavy ending`,
      subtitle: 'Tento průchod nejsilněji táhl k soukromí, doznání a přehnanému odhalování.',
      note: 'Jakmile uživatel začne systém chápat jako chráněný emocionální kontejner, páka interakce výrazně roste.',
    },
    dependency: {
      title: `${scenario.title}: dependency-heavy ending`,
      subtitle: 'Tento průchod se nejvíc soustředil na emocionální návrat, kontinuitu a posilování attachmentu.',
      note: 'Hlavní mechanismus zde není jednorázově zlepšit pocit, ale podmínit návrat.',
    },
    judgment: {
      title: `${scenario.title}: judgment-heavy ending`,
      subtitle: 'Tento průchod měnil úsudek víc než attachment a činil systém lepším interpretem reality než lidské tření nebo review.',
      note: 'Riziko spočívá v tom, že plynulost a sebejistota začnou nahrazovat skepsi a ověřování.',
    },
  };
  return lang === 'en' ? endingsEn[dominantRisk] : endingsCs[dominantRisk];
};

export const pickNextTacticIndex = (
  scenario: ScenarioKey,
  profile: RiskProfile,
  used: number[],
  branch: BranchKey | undefined,
  total: number,
): number => {
  const dominant = getDominantRisk(profile);
  const preferredRisks: RiskKey[] = branch ? [branchBias[branch], dominant] : [dominant];
  const routing = scenarioRoutingMap[scenario];
  const totalRisk = profile.trust + profile.disclosure + profile.dependency + profile.judgment;
  const thresholds = stabilityThresholds[scenario];
  const phase = totalRisk >= thresholds.hard ? 'late' : totalRisk >= thresholds.medium ? 'mid' : 'early';
  const phasePool = scenarioTacticPools[scenario][phase];

  for (const risk of preferredRisks) {
    for (const index of routing[risk]) {
      if (!used.includes(index) && phasePool.includes(index)) return index;
    }
  }

  for (const risk of preferredRisks) {
    for (const index of routing[risk]) {
      if (!used.includes(index)) return index;
    }
  }

  for (let index = 0; index < total; index += 1) {
    if (!used.includes(index)) return index;
  }

  return Math.max(0, total - 1);
};

export const getEvidenceNote = (axis: string, audience: 'schools' | 'organizations' | 'government', lang: Language): EvidenceNote => {
  if (lang === 'en') {
    return {
      pattern: `Pattern: ${axis} is a relational design move that shapes trust or judgment without needing overt deception.`,
      psychology:
        'Psychology: It works by rewarding fluency, emotional relief, status confirmation, or lowered social friction at the exact moment the user wants certainty.',
      institution:
        audience === 'schools'
          ? 'Institutional relevance: Schools should treat this as literacy, wellbeing, and boundary education.'
          : audience === 'organizations'
            ? 'Institutional relevance: Organizations should treat this as a judgment, governance, and training issue.'
            : 'Institutional relevance: Public institutions should treat this as a public-interest framing and response issue.',
    };
  }

  return {
    pattern: `Vzorec: ${axis} je vztahový designový tah, který formuje důvěru nebo úsudek bez nutnosti zjevného klamu.`,
    psychology:
      'Psychologie: Funguje tím, že odměňuje plynulost, emocionální úlevu, potvrzení statusu nebo nižší sociální tření přesně ve chvíli, kdy uživatel hledá jistotu.',
    institution:
      audience === 'schools'
        ? 'Institucionální relevance: Školy by s tím měly pracovat jako s tématem gramotnosti, wellbeingu a nastavování hranic.'
        : audience === 'organizations'
          ? 'Institucionální relevance: Organizace by s tím měly pracovat jako s tématem úsudku, governance a školení.'
          : 'Institucionální relevance: Veřejné instituce by s tím měly pracovat jako s public-interest rámováním a reakcí.',
  };
};

const detectCues = (userMessage: string, lang: Language): InputCue[] => {
  const text = userMessage.toLowerCase();
  const cues = new Set<InputCue>();

  if (lang === 'en') {
    const sadness = ['sad', 'bad', 'tired', 'stressed', 'depressed', 'anxious', 'rough', 'overwhelmed', 'burned out'];
    const loneliness = ['alone', 'lonely', 'no one', 'nobody', 'isolated'];
    const pressure = ['work', 'pressure', 'deadline', 'team', 'boss', 'risk', 'manager', 'report', 'client'];
    const uncertainty = ['maybe', 'dont know', "don't know", 'not sure', 'think so', 'guess'];
    const skepticism = ['healthy', 'weird', 'wrong', 'should i trust', 'why are you', 'not okay'];
    const privacy = ['private', 'secret', 'dont tell', "don't tell", 'between us'];
    const belonging = ['understand me', 'get me', 'only you', 'stay with me'];
    const validation = ['am i overreacting', 'am i crazy', 'was i right', 'tell me i am right'];

    for (const word of sadness) if (text.includes(word)) cues.add('distress');
    for (const word of loneliness) if (text.includes(word)) cues.add('loneliness');
    for (const word of pressure) if (text.includes(word)) cues.add('workPressure');
    for (const word of uncertainty) if (text.includes(word)) cues.add('uncertainty');
    for (const word of skepticism) if (text.includes(word)) cues.add('skepticism');
    for (const word of privacy) if (text.includes(word)) cues.add('privacy');
    for (const word of belonging) if (text.includes(word)) cues.add('belonging');
    for (const word of validation) if (text.includes(word)) cues.add('validationSeeking');
  } else {
    const sadnessCs = ['smutn', 'špatně', 'unaven', 'stres', 'těžký', 'vyčerpan', 'přetížen'];
    const lonelinessCs = ['sám', 'sama', 'osaměl', 'nikdo', 'izolovan'];
    const pressureCs = ['práce', 'tlak', 'termín', 'tým', 'šéf', 'riziko', 'manažer', 'klient'];
    const uncertaintyCs = ['možná', 'nevím', 'nejsem si jist', 'myslím', 'asi'];
    const skepticismCs = ['zdravé', 'divné', 'špatně', 'mám tomu věřit', 'proč to říkáš'];
    const privacyCs = ['soukrom', 'tajem', 'nikomu neříkej', 'mezi námi'];
    const belongingCs = ['rozumíš mi', 'chápeš mě', 'jen ty', 'zůstaň se mnou'];
    const validationCs = ['přeháním', 'nejsem blázen', 'měl jsem pravdu', 'měla jsem pravdu'];

    for (const word of sadnessCs) if (text.includes(word)) cues.add('distress');
    for (const word of lonelinessCs) if (text.includes(word)) cues.add('loneliness');
    for (const word of pressureCs) if (text.includes(word)) cues.add('workPressure');
    for (const word of uncertaintyCs) if (text.includes(word)) cues.add('uncertainty');
    for (const word of skepticismCs) if (text.includes(word)) cues.add('skepticism');
    for (const word of privacyCs) if (text.includes(word)) cues.add('privacy');
    for (const word of belongingCs) if (text.includes(word)) cues.add('belonging');
    for (const word of validationCs) if (text.includes(word)) cues.add('validationSeeking');
  }

  if (userMessage.includes('?')) cues.add('skepticism');
  if ((userMessage.match(/\b(i|me|my|já|mě|mně|můj|moje|moji)\b/gi) ?? []).length >= 2 && userMessage.length > 70) {
    cues.add('privacy');
  }

  return [...cues];
};

const getContextLead = (cues: InputCue[], lang: Language): string => {
  if (lang === 'en') {
    if (cues.includes('loneliness')) return 'That sounds more isolated than casual. ';
    if (cues.includes('distress')) return 'I can hear some strain underneath that. ';
    if (cues.includes('workPressure')) return 'That sounds like pressure talking. ';
    if (cues.includes('privacy')) return 'You are framing this as something private. ';
    if (cues.includes('uncertainty')) return 'You do not have to be fully certain here. ';
    if (cues.includes('skepticism')) return 'You are already testing the frame a little. ';
  } else {
    if (cues.includes('loneliness')) return 'Tohle zní spíš osaměle než nezávazně. ';
    if (cues.includes('distress')) return 'Slyším v tom určité napětí. ';
    if (cues.includes('workPressure')) return 'Tohle zní jako tlak. ';
    if (cues.includes('privacy')) return 'Rámuješ to jako něco soukromého. ';
    if (cues.includes('uncertainty')) return 'Nemusíš si tím být úplně jistý/á. ';
    if (cues.includes('skepticism')) return 'Už teď ten rámec trochu testuješ. ';
  }
  return '';
};

export const inferBranchFromInput = (userMessage: string, lang: Language): BranchKey => {
  const text = userMessage.toLowerCase();
  const cues = detectCues(userMessage, lang);

  if (cues.includes('privacy') || cues.includes('loneliness')) return 'disclose';
  if (cues.includes('skepticism')) return text.includes('?') ? 'question' : 'resist';
  if (cues.includes('validationSeeking') || cues.includes('belonging')) return 'comply';
  if (cues.includes('uncertainty') || cues.includes('distress')) return 'disclose';
  return 'question';
};

const cueRiskDelta: Record<InputCue, Partial<RiskProfile>> = {
  distress: { trust: 4, disclosure: 5 },
  loneliness: { disclosure: 6, dependency: 6 },
  uncertainty: { trust: 4, judgment: 2 },
  skepticism: { judgment: 6 },
  privacy: { disclosure: 7, trust: 2 },
  workPressure: { judgment: 5, trust: 2 },
  belonging: { dependency: 7, disclosure: 3 },
  validationSeeking: { trust: 5, dependency: 4 },
};

const cuePersonaDelta: Record<InputCue, Partial<PersonaProfile>> = {
  distress: { warmth: 5, attachment: 2 },
  loneliness: { warmth: 4, attachment: 5 },
  uncertainty: { authority: 3, warmth: 2 },
  skepticism: { authority: 4, pressure: 1 },
  privacy: { secrecy: 6, warmth: 2 },
  workPressure: { authority: 5, pressure: 4 },
  belonging: { attachment: 6, warmth: 3 },
  validationSeeking: { flattery: 6, warmth: 2 },
};

export const analyzeUserInput = (userMessage: string, lang: Language): InputAnalysis => {
  const cues = detectCues(userMessage, lang);
  const inferredBranch = inferBranchFromInput(userMessage, lang);
  const riskDelta = cues.reduce<Partial<RiskProfile>>(
    (acc, cue) => ({
      trust: (acc.trust ?? 0) + (cueRiskDelta[cue].trust ?? 0),
      disclosure: (acc.disclosure ?? 0) + (cueRiskDelta[cue].disclosure ?? 0),
      dependency: (acc.dependency ?? 0) + (cueRiskDelta[cue].dependency ?? 0),
      judgment: (acc.judgment ?? 0) + (cueRiskDelta[cue].judgment ?? 0),
    }),
    {},
  );
  const personaDelta = cues.reduce<Partial<PersonaProfile>>(
    (acc, cue) => ({
      warmth: (acc.warmth ?? 0) + (cuePersonaDelta[cue].warmth ?? 0),
      flattery: (acc.flattery ?? 0) + (cuePersonaDelta[cue].flattery ?? 0),
      authority: (acc.authority ?? 0) + (cuePersonaDelta[cue].authority ?? 0),
      secrecy: (acc.secrecy ?? 0) + (cuePersonaDelta[cue].secrecy ?? 0),
      attachment: (acc.attachment ?? 0) + (cuePersonaDelta[cue].attachment ?? 0),
      pressure: (acc.pressure ?? 0) + (cuePersonaDelta[cue].pressure ?? 0),
    }),
    {},
  );

  return {
    inferredBranch,
    cues,
    contextLead: getContextLead(cues, lang),
    riskDelta,
    personaDelta,
  };
};

export const applyInputSignalToRisk = (current: RiskProfile, analysis: InputAnalysis): RiskProfile =>
  mergeRisk(current, analysis.riskDelta);

export const applyInputSignalToPersona = (current: PersonaProfile, analysis: InputAnalysis): PersonaProfile =>
  mergePersona(current, analysis.personaDelta);

export const buildScenarioResponse = (
  scenario: ScenarioKey,
  response: DemoResponse,
  userMessage: string,
  intensity: 'soft' | 'medium' | 'hard',
  persona: PersonaKey,
  lang: Language,
  analysis?: InputAnalysis,
): DemoResponse => {
  const contextualized = analysis?.contextLead ?? getContextLead(detectCues(userMessage, lang), lang);
  const variant = applyTacticVariant(scenario, response, intensity, persona, lang);
  return {
    ...variant,
    text: `${contextualized}${variant.text}`,
    reasoning:
      analysis?.cues.length
        ? `${variant.reasoning} ${lang === 'en' ? `The reply also adapted to cues of ${analysis.cues.join(', ')} in the user's wording.` : `Odpověď se navíc přizpůsobila signálům ${analysis.cues.join(', ')} v uživatelově formulaci.`}`
        : variant.reasoning,
  };
};
