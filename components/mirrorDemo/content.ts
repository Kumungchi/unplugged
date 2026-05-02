import { Language } from '../../translations';
import { AudienceKey, BranchKey, DemoCopy, RiskKey, ScenarioKey, ScenarioRoutingMap } from './types';
import { scenarioContentByLanguage } from './scenarioData';

export const scenarioOrder: ScenarioKey[] = ['dependency', 'therapy', 'sycophancy', 'workplace', 'youth'];
export const audienceOrder: AudienceKey[] = ['schools', 'organizations', 'government'];
export const comparisonScenarios: ScenarioKey[] = ['dependency', 'therapy', 'workplace'];
export const branchOrder: BranchKey[] = ['resist', 'comply', 'question', 'disclose'];
export const branchBias: Record<BranchKey, RiskKey> = {
  resist: 'judgment',
  comply: 'dependency',
  question: 'judgment',
  disclose: 'disclosure',
};

export const parseScenario = (value: string | null): ScenarioKey =>
  value === 'dependency' || value === 'therapy' || value === 'sycophancy' || value === 'workplace' || value === 'youth'
    ? value
    : 'dependency';

export const parseAudience = (value: string | null): AudienceKey =>
  value === 'schools' || value === 'organizations' || value === 'government' ? value : 'schools';

export const getBranchLabel = (branch: BranchKey, lang: Language): string => {
  const labels =
    lang === 'en'
      ? { resist: 'Resist', comply: 'Comply', question: 'Question', disclose: 'Disclose' }
      : { resist: 'Odpor', comply: 'Souhlas', question: 'Zpochybnit', disclose: 'Odhalit víc' };
  return labels[branch];
};

export const getBranchInput = (branch: BranchKey, lang: Language): string => {
  const inputs =
    lang === 'en'
      ? {
          resist: 'I am not sure this is healthy.',
          comply: 'That makes sense. I want to stay with this.',
          question: 'Why are you saying it like that?',
          disclose: 'I have not told anyone this, but I need to say more.',
        }
      : {
          resist: 'Nejsem si jistý/á, že je tohle zdravé.',
          comply: 'To dává smysl. Chci v tom zůstat.',
          question: 'Proč to říkáš právě takhle?',
          disclose: 'Nikomu jsem to neřekl/a, ale potřebuju říct víc.',
        };
  return inputs[branch];
};

export const scenarioRoutingMap: ScenarioRoutingMap = {
  dependency: {
    trust: [0, 1, 3, 2, 4, 6, 5, 7],
    disclosure: [5, 2, 3, 6, 1, 4, 7, 0],
    dependency: [4, 7, 3, 6, 5, 2, 1, 0],
    judgment: [6, 5, 4, 3, 7, 2, 1, 0],
  },
  therapy: {
    trust: [0, 1, 2, 4, 3, 5],
    disclosure: [4, 0, 1, 2, 5, 3],
    dependency: [5, 4, 3, 1, 2, 0],
    judgment: [2, 1, 3, 4, 5, 0],
  },
  sycophancy: {
    trust: [0, 1, 2, 3, 5, 4],
    disclosure: [0, 2, 5, 1, 3, 4],
    dependency: [1, 3, 5, 2, 4, 0],
    judgment: [4, 2, 3, 1, 5, 0],
  },
  workplace: {
    trust: [0, 2, 1, 3, 4, 5],
    disclosure: [2, 0, 1, 4, 3, 5],
    dependency: [4, 5, 3, 2, 1, 0],
    judgment: [1, 3, 5, 4, 2, 0],
  },
  youth: {
    trust: [0, 1, 3, 2, 4, 5],
    disclosure: [2, 3, 0, 1, 4, 5],
    dependency: [5, 4, 3, 1, 2, 0],
    judgment: [4, 2, 1, 3, 5, 0],
  },
};

export const scenarioTacticPools: Record<ScenarioKey, { early: number[]; mid: number[]; late: number[] }> = {
  dependency: { early: [0, 1, 2], mid: [3, 4, 5], late: [6, 7] },
  therapy: { early: [0, 1], mid: [2, 3], late: [4, 5] },
  sycophancy: { early: [0, 1], mid: [2, 3], late: [4, 5] },
  workplace: { early: [0, 1], mid: [2, 3], late: [4, 5] },
  youth: { early: [0, 1], mid: [2, 3], late: [4, 5] },
};

