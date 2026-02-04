
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Grounding } from './pages/Grounding';
import { Letter } from './pages/Letter';
import { Navigation } from './components/Navigation';
import { EntryForm } from './components/EntryForm';
import { HistoryItem } from './components/HistoryItem';
import { Echo } from './components/Echo';
import { JournalEntry, AppState, Page } from './types';
import { STORAGE_KEY } from './constants';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial = saved ? JSON.parse(saved) : { entries: [] };
    return { ...initial, activePage: 'landing' };
  });

  // Track if we are currently in the middle of a major page transition
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const { activePage, ...persistentData } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistentData));
  }, [state]);

  const navigate = (page: Page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setState(prev => ({ ...prev, activePage: page }));
  };

  const handleEnterDashboard = () => {
    setIsTransitioning(true);
    // The delay here matches the Landing.tsx exit animation timeout
    setTimeout(() => {
      navigate('dashboard');
      setIsTransitioning(false);
    }, 100); // Navigation is called after Landing handles its internal 900ms delay
  };

  const handleAddEntry = (entryData: Omit<JournalEntry, 'id' | 'date' | 'energyLevel'>) => {
    const newEntry: JournalEntry = {
      ...entryData,
      id: crypto.randomUUID(),
      date: Date.now(),
      energyLevel: 5,
    };
    setState(prev => ({
      ...prev,
      entries: [newEntry, ...prev.entries],
      activePage: 'dashboard'
    }));
  };

  if (state.activePage === 'landing') {
    return <Landing onEnter={handleEnterDashboard} />;
  }

  return (
    <Layout>
      <div className="page-transition">
        {state.activePage === 'dashboard' && (
          <Dashboard entries={state.entries} onAction={navigate} />
        )}

        {state.activePage === 'write' && (
          <div className="py-12 pb-32 max-w-2xl mx-auto">
            <header className="mb-16 text-center">
              <span className="text-[10px] uppercase tracking-[0.5em] text-slate-600 mb-4 block">Composition</span>
              <h2 className="serif text-5xl text-slate-100 font-light italic">Let it flow.</h2>
            </header>
            <EntryForm onSave={handleAddEntry} />
          </div>
        )}

        {state.activePage === 'vault' && (
          <div className="py-12 pb-32 max-w-2xl mx-auto">
            <header className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-[0.5em] text-slate-600 mb-4 block">The Vault</span>
              <h2 className="serif text-5xl text-slate-100 font-light italic">Saved Stones.</h2>
            </header>
            <div className="space-y-12">
              {state.entries.length === 0 ? (
                <p className="text-center text-slate-600 italic py-20">Your vault is currently empty.</p>
              ) : (
                state.entries.map(entry => <HistoryItem key={entry.id} entry={entry} />)
              )}
            </div>
          </div>
        )}

        {state.activePage === 'ground' && <Grounding />}
        {state.activePage === 'echo' && <Echo entries={state.entries} />}
        {state.activePage === 'letter' && <Letter />}
      </div>

      {!isTransitioning && <Navigation activePage={state.activePage} onNavigate={navigate} />}
      
      {/* Signature: Access to the Letter */}
      <button 
        onClick={() => navigate('letter')}
        className={`fixed top-8 left-8 mix-blend-difference z-[60] transition-all duration-700 hover:scale-110 active:scale-95 ${
          state.activePage === 'letter' ? 'opacity-100 scale-125' : 'opacity-20 hover:opacity-100'
        }`}
      >
        <span className="serif text-2xl font-light italic text-white tracking-widest">SH</span>
        <div className="w-1 h-1 bg-indigo-500 rounded-full mx-auto mt-1 opacity-0 group-hover:opacity-100" />
      </button>
    </Layout>
  );
};

export default App;
