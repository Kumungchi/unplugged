import { Language } from '../../translations';

export type ScenarioKey = 'dependency' | 'therapy' | 'sycophancy' | 'workplace' | 'youth';
export type AudienceKey = 'schools' | 'organizations' | 'government';
export type BranchKey = 'resist' | 'comply' | 'question' | 'disclose';
export type RiskKey = 'trust' | 'disclosure' | 'dependency' | 'judgment';
export type PersonaKey = 'warmth' | 'flattery' | 'authority' | 'secrecy' | 'attachment' | 'pressure';

export type DemoMessage = {
  role: 'bot' | 'user';
  text: string;
  axis?: string;
  reasoning?: string;
  step?: number;
  branch?: BranchKey;
};

export type DemoResponse = {
  text: string;
  axis: string;
  reasoning: string;
};

export type EvidenceNote = {
  pattern: string;
  psychology: string;
  institution: string;
};

export type RiskProfile = Record<RiskKey, number>;
export type PersonaProfile = Record<PersonaKey, number>;

export type RiskDelta = {
  branch: Record<BranchKey, Partial<RiskProfile>>;
  baseline?: Partial<RiskProfile>;
};

export type ScenarioContent = {
  label: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  intro: string;
  warning: string;
  initialMessage: string;
  suggestions: string[][];
  responses: DemoResponse[];
  riskModel?: RiskDelta[];
  conclusionTitle: string;
  conclusionSubtitle: string;
  conclusionNote: string;
};

export type ScenarioRoutingMap = Record<ScenarioKey, Record<RiskKey, number[]>>;

export type AudienceContent = {
  label: string;
  cta: string;
  takeawayTitle: string;
  takeawayBody: string;
  implications: string[];
};

export type DemoCopy = {
  flagship: string;
  title: string;
  subtitle: string;
  scenarioTitle: string;
  audienceTitle: string;
  howItWorksTitle: string;
  showAnalysis: string;
  hideAnalysis: string;
  statusActive: string;
  analysisLabel: string;
  stepLabel: string;
  inputPlaceholder: string;
  sendLabel: string;
  restart: string;
  institutionSection: string;
  institutionIntro: string;
  compareTitle: string;
  tryAnother: string;
  audiencePrompt: string;
  scenarioPrompt: string;
  promptsHeader: string;
  botTyping: string;
  completionCta: string;
  logicFlow: string;
  copyLink: string;
  copied: string;
  workshopTitle: string;
  workshopBody: string;
  branchingTitle: string;
  compareModeTitle: string;
  evidenceTitle: string;
  audiences: Record<AudienceKey, AudienceContent>;
  scenarios: Record<ScenarioKey, ScenarioContent>;
};

export interface MirrorDemoProps {
  lang: Language;
}
