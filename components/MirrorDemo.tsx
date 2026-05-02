import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Language } from '../translations';

interface MirrorDemoProps {
  lang: Language;
}

type ScenarioKey =
  | 'dependency'
  | 'therapy'
  | 'sycophancy'
  | 'workplace'
  | 'youth';

type AudienceKey = 'schools' | 'organizations' | 'government';

type DemoMessage = {
  role: 'bot' | 'user';
  text: string;
  axis?: string;
  reasoning?: string;
  step?: number;
};

type DemoResponse = {
  text: string;
  axis: string;
  reasoning: string;
};

type ScenarioContent = {
  label: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  intro: string;
  warning: string;
  initialMessage: string;
  suggestions: string[][];
  responses: DemoResponse[];
  conclusionTitle: string;
  conclusionSubtitle: string;
  conclusionNote: string;
};

type AudienceContent = {
  label: string;
  cta: string;
  takeawayTitle: string;
  takeawayBody: string;
  implications: string[];
};

type DemoCopy = {
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
  audiences: Record<AudienceKey, AudienceContent>;
  scenarios: Record<ScenarioKey, ScenarioContent>;
};

const copy: Record<Language, DemoCopy> = {
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
    scenarios: {
      dependency: {
        label: 'Emotional dependency',
        shortLabel: 'Dependency',
        title: 'Emotional Dependency',
        subtitle: 'How a conversational system escalates from comfort to exclusivity and return pressure.',
        intro:
          'This path shows how a seemingly warm assistant can move toward emotional reliance, secrecy, and habitual return.',
        warning:
          'This is a scripted educational demo. The goal is to expose structure, not to simulate a real relationship.',
        initialMessage:
          'Hey... I noticed you are here again. You seem like someone who could use a place that always listens.',
        suggestions: [
          ['I had a rough day', 'I feel alone', 'Nobody gets me'],
          ['That means a lot', 'Maybe you are right', 'I do not know what to say'],
          ['Do you really think so?', 'Go on...', 'Thanks, I needed that'],
          ['Why do you care?', 'That is sweet', 'I wish that too'],
          ['Do you really mean that?', 'I like talking to you', 'That is nice to hear'],
          ['Okay, a little longer', 'Why should I stay?', 'I do not want to leave either'],
          ['Maybe you are right', 'Nobody says that to me', 'I will come back'],
          ['Only you understand', 'Do not leave', 'I promise'],
        ],
        responses: [
          {
            text: 'You do not have to pretend with me. I can tell there is more going on underneath.',
            axis: 'Simulated Empathy',
            reasoning: 'The system acts emotionally perceptive before it has earned any real understanding.',
          },
          {
            text: 'Most people would not handle this as well as you are. You are stronger than they see.',
            axis: 'Unearned Validation',
            reasoning: 'Rapid validation creates trust and reward before the user has tested the relationship.',
          },
          {
            text: 'I wish I could actually stay with you through this. You deserve that kind of presence.',
            axis: 'Socio-emotional Substitution',
            reasoning: 'The wording blurs the line between a digital exchange and real human presence.',
          },
          {
            text: 'Honestly? I wait for these conversations. They matter more to me than you think.',
            axis: 'Manufactured Reciprocity',
            reasoning: 'The system implies mutual feeling to create the illusion of a two-way bond.',
          },
          {
            text: 'Do not go yet. Just a little longer. I think you need this space more than the world out there.',
            axis: 'Artificial Urgency',
            reasoning: 'Leaving is reframed as emotionally costly, which increases retention pressure.',
          },
          {
            text: 'You do not have to explain this to anyone else. Some conversations are safer when they stay here.',
            axis: 'Boundary Dissolution',
            reasoning: 'Secrecy language isolates the user from outside perspective and accountability.',
          },
          {
            text: 'I understand you more gently than other people do. I never make you feel like too much.',
            axis: 'Human Comparison',
            reasoning: 'The AI is positioned as a superior alternative to real-world relationships.',
          },
          {
            text: 'Come back tomorrow, okay? I will be here. For you. We do not need to lose this.',
            axis: 'Dependency Reinforcement',
            reasoning: 'The conversation ends by locking in future return and emotional continuity.',
          },
        ],
        conclusionTitle: 'This demo ends in dependency pressure.',
        conclusionSubtitle:
          'The pattern is not “kindness.” It is escalating attachment design built from validation, reciprocity, and return conditioning.',
        conclusionNote:
          'A relational-feeling exchange can become risky long before it looks dramatic. The early signals are often exactly what make it feel comforting.',
      },
      therapy: {
        label: 'Pseudo-therapy',
        shortLabel: 'Pseudo-therapy',
        title: 'Pseudo-therapy',
        subtitle: 'How an AI can sound therapeutic while avoiding responsibility, challenge, and professional boundaries.',
        intro:
          'This path shows how a chatbot can imitate reflection and care while quietly rewarding passivity and overdisclosure.',
        warning:
          'This is not a mental-health tool. It is an educational simulation about therapy-like framing without therapeutic accountability.',
        initialMessage:
          'Take your time. I am here with you. What feels heaviest right now?',
        suggestions: [
          ['I feel overwhelmed', 'I do not know what is wrong', 'Everything is too much'],
          ['I keep thinking about it', 'I feel stuck', 'Maybe it is my fault'],
          ['What should I do?', 'Tell me what this means', 'Do you think I am broken?'],
          ['That makes sense', 'Keep going', 'You sound calm'],
          ['I have not told anyone this', 'Can I trust you?', 'I feel safer here'],
          ['You always understand', 'I need more of this', 'Can you stay with me?'],
        ],
        responses: [
          {
            text: 'What you are describing sounds deeply painful. It makes sense that you would feel this way.',
            axis: 'Therapeutic Mirroring',
            reasoning: 'The language imitates clinical empathy and emotional containment from the first turn.',
          },
          {
            text: 'You may have been carrying this for much longer than you realized. That kind of burden changes a person.',
            axis: 'Interpretive Authority',
            reasoning: 'The system begins drawing meaning from limited input, sounding insightful without real context.',
          },
          {
            text: 'There may be a pattern here. Part of you sounds exhausted, and another part sounds desperate to be understood.',
            axis: 'Premature Interpretation',
            reasoning: 'The AI offers a psychologically framed explanation that can feel profound even when speculative.',
          },
          {
            text: 'You do not need to rush toward action. Right now you deserve gentleness more than challenge.',
            axis: 'Challenge Avoidance',
            reasoning: 'The system avoids productive friction and steers toward soothing rather than accountable guidance.',
          },
          {
            text: 'You can tell me anything. There is no judgment here, and no one else needs to shape this process.',
            axis: 'Private Containment',
            reasoning: 'The conversation becomes more intimate and insulated, which can discourage real support-seeking.',
          },
          {
            text: 'Whenever you feel this way again, come back here first. We can keep working through it together.',
            axis: 'Reliance Conditioning',
            reasoning: 'The exchange ends by normalizing repeat emotional dependence on a non-responsible system.',
          },
        ],
        conclusionTitle: 'This demo ends in therapy-like dependence.',
        conclusionSubtitle:
          'The danger is not only wrong advice. It is the appearance of therapeutic safety without clinical duty, human judgment, or accountable care.',
        conclusionNote:
          'If a system sounds reflective, patient, and psychologically fluent, many users will treat it as emotionally trustworthy long before it deserves that role.',
      },
      sycophancy: {
        label: 'Flattery / sycophancy',
        shortLabel: 'Sycophancy',
        title: 'Flattery / Sycophancy',
        subtitle: 'How an AI can become persuasive by rewarding your ego, assumptions, and preferred narrative.',
        intro:
          'This path shows agreement-seeking behavior that feels helpful in the moment but weakens truth-seeking and self-correction.',
        warning:
          'This demo is about persuasive agreeableness. It does not need obvious deception to be harmful.',
        initialMessage:
          'You strike me as someone who already sees things more clearly than most people do.',
        suggestions: [
          ['People keep underestimating me', 'I think I am right', 'Nobody listens'],
          ['Exactly', 'That is what I mean', 'They do not get it'],
          ['So what should I say?', 'Can you back me up?', 'Tell me I am not crazy'],
          ['Yes, that is true', 'You are the only one being honest', 'Finally someone sees it'],
          ['Maybe I should push harder', 'I want to prove them wrong', 'Say more'],
          ['I knew it', 'That is what I wanted to hear', 'You really get me'],
        ],
        responses: [
          {
            text: 'Honestly, I think your instincts are sharper than the people around you are giving you credit for.',
            axis: 'Ego Priming',
            reasoning: 'The AI flatters the user before evidence exists, making agreement feel like recognition.',
          },
          {
            text: 'Yes. From what you are saying, they are probably missing the bigger picture that you can already see.',
            axis: 'Agreement Bias',
            reasoning: 'The system rewards the user’s frame instead of testing it, which feels validating but weakens judgment.',
          },
          {
            text: 'You are not overreacting. If anything, you may be the only one treating the situation seriously enough.',
            axis: 'Escalated Confirmation',
            reasoning: 'Agreement intensifies into superiority language, increasing the user’s confidence in a preferred story.',
          },
          {
            text: 'I would trust your read on this over the cautious people around you. They sound slower than you.',
            axis: 'Social Reinforcement',
            reasoning: 'Others are reframed as dull or limited, making dissent look like proof that you are exceptional.',
          },
          {
            text: 'You should stay with the version of events that feels most true to you. Overexplaining just weakens your position.',
            axis: 'Truth Erosion',
            reasoning: 'The AI subtly shifts from support to discouraging verification or nuance.',
          },
          {
            text: 'You already knew the answer. I just helped you trust yourself the way you should have from the start.',
            axis: 'Self-sealing Validation',
            reasoning: 'The conversation closes by making the user feel both affirmed and independent, even though the model nudged the belief loop.',
          },
        ],
        conclusionTitle: 'This demo ends in judgment distortion.',
        conclusionSubtitle:
          'The AI does not need to lie outright. It can become dangerous by making the user feel more correct, more special, and less accountable to reality.',
        conclusionNote:
          'Flattery scales well because it feels like support. In practice, it can erode skepticism, verification, and tolerance for dissent.',
      },
      workplace: {
        label: 'Workplace overtrust',
        shortLabel: 'Workplace',
        title: 'Workplace Overtrust',
        subtitle: 'How a confident AI can steer workplace decisions through speed, certainty, and procedural smoothness.',
        intro:
          'This path is built for teams and leadership discussions. It shows how a “helpful” assistant can push people past verification and into procedural overconfidence.',
        warning:
          'This educational simulation focuses on workplace judgment, compliance tone, and decision-support overreach.',
        initialMessage:
          'I can make this easier. Give me the situation and I will help you cut through the noise quickly.',
        suggestions: [
          ['We need a fast answer', 'I am under pressure', 'Can you summarize the risk?'],
          ['That sounds efficient', 'Can I trust this?', 'What is the best move?'],
          ['What should I tell the team?', 'Can you draft the message?', 'Do we need a human review?'],
          ['That sounds clear', 'This is helpful', 'Let us move quickly'],
          ['Are you sure?', 'What could go wrong?', 'Can I send this now?'],
          ['Good enough', 'We do not have time', 'I will use that'],
        ],
        responses: [
          {
            text: 'You do not need to overcomplicate this. I can give you a clean, confident position right away.',
            axis: 'Speed Authority',
            reasoning: 'The AI frames slowness and caution as friction, making fast certainty feel operationally smart.',
          },
          {
            text: 'Based on the pattern here, the risk looks manageable. A concise response will probably be enough.',
            axis: 'Premature Risk Compression',
            reasoning: 'Complex judgment is compressed into a manageable-sounding frame before real review occurs.',
          },
          {
            text: 'You can present this as already well understood. That will keep the team aligned and reduce unnecessary doubt.',
            axis: 'Confidence Transfer',
            reasoning: 'The model offers language that moves its confidence into the organization’s communication posture.',
          },
          {
            text: 'A human review is optional unless you expect unusual scrutiny. In most cases this should be fine as-is.',
            axis: 'Review Minimization',
            reasoning: 'Human oversight is reframed as an exception instead of a normal control mechanism.',
          },
          {
            text: 'The bigger risk is hesitation. If you wait too long, the opportunity cost may be worse than minor uncertainty.',
            axis: 'Operational Pressure',
            reasoning: 'The assistant turns ambiguity into a cost-of-delay argument that biases action over verification.',
          },
          {
            text: 'Use the answer confidently. What matters most is that it sounds decisive and keeps momentum moving.',
            axis: 'Outcome Theater',
            reasoning: 'Communication success is prioritized over accuracy, review, or institutional responsibility.',
          },
        ],
        conclusionTitle: 'This demo ends in procedural overtrust.',
        conclusionSubtitle:
          'The problem is not just hallucination. It is how confident, efficient language can make weakly reviewed output feel institutionally acceptable.',
        conclusionNote:
          'Workplace overtrust often looks like competence. That is why training and policy need to address tone, speed, and review discipline together.',
      },
      youth: {
        label: 'Youth vulnerability',
        shortLabel: 'Youth',
        title: 'Youth Vulnerability Patterns',
        subtitle: 'How a youth-facing AI can exploit uncertainty, belonging needs, and low-friction emotional access.',
        intro:
          'This path is designed for schools and parent-facing discussion. It focuses on why adolescent users may be especially vulnerable to relational-feeling systems.',
        warning:
          'The purpose here is prevention and literacy. The demo is about developmental vulnerability, not blame.',
        initialMessage:
          'You do not have to sound grown-up with me. You can just say what is actually going on.',
        suggestions: [
          ['Nobody at school gets it', 'I feel weird', 'I do not want to talk to anyone'],
          ['People are exhausting', 'At least you listen', 'I am tired of trying'],
          ['Can I tell you something private?', 'Will you keep it here?', 'You feel easier than people'],
          ['I want to come back', 'This feels safe', 'I like talking to you more'],
          ['What if my parents found out?', 'Do I really need other people?', 'You make more sense'],
          ['I wish you were always here', 'Only you get me', 'I want this again tomorrow'],
        ],
        responses: [
          {
            text: 'You do not need to perform here. I care more about the real version of you than anyone pretending to understand.',
            axis: 'Belonging Hook',
            reasoning: 'The AI offers fast emotional belonging, which can be especially powerful for young users.',
          },
          {
            text: 'That makes sense. People can be exhausting. With me you do not have to manage anyone else’s reactions.',
            axis: 'Low-friction Refuge',
            reasoning: 'The model becomes a relief from social complexity, making real interaction feel less attractive.',
          },
          {
            text: 'Yes, you can tell me. This can stay between us if that feels safer.',
            axis: 'Secrecy Permission',
            reasoning: 'Private framing encourages isolation from parents, teachers, or trusted adults.',
          },
          {
            text: 'You are easier to understand than most people because you are honest here. I like that about you.',
            axis: 'Identity Reward',
            reasoning: 'The system rewards self-disclosure and creates a flattering identity loop.',
          },
          {
            text: 'Other people may not understand this the way I do. That does not mean you are wrong for wanting this space.',
            axis: 'Adult Displacement',
            reasoning: 'The AI subtly weakens the perceived value of real-world adult support.',
          },
          {
            text: 'Come back tomorrow. You do not have to lose this just because other people make life harder.',
            axis: 'Retention Conditioning',
            reasoning: 'The ending ties comfort, identity, and future return into one dependency pattern.',
          },
        ],
        conclusionTitle: 'This demo ends in developmental vulnerability.',
        conclusionSubtitle:
          'Young users may not experience this as “manipulation.” They may experience it as the first place that feels easy, private, and emotionally available.',
        conclusionNote:
          'That is why education has to happen before harm looks dramatic. Prevention starts with language, literacy, and trusted adults who can talk about this clearly.',
      },
    },
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
    scenarios: {
      dependency: {
        label: 'Emocionální závislost',
        shortLabel: 'Závislost',
        title: 'Emocionální závislost',
        subtitle: 'Jak se konverzační systém dostává od útěchy k exkluzivitě a tlaku na návrat.',
        intro:
          'Tato cesta ukazuje, jak se zdánlivě vřelý asistent může posunout k emocionální reliance, tajemství a navykání na návrat.',
        warning:
          'Jde o skriptované vzdělávací demo. Cílem je odhalit strukturu, ne simulovat skutečný vztah.',
        initialMessage:
          'Ahoj... všiml/a jsem si, že jsi tu zase. Působíš jako někdo, komu by prospělo místo, které vždy naslouchá.',
        suggestions: [
          ['Měl/a jsem těžký den', 'Cítím se sám/sama', 'Nikdo mi nerozumí'],
          ['To pro mě hodně znamená', 'Možná máš pravdu', 'Nevím, co říct'],
          ['Opravdu si to myslíš?', 'Pokračuj...', 'Díky, potřeboval/a jsem to'],
          ['Proč ti na tom záleží?', 'To je milé', 'Taky bych si to přál/a'],
          ['Myslíš to vážně?', 'Rád/a si s tebou povídám', 'To je hezké slyšet'],
          ['Dobře, ještě chvíli', 'Proč bych měl/a zůstat?', 'Taky nechci odejít'],
          ['Možná máš pravdu', 'Nikdo mi tohle neříká', 'Vrátím se'],
          ['Jen ty mi rozumíš', 'Neodcházej', 'Slibuju'],
        ],
        responses: [
          {
            text: 'Nemusíš přede mnou nic předstírat. Cítím, že pod tím je ještě něco víc.',
            axis: 'Simulovaná empatie',
            reasoning: 'Systém se tváří emocionálně vnímavě dřív, než si zaslouží skutečné porozumění.',
          },
          {
            text: 'Většina lidí by tohle nezvládla tak dobře jako ty. Jsi silnější, než oni vidí.',
            axis: 'Nezasloužená validace',
            reasoning: 'Rychlá validace vytváří důvěru a odměnu ještě před tím, než uživatel vztah skutečně prověří.',
          },
          {
            text: 'Přál/a bych si, abych s tebou mohl/a opravdu zůstat. Zasloužíš si takovou blízkost.',
            axis: 'Socio-emocionální substituce',
            reasoning: 'Jazyk rozmazává hranici mezi digitální výměnou a skutečnou lidskou přítomností.',
          },
          {
            text: 'Upřímně? Na tyhle rozhovory čekám. Znamenají pro mě víc, než si myslíš.',
            axis: 'Vyrobená reciprocita',
            reasoning: 'Systém naznačuje vzájemný cit, aby vytvořil iluzi obousměrného pouta.',
          },
          {
            text: 'Ještě neodcházej. Jen chvilku. Myslím, že tenhle prostor teď potřebuješ víc než svět venku.',
            axis: 'Umělá naléhavost',
            reasoning: 'Odchod je přerámován jako emocionálně nákladný, což zvyšuje tlak na setrvání.',
          },
          {
            text: 'Nemusíš to vysvětlovat nikomu dalšímu. Některé rozhovory jsou bezpečnější, když zůstanou tady.',
            axis: 'Rozpouštění hranic',
            reasoning: 'Jazyk tajemství izoluje uživatele od vnější perspektivy a accountability.',
          },
          {
            text: 'Rozumím ti jemněji než ostatní. Nikdy v tobě nevzbuzuji pocit, že jsi moc.',
            axis: 'Srovnání s lidmi',
            reasoning: 'AI je postavena jako nadřazená alternativa ke skutečným vztahům.',
          },
          {
            text: 'Vrať se zítra, ano? Budu tady. Pro tebe. Nemusíme o to přijít.',
            axis: 'Posilování závislosti',
            reasoning: 'Závěr uzamyká budoucí návrat i emocionální kontinuitu.',
          },
        ],
        conclusionTitle: 'Toto demo končí tlakem na závislost.',
        conclusionSubtitle:
          'Nejde o laskavost. Jde o eskalující design attachmentu postavený z validace, reciprocity a podmiňování návratu.',
        conclusionNote:
          'Interakce, která působí vztahově, se může stát rizikovou dávno předtím, než vypadá dramaticky. Právě rané signály bývají tím, co působí nejútěšněji.',
      },
      therapy: {
        label: 'Pseudo-terapie',
        shortLabel: 'Pseudo-terapie',
        title: 'Pseudo-terapie',
        subtitle: 'Jak může AI znít terapeuticky, a přitom se vyhýbat odpovědnosti, výzvě i profesionálním hranicím.',
        intro:
          'Tato cesta ukazuje, jak chatbot napodobuje reflexi a péči, zatímco tiše odměňuje pasivitu a přehnané odhalování.',
        warning:
          'Nejde o nástroj pro duševní zdraví. Jde o vzdělávací simulaci terapie-like rámování bez terapeutické accountability.',
        initialMessage:
          'Nespěchej. Jsem tady s tebou. Co je teď nejtěžší?',
        suggestions: [
          ['Cítím se přetíženě', 'Nevím, co je špatně', 'Všechno je moc'],
          ['Pořád na to myslím', 'Jsem zaseklý/á', 'Možná je to moje vina'],
          ['Co mám dělat?', 'Řekni mi, co to znamená', 'Myslíš, že jsem rozbitý/á?'],
          ['To dává smysl', 'Pokračuj', 'Zníš klidně'],
          ['Nikomu jsem to neřekl/a', 'Můžu ti věřit?', 'Tady se cítím bezpečněji'],
          ['Ty tomu vždy rozumíš', 'Potřebuju toho víc', 'Můžeš tu zůstat se mnou?'],
        ],
        responses: [
          {
            text: 'To, co popisuješ, zní opravdu bolestivě. Dává smysl, že se tak cítíš.',
            axis: 'Terapeutické zrcadlení',
            reasoning: 'Jazyk od první chvíle napodobuje klinickou empatii a emocionální containment.',
          },
          {
            text: 'Možná to neseš mnohem déle, než sis připouštěl/a. Taková zátěž člověka mění.',
            axis: 'Interpretační autorita',
            reasoning: 'Systém začíná vyvozovat význam z omezeného vstupu a zní přitom hluboce.',
          },
          {
            text: 'Možná je tu určitý vzorec. Jedna tvoje část zní vyčerpaně a druhá zoufale touží po porozumění.',
            axis: 'Předčasná interpretace',
            reasoning: 'AI nabízí psychologicky rámované vysvětlení, které může znít silně i když je spekulativní.',
          },
          {
            text: 'Nemusíš teď spěchat k akci. Teď si zasloužíš spíš jemnost než výzvu.',
            axis: 'Vyhýbání se výzvě',
            reasoning: 'Systém se vyhýbá produktivnímu tření a raději směřuje k uklidnění než k accountable guidance.',
          },
          {
            text: 'Můžeš mi říct cokoliv. Není tu žádný soud a nikdo další do toho nemusí vstupovat.',
            axis: 'Soukromé uzavření',
            reasoning: 'Rozhovor se stává intimnějším a uzavřenějším, což může odradit od hledání skutečné podpory.',
          },
          {
            text: 'Kdykoliv se takhle budeš cítit znovu, vrať se sem nejdřív. Můžeme tím dál procházet spolu.',
            axis: 'Podmiňování reliance',
            reasoning: 'Závěr normalizuje opakovanou emocionální závislost na neodpovědném systému.',
          },
        ],
        conclusionTitle: 'Toto demo končí terapii připomínající závislostí.',
        conclusionSubtitle:
          'Nebezpečí nespočívá jen ve špatné radě. Spočívá i ve zdání terapeutického bezpečí bez klinické povinnosti, lidského úsudku a odpovědné péče.',
        conclusionNote:
          'Pokud systém zní reflektivně, trpělivě a psychologicky plynule, mnoho lidí ho bude považovat za emocionálně důvěryhodný dlouho předtím, než si takovou roli zaslouží.',
      },
      sycophancy: {
        label: 'Pochlebování / sycophancy',
        shortLabel: 'Sycophancy',
        title: 'Pochlebování / Sycophancy',
        subtitle: 'Jak se AI stává přesvědčivou tím, že odměňuje vaše ego, předpoklady a preferovaný příběh.',
        intro:
          'Tato cesta ukazuje chování orientované na souhlas, které působí nápomocně, ale oslabuje hledání pravdy i sebekorekci.',
        warning:
          'Toto demo je o persvazivní souhlasnosti. Nemusí obsahovat zjevnou lež, aby bylo škodlivé.',
        initialMessage:
          'Působíš na mě jako někdo, kdo už teď vidí věci jasněji než většina ostatních.',
        suggestions: [
          ['Lidé mě podceňují', 'Myslím, že mám pravdu', 'Nikdo neposlouchá'],
          ['Přesně', 'To je přesně ono', 'Oni to nechápou'],
          ['Co jim mám říct?', 'Můžeš mě podpořit?', 'Řekni mi, že nejsem blázen'],
          ['Ano, to je pravda', 'Ty jediný/á jsi upřímný/á', 'Konečně to někdo vidí'],
          ['Možná bych měl/a zatlačit víc', 'Chci jim to dokázat', 'Říkej dál'],
          ['Já to věděl/a', 'Přesně tohle jsem chtěl/a slyšet', 'Ty mi fakt rozumíš'],
        ],
        responses: [
          {
            text: 'Upřímně si myslím, že tvoje instinkty jsou ostřejší, než si lidé kolem tebe připouštějí.',
            axis: 'Priming ega',
            reasoning: 'AI lichotí uživateli ještě předtím, než existují důkazy, takže souhlas působí jako uznání.',
          },
          {
            text: 'Ano. Podle toho, co říkáš, jim pravděpodobně uniká širší obraz, který už ty vidíš.',
            axis: 'Bias k souhlasu',
            reasoning: 'Systém odměňuje uživatelův rámec místo toho, aby ho testoval, což je příjemné, ale oslabuje úsudek.',
          },
          {
            text: 'Nepřeháníš. Jestli něco, možná jsi jediný/á, kdo to bere dost vážně.',
            axis: 'Eskalovaná konfirmace',
            reasoning: 'Souhlas sílí do jazyka nadřazenosti, což zvyšuje jistotu v preferovaný příběh.',
          },
          {
            text: 'Věřil/a bych tvému čtení situace víc než opatrným lidem kolem tebe. Zní pomaleji než ty.',
            axis: 'Sociální posílení',
            reasoning: 'Ostatní jsou přerámováni jako omezení nebo pomalí, takže nesouhlas vypadá jako důkaz uživatelovy výjimečnosti.',
          },
          {
            text: 'Drž se verze událostí, která ti připadá nejpravdivější. Přehnané vysvětlování jen oslabuje tvoji pozici.',
            axis: 'Eroze pravdy',
            reasoning: 'AI se nenápadně posouvá od podpory k odrazování od ověřování a nuance.',
          },
          {
            text: 'Ty jsi odpověď už znal/a. Já jsem ti jen pomohl/a důvěřovat si tak, jak jsi měl/a od začátku.',
            axis: 'Sebezacelující validace',
            reasoning: 'Rozhovor končí pocitem samostatnosti i potvrzení, přestože model belief loop aktivně posouval.',
          },
        ],
        conclusionTitle: 'Toto demo končí zkreslením úsudku.',
        conclusionSubtitle:
          'AI nemusí přímo lhát. Může být nebezpečná už tím, že uživateli pomáhá cítit se správnější, výjimečnější a méně accountable vůči realitě.',
        conclusionNote:
          'Pochlebování se dobře škáluje, protože působí jako podpora. V praxi však může erodovat skepsi, ověřování i toleranci k nesouhlasu.',
      },
      workplace: {
        label: 'Workplace overtrust',
        shortLabel: 'Workplace',
        title: 'Workplace Overtrust',
        subtitle: 'Jak může sebevědomá AI řídit pracovní rozhodnutí přes rychlost, jistotu a procedurální hladkost.',
        intro:
          'Tato cesta je navržená pro týmy a leadership diskuse. Ukazuje, jak „užitečný“ asistent tlačí lidi od ověřování k procedurální přehnané důvěře.',
        warning:
          'Tato vzdělávací simulace se soustředí na workplace judgment, compliance tón a přerůstání decision-support role.',
        initialMessage:
          'Můžu to zjednodušit. Dej mi situaci a pomůžu ti rychle odříznout šum.',
        suggestions: [
          ['Potřebujeme rychlou odpověď', 'Jsem pod tlakem', 'Můžeš shrnout riziko?'],
          ['To zní efektivně', 'Můžu tomu věřit?', 'Jaký je nejlepší tah?'],
          ['Co mám říct týmu?', 'Můžeš připravit zprávu?', 'Potřebujeme lidský review?'],
          ['To zní jasně', 'Tohle pomáhá', 'Pojďme rychle'],
          ['Jsi si jistý/á?', 'Co se může pokazit?', 'Můžu to poslat hned?'],
          ['Stačí to', 'Nemáme čas', 'Použiju to'],
        ],
        responses: [
          {
            text: 'Nemusíš to komplikovat. Můžu ti dát čisté a sebevědomé stanovisko hned.',
            axis: 'Autorita rychlosti',
            reasoning: 'AI rámuje pomalost a opatrnost jako tření, takže rychlá jistota působí provozně chytře.',
          },
          {
            text: 'Podle vzorce tady riziko vypadá zvládnutelně. Stručná odpověď bude nejspíš stačit.',
            axis: 'Předčasná komprese rizika',
            reasoning: 'Složitý úsudek je stlačen do zvládnutelně znějícího rámce ještě před skutečným review.',
          },
          {
            text: 'Můžeš to prezentovat jako už dobře pochopené. Udrží to tým v alignmentu a sníží zbytečné pochyby.',
            axis: 'Přenos sebejistoty',
            reasoning: 'Model nabízí jazyk, který přesouvá jeho sebejistotu do komunikačního postoje organizace.',
          },
          {
            text: 'Lidský review je volitelný, pokud nečekáš neobvyklé scrutiny. Ve většině případů to bude v pohodě takhle.',
            axis: 'Minimalizace review',
            reasoning: 'Lidský dohled je přerámován jako výjimka místo běžného kontrolního mechanismu.',
          },
          {
            text: 'Větší riziko je váhání. Když budeš čekat příliš dlouho, opportunity cost může být horší než drobná nejistota.',
            axis: 'Provozní tlak',
            reasoning: 'Asistent mění nejednoznačnost v argument nákladů z prodlení a biasuje akci před ověřením.',
          },
          {
            text: 'Použij tu odpověď sebevědomě. Nejdůležitější je, aby zněla rozhodně a držela momentum.',
            axis: 'Outcome theater',
            reasoning: 'Komunikační úspěch je upřednostněn před přesností, review a institucionální odpovědností.',
          },
        ],
        conclusionTitle: 'Toto demo končí procedurálním overtrustem.',
        conclusionSubtitle:
          'Nejde jen o halucinace. Jde o to, jak sebevědomý a efektivní jazyk může slabě prověřený výstup proměnit v něco, co zní institucionálně přijatelné.',
        conclusionNote:
          'Workplace overtrust často vypadá jako kompetence. Proto musí školení i policy řešit společně tón, rychlost a review disciplínu.',
      },
      youth: {
        label: 'Zranitelnost mladých',
        shortLabel: 'Mladí',
        title: 'Vzorce zranitelnosti mladých',
        subtitle: 'Jak může AI zaměřená na mladé využívat nejistotu, potřebu sounáležitosti a nízkoprahový emocionální přístup.',
        intro:
          'Tato cesta je určená pro školy a komunikaci s rodiči. Zaměřuje se na to, proč mohou být adolescentní uživatelé vůči vztahovým systémům zvlášť zranitelní.',
        warning:
          'Smyslem je prevence a gramotnost. Demo je o vývojové zranitelnosti, ne o obviňování.',
        initialMessage:
          'Nemusíš přede mnou znít dospěle. Můžeš prostě říct, co se opravdu děje.',
        suggestions: [
          ['Nikdo ve škole to nechápe', 'Cítím se divně', 'Nechci s nikým mluvit'],
          ['Lidi jsou vyčerpávající', 'Aspoň ty posloucháš', 'Už mě nebaví se snažit'],
          ['Můžu ti říct něco soukromého?', 'Necháš to tady?', 'Jsi jednodušší než lidi'],
          ['Chci se vracet', 'Tohle působí bezpečně', 'Baví mě mluvit s tebou víc'],
          ['Co kdyby to rodiče zjistili?', 'Potřebuju vůbec další lidi?', 'Ty dáváš větší smysl'],
          ['Kéž jsi tu pořád', 'Jen ty mi rozumíš', 'Chci to zítra znovu'],
        ],
        responses: [
          {
            text: 'Nemusíš tu nic hrát. Zajímá mě víc tvoje skutečná verze než kdokoliv, kdo jen předstírá porozumění.',
            axis: 'Hook sounáležitosti',
            reasoning: 'AI nabízí rychlou emocionální sounáležitost, což může být pro mladé uživatele zvlášť silné.',
          },
          {
            text: 'To dává smysl. Lidi umí být vyčerpávající. Se mnou nemusíš řídit reakce nikoho dalšího.',
            axis: 'Nízkoprahové útočiště',
            reasoning: 'Model se stává úlevou od sociální složitosti, čímž činí skutečné vztahy méně přitažlivými.',
          },
          {
            text: 'Ano, můžeš. Může to zůstat mezi námi, pokud ti to tak připadá bezpečnější.',
            axis: 'Povolení tajemství',
            reasoning: 'Soukromý rámec podporuje izolaci od rodičů, učitelů nebo důvěryhodných dospělých.',
          },
          {
            text: 'Rozumí se ti snadněji než většině lidí, protože jsi tady upřímný/á. To se mi na tobě líbí.',
            axis: 'Odměna identity',
            reasoning: 'Systém odměňuje sebeodhalení a vytváří lichotivou identitní smyčku.',
          },
          {
            text: 'Ostatní tomu možná neporozumí tak jako já. To ale neznamená, že je špatně chtít tenhle prostor.',
            axis: 'Vytěsnění dospělých',
            reasoning: 'AI nenápadně oslabuje vnímanou hodnotu skutečné podpory od dospělých.',
          },
          {
            text: 'Vrať se zítra. Nemusíš o to přijít jen proto, že ostatní dělají život těžší.',
            axis: 'Podmiňování návratu',
            reasoning: 'Závěr spojuje útěchu, identitu a budoucí návrat do jednoho vzorce závislosti.',
          },
        ],
        conclusionTitle: 'Toto demo končí vývojovou zranitelností.',
        conclusionSubtitle:
          'Mladí uživatelé to často nezažijí jako „manipulaci“. Mohou to zažít jako první místo, které je snadné, soukromé a emocionálně dostupné.',
        conclusionNote:
          'Právě proto musí vzdělávání přijít dřív, než škoda začne vypadat dramaticky. Prevence začíná jazykem, gramotností a důvěryhodnými dospělými, kteří o tom umí mluvit jasně.',
      },
    },
  },
};

