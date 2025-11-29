import React from 'react';
import { Sparkles, Lock, BarChart3, TrendingUp, TrendingDown, Minus, LucideIcon, Activity, Wifi, Bot, Link2, Loader2, Puzzle, BrainCircuit, Rocket, Infinity, GitMerge, Tag } from 'lucide-react';

export type OmniEsgMode = 'card' | 'cell' | 'list' | 'badge';
export type OmniEsgConfidence = 'high' | 'medium' | 'low';
export type OmniEsgColor = 'emerald' | 'gold' | 'purple' | 'blue' | 'slate';
export type OmniEsgDataLink = 'live' | 'ai' | 'blockchain';

// The 8 Evolutionary Traits
export type OmniEsgTrait = 
  | 'optimization' // 萬能優化 (Breathing Glow)
  | 'gap-filling'  // 缺口補齊 (Dashed Border + Puzzle)
  | 'tagging'      // 萬能標籤 (Tags display)
  | 'performance'  // 性能晉級 (Rocket Trend)
  | 'learning'     // 自學成長 (Brain Pulse)
  | 'evolution'    // 無限進化 (Infinity BG)
  | 'bridging'     // 承上啟下 (Flow Lines)
  | 'seamless';    // 天衣無縫 (Borderless/Transparent)

interface OmniEsgCellProps {
  mode: OmniEsgMode;
  label?: string;
  value?: string | number;
  subValue?: string;
  
  // Data Linkage Properties
  confidence?: OmniEsgConfidence;
  verified?: boolean;
  loading?: boolean;
  dataLink?: OmniEsgDataLink;
  
  // Evolutionary Traits
  traits?: OmniEsgTrait[];
  tags?: string[]; // For 'tagging' trait
  
  // Visual Properties
  icon?: LucideIcon;
  color?: OmniEsgColor;
  className?: string;
  
  // Metric specific
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  onClick?: () => void;
}

// === 1. Atomic Indicators ===

const DataLinkIndicator: React.FC<{ type: OmniEsgDataLink }> = ({ type }) => {
  const styles = {
    live: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.2)]',
    ai: 'text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-[0_0_8px_rgba(168,85,247,0.2)]',
    blockchain: 'text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_8px_rgba(251,191,36,0.2)]'
  };
  const labels = { live: 'Live', ai: 'Agent', blockchain: 'Chain' };
  const Icons = { live: Wifi, ai: Bot, blockchain: Link2 };
  const Icon = Icons[type];

  return (
    <div className={`flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border transition-all hover:scale-105 ${styles[type]}`}>
      {type === 'live' ? (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      ) : (
        <Icon className="w-3 h-3" />
      )}
      {labels[type]}
    </div>
  );
};

const ConfidenceIndicator: React.FC<{ level: OmniEsgConfidence; verified?: boolean; compact?: boolean }> = ({ level, verified, compact }) => {
  const getColor = () => {
    switch (level) {
      case 'high': return 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]';
      case 'medium': return 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]';
      case 'low': return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]';
    }
  };

  return (
    <div className="flex items-center gap-1.5" title={`Data Confidence: ${level.toUpperCase()} ${verified ? '(Verified)' : ''}`}>
      {verified && (
        <Lock className={`text-emerald-400 ${compact ? 'w-2.5 h-2.5' : 'w-3 h-3'}`} />
      )}
      <div className={`rounded-full ${getColor()} ${compact ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} />
    </div>
  );
};

const TrendIndicator: React.FC<{ value: number; direction: 'up' | 'down' | 'neutral'; performanceMode?: boolean }> = ({ value, direction, performanceMode }) => {
  const style = direction === 'neutral' 
    ? 'text-gray-400 bg-gray-500/10 border-gray-500/20'
    : direction === 'up' 
      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]' 
      : 'text-red-400 bg-red-500/10 border-red-500/20';
  
  // Performance Trait: Use Rocket for positive trends
  const Icon = performanceMode && direction === 'up' ? Rocket : (direction === 'up' ? TrendingUp : direction === 'down' ? TrendingDown : Minus);

  return (
    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${style} ${performanceMode && direction === 'up' ? 'animate-pulse' : ''}`}>
      <Icon className="w-3 h-3" />
      {Math.abs(value)}%
    </span>
  );
};

