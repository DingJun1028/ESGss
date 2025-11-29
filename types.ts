export enum View {
  DASHBOARD = 'DASHBOARD',
  RESEARCH_HUB = 'RESEARCH_HUB',
  ACADEMY = 'ACADEMY',
  DIAGNOSTICS = 'DIAGNOSTICS',
  SETTINGS = 'SETTINGS'
}

export type Language = 'zh-TW' | 'en-US';

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