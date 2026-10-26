import { useEffect, type FC } from 'react';
import { useLocation } from 'react-router';
import { Language } from '../translations';
import { SITE_ORIGIN, PUBLIC_ROUTES, languageAlternates, localizedPath, normalizePathname } from '../routing.mjs';

interface SEOConfig {
  title: string;
  description: string;
}

const seoData: Record<Language, Record<string, SEOConfig>> = {
  en: {
    '/': {
      title: 'Unplugged — AI is a tool. Not a relationship.',
      description: 'Public education and pilot workshops on healthy AI boundaries for schools, organizations, and individuals. An initiative under Alesvia, whose registration is being prepared.',
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
      title: 'Our Approach to AI Ethics Education & Workshops | Unplugged',
      description: 'How Unplugged approaches AI literacy education. Pilot workshops and training for schools and organizations.',
    },
    '/psychology': {
      title: 'When AI Feels Personal | Unplugged',
      description: 'What a chatbot study observed, what it cannot establish, and our interpretation for everyday AI use.',
    },
    '/join': {
      title: 'Join the Unplugged Program — AI Ethics for Schools & Organizations',
      description: 'Ask about pilot workshops and training on healthy AI boundaries for students, teachers, and organizations.',
    },
    '/privacy': {
      title: 'Privacy Policy | Unplugged',
      description: 'How Unplugged collects, uses, and protects your personal data. GDPR-compliant privacy policy.',
    },
  },
  cs: {
    '/': {
      title: 'Unplugged — AI je nástroj. Ne vztah.',
      description: 'Veřejné vzdělávání a pilotní workshopy o zdravých hranicích s AI pro školy, organizace a jednotlivce. Iniciativa pod Alesvia, jejíž registraci připravujeme.',
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
      title: 'Sebereflexe připravenosti na AI | Unplugged',
      description: 'Orientační sebereflexe pro školy, organizace a veřejné instituce. Zhodnoťte připravenost na používání konverzační AI.',
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
      title: 'Náš přístup ke vzdělávání o AI | Unplugged',
      description: 'Jak Unplugged přistupuje ke vzdělávání o AI. Nabídka pilotních workshopů a školení pro školy a organizace.',
    },
    '/psychology': {
      title: 'Když AI působí osobně | Unplugged',
      description: 'Co studie chatbotů pozorovala, co z ní nelze vyvodit a naše interpretace pro běžné používání AI.',
    },
    '/join': {
      title: 'Připojte se k programu Unplugged — Etika AI pro školy a organizace',
      description: 'Poptávka pilotních workshopů a školení o zdravých hranicích s AI pro studenty, učitele a organizace.',
    },
    '/privacy': {
      title: 'Ochrana osobních údajů | Unplugged',
      description: 'Jak Unplugged shromažďuje, používá a chrání vaše osobní údaje. Zásady ochrany osobních údajů v souladu s GDPR.',
    },
  },
};

const SEOHead: FC<{ lang: Language }> = ({ lang }) => {
  const location = useLocation();

  useEffect(() => {
    const path = normalizePathname(location.pathname).toLowerCase();
    const config = seoData[lang][path] || seoData[lang]['/'];
    const indexable = PUBLIC_ROUTES.includes(path);

    const canonicalUrl = SITE_ORIGIN + localizedPath(path, lang);
    document.documentElement.lang = lang;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]') || document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = canonicalUrl;
    if (!canonical.isConnected) document.head.appendChild(canonical);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang === 'cs' ? 'cs_CZ' : 'en_US');
    document.querySelector('meta[http-equiv="content-language"], meta[name="content-language"]')?.setAttribute('content', lang);
    const alternateLocale = document.querySelector<HTMLMetaElement>('meta[property="og:locale:alternate"]') || document.createElement('meta');
    alternateLocale.setAttribute('property', 'og:locale:alternate');
    alternateLocale.content = lang === 'cs' ? 'en_US' : 'cs_CZ';
    if (!alternateLocale.isConnected) document.head.appendChild(alternateLocale);

    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]') || document.createElement('meta');
    robots.name = 'robots';
    robots.content = indexable ? 'index, follow' : 'noindex, nofollow';
    if (!robots.isConnected) document.head.appendChild(robots);

    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => link.remove());
    if (indexable) {
      for (const [language, href] of Object.entries(languageAlternates(path))) {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = language;
        link.href = href;
        document.head.appendChild(link);
      }
    }

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