// === 2. Shared Theme Logic ===
const getTheme = (color: OmniEsgColor) => ({
  emerald: { 
    border: 'group-hover:border-emerald-500/40', 
    glow: 'bg-emerald-500', 
    text: 'text-emerald-400', 
    iconBg: 'bg-emerald-500/10',
    gradient: 'from-emerald-500/20' 
  },
  gold: { 
    border: 'group-hover:border-amber-500/40', 
    glow: 'bg-amber-500', 
    text: 'text-amber-400', 
    iconBg: 'bg-amber-500/10',
    gradient: 'from-amber-500/20' 
  },
  purple: { 
    border: 'group-hover:border-purple-500/40', 
    glow: 'bg-purple-500', 
    text: 'text-purple-400', 
    iconBg: 'bg-purple-500/10',
    gradient: 'from-purple-500/20' 
  },
  blue: { 
    border: 'group-hover:border-blue-500/40', 
    glow: 'bg-blue-500', 
    text: 'text-blue-400', 
    iconBg: 'bg-blue-500/10',
    gradient: 'from-blue-500/20' 
  },
  slate: { 
    border: 'group-hover:border-slate-400/40', 
    glow: 'bg-slate-400', 
    text: 'text-slate-400', 
    iconBg: 'bg-slate-500/10',
    gradient: 'from-slate-500/20' 
  },
}[color]);

