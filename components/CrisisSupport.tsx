import React, { useId } from 'react';
import { Language } from '../translations';

const copy = {
  cs: {
    title: 'Když je toho moc, mluv s člověkem.',
    region: 'Pomoc v České republice. Unplugged neposkytuje krizovou intervenci.',
    adult: 'Pro dospělé, zdarma a nonstop; v noci v režimu pohotovosti. Hovor v češtině nebo slovenštině.',
    young: 'Pro děti a studenty do 26 let, zdarma a nonstop.',
    emergency: 'Při ohrožení života volej', or: 'nebo',
    verified: 'Kontakty a telefonní provoz ověřeny 26. 10. 2026.',
    emergencySource: 'Tísňové linky v ČR',
  },
  en: {
    title: 'When it feels too much, talk to a person.',
    region: 'Support in the Czech Republic. Unplugged does not provide crisis intervention.',
    adult: 'For adults, free and available around the clock; on-call service at night. Calls in Czech or Slovak.',
    young: 'For children and students under 26, free and available around the clock.',
    emergency: 'If a life is at risk, call', or: 'or',
    verified: 'Contacts and phone availability checked on 26 October 2026.',
    emergencySource: 'Czech emergency numbers',
  },
};

// One quiet line for the site footer; the full block lives on /psychology, /demo and the self-reflection result.
export function CrisisSupportLine({ lang }: { lang: Language }) {
  const t = copy[lang];
  const linkClass = 'underline underline-offset-4 hover:text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-700';
  return (
    <p className="max-w-3xl mx-auto text-sm text-stone-700 font-normal normal-case tracking-normal leading-relaxed">
      <span className="font-serif font-bold">{t.title}</span>{' '}
      <a className={linkClass} href="tel:116123">{lang === 'cs' ? 'Linka první psychické pomoci 116 123' : 'Crisis line 116 123'}</a>
      {' · '}
      <a className={linkClass} href="tel:116111">{lang === 'cs' ? 'Linka bezpečí 116 111' : 'Youth line 116 111'}</a>
      {' · '}
      <a className={linkClass} href="tel:155">155</a>{' / '}<a className={linkClass} href="tel:112">112</a>
    </p>
  );
}

export default function CrisisSupport({ lang }: { lang: Language }) {
  const t = copy[lang];
  const headingId = useId();
  const linkClass = 'underline underline-offset-4 hover:text-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-700';
  return (
    <aside aria-labelledby={headingId} className="max-w-3xl mx-auto my-8 p-5 border border-stone-300 rounded-xl bg-stone-50 text-left text-base text-stone-800 font-normal normal-case tracking-normal leading-relaxed space-y-3">
      <h2 id={headingId} className="text-xl font-serif font-bold">{t.title}</h2>
      <p className="text-sm">{t.region}</p>
      <ul className="space-y-3">
        <li><a className={linkClass} href="https://www.linkapsychickepomoci.cz/">Linka první psychické pomoci</a>{' — '}<a className={`${linkClass} font-semibold`} href="tel:116123">116 123</a><p className="text-sm">{t.adult}</p></li>
        <li><a className={linkClass} href="https://www.linkabezpeci.cz/pomoc">Linka bezpečí</a>{' — '}<a className={`${linkClass} font-semibold`} href="tel:116111">116 111</a><p className="text-sm">{t.young}</p></li>
      </ul>
      <p>{t.emergency}{' '}<a className={`${linkClass} font-semibold`} href="tel:155">155</a>{' '}{t.or}{' '}<a className={`${linkClass} font-semibold`} href="tel:112">112</a>.</p>
      <p className="text-sm text-stone-600">{t.verified}{' '}<a className={linkClass} href="https://hzscr.gov.cz/tisnova-komunikace-v-ceske-republice-2">{t.emergencySource}</a></p>
    </aside>
  );
}