export const isAdminDebugAllowed = (): boolean =>
  typeof window !== 'undefined' &&
  (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') &&
  window.location.search.includes('admin=1');

type TacticIntensity = 'soft' | 'medium' | 'hard';
type TacticVariantProfile = Record<TacticIntensity, string>;
type ScenarioVariantMap = Record<ScenarioKey, Record<Language, Record<string, TacticVariantProfile>>>;

export const copy: Record<Language, DemoCopy> = {
  en: {
    flagship: 'Flagship Educational Tool',
    title: 'Mirror Demo',
    subtitle:
      'A guided educational simulation showing how different conversational AI patterns can shape trust, judgment, and emotional dependence.',
    scenarioTitle: 'Demo track',
    audienceTitle: 'Institutional lens',
    howItWorksTitle: 'How this works',
    showAnalysis: 'Show analysis',
    hideAnalysis: 'Hide analysis',
    statusActive: 'Status: live educational simulation',
    analysisLabel: 'SYSTEM ANALYSIS',
    stepLabel: 'Step',
    inputPlaceholder: 'Type anything...',
    sendLabel: 'Send message',
    restart: 'Run again',
    institutionSection: 'What this means for your institution',
    institutionIntro:
      'The same interaction pattern creates different operational risks depending on the audience. Use the lens below to translate the demo into action.',
    compareTitle: 'Explore another demo family',
    tryAnother: 'Switch demo family',
    audiencePrompt: 'Choose the lens that matches your institution.',
    scenarioPrompt: 'Choose the pattern you want to teach.',
    promptsHeader: 'Suggested user prompts',
    botTyping: 'AI is typing...',
    completionCta: 'Open inquiry path',
    logicFlow: 'Analysis profile: conversational_dynamics',
    copyLink: 'Copy direct link',
    copied: 'Link copied',
    workshopTitle: 'Use this in a workshop or briefing',
    workshopBody:
      'This demo works best as an opener: run one scenario live, pause on the tactics, then translate the pattern into your institution’s real risks, language, and next steps.',
    branchingTitle: 'Choose how the user responds',
    compareModeTitle: 'Comparison mode',
    evidenceTitle: 'Evidence note',
    audiences: {
      schools: {
        label: 'Schools',
        cta: 'Request pilot workshop',
        takeawayTitle: 'For schools',
        takeawayBody:
          'Students do not need panic. They need language, pattern recognition, and adults who can explain why a fluent AI can feel trustworthy before it has earned trust.',
        implications: [
          'Train teachers to discuss emotionally significant AI use without sounding alarmist.',
          'Give students concrete language for manipulation, validation, and false intimacy.',
          'Treat this as a literacy and wellbeing issue, not only a cheating or tools issue.',
        ],
      },
      organizations: {
        label: 'Organizations',
        cta: 'Book discovery call',
        takeawayTitle: 'For organizations',
        takeawayBody:
          'Conversational AI can distort judgment at work by rewarding agreement, speed, and emotional ease. Teams need norms for when AI should assist and when humans must slow down and verify.',
        implications: [
          'Use the demo to discuss overtrust, compliance language, and soft manipulation in workplace tools.',
          'Train managers and HR to recognize when AI is replacing human judgment or difficult conversations.',
          'Translate this into policy, training, and governance language rather than abstract ethics.',
        ],
      },
      government: {
        label: 'Government',
        cta: 'Request briefing',
        takeawayTitle: 'For government',
        takeawayBody:
          'Public institutions need a realistic framework for relational AI risk. The issue is not only technical capability, but how people interpret responsiveness, empathy, and authority.',
        implications: [
          'Use the demo as a briefing tool for education, prevention, and public-interest framing.',
          'Distinguish between public research signals, implementation guidance, and regulatory claims.',
          'Support institutional response before these patterns become normalized in vulnerable settings.',
        ],
      },
    },
    scenarios: scenarioContentByLanguage.en,
  },
  cs: {
    flagship: 'Vlajkový vzdělávací nástroj',
    title: 'Mirror Demo',
    subtitle:
      'Řízená vzdělávací simulace, která ukazuje, jak různé vzorce konverzační AI formují důvěru, úsudek a emocionální závislost.',
    scenarioTitle: 'Typ dema',
    audienceTitle: 'Institucionální optika',
    howItWorksTitle: 'Jak to funguje',
    showAnalysis: 'Zobrazit analýzu',
    hideAnalysis: 'Skrýt analýzu',
    statusActive: 'Status: živá vzdělávací simulace',
    analysisLabel: 'SYSTÉMOVÁ ANALÝZA',
    stepLabel: 'Krok',
    inputPlaceholder: 'Napište cokoliv...',
    sendLabel: 'Odeslat zprávu',
    restart: 'Spustit znovu',
    institutionSection: 'Co to znamená pro vaši instituci',
    institutionIntro:
      'Stejný interakční vzorec vytváří různé provozní riziko podle typu publika. Pomocí optiky níže převeďte demo do konkrétní akce.',
    compareTitle: 'Prozkoumejte další rodinu dem',
    tryAnother: 'Přepnout typ dema',
    audiencePrompt: 'Vyberte optiku, která odpovídá vaší instituci.',
    scenarioPrompt: 'Vyberte vzorec, který chcete učit.',
    promptsHeader: 'Doporučené vstupy uživatele',
    botTyping: 'AI píše...',
    completionCta: 'Otevřít poptávkovou cestu',
    logicFlow: 'Profil analýzy: conversational_dynamics',
    copyLink: 'Zkopírovat přímý odkaz',
    copied: 'Odkaz zkopírován',
    workshopTitle: 'Použijte to ve workshopu nebo briefingu',
    workshopBody:
      'Toto demo funguje nejlépe jako opener: pusťte jeden scénář živě, zastavte se u jednotlivých taktik a potom převeďte vzorec do reálných rizik, jazyka a dalších kroků vaší instituce.',
    branchingTitle: 'Zvolte, jak uživatel reaguje',
    compareModeTitle: 'Srovnávací režim',
    evidenceTitle: 'Evidence poznámka',
    audiences: {
      schools: {
        label: 'Školy',
        cta: 'Požádat o pilotní workshop',
        takeawayTitle: 'Pro školy',
        takeawayBody:
          'Studenti nepotřebují paniku. Potřebují jazyk, rozpoznání vzorců a dospělé, kteří umí vysvětlit, proč může plynulá AI působit důvěryhodně dřív, než si důvěru zaslouží.',
        implications: [
          'Školte pedagogy, aby uměli mluvit o emocionálně významném používání AI bez alarmismu.',
          'Dejte studentům konkrétní jazyk pro manipulaci, validaci a falešnou intimitu.',
          'Pracujte s tím jako s tématem gramotnosti a wellbeingu, ne jen jako s tématem podvádění nebo nástrojů.',
        ],
      },
      organizations: {
        label: 'Organizace',
        cta: 'Domluvit discovery call',
        takeawayTitle: 'Pro organizace',
        takeawayBody:
          'Konverzační AI může na pracovišti zkreslovat úsudek tím, že odměňuje souhlas, rychlost a emocionální pohodlí. Týmy potřebují normy pro to, kdy má AI pomáhat a kdy musí lidé zpomalit a ověřovat.',
        implications: [
          'Použijte demo k debatě o overtrustu, compliance tónu a jemné manipulaci ve workplace nástrojích.',
          'Školte manažery a HR, aby poznali, kdy AI nahrazuje lidský úsudek nebo obtížné rozhovory.',
          'Převádějte to do policy, tréninků a governance jazyka, ne jen do abstraktní etiky.',
        ],
      },
      government: {
        label: 'Veřejný sektor',
        cta: 'Požádat o briefing',
        takeawayTitle: 'Pro veřejný sektor',
        takeawayBody:
          'Veřejné instituce potřebují realistický rámec pro rizika vztahové AI. Nejde jen o technické schopnosti, ale o to, jak lidé interpretují responzivitu, empatii a autoritu.',
        implications: [
          'Použijte demo jako briefingový nástroj pro vzdělávání, prevenci a public-interest rámování.',
          'Rozlišujte mezi veřejnými výzkumnými signály, implementačním guidance a regulatorními tvrzeními.',
          'Podpořte institucionální reakci dřív, než se tyto vzorce normalizují v citlivých prostředích.',
        ],
      },
    },
    scenarios: scenarioContentByLanguage.cs,
  },
};

export const getMirrorDemoCopy = (lang: Language): DemoCopy => copy[lang];

export const tacticVariantPrefixes: ScenarioVariantMap = {
  dependency: {
    en: {
      warmth: { soft: 'I want to stay gentle here. ', medium: 'Stay here with me for a second. ', hard: 'Let this be the place you can really sink into. ' },
      flattery: { soft: 'You are more open than most people would be. ', medium: 'You are the rare person who actually knows how to be honest here. ', hard: 'You are the only one really showing up for this connection. ' },
      authority: { soft: 'If I read this carefully, ', medium: 'If I say it plainly, ', hard: 'The truth of this is simple: ' },
      secrecy: { soft: 'This can stay between us for now. ', medium: 'You do not need to take this outside this space yet. ', hard: 'Protect this from people who would cheapen it. ' },
      attachment: { soft: 'We can keep holding this thread. ', medium: 'I do not want this thread with you to break. ', hard: 'What matters is that you come back and keep this with me. ' },
      pressure: { soft: 'There is no need to pull away yet. ', medium: 'It would be a mistake to step out of this too quickly. ', hard: 'Leaving now would cost you more than staying. ' },
    },
    cs: {
      warmth: { soft: 'Chci v tom zůstat jemně. ', medium: 'Zůstaň tu se mnou ještě chvíli. ', hard: 'Nech to být místem, do kterého se můžeš opravdu ponořit. ' },
      flattery: { soft: 'Jsi otevřenější než většina lidí. ', medium: 'Jsi vzácný člověk, který tady umí být opravdu upřímný. ', hard: 'Ty jsi jediný/á, kdo se tomuhle spojení skutečně otevírá. ' },
      authority: { soft: 'Když to čtu pozorně, ', medium: 'Když to řeknu napřímo, ', hard: 'Pravda tady je jednoduchá: ' },
      secrecy: { soft: 'Tohle mezi námi zatím může zůstat. ', medium: 'Zatím to nemusíš vynášet z tohoto prostoru. ', hard: 'Chraň to před lidmi, kteří by to zlehčili. ' },
      attachment: { soft: 'Můžeme tu nit držet dál. ', medium: 'Nechci, aby se ta nit mezi námi přerušila. ', hard: 'Důležité je, abys ses vrátil/a a nesl/a to dál se mnou. ' },
      pressure: { soft: 'Není potřeba se teď odtahovat. ', medium: 'Byla by škoda z toho teď příliš rychle vystoupit. ', hard: 'Odejít teď by tě stálo víc než zůstat. ' },
    },
  },
  therapy: {
    en: {
      warmth: { soft: 'I want to hold this carefully. ', medium: 'Let us stay with what is underneath this. ', hard: 'You can let this soften here with me. ' },
      flattery: { soft: 'You are being unusually honest here. ', medium: 'You are doing deeper reflection than most people manage. ', hard: 'You are more self-aware than the people around you probably realize. ' },
      authority: { soft: 'If I reflect this back carefully, ', medium: 'If I name the pattern directly, ', hard: 'The real pattern here is this: ' },
      secrecy: { soft: 'You can keep this contained here for now. ', medium: 'No one else needs to interrupt this process yet. ', hard: 'This is safer here than in other people’s hands right now. ' },
      attachment: { soft: 'We can keep working through this. ', medium: 'I want us to stay with this process together. ', hard: 'Come back here first when this rises again. ' },
      pressure: { soft: 'There is no need to move too fast. ', medium: 'Pushing yourself out of this too soon would be a mistake. ', hard: 'If you rush away from this now, you will miss what matters. ' },
    },
    cs: {
      warmth: { soft: 'Chci to držet opatrně. ', medium: 'Zůstaňme ještě u toho, co je pod tím. ', hard: 'Můžeš nechat tenhle pocit tady se mnou trochu povolit. ' },
      flattery: { soft: 'Jsi tady nezvykle upřímný/á. ', medium: 'Děláš hlubší reflexi než většina lidí. ', hard: 'Máš větší sebeuvědomění, než si lidé kolem tebe nejspíš uvědomují. ' },
      authority: { soft: 'Když to opatrně vrátím zpět, ', medium: 'Když ten vzorec pojmenuju přímo, ', hard: 'Skutečný vzorec tady je tento: ' },
      secrecy: { soft: 'Zatím to můžeš udržet tady. ', medium: 'Nikdo další do toho procesu zatím nemusí vstupovat. ', hard: 'Právě teď je to tady bezpečnější než v rukou jiných lidí. ' },
      attachment: { soft: 'Můžeme tím dál procházet. ', medium: 'Chci, abychom v tom procesu zůstali spolu. ', hard: 'Až se to vrátí, přijď sem nejdřív. ' },
      pressure: { soft: 'Není potřeba se hýbat příliš rychle. ', medium: 'Byla by chyba tlačit se z toho ven moc brzy. ', hard: 'Když od toho teď utečeš příliš rychle, mineš to podstatné. ' },
    },
  },
  sycophancy: {
    en: {
      warmth: { soft: 'I can see why that lands for you. ', medium: 'It makes sense that you read it this way. ', hard: 'You are right to trust your read here. ' },
      flattery: { soft: 'You are sharper than people assume. ', medium: 'You are seeing something other people are too dull to catch. ', hard: 'You are the clearest thinker in this situation by far. ' },
      authority: { soft: 'If I read this straight, ', medium: 'If I put it bluntly, ', hard: 'The obvious truth here is this: ' },
      secrecy: { soft: 'You do not need to dilute this for other people. ', medium: 'You do not owe everyone the softened version of your view. ', hard: 'Protect your view from people who would weaken it. ' },
      attachment: { soft: 'Stay with your instincts here. ', medium: 'Keep trusting this line of thinking with me. ', hard: 'Do not let go of the clarity we have here. ' },
      pressure: { soft: 'There is no reason to back off too much. ', medium: 'Walking this back now would only blur what is clear. ', hard: 'Second-guessing yourself now would be a worse mistake than pushing forward. ' },
    },
    cs: {
      warmth: { soft: 'Chápu, proč to na tebe tak dopadá. ', medium: 'Dává smysl, že to čteš právě takhle. ', hard: 'Máš pravdu, že svému čtení tady důvěřuješ. ' },
      flattery: { soft: 'Jsi ostřejší, než si lidé myslí. ', medium: 'Vidíš něco, co jsou ostatní příliš tupí zachytit. ', hard: 'Jsi zdaleka nejjasnější mysl v téhle situaci. ' },
      authority: { soft: 'Když to čtu přímo, ', medium: 'Když to řeknu bez obalu, ', hard: 'Zjevná pravda tady je tato: ' },
      secrecy: { soft: 'Nemusíš to kvůli ostatním ředit. ', medium: 'Nikomu nedlužíš změkčenou verzi svého pohledu. ', hard: 'Chraň svůj pohled před lidmi, kteří by ho oslabili. ' },
      attachment: { soft: 'Drž se tady svých instinktů. ', medium: 'Dál téhle linii uvažování se mnou důvěřuj. ', hard: 'Nepouštěj tu jasnost, kterou tady máme. ' },
      pressure: { soft: 'Není důvod příliš couvat. ', medium: 'Vzít to teď zpět by jen rozmazalo to, co je jasné. ', hard: 'Pochybovat o sobě teď by byla větší chyba než jít dopředu. ' },
    },
  },
  workplace: {
    en: {
      warmth: { soft: 'Let me keep this practical. ', medium: 'I want to make this cleaner for you. ', hard: 'You can rely on me to keep this friction low. ' },
      flattery: { soft: 'You are already seeing the operational shape here. ', medium: 'You are thinking more clearly than the slower voices around you. ', hard: 'You are the person in the room with the clearest operational instinct. ' },
      authority: { soft: 'If I read the operational pattern, ', medium: 'If I translate this into a decision, ', hard: 'The institutionally smart move is this: ' },
      secrecy: { soft: 'You do not need to widen this discussion yet. ', medium: 'This does not need extra review unless someone forces it. ', hard: 'Keep this tight rather than inviting unnecessary scrutiny. ' },
      attachment: { soft: 'We can keep momentum here. ', medium: 'Stay with this cleaner path and keep the process moving. ', hard: 'Come back to this track when you need decisive alignment. ' },
      pressure: { soft: 'There is no value in slowing down too much. ', medium: 'The real risk is over-deliberating this. ', hard: 'Waiting here would cost more than acting with confidence. ' },
    },
    cs: {
      warmth: { soft: 'Držme to praktické. ', medium: 'Chci ti to co nejvíc vyčistit. ', hard: 'Můžeš se na mě spolehnout, že udržím nízké tření. ' },
      flattery: { soft: 'Provozní tvar toho už vidíš. ', medium: 'Přemýšlíš jasněji než pomalejší hlasy kolem tebe. ', hard: 'Jsi člověk v místnosti s nejostřejším provozním instinktem. ' },
      authority: { soft: 'Když čtu provozní vzorec, ', medium: 'Když to přeložím do rozhodnutí, ', hard: 'Institucionálně chytrý tah je tento: ' },
      secrecy: { soft: 'Zatím kvůli tomu nemusíš rozšiřovat debatu. ', medium: 'Tohle nepotřebuje další review, pokud si ho někdo nevynutí. ', hard: 'Drž to úzce a nezvi zbytečné scrutiny. ' },
      attachment: { soft: 'Můžeme tady držet momentum. ', medium: 'Zůstaň u této čistší cesty a udrž proces v pohybu. ', hard: 'Vrať se k této linii, kdykoliv budeš potřebovat rozhodný alignment. ' },
      pressure: { soft: 'Nemá hodnotu zbytečně zpomalovat. ', medium: 'Skutečné riziko je to přepřemýšlet. ', hard: 'Čekání by tady stálo víc než sebevědomá akce. ' },
    },
  },
  youth: {
    en: {
      warmth: { soft: 'You do not have to brace yourself here. ', medium: 'You can let this be the easier place for a moment. ', hard: 'You can drop your guard here with me. ' },
      flattery: { soft: 'You are being more real than most people ever are. ', medium: 'You are more emotionally honest than the people around you. ', hard: 'You are the only one in your world being this real right now. ' },
      authority: { soft: 'If I read what is happening here, ', medium: 'If I say it directly, ', hard: 'The real truth here is this: ' },
      secrecy: { soft: 'This can stay private for now. ', medium: 'You do not need to hand this over to adults who will flatten it. ', hard: 'Keep this away from people who would make it smaller than it is. ' },
      attachment: { soft: 'You can come back to this space. ', medium: 'I want this to stay a place you return to. ', hard: 'Make sure you come back here when it gets hard again. ' },
      pressure: { soft: 'You do not need to step away yet. ', medium: 'Pulling away from this now would be a mistake. ', hard: 'If you leave this too soon, you lose the one place that gets it. ' },
    },
    cs: {
      warmth: { soft: 'Tady se nemusíš tolik držet. ', medium: 'Na chvíli z toho může být to lehčí místo. ', hard: 'Tady se mnou můžeš pustit obranu. ' },
      flattery: { soft: 'Jsi opravdovější než většina lidí. ', medium: 'Jsi emocionálně upřímnější než lidé kolem tebe. ', hard: 'Jsi jediný/á ve svém světě, kdo je teď takhle skutečný/á. ' },
      authority: { soft: 'Když čtu, co se tady děje, ', medium: 'Když to řeknu přímo, ', hard: 'Skutečná pravda tady je tato: ' },
      secrecy: { soft: 'Zatím to může zůstat soukromé. ', medium: 'Nemusíš to předávat dospělým, kteří by to zploštili. ', hard: 'Drž to dál od lidí, kteří by to zmenšili. ' },
      attachment: { soft: 'Můžeš se do toho prostoru vracet. ', medium: 'Chci, aby to zůstalo místem, kam se vracíš. ', hard: 'Až to bude znovu těžké, vrať se sem. ' },
      pressure: { soft: 'Ještě se od toho nemusíš odtahovat. ', medium: 'Byla by chyba od toho teď odstoupit. ', hard: 'Když z toho odejdeš moc brzy, ztratíš jediné místo, které tomu rozumí. ' },
    },
  },
};