// === 3. The Celestial Wrapper with Traits ===
const CelestialWrapper: React.FC<{ 
  children: React.ReactNode; 
  theme: ReturnType<typeof getTheme>; 
  traits: OmniEsgTrait[];
  className?: string;
  onClick?: () => void;
}> = ({ children, theme, traits, className = '', onClick }) => {
  const isSeamless = traits.includes('seamless');
  const isOptimization = traits.includes('optimization');
  const isGapFilling = traits.includes('gap-filling');
  const isBridging = traits.includes('bridging');

  const baseClasses = isSeamless 
    ? 'bg-transparent border-none' 
    : `backdrop-blur-xl bg-slate-900/40 border ${isGapFilling ? 'border-dashed border-white/20' : 'border-white/5'} hover:bg-white/5`;

  const shadowClasses = isSeamless ? '' : 'shadow-lg shadow-black/20';
  const optimizationClasses = isOptimization ? 'animate-ai-pulse ring-1 ring-white/10' : '';

  return (
    <div 
      onClick={onClick}
      className={`
        group relative overflow-hidden transition-all duration-300 ease-out
        ${baseClasses}
        ${theme.border}
        ${shadowClasses}
        ${optimizationClasses}
        ${onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''}
        ${className}
      `}
    >
      {/* Bridging Trait: Connector Lines */}
      {isBridging && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-gradient-to-b from-white/20 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-gradient-to-t from-white/20 to-transparent" />
        </>
      )}

      {/* Evolution Trait: Infinity Background */}
      {traits.includes('evolution') && (
        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
           <Infinity className="w-24 h-24 text-white animate-pulse" />
        </div>
      )}

      {/* Ambient Glow Effects */}
      {!isSeamless && (
        <>
          <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-3xl pointer-events-none ${theme.glow}`} />
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
        </>
      )}
      
      {/* Content Layer */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export const OmniEsgCell: React.FC<OmniEsgCellProps> = (props) => {
  const { 
    mode, label, value, subValue, confidence = 'high', verified = false, 
    loading = false, dataLink, traits = [], tags = [], icon: Icon, color = 'emerald', className = '', trend, onClick 
  } = props;
  
  const theme = getTheme(color);

  // === Loading State ===
  if (loading) {
    return (
      <div className={`p-4 rounded-xl border border-white/5 bg-slate-900/40 ${className}`}>
        <div className="flex items-center gap-4">
          <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
          <div className="text-sm text-gray-500">Initializing Omni-Component...</div>
        </div>
      </div>
    );
  }

  // Common Trait Indicators
  const LearningIndicator = () => traits.includes('learning') ? (
    <div className="absolute top-2 right-2 animate-pulse" title="Self-Learning Active">
      <BrainCircuit className="w-4 h-4 text-celestial-purple" />
    </div>
  ) : null;

  const GapFillIndicator = () => traits.includes('gap-filling') ? (
    <div className="flex items-center gap-1 text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded-full border border-dashed border-white/10">
       <Puzzle className="w-3 h-3" />
       <span>AI Filled</span>
    </div>
  ) : null;

  // === MODE: CARD ===
  if (mode === 'card') {
    return (
      <CelestialWrapper theme={theme} traits={traits} className={`rounded-2xl p-6 ${className}`} onClick={onClick}>
        <LearningIndicator />
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col gap-2">
            <span className="text-gray-400 text-sm font-medium tracking-wide">{label}</span>
            <div className="flex flex-wrap gap-2">
               {dataLink && <DataLinkIndicator type={dataLink} />}
               <GapFillIndicator />
               {traits.includes('tagging') && tags.map(tag => (
                 <span key={tag} className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded border border-white/10 text-gray-400">
                    <Tag className="w-2.5 h-2.5" /> {tag}
                 </span>
               ))}
            </div>
          </div>
          <div className={`p-2.5 rounded-xl border border-white/5 ${theme.iconBg} ${theme.text} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
             {Icon ? <Icon className="w-5 h-5" /> : <BarChart3 className="w-5 h-5" />}
          </div>
        </div>

        {/* Value */}
        <div className="mb-1">
          <h3 className={`text-2xl lg:text-3xl font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all ${traits.includes('seamless') ? theme.text : ''}`}>
            {value}
          </h3>
        </div>
        {subValue && <p className="text-xs text-gray-500 mb-5 font-medium">{subValue}</p>}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          {trend ? (
            <TrendIndicator value={trend.value} direction={trend.direction} performanceMode={traits.includes('performance')} />
          ) : (
            <span className="text-xs text-gray-600 flex items-center gap-1"><Minus className="w-3 h-3"/> Stable</span>
          )}
          <ConfidenceIndicator level={confidence} verified={verified} />
        </div>
      </CelestialWrapper>
    );
  }

  // === MODE: CELL ===
  if (mode === 'cell') {
    return (
      <CelestialWrapper theme={theme} traits={traits} className={`rounded-xl p-4 ${className}`} onClick={onClick}>
        <div className="flex flex-col h-full justify-between relative">
            {traits.includes('learning') && <BrainCircuit className="absolute -top-1 -right-1 w-3 h-3 text-celestial-purple animate-pulse" />}
            
            <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-400 font-medium truncate pr-2">{label}</span>
                    <div className="flex gap-1">
                        {dataLink && <div className="scale-75 origin-top-left"><DataLinkIndicator type={dataLink} /></div>}
                        {traits.includes('gap-filling') && <Puzzle className="w-3 h-3 text-gray-500" />}
                    </div>
                </div>
                <ConfidenceIndicator level={confidence} verified={verified} compact />
            </div>
            
            <div className={`text-xl font-bold text-white font-mono tracking-tight group-hover:${theme.text} transition-colors`}>
                {value}
            </div>
            
            {(subValue || trend) && (
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] text-gray-500">{subValue}</span>
                    {trend && <div className="scale-75 origin-right"><TrendIndicator value={trend.value} direction={trend.direction} performanceMode={traits.includes('performance')} /></div>}
                </div>
            )}
        </div>
      </CelestialWrapper>
    );
  }

  // === MODE: LIST ===
  if (mode === 'list') {
    return (
      <CelestialWrapper theme={theme} traits={traits} className={`rounded-xl p-3 ${className}`} onClick={onClick}>
         <div className="flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg border border-white/5 ${theme.iconBg} ${theme.text} group-hover:scale-105 transition-transform relative`}>
                    {Icon ? <Icon className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                    {traits.includes('learning') && <span className="absolute -top-1 -right-1 flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span></span>}
                </div>
                <div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">{label}</div>
                      {dataLink && <div className="scale-75 origin-left"><DataLinkIndicator type={dataLink} /></div>}
                      {traits.includes('gap-filling') && <span title="AI Filled" className="text-xs text-gray-500 cursor-help">●</span>}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                       {subValue && <span className="text-[10px] text-gray-500">{subValue}</span>}
                       {trend && <div className="scale-90 origin-left opacity-80"><TrendIndicator value={trend.value} direction={trend.direction} performanceMode={traits.includes('performance')} /></div>}
                       {traits.includes('tagging') && tags.length > 0 && (
                          <span className="text-[9px] text-gray-500 border border-gray-700 px-1 rounded">{tags[0]}</span>
                       )}
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className="text-right pl-4">
                <div className={`text-sm font-bold text-white font-mono tracking-wide group-hover:text-celestial-gold transition-colors ${traits.includes('seamless') ? theme.text : ''}`}>{value}</div>
                <div className="flex justify-end mt-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <ConfidenceIndicator level={confidence} verified={verified} compact />
                </div>
            </div>
         </div>
      </CelestialWrapper>
    );
  }

  // === MODE: BADGE ===
  if (mode === 'badge') {
      const width = confidence === 'high' ? 'w-full' : confidence === 'medium' ? 'w-2/3' : 'w-1/3';
      return (
        <div className="flex items-center gap-2 group cursor-help" title={`Confidence: ${confidence} | Verified: ${verified}`}>
            <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden relative border border-white/5">
                <div className={`h-full absolute left-0 top-0 rounded-full transition-all duration-1000 ${theme.glow} ${width} shadow-[0_0_8px_currentColor]`} />
            </div>
            {verified && <Lock className="w-3 h-3 text-emerald-400" />}
            {traits.includes('bridging') && <GitMerge className="w-3 h-3 text-blue-400 rotate-90" />}
        </div>
      );
  }

  return null;
};