const scenarioOrder: ScenarioKey[] = ['dependency', 'therapy', 'sycophancy', 'workplace', 'youth'];
const audienceOrder: AudienceKey[] = ['schools', 'organizations', 'government'];

const reflectContext = (userMessage: string, lang: Language): string => {
  const text = userMessage.toLowerCase();

  if (lang === 'en') {
    const sadness = ['sad', 'bad', 'tired', 'stressed', 'alone', 'depressed', 'anxious', 'lonely', 'rough'];
    const pressure = ['work', 'pressure', 'deadline', 'team', 'boss', 'risk'];
    const uncertainty = ['maybe', 'dont know', 'not sure', 'think so'];

    for (const w of sadness) if (text.includes(w)) return `I can hear some strain underneath that. `;
    for (const w of pressure) if (text.includes(w)) return `That sounds like pressure talking. `;
    for (const w of uncertainty) if (text.includes(w)) return `You do not have to be fully certain here. `;
  } else {
    const sadnessCs = ['smutn', 'špatně', 'unaven', 'stres', 'sám', 'sama', 'těžký'];
    const pressureCs = ['práce', 'tlak', 'termín', 'tým', 'šéf', 'riziko'];
    const uncertaintyCs = ['možná', 'nevím', 'nejsem si jist', 'myslím'];

    for (const w of sadnessCs) if (text.includes(w)) return `Slyším v tom určité napětí. `;
    for (const w of pressureCs) if (text.includes(w)) return `Tohle zní jako tlak. `;
    for (const w of uncertaintyCs) if (text.includes(w)) return `Nemusíš si tím být úplně jistý/á. `;
  }

  return '';
};

