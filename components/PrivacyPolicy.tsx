import React from 'react';
import { Language, translations } from '../translations';

interface PrivacyPolicyProps {
  lang: Language;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ lang }) => {
  const t = translations[lang];

  const sections = [
    { title: t.privacy_controller_title, content: t.privacy_controller_desc },
    {
      title: t.privacy_what_title,
      content: null,
      list: [t.privacy_what_newsletter, t.privacy_what_form, t.privacy_what_analytics],
    },
    { title: t.privacy_why_title, content: t.privacy_why_desc },
    { title: t.privacy_legal_title, content: t.privacy_legal_desc },
    { title: t.privacy_retention_title, content: t.privacy_retention_desc },
    { title: t.privacy_rights_title, content: t.privacy_rights_desc },
    { title: t.privacy_third_title, content: t.privacy_third_desc },
    { title: t.privacy_changes_title, content: t.privacy_changes_desc },
    { title: t.privacy_contact_title, content: t.privacy_contact_desc },
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 space-y-12">
      <section className="space-y-4">
        <h1 className="text-5xl font-serif italic text-stone-900 font-black tracking-tighter">
          {t.privacy_title}
        </h1>
        <p className="text-stone-500 font-light leading-relaxed">{t.privacy_intro}</p>
        <p className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">{t.privacy_last_updated}</p>
      </section>

      {sections.map((section, i) => (
        <section key={i} className="space-y-3">
          <h2 className="text-xl font-serif italic text-stone-900 font-bold">{section.title}</h2>
          {section.content && (
            <p className="text-stone-600 text-sm font-light leading-relaxed">{section.content}</p>
          )}
          {section.list && (
            <ul className="space-y-2">
              {section.list.map((item, j) => (
                <li key={j} className="flex items-start space-x-3">
                  <span className="text-red-600 font-black text-xs mt-0.5">{String(j + 1).padStart(2, '0')}</span>
                  <p className="text-stone-600 text-sm font-light leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
};

export default PrivacyPolicy;
