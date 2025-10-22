import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import UnlockScreen, { Theme } from './components/UnlockScreen';
import CreationScreen from './components/CreationScreen';
import LearnScreen from './components/LearnScreen';
import Navigation from './components/Navigation';

type View = 'learn' | 'create';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);
  const [activeView, setActiveView] = useState<View>('learn');
  const [className, setClassName] = useState<string>('');

  const handleUnlock = useCallback((theme: Theme, name: string) => {
    setIsUnlocked(true);
    setActiveTheme(theme);
    setClassName(name);
    setActiveView('learn'); // Default to the learn screen after unlocking
  }, []);

  return (
    <div className="min-h-screen font-sans antialiased text-slate-800">
      <Header className={className} />
      <main className="container mx-auto px-4 py-8">
        {!isUnlocked ? (
          <UnlockScreen onUnlock={handleUnlock} />
        ) : activeTheme && (
          <>
            <Navigation activeView={activeView} setActiveView={setActiveView} />
            {activeView === 'learn' && <LearnScreen />}
            {activeView === 'create' && <CreationScreen prompts={activeTheme.prompts} />}
          </>
        )}
      </main>
      <footer className="text-center py-4 text-sm text-slate-500">
        <p>&copy; 2024 Learn Tots. All rights reserved. For educational purposes only.</p>
      </footer>
    </div>
  );
}

export default App;