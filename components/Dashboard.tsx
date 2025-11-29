import React from 'react';
import { getMockMetrics, CHART_DATA, TRANSLATIONS } from '../constants';
import { TrendingUp, TrendingDown, Minus, Activity, Wind, FileText, Zap } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Language } from '../types';

interface DashboardProps {
  language: Language;
}

export const Dashboard: React.FC<DashboardProps> = ({ language }) => {
  const t = TRANSLATIONS[language].dashboard;
  const metrics = getMockMetrics(language);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{t.title}</h2>
          <p className="text-gray-400">{t.subtitle}</p>
        </div>
        <div className="flex gap-2">
            <button className="px-3 py-1 text-xs rounded border border-white/20 text-gray-300 hover:bg-white/10">{t.periods.daily}</button>
            <button className="px-3 py-1 text-xs rounded bg-celestial-purple text-white">{t.periods.monthly}</button>
            <button className="px-3 py-1 text-xs rounded border border-white/20 text-gray-300 hover:bg-white/10">{t.periods.yearly}</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.id} className="glass-panel p-6 rounded-2xl relative overflow-hidden group glass-card-hover">
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 blur-xl group-hover:opacity-20 transition-opacity bg-${metric.color}-500`} />
            
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-sm font-medium">{metric.label}</span>
              {metric.color === 'emerald' && <Wind className="w-5 h-5 text-emerald-400" />}
              {metric.color === 'gold' && <Activity className="w-5 h-5 text-amber-400" />}
              {metric.color === 'purple' && <FileText className="w-5 h-5 text-purple-400" />}
              {metric.color === 'blue' && <Zap className="w-5 h-5 text-blue-400" />}
            </div>

            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
            </div>

            <div className="mt-4 flex items-center text-xs">
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 ${
                metric.trend === 'up' ? 'text-emerald-400' : 
                metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'
              }`}>
                {metric.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : 
                 metric.trend === 'down' ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                {Math.abs(metric.change)}%
              </span>
              <span className="text-gray-500 ml-2">{t.vsLastMonth}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border-white/5">
          <h3 className="text-lg font-semibold text-white mb-6">{t.chartTitle}</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBase" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                <Area type="monotone" dataKey="baseline" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorBase)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Notifications / Feed */}
        <div className="glass-panel p-6 rounded-2xl relative">
          <h3 className="text-lg font-semibold text-white mb-4">{t.feedTitle}</h3>
          <div className="space-y-4">
            <div className="p-3 bg-white/5 rounded-lg border-l-2 border-celestial-gold">
              <h4 className="text-sm font-medium text-celestial-gold">Anomaly Detected</h4>
              <p className="text-xs text-gray-400 mt-1">Energy spike in Plant B exceeding baseline by 15%.</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg border-l-2 border-celestial-emerald">
              <h4 className="text-sm font-medium text-celestial-emerald">Goal Achieved</h4>
              <p className="text-xs text-gray-400 mt-1">Q2 Water reduction target met ahead of schedule.</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg border-l-2 border-celestial-purple">
              <h4 className="text-sm font-medium text-celestial-purple">New Regulation</h4>
              <p className="text-xs text-gray-400 mt-1">EU CSRD update detected in regulatory crawler.</p>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/10">
            <h4 className="text-sm text-gray-400 mb-2">{t.marketingTitle}</h4>
            <div className="flex justify-between items-center">
               <span className="text-xs text-gray-500">ESG Campaign View Rate</span>
               <span className="text-sm font-bold text-white">42% <span className="text-emerald-500 text-[10px] ml-1">↑ 2.1%</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};