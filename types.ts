
export enum UsageMode {
  TOOL = 'Tool Mode',
  SUPPORT = 'Support Mode',
  REPLACEMENT = 'Replacement Mode',
  RISK = 'Risk Mode'
}

export interface AssessmentResult {
  mode: UsageMode;
  analysis: string;
  redirects: {
    actions: string[];
    template: string;
    microTask: string;
    reflection: string;
  };
}

export interface Testimony {
  id: string;
  text: string;
  timestamp: number;
}
