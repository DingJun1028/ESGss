import React, { useState, useEffect } from 'react';
import { View, Language } from './types';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ResearchHub } from './components/ResearchHub';
import { Academy } from './components/Academy';
import { Diagnostics } from './components/Diagnostics';
import { AiAssistant } from './components/AiAssistant';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [language, setLanguage] = useState<Language>('zh-TW');

  useEffect(() => {
    // Load preference on mount
    const savedLang = localStorage.getItem('app_language') as Language;
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const handleToggleLanguage = () => {
    const newLang = language === 'zh-TW' ? 'en-US' : 'zh-TW';
    setLanguage(newLang);
    localStorage.setItem('app_language', newLang);
  };
  
  // Surprise Engine (Simple simulation)
  useEffect(() => {
    const handleSurprise = () => {
      // In a full app, this would show a toast or unlock a badge
      // console.log("✨ Surprise Engine: Interaction recorded for gamification.");
    };
    window.addEventListener('click', handleSurprise);
    return () => window.removeEventListener('click', handleSurprise);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard language={language} />;
      case View.RESEARCH_HUB:
        return <ResearchHub language={language} />;
      case View.ACADEMY:
        return <Academy language={language} />;
      case View.DIAGNOSTICS:
        return <Diagnostics language={language} />;
      case View.SETTINGS:
        return (
          <div className="glass-panel p-8 rounded-2xl flex items-center justify-center min-h-[400px]">
             <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{language === 'zh-TW' ? '設定 (Settings)' : 'Settings'}</h3>
                <p className="text-gray-400">{language === 'zh-TW' ? '演示模式中設定面板受限。' : 'Configuration panel is restricted in Demo mode.'}</p>
             </div>
          </div>
        );
      default:
        return <Dashboard language={language} />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      onNavigate={setCurrentView}
      language={language}
      onToggleLanguage={handleToggleLanguage}
    >
      {renderView()}
      <AiAssistant language={language} />
    </Layout>
  );
};

export default App;