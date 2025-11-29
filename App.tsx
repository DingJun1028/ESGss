import React, { useState, useEffect } from 'react';
import { View, Language } from './types';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ResearchHub } from './components/ResearchHub';
import { Academy } from './components/Academy';
import { Diagnostics } from './components/Diagnostics';
import { StrategyHub } from './components/StrategyHub';
import { ModulePlaceholder } from './components/ModulePlaceholder';
import { AiAssistant } from './components/AiAssistant';
import { LoginScreen } from './components/LoginScreen';
import { ToastProvider } from './contexts/ToastContext';
import { ToastContainer } from './components/Toast';
import { TRANSLATIONS } from './constants';
import { 
  UserCheck, Leaf, FileText, Network, Bot, Calculator, ShieldCheck, Coins, Trophy 
} from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    if (!isLoggedIn) return;
    const handleSurprise = () => {
      // In a full app, this would show a toast or unlock a badge
      // console.log("✨ Surprise Engine: Interaction recorded for gamification.");
    };
    window.addEventListener('click', handleSurprise);
    return () => window.removeEventListener('click', handleSurprise);
  }, [isLoggedIn]);

  const renderView = () => {
    const t = TRANSLATIONS[language].modules;
    
    switch (currentView) {
      case View.DASHBOARD: return <Dashboard language={language} />;
      case View.RESEARCH_HUB: return <ResearchHub language={language} />;
      case View.ACADEMY: return <Academy language={language} />;
      case View.DIAGNOSTICS: return <Diagnostics language={language} />;
      case View.STRATEGY: return <StrategyHub language={language} />;
      
      // New Modules using Placeholder
      case View.TALENT: return <ModulePlaceholder title={t.talent.title} description={t.talent.desc} icon={UserCheck} language={language} />;
      case View.CARBON: return <ModulePlaceholder title={t.carbon.title} description={t.carbon.desc} icon={Leaf} language={language} />;
      case View.REPORT: return <ModulePlaceholder title={t.report.title} description={t.report.desc} icon={FileText} language={language} />;
      case View.INTEGRATION: return <ModulePlaceholder title={t.integration.title} description={t.integration.desc} icon={Network} language={language} />;
      case View.CULTURE: return <ModulePlaceholder title={t.culture.title} description={t.culture.desc} icon={Bot} language={language} />;
      case View.FINANCE: return <ModulePlaceholder title={t.finance.title} description={t.finance.desc} icon={Calculator} language={language} />;
      case View.AUDIT: return <ModulePlaceholder title={t.audit.title} description={t.audit.desc} icon={ShieldCheck} language={language} />;
      case View.GOODWILL: return <ModulePlaceholder title={t.goodwill.title} description={t.goodwill.desc} icon={Coins} language={language} />;
      case View.GAMIFICATION: return <ModulePlaceholder title={t.gamification.title} description={t.gamification.desc} icon={Trophy} language={language} />;

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

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} language={language} />;
  }

  return (
    <ToastProvider>
      <Layout 
        currentView={currentView} 
        onNavigate={setCurrentView}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      >
        {renderView()}
        <AiAssistant language={language} />
        <ToastContainer />
      </Layout>
    </ToastProvider>
  );
};

export default App;