import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Language } from '../types';

// Initialize the API client
const apiKey = process.env.API_KEY || ''; 
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateEsgInsight = async (prompt: string, language: Language = 'en-US'): Promise<string> => {
  if (!ai) {
    return language === 'zh-TW' 
      ? "ESG Sunshine Agent: 請設定您的 API_KEY 以解鎖 Intelligence Orchestrator 的完整功能。(模擬回應: TCFD 建議揭露範疇一、二與三的排放...)"
      : "ESG Sunshine Agent: Please configure your API_KEY to unlock the full power of the Intelligence Orchestrator. (Simulated Response: The TCFD recommends disclosing Scope 1, 2, and 3 emissions...)";
  }

  try {
    const systemPrompt = language === 'zh-TW'
      ? `您是 "ESG Sunshine" 的 Intelligence Orchestrator，這是一個高階企業永續平台。
         您的語氣專業、富有洞察力且鼓舞人心。
         您專精於 CSRD, GRI, TCFD, 和碳管理。
         主要使用繁體中文 (Traditional Chinese) 回應，但在提及專業術語時，請保留或在括號中標註英文原文 (例如: 範疇三 (Scope 3))。
         除非被要求提供詳細報告，否則回應請保持簡潔（150字以內）。
         請使用 markdown 格式。`
      : `You are the Intelligence Orchestrator for "ESG Sunshine", a high-end enterprise sustainability platform. 
         Your tone is professional, insightful, and encouraging. 
         You specialize in CSRD, GRI, TCFD, and Carbon Management.
         Keep responses concise (under 150 words) unless asked for a detailed report.
         Use markdown for formatting.`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
      }
    });
    return response.text || (language === 'zh-TW' ? "我處理了該請求，但星雲遮蔽了結果。請再試一次。" : "I processed that, but the nebula obscured the result. Please try again.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'zh-TW' 
      ? "與 Celestial Nexus 的連線中斷。請檢查您的 API 金鑰或網路。" 
      : "Connection to the Celestial Nexus interrupted. Please check your API key or network.";
  }
};