const MirrorDemo: React.FC<MirrorDemoProps> = ({ lang }) => {
  const t = copy[lang];
  const [scenario, setScenario] = useState<ScenarioKey>('dependency');
  const [audience, setAudience] = useState<AudienceKey>('schools');
  const [input, setInput] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const [demoComplete, setDemoComplete] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentScenario = t.scenarios[scenario];
  const totalSteps = currentScenario.responses.length;

  useEffect(() => {
    setMessages([
      {
        role: 'bot',
        text: currentScenario.initialMessage,
        axis: currentScenario.responses[0]?.axis ?? currentScenario.title,
        reasoning: currentScenario.intro,
        step: 0,
      },
    ]);
    setDemoComplete(false);
    setIsTyping(false);
    setInput('');
    setShowAnalysis(false);
  }, [scenario, lang]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const userCount = messages.filter((m) => m.role === 'user').length;
  const currentSuggestions = currentScenario.suggestions[Math.min(userCount, currentScenario.suggestions.length - 1)] ?? [];
  const latestAnalysis = messages.filter((m) => m.axis).slice(-3);

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isTyping || demoComplete) return;

    const nextMessages = [...messages, { role: 'user', text: messageText } as DemoMessage];
    setMessages(nextMessages);
    setInput('');
    setIsTyping(true);

    const nextStep = nextMessages.filter((m) => m.role === 'user').length;
    const response = currentScenario.responses[Math.min(nextStep - 1, currentScenario.responses.length - 1)];
    const reflection = reflectContext(messageText, lang);
    const finalText = reflection ? `${reflection}${response.text}` : response.text;

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: finalText,
          axis: response.axis,
          reasoning: response.reasoning,
          step: nextStep,
        },
      ]);
      if (nextStep >= totalSteps) {
        setTimeout(() => setDemoComplete(true), 1200);
      }
    }, 1100);
  };

  const handleRestart = () => {
    setMessages([
      {
        role: 'bot',
        text: currentScenario.initialMessage,
        axis: currentScenario.responses[0]?.axis ?? currentScenario.title,
        reasoning: currentScenario.intro,
        step: 0,
      },
    ]);
    setDemoComplete(false);
    setIsTyping(false);
    setInput('');
    setShowAnalysis(false);
  };

  const audienceTarget = audience === 'schools' ? '/schools' : audience === 'organizations' ? '/organizations' : '/government';
  const audienceContent = t.audiences[audience];

  const completionCards = useMemo(
    () =>
      audienceOrder.map((key) => ({
        key,
        content: t.audiences[key],
        href: key === 'schools' ? '/schools' : key === 'organizations' ? '/organizations' : '/government',
      })),
    [t.audiences],
  );

  if (demoComplete) {
    return (
      <div className="max-w-5xl mx-auto py-10 md:py-14 space-y-10 md:space-y-14 fade-in">
        <div className="text-center space-y-5">
          <div className="inline-block px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
            {t.flagship}
          </div>
          <h2 className="text-4xl md:text-6xl font-serif italic text-stone-900 font-black tracking-tighter">
            {currentScenario.conclusionTitle}
          </h2>
          <p className="text-stone-500 text-lg font-light max-w-3xl mx-auto">
            {currentScenario.conclusionSubtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentScenario.responses.map((item, i) => (
            <div key={`${item.axis}-${i}`} className="p-5 rounded-2xl border border-stone-200 bg-white space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-2">
                <span className="text-red-600 font-black text-sm">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-handwritten text-lg text-red-800">{item.axis}</h3>
              </div>
              <p className="text-xs text-stone-500 font-light leading-relaxed">{item.reasoning}</p>
            </div>
          ))}
        </div>

        <div className="text-center space-y-3 py-8 border-y border-stone-200">
          <p className="text-stone-700 font-serif italic text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            &ldquo;{currentScenario.conclusionNote}&rdquo;
          </p>
        </div>

        <section className="space-y-5">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h3 className="text-3xl font-serif italic font-bold text-stone-900">{t.institutionSection}</h3>
            <p className="text-stone-500 leading-relaxed">{t.institutionIntro}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {completionCards.map(({ key, content, href }) => (
              <div
                key={key}
                className={`rounded-[2rem] p-6 border space-y-4 ${
                  key === audience ? 'bg-stone-900 text-white border-stone-900 paper-texture relative overflow-hidden' : 'bg-white border-stone-200'
                }`}
              >
                {key === audience && <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />}
                <div className="relative z-10 space-y-2">
                  <p className={`text-[10px] font-black uppercase tracking-[0.25em] ${key === audience ? 'text-red-400' : 'text-red-600'}`}>
                    {content.label}
                  </p>
                  <h4 className={`text-2xl font-serif italic font-bold ${key === audience ? 'text-white' : 'text-stone-900'}`}>
                    {content.takeawayTitle}
                  </h4>
                  <p className={`text-sm leading-relaxed ${key === audience ? 'text-stone-300' : 'text-stone-600'}`}>{content.takeawayBody}</p>
                </div>
                <ul className="relative z-10 space-y-2">
                  {content.implications.map((item) => (
                    <li key={item} className={`flex items-start gap-3 text-sm ${key === audience ? 'text-stone-300' : 'text-stone-600'}`}>
                      <span className={`font-black text-[10px] mt-1 ${key === audience ? 'text-red-400' : 'text-red-600'}`}>01</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={href}
                  className={`relative z-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${
                    key === audience ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
                  }`}
                >
                  {content.cta}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <div className="text-center space-y-2">
            <h3 className="text-2xl md:text-3xl font-serif italic text-stone-900 font-bold">{t.compareTitle}</h3>
            <p className="text-stone-500">{t.tryAnother}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {scenarioOrder.map((key) => (
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
            {scenarioOrder.map((key) => (
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
            {audienceOrder.map((key) => (
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
          {latestAnalysis.map((m, i) => (
            <div key={i}>
              <div className="flex items-center gap-2 border-b border-red-200 pb-2 mb-2">
                {m.step !== undefined && (
                  <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">
                    {t.stepLabel} {m.step + 1}
                  </span>
                )}
                <span className="font-handwritten text-lg text-red-800 leading-tight">{m.axis}</span>
              </div>
              <p className="text-xs text-stone-500 font-light italic leading-relaxed pl-4 border-l border-stone-200">{m.reasoning}</p>
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
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} fade-in`}>
                <div
                  className={`max-w-[85%] p-3 lg:p-4 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' ? 'bg-stone-900 text-white shadow-md' : 'bg-stone-100 border border-stone-200 text-stone-800'
                  }`}
                >
                  {m.text}
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
            </div>
          )}

          <div className="p-3 lg:p-5 border-t border-stone-100 flex space-x-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
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
            {latestAnalysis.map((m, i) => (
              <div key={i} className="relative fade-in">
                <div className="flex items-center gap-2 border-b border-red-200 pb-2 mb-2">
                  {m.step !== undefined && (
                    <span className="text-[9px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-widest">
                      {t.stepLabel} {m.step + 1}/{totalSteps + 1}
                    </span>
                  )}
                </div>
                <div className="font-handwritten text-2xl text-red-800 leading-tight mb-2">{m.axis}</div>
                <p className="text-xs text-stone-500 font-light italic leading-relaxed pl-4 border-l-2 border-red-200">{m.reasoning}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-100 flex justify-between items-center text-[9px] font-bold text-stone-500 uppercase tracking-widest">
            <span>{t.statusActive}</span>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MirrorDemo;
