import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Loader2, Paperclip } from 'lucide-react';
import { ChatMessage, Language } from '../types';
import { generateEsgInsight } from '../services/geminiService';

interface AiAssistantProps {
  language: Language;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize greeting when language changes or first mount
  useEffect(() => {
    const greeting = language === 'zh-TW' 
      ? "您好。我是您的 Intelligence Orchestrator (智慧協作中樞)。今天能協助您進行哪些 ESG 轉型任務？"
      : "Greetings. I am your Intelligence Orchestrator. How can I assist with your ESG transformation today?";
      
    // Only reset if empty or just switching language for the welcome message
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'model',
        text: greeting,
        timestamp: new Date()
      }]);
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate Agentic Decomposition
    setTimeout(async () => {
      try {
        const responseText = await generateEsgInsight(userMsg.text, language);
        
        const modelMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: responseText,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, modelMsg]);
      } catch (e) {
        console.error(e);
      } finally {
        setIsTyping(false);
      }
    }, 800); // Small artificial delay for "Thinking" effect
  };

  return (
    <>
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-celestial-emerald to-celestial-purple rounded-full shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 animate-float group"
        >
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          <Bot className="w-8 h-8 text-white animate-pulse" />
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[450px] h-[600px] max-h-[80vh] flex flex-col rounded-2xl glass-panel overflow-hidden animate-fade-in border-celestial-glassBorder">
          
          {/* Header */}
          <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-celestial-emerald animate-ping" />
              <h3 className="font-semibold text-white tracking-wide">Intelligence Orchestrator</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-celestial-purple/80 text-white rounded-br-none'
                      : 'bg-slate-800/80 text-gray-200 border border-white/10 rounded-bl-none'
                  }`}
                >
                  {msg.role === 'model' && <Sparkles className="w-3 h-3 text-celestial-gold mb-1 inline-block mr-1" />}
                  <span dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }} />
                  <div className="text-[10px] opacity-50 mt-1 text-right">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800/50 p-3 rounded-2xl rounded-bl-none border border-white/5 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-celestial-emerald animate-spin" />
                  <span className="text-xs text-gray-400">{language === 'zh-TW' ? 'Agent 思考規劃中...' : 'Agentic thinking...'}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/5 border-t border-white/10">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={language === 'zh-TW' ? "詢問關於 TCFD、碳數據或生成報告..." : "Ask about TCFD, Carbon Data, or Generate Reports..."}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-celestial-purple/50 focus:ring-1 focus:ring-celestial-purple/50 placeholder-gray-500 transition-all"
              />
              <button className="absolute right-10 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-white transition-colors">
                 <Paperclip className="w-4 h-4" />
              </button>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-celestial-emerald/20 hover:bg-celestial-emerald/40 text-celestial-emerald rounded-lg transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-center mt-2">
                 <span className="text-[10px] text-gray-500">Powered by Gemini 2.5 Flash • Agentic RAG Enabled</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};