import React from 'react';
import { Link } from 'react-router';
import { Language } from '../translations';

interface ErrorBoundaryProps {
  lang: Language;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

const labels = {
  en: {
    title: 'Something went wrong',
    body: 'This page hit an unexpected error. Reloading usually fixes it.',
    reload: 'Reload',
    home: 'Back to home',
  },
  cs: {
    title: 'Něco se pokazilo',
    body: 'Na této stránce došlo k neočekávané chybě. Obnovení stránky to většinou vyřeší.',
    reload: 'Obnovit',
    home: 'Zpět domů',
  },
};

// Without this, an uncaught error anywhere in a routed page (e.g. a Convex
// query throwing) unmounts the entire React tree, including the header and
// nav — the user is stuck on a blank page with no way to navigate away.
// This only wraps the routed content in App.tsx, so header/nav survive.
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  props!: ErrorBoundaryProps;
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: { componentStack?: string | null }) {
    console.error('Unhandled error caught by ErrorBoundary:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      const t = labels[this.props.lang];
      return (
        <div className="max-w-md mx-auto py-24 text-center space-y-5">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">Unplugged</p>
          <h1 className="text-2xl font-serif italic font-bold text-stone-900">{t.title}</h1>
          <p className="text-stone-500 text-sm leading-relaxed">{t.body}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-stone-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors"
            >
              {t.reload}
            </button>
            <Link
              to="/"
              className="px-6 py-3 border border-stone-300 text-stone-700 rounded-full text-xs font-bold uppercase tracking-widest hover:border-stone-900 transition-colors"
            >
              {t.home}
            </Link>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
