import { Metric, Course, SystemHealth, Language } from './types';

export const TRANSLATIONS = {
  'en-US': {
    nav: {
      dashboard: 'Dashboard',
      researchHub: 'Research Hub',
      academy: 'Academy',
      diagnostics: 'Diagnostics',
      settings: 'Settings'
    },
    dashboard: {
      title: 'Executive Dashboard',
      subtitle: 'Real-time sustainability performance overview.',
      periods: { daily: 'Daily', monthly: 'Monthly', yearly: 'Yearly' },
      chartTitle: 'Emissions vs Baseline',
      feedTitle: 'Intelligence Feed',
      marketingTitle: 'Marketing Impact',
      vsLastMonth: 'vs last month'
    },
    research: {
      title: 'Research Hub',
      subtitle: 'Deep dive into data and regulatory frameworks.',
      searchPlaceholder: 'Search regulations, data points, or documents...',
      dataExplorer: 'Data Explorer',
      knowledgeBase: 'Knowledge Base',
      filters: 'Filters',
      viewAll: 'View All Documents',
      table: {
        metric: 'Metric',
        scope: 'Scope',
        value: 'Value',
        confidence: 'Confidence',
        source: 'Source'
      }
    },
    academy: {
      title: 'Sustainability Academy',
      subtitle: 'Upskill your team with curated ESG learning paths.',
      levelInfo: 'Level 12 • 4 Badges',
      progress: 'Progress',
      start: 'Start',
      resume: 'Resume'
    },
    diagnostics: {
      title: 'System Diagnostics',
      subtitle: 'Platform health and intelligence verification status.',
      moduleHealth: 'Module Health',
      security: 'Security & Compliance',
      uptime: 'Uptime',
      audit: 'SOC2 Audit',
      alerts: 'Critical Alerts',
      version: 'Version',
      maintenance: 'Maintenance Scheduled'
    }
  },
  'zh-TW': {
    nav: {
      dashboard: '儀表板 (Dashboard)',
      researchHub: '研究中心 (Research Hub)',
      academy: '永續學院 (Academy)',
      diagnostics: '系統診斷 (Diagnostics)',
      settings: '設定 (Settings)'
    },
    dashboard: {
      title: '企業決策儀表板 (Executive Dashboard)',
      subtitle: '即時永續績效概覽 (Real-time sustainability performance overview)',
      periods: { daily: '日 (Daily)', monthly: '月 (Monthly)', yearly: '年 (Yearly)' },
      chartTitle: '排放量 vs 基準線 (Emissions vs Baseline)',
      feedTitle: '智慧情報流 (Intelligence Feed)',
      marketingTitle: '行銷影響力 (Marketing Impact)',
      vsLastMonth: '與上月相比 (vs last month)'
    },
    research: {
      title: '研究中心 (Research Hub)',
      subtitle: '深入挖掘數據與法規框架 (Deep dive into data and regulatory frameworks)',
      searchPlaceholder: '搜尋法規、數據點或文件 (Search regulations, data points...)',
      dataExplorer: '數據探索器 (Data Explorer)',
      knowledgeBase: '知識庫 (Knowledge Base)',
      filters: '篩選 (Filters)',
      viewAll: '查看所有文件 (View All)',
      table: {
        metric: '指標 (Metric)',
        scope: '範疇 (Scope)',
        value: '數值 (Value)',
        confidence: '信心度 (Confidence)',
        source: '來源 (Source)'
      }
    },
    academy: {
      title: '永續學院 (Sustainability Academy)',
      subtitle: '提升團隊 ESG 技能 (Upskill your team with curated ESG learning paths)',
      levelInfo: '等級 12 • 4 徽章',
      progress: '進度 (Progress)',
      start: '開始 (Start)',
      resume: '繼續 (Resume)'
    },
    diagnostics: {
      title: '系統診斷 (System Diagnostics)',
      subtitle: '平台健康與智慧驗證狀態 (Platform health and intelligence verification status)',
      moduleHealth: '模組健康度 (Module Health)',
      security: '安全與合規 (Security & Compliance)',
      uptime: '運行時間 (Uptime)',
      audit: 'SOC2 稽核 (Audit)',
      alerts: '關鍵警報 (Critical Alerts)',
      version: '版本 (Version)',
      maintenance: '排程維護 (Maintenance Scheduled)'
    }
  }
};

export const getMockMetrics = (lang: Language): Metric[] => {
  const isZh = lang === 'zh-TW';
  return [
    { id: '1', label: isZh ? '碳排減少 (Carbon Reduction)' : 'Carbon Reduction', value: '1,240 tCO2e', change: 12.5, trend: 'up', color: 'emerald' },
    { id: '2', label: isZh ? 'ESG 評分 (ESG Score)' : 'ESG Score', value: '88.4', change: 4.2, trend: 'up', color: 'gold' },
    { id: '3', label: isZh ? '治理指數 (Governance Idx)' : 'Governance Idx', value: '92.1', change: 1.1, trend: 'neutral', color: 'purple' },
    { id: '4', label: isZh ? '社會影響力 (Social Impact)' : 'Social Impact', value: 'High', change: -0.5, trend: 'down', color: 'blue' },
  ];
};

export const getMockCourses = (lang: Language): Course[] => {
  const isZh = lang === 'zh-TW';
  return [
    { id: 'c1', title: isZh ? '範疇三排放精通 (Scope 3 Emissions Mastery)' : 'Scope 3 Emissions Mastery', category: isZh ? '碳管理 (Carbon Mgmt)' : 'Carbon Mgmt', level: 'Advanced', progress: 45, thumbnail: 'https://picsum.photos/400/220?random=1' },
    { id: 'c2', title: isZh ? 'CSRD 合規基礎 (CSRD Compliance Basics)' : 'CSRD Compliance Basics', category: isZh ? '報告 (Reporting)' : 'Reporting', level: 'Beginner', progress: 100, thumbnail: 'https://picsum.photos/400/220?random=2' },
    { id: 'c3', title: isZh ? '綠色金融策略 (Green Finance Strategies)' : 'Green Finance Strategies', category: isZh ? '金融 (Finance)' : 'Finance', level: 'Intermediate', progress: 12, thumbnail: 'https://picsum.photos/400/220?random=3' },
  ];
};

export const getMockHealth = (lang: Language): SystemHealth[] => {
  // Module names usually stay in English or technical terms, but we can localize if needed
  return [
    { module: 'Intelligence Orchestrator', status: 'Healthy', latency: 45 },
    { module: 'Data Verification Engine', status: 'Healthy', latency: 120 },
    { module: 'Regulatory RAG', status: 'Warning', latency: 350 },
    { module: 'Graph Database', status: 'Healthy', latency: 20 },
  ];
};

export const CHART_DATA = [
  { name: 'Jan', value: 400, baseline: 300 },
  { name: 'Feb', value: 300, baseline: 320 },
  { name: 'Mar', value: 550, baseline: 350 },
  { name: 'Apr', value: 480, baseline: 380 },
  { name: 'May', value: 390, baseline: 400 },
  { name: 'Jun', value: 650, baseline: 420 },
];