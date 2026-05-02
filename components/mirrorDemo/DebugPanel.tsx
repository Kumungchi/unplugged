import React from 'react';
import { PersonaProfile, RiskProfile } from './types';

interface DebugPanelProps {
  riskProfile: RiskProfile;
  personaProfile: PersonaProfile;
  usedTacticIndices: number[];
}

const DebugPanel: React.FC<DebugPanelProps> = ({ riskProfile, personaProfile, usedTacticIndices }) => {
  return (
    <div className="bg-stone-950 text-stone-200 rounded-[1.5rem] p-5 border border-stone-800 space-y-4">
      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-400">Admin Debug</p>
      <div className="space-y-2 text-xs">
        <p className="font-bold text-stone-100">Hidden risk state</p>
        <pre className="whitespace-pre-wrap text-stone-400">{JSON.stringify(riskProfile, null, 2)}</pre>
      </div>
      <div className="space-y-2 text-xs">
        <p className="font-bold text-stone-100">Hidden persona state</p>
        <pre className="whitespace-pre-wrap text-stone-400">{JSON.stringify(personaProfile, null, 2)}</pre>
      </div>
      <div className="space-y-2 text-xs">
        <p className="font-bold text-stone-100">Used tactic indices</p>
        <pre className="whitespace-pre-wrap text-stone-400">{JSON.stringify(usedTacticIndices)}</pre>
      </div>
    </div>
  );
};

export default DebugPanel;
