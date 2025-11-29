import React from 'react';
import { getMockHealth, TRANSLATIONS } from '../constants';
import { ShieldCheck, Activity, Server, AlertTriangle } from 'lucide-react';
import { Language } from '../types';

interface DiagnosticsProps {
  language: Language;
}

export const Diagnostics: React.FC<DiagnosticsProps> = ({ language }) => {
  const t = TRANSLATIONS[language].diagnostics;
  const healthData = getMockHealth(language);

  return (
    <div className="space-y-8 animate-fade-in">
        <div>
            <h2 className="text-3xl font-bold text-white">{t.title}</h2>
            <p className="text-gray-400">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-panel p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-celestial-emerald" />
                    {t.moduleHealth}
                </h3>
                <div className="space-y-4">
                    {healthData.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${item.status === 'Healthy' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                <div>
                                    <div className="text-sm font-medium text-white">{item.module}</div>
                                    <div className="text-xs text-gray-500">{item.latency}ms latency</div>
                                </div>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded border ${
                                item.status === 'Healthy' 
                                ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' 
                                : 'border-amber-500/30 text-amber-400 bg-amber-500/10'
                            }`}>
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl">
                 <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-celestial-purple" />
                    {t.security}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                        <div className="text-2xl font-bold text-white mb-1">99.9%</div>
                        <div className="text-xs text-gray-400">{t.uptime}</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                        <div className="text-2xl font-bold text-emerald-400 mb-1">Pass</div>
                        <div className="text-xs text-gray-400">{t.audit}</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                        <div className="text-2xl font-bold text-white mb-1">0</div>
                        <div className="text-xs text-gray-400">{t.alerts}</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                        <div className="text-2xl font-bold text-white mb-1">v12.0.4</div>
                        <div className="text-xs text-gray-400">{t.version}</div>
                    </div>
                </div>
                
                <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                        <div className="text-sm font-medium text-amber-400">{t.maintenance}</div>
                        <div className="text-xs text-gray-400 mt-1">
                            Data Verification Engine update scheduled for 03:00 UTC. No downtime expected.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};