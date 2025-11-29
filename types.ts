export enum View {
  DASHBOARD = 'DASHBOARD',
  RESEARCH_HUB = 'RESEARCH_HUB', // Maps to Data/Knowledge aspects
  ACADEMY = 'ACADEMY', // Maps to Talent/Learning aspects
  DIAGNOSTICS = 'DIAGNOSTICS', // Maps to System Health
  SETTINGS = 'SETTINGS',
  // New Modules from Whitepaper
  STRATEGY = 'STRATEGY',
  TALENT = 'TALENT',
  CARBON = 'CARBON',
  REPORT = 'REPORT',
  INTEGRATION = 'INTEGRATION',
  CULTURE = 'CULTURE',
  FINANCE = 'FINANCE',
  AUDIT = 'AUDIT',
  GOODWILL = 'GOODWILL',
  GAMIFICATION = 'GAMIFICATION'
}

export type Language = 'zh-TW' | 'en-US';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

export interface Metric {
  id: string;
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  color: 'emerald' | 'gold' | 'purple' | 'blue';
}

export interface Course {
  id: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  thumbnail: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}

export interface SystemHealth {
  module: string;
  status: 'Healthy' | 'Warning' | 'Critical';
  latency: number;
}