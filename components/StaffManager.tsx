import React, { useState } from 'react';
import { SignInButton, UserButton } from '@clerk/react';
import { useConvexAuth, useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { isClerkConfigured } from '../auth';
import { Language } from '../translations';

interface StaffManagerProps {
  lang: Language;
}

type StaffRole = 'admin' | 'facilitator';

const labels = {
  en: {
    eyebrow: 'Admin',
    title: 'Staff Access',
    subtitle:
      'Grant or revoke access to the internal tools. Facilitators can use the console and dashboards; admins can also edit content and manage this list.',
    authMissing: 'Clerk is not configured yet. Add the local Clerk env values first.',
    authLoading: 'Checking access...',
    signIn: 'Sign in as staff',
    unauthorized: 'Your account is signed in, but only admins can manage staff access.',
    email: 'Email',
    role: 'Role',
    notes: 'Notes (optional)',
    add: 'Add staff member',
    active: 'Active',
    inactive: 'Inactive',
    deactivate: 'Deactivate',
    reactivate: 'Reactivate',
    makeAdmin: 'Make admin',
    makeFacilitator: 'Make facilitator',
    empty: 'No staff records yet. People listed in the env allowlist still have access without appearing here.',
    error: 'Something went wrong. Try again.',
    envNote: 'Accounts on the DEV_ADMIN_EMAILS / DEV_FACILITATOR_EMAILS environment allowlists have access even if they are not in this table.',
  },
  cs: {
    eyebrow: 'Admin',
    title: 'Týmové přístupy',
    subtitle:
      'Udělujte nebo odebírejte přístup k interním nástrojům. Facilitátoři mohou používat konzoli a dashboardy; admini navíc mohou upravovat obsah a spravovat tento seznam.',
    authMissing: 'Clerk zatím není nakonfigurovaný. Nejdřív přidejte lokální Clerk env hodnoty.',
    authLoading: 'Ověřuji přístup...',
    signIn: 'Přihlásit se jako tým',
    unauthorized: 'Tento účet je přihlášený, ale spravovat přístupy mohou jen admini.',
    email: 'E-mail',
    role: 'Role',
    notes: 'Poznámka (volitelné)',
    add: 'Přidat člena týmu',
    active: 'Aktivní',
    inactive: 'Neaktivní',
    deactivate: 'Deaktivovat',
    reactivate: 'Obnovit',
    makeAdmin: 'Udělat adminem',
    makeFacilitator: 'Udělat facilitátorem',
    empty: 'Zatím žádné záznamy. Lidé z env allowlistu mají přístup, i když tu nejsou uvedeni.',
    error: 'Něco se pokazilo. Zkuste to znovu.',
    envNote: 'Účty na env allowlistech DEV_ADMIN_EMAILS / DEV_FACILITATOR_EMAILS mají přístup, i když v této tabulce nejsou.',
  },
};

const StaffManager: React.FC<StaffManagerProps> = ({ lang }) => {
  const t = labels[lang];
  const { isAuthenticated, isLoading } = useConvexAuth();
  const viewerAccess = useQuery(api.staff.getViewerAccess, isAuthenticated ? {} : 'skip');
  const staff = useQuery(api.staff.listStaff, viewerAccess?.isAdmin ? {} : 'skip');
  const upsertStaffMember = useMutation(api.staff.upsertStaffMember);

  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<StaffRole>('facilitator');
  const [newNotes, setNewNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const save = async (args: { email: string; role: StaffRole; active: boolean; notes?: string }) => {
    setErrorMessage(null);
    setIsSaving(true);
    try {
      await upsertStaffMember(args);
      return true;
    } catch {
      setErrorMessage(t.error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const handleAdd = async () => {
    if (!newEmail.trim()) return;
    const ok = await save({ email: newEmail, role: newRole, active: true, notes: newNotes.trim() || undefined });
    if (ok) {
      setNewEmail('');
      setNewNotes('');
      setNewRole('facilitator');
    }
  };

  if (!isClerkConfigured) {
    return (
      <div className="max-w-3xl mx-auto py-24 text-center space-y-4">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500">{t.authMissing}</p>
      </div>
    );
  }

  if (isLoading || (isAuthenticated && !viewerAccess)) {
    return (
      <div className="max-w-3xl mx-auto py-24 text-center space-y-4">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500">{t.authLoading}</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-3xl mx-auto py-24 text-center space-y-5">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500">{t.subtitle}</p>
        <SignInButton mode="modal">
          <button className="px-6 py-3 bg-stone-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors">
            {t.signIn}
          </button>
        </SignInButton>
      </div>
    );
  }

  if (!viewerAccess?.isAdmin) {
    return (
      <div className="max-w-3xl mx-auto py-24 text-center space-y-5">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500">{t.unauthorized}</p>
        <div className="flex justify-center">
          <UserButton />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 md:py-12 space-y-8">
      <section className="text-center space-y-3">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500 max-w-2xl mx-auto">{t.subtitle}</p>
      </section>

      <section className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 space-y-4">
        <div className="grid sm:grid-cols-[1fr,auto] gap-3">
          <input
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder={t.email}
            type="email"
            className="border border-stone-300 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-1 ring-stone-400"
          />
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value as StaffRole)}
            className="border border-stone-300 rounded-full px-4 py-2.5 text-sm bg-white"
          >
            <option value="facilitator">Facilitator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <input
          value={newNotes}
          onChange={(e) => setNewNotes(e.target.value)}
          placeholder={t.notes}
          className="w-full border border-stone-300 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-1 ring-stone-400"
        />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAdd}
            disabled={isSaving || !newEmail.trim()}
            className="px-6 py-2.5 bg-stone-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors disabled:opacity-50"
          >
            {t.add}
          </button>
          {errorMessage && <span className="text-xs text-red-600">{errorMessage}</span>}
        </div>
      </section>

      <section className="space-y-3">
        {staff === undefined && <p className="text-center text-stone-500 text-sm">{t.authLoading}</p>}
        {staff && staff.length === 0 && <p className="text-center text-stone-500 text-sm">{t.empty}</p>}
        {staff?.map((member) => (
          <div
            key={member._id}
            className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-wrap items-center gap-3"
          >
            <div className="min-w-0 flex-grow space-y-0.5">
              <p className="text-sm font-bold text-stone-900 truncate">{member.email}</p>
              <p className="text-xs text-stone-500">
                <span className="uppercase tracking-widest font-bold">{member.role}</span>
                {member.notes ? ` — ${member.notes}` : ''}
              </p>
            </div>
            <span
              className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                member.active ? 'bg-green-50 text-green-700' : 'bg-stone-100 text-stone-500'
              }`}
            >
              {member.active ? t.active : t.inactive}
            </span>
            <button
              type="button"
              disabled={isSaving}
              onClick={() =>
                save({
                  email: member.email,
                  role: member.role === 'admin' ? 'facilitator' : 'admin',
                  active: member.active,
                  notes: member.notes,
                })
              }
              className="px-4 py-1.5 border border-stone-300 rounded-full text-[10px] font-bold uppercase tracking-widest hover:border-stone-900 transition-colors disabled:opacity-50"
            >
              {member.role === 'admin' ? t.makeFacilitator : t.makeAdmin}
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() =>
                save({
                  email: member.email,
                  role: member.role as StaffRole,
                  active: !member.active,
                  notes: member.notes,
                })
              }
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors disabled:opacity-50 ${
                member.active
                  ? 'border border-red-200 text-red-600 hover:bg-red-50'
                  : 'bg-stone-900 text-white hover:bg-stone-800'
              }`}
            >
              {member.active ? t.deactivate : t.reactivate}
            </button>
          </div>
        ))}
      </section>

      <p className="text-center text-xs text-stone-400 max-w-2xl mx-auto">{t.envNote}</p>
    </div>
  );
};

export default StaffManager;
