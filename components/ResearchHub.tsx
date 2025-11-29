import React from 'react';
import { Search, Database, BookOpen, Filter, Network, Share2 } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { OmniEsgCell } from './OmniEsgCell';

interface ResearchHubProps {
  language: Language;
}

export const ResearchHub: React.FC<ResearchHubProps> = ({ language }) => {
  const t = TRANSLATIONS[language].research;

  return (
    <div className="space-y-8 animate-fade-in">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">{t.title}</h2>
          <p className="text-gray-400">{t.subtitle}</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-celestial-emerald focus:border-celestial-emerald outline-none transition-all"
          />
        </div>
      </div>

      {/* Feature: Graph RAG / Service Flow Visual */}
      <div className="glass-panel p-6 rounded-2xl border-white/10 overflow-hidden relative">
          <div className="flex justify-between items-center mb-4 relative z-10">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Network className="w-5 h-5 text-celestial-gold" />
                  {language === 'zh-TW' ? 'Graph RAG 知識圖譜' : 'Graph RAG Knowledge Network'}
              </h3>
              <span className="text-xs text-celestial-emerald border border-celestial-emerald/30 px-2 py-1 rounded-full bg-celestial-emerald/10">Active Learning</span>
          </div>
          
          <div className="h-48 relative flex items-center justify-center bg-slate-900/40 rounded-xl border border-white/5">
               {/* Simplified CSS node visualization */}
               <div className="relative w-full max-w-lg h-full flex items-center justify-center">
                   {/* Center Node */}
                   <div className="absolute w-16 h-16 rounded-full bg-celestial-purple/20 border border-celestial-purple flex items-center justify-center z-20 animate-pulse">
                       <Database className="w-6 h-6 text-white" />
                   </div>
                   
                   {/* Connecting Lines (Simulated) */}
                   <div className="absolute w-[200px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-0"></div>
                   <div className="absolute w-[200px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-45"></div>
                   <div className="absolute w-[200px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-45"></div>

                   {/* Satellite Nodes */}
                   <div className="absolute top-8 left-1/4 w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-[10px] text-gray-300 animate-float">GRI</div>
                   <div className="absolute bottom-8 right-1/4 w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-[10px] text-gray-300 animate-float" style={{animationDelay: '1s'}}>SASB</div>
                   <div className="absolute top-1/2 right-10 w-12 h-12 rounded-full bg-celestial-emerald/10 border border-celestial-emerald/30 flex items-center justify-center text-[10px] text-emerald-400 animate-float" style={{animationDelay: '2s'}}>TCFD</div>
               </div>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Database className="w-5 h-5 text-celestial-purple" />
                        {t.dataExplorer}
                    </h3>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors">
                            <Share2 className="w-3 h-3" /> Export
                        </button>
                        <button className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors">
                            <Filter className="w-3 h-3" /> {t.filters}
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/10 text-gray-400">
                                <th className="pb-3 font-medium">{t.table.metric}</th>
                                <th className="pb-3 font-medium">{t.table.scope}</th>
                                <th className="pb-3 font-medium">{t.table.value}</th>
                                <th className="pb-3 font-medium">{t.table.confidence}</th>
                                <th className="pb-3 font-medium text-right">{t.table.source}</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300">
                            {[1,2,3,4,5].map((i) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                    <td className="py-3 group-hover:text-white transition-colors">Carbon Emission Factor {i}</td>
                                    <td className="py-3"><span className="px-2 py-0.5 rounded bg-celestial-purple/20 text-celestial-purple text-[10px]">Scope 3</span></td>
                                    <td className="py-3">12.{i} tCO2e</td>
                                    <td className="py-3">
                                        <OmniEsgCell 
                                            mode="badge"
                                            value=""
                                            confidence="high"
                                            verified={i % 2 === 0}
                                            color="emerald"
                                        />
                                    </td>
                                    <td className="py-3 text-right text-gray-500 text-xs">Internal Audit</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className="col-span-1 space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-celestial-gold" />
                    {t.knowledgeBase}
                </h3>
                <div className="space-y-3">
                    {['TCFD Implementation Guide v2.1', 'GRI 2024 Standards Update', 'Internal Water Policy Doc'].map((doc, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors border border-transparent hover:border-white/10">
                            <div className="text-sm text-gray-200 font-medium mb-1">{doc}</div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-gray-500">PDF • 2.4MB</span>
                                <span className="text-[10px] text-celestial-emerald">Verified</span>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 py-2 text-sm text-center text-celestial-purple hover:text-white transition-colors">
                    {t.viewAll}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};