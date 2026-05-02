import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Language } from '../translations';

interface SEOConfig {
  title: string;
  description: string;
}

const seoData: Record<Language, Record<string, SEOConfig>> = {
  en: {
    '/': {
      title: 'Unplugged — AI Ethics Education & Consulting | Czech Republic',
      description: 'Public education, workshops, events, training, consulting, and policy for healthy AI boundaries. Helping schools, organizations, and individuals across the Czech Republic and Europe.',
    },
    '/schools': {
      title: 'AI Workshops for Schools | Unplugged',
      description: 'School workshops, staff briefings, and policy starter packs for healthy AI boundaries, student wellbeing, and practical AI literacy.',
    },
    '/organizations': {
      title: 'Responsible AI Training for Organizations | Unplugged',
      description: 'Training, policy workshops, and leadership briefings for organizations that want practical, human-centered AI usage norms.',
    },
    '/government': {
      title: 'AI Briefings for Government and Public Institutions | Unplugged',
      description: 'Public-interest AI literacy briefings, advisory memos, and institutional guidance for government and public-sector teams.',
    },
    '/assessment': {
      title: 'AI Boundary Readiness Assessment | Unplugged',
      description: 'A lightweight readiness assessment for schools, organizations, and public institutions responding to emotionally significant AI use.',
    },
    '/about': {
      title: 'About Unplugged | Public-Interest AI Literacy Initiative',
      description: 'Learn how Unplugged frames its mission, evidence, and institution-building work across schools, organizations, and public institutions.',
    },
    '/initiative': {
      title: 'Join the Initiative | Unplugged',
      description: 'Volunteer, contribute expertise, facilitate workshops, advise, or stay close as Unplugged grows into a real institution.',
    },
    '/demo': {
      title: 'AI Manipulation Demo — See How Chatbots Create Emotional Dependency | Unplugged',
      description: 'Interactive demonstration exposing the psychological mechanisms chatbots use to simulate empathy, create urgency, and build emotional dependency. Educational tool for schools and organizations.',
    },
    '/research': {
      title: 'AI Psychology Research — Risks of Simulated Connection | Unplugged',
      description: 'Research into the psychological impact of conversational AI: simulated empathy, socio-emotional substitution, and how AI companions affect human relationships.',
    },
    '/approach': {
      title: 'Our Approach to AI Ethics Education & Consulting | Unplugged',
      description: 'How Unplugged helps schools and organizations navigate AI ethics. Workshops, events, training programs, consulting, and policy development for digital literacy and well-being.',
    },
    '/psychology': {
      title: 'AI Psychology — Dangers of AI as Therapist, Partner & Friend | Unplugged',
      description: 'What happens to your brain when AI becomes your therapist, partner, or friend. Research-backed psychology on emotional dependency, simulated empathy, and manipulation.',
    },
    '/join': {
      title: 'Join the Unplugged Program — AI Ethics for Schools & Organizations',
      description: 'Join our educational program for students, teachers, and organizations. Workshops, presentations, and consulting on healthy AI boundaries.',
    },
    '/privacy': {
      title: 'Privacy Policy | Unplugged',
      description: 'How Unplugged collects, uses, and protects your personal data. GDPR-compliant privacy policy.',
    },
  },
  cs: {
    '/': {
      title: 'Unplugged — Vzdělávání a poradenství v etice AI | Česká republika',
      description: 'Veřejné vzdělávání, workshopy, akce, školení, poradenství a tvorba politik pro zdravé hranice s AI. Pro školy, organizace a jednotlivce v České republice a Evropě.',
    },
    '/schools': {
      title: 'AI workshopy pro školy | Unplugged',
      description: 'Workshopy pro školy, briefingy pro pedagogy a policy starter packy pro zdravé hranice s AI, wellbeing studentů a praktickou AI gramotnost.',
    },
    '/organizations': {
      title: 'Responsible AI školení pro organizace | Unplugged',
      description: 'Školení, policy workshopy a briefingy pro vedení organizací, které chtějí praktické a lidsky orientované normy používání AI.',
    },
    '/government': {
      title: 'AI briefingy pro veřejný sektor | Unplugged',
      description: 'Public-interest briefingy, advisory mema a institucionální guidance pro vládu, samosprávy a veřejné instituce.',
    },
    '/assessment': {
      title: 'AI Boundary Readiness Assessment | Unplugged',
      description: 'Lehký readiness assessment pro školy, organizace a veřejné instituce, které reagují na emocionálně významné používání AI.',
    },
    '/about': {
      title: 'O projektu Unplugged | Iniciativa pro AI gramotnost ve veřejném zájmu',
      description: 'Zjistěte, jak Unplugged rámuje svou misi, práci s důkazy a budování instituce pro školy, organizace a veřejné instituce.',
    },
    '/initiative': {
      title: 'Přidejte se k iniciativě | Unplugged',
      description: 'Dobrovolničte, přineste expertizu, facilitujte workshopy, radte nebo zůstaňte blízko, jak se Unplugged rozrůstá ve skutečnou instituci.',
    },
    '/demo': {
      title: 'Demo manipulace AI — Jak chatboti vytvářejí emocionální závislost | Unplugged',
      description: 'Interaktivní demonstrace odhalující psychologické mechanismy, které chatboti používají k simulaci empatie, vytváření naléhavosti a budování emocionální závislosti.',
    },
    '/research': {
      title: 'Výzkum psychologie AI — Rizika simulovaného spojení | Unplugged',
      description: 'Výzkum psychologického dopadu konverzační AI: simulovaná empatie, socio-emocionální substituce a vliv AI společníků na lidské vztahy.',
    },
    '/approach': {
      title: 'Náš přístup ke vzdělávání a poradenství v etice AI | Unplugged',
      description: 'Jak Unplugged pomáhá školám a organizacím orientovat se v etice AI. Workshopy, akce, školící programy, poradenství a tvorba politik pro digitální gramotnost.',
    },
    '/psychology': {
      title: 'Psychologie AI — Nebezpečí AI jako terapeuta, partnera a kamaráda | Unplugged',
      description: 'Co se děje s tvým mozkem, když se AI stane tvým terapeutem, partnerem nebo kamarádem. Výzkumem podložená psychologie emocionální závislosti a simulované empatie.',
    },
    '/join': {
      title: 'Připojte se k programu Unplugged — Etika AI pro školy a organizace',
      description: 'Připojte se k našemu vzdělávacímu programu pro studenty, učitele a organizace. Workshopy, prezentace a poradenství o zdravých hranicích s AI.',
    },
    '/privacy': {
      title: 'Ochrana osobních údajů | Unplugged',
      description: 'Jak Unplugged shromažďuje, používá a chrání vaše osobní údaje. Zásady ochrany osobních údajů v souladu s GDPR.',
    },
  },
};

const SEOHead: React.FC<{ lang: Language }> = ({ lang }) => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const config = seoData[lang][path] || seoData[lang]['/'];

    document.title = config.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', config.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', config.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', config.description);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', config.title);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', config.description);
  }, [location.pathname, lang]);

  return null;
};

export default SEOHead;
