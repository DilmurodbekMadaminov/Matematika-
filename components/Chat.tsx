import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, FileUp, Loader2, Bot, User, Save } from 'lucide-react';
import { ChatMessage, Question } from '../types';
import { generateQuestionsFromText, chatWithAI } from '../services/aiService';
import { extractTextFromPdf } from '../services/pdfService';

interface ChatProps {
  onQuestionsLoaded: (questions: Question[]) => void;
}

export const Chat: React.FC<ChatProps> = ({ onQuestionsLoaded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Salom! PDF faylingizni yuklang, men undan testlarni ajratib olaman va tizimga saqlab beraman.',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [extractedQuestions, setExtractedQuestions] = useState<Question[]>([]);
  const [variantSize, setVariantSize] = useState<number>(30);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processFile = async (file: File) => {
    if (!file || isLoading) return;
    if (file.type !== 'application/pdf') {
      addAssistantMessage('Faqat PDF fayllar ruxsat etiladi.');
      return;
    }

    setIsLoading(true);
    addUserMessage(`PDF fayl yuklandi: ${file.name}. 2000+ gacha testlar tezkorlik bilan ajratib olinmoqda (taxminan 1 daqiqa)...`);

    try {
      // Use client-side PDF extraction instead of server API
      const pages = await extractTextFromPdf(file);
      
      if (!pages || pages.length === 0) {
        throw new Error('PDF fayldan matn topilmadi.');
      }

      const questions = await generateQuestionsFromText(pages);
      
      if (questions && questions.length > 0) {
        setExtractedQuestions(questions);
        addAssistantMessage(`PDF-dan ${questions.length} ta test topildi. Ularni tizimga saqlashni xohlaysizmi?`, true);
      } else {
        throw new Error('Testlar topilmadi. Iltimos, PDF fayl formatini tekshiring.');
      }
    } catch (error: any) {
      console.error('File processing error:', error);
      addAssistantMessage(`Xatolik: ${error.message}`);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const saveQuestions = async () => {
    if (extractedQuestions.length === 0) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/save-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions: extractedQuestions, variantSize }),
      });

      if (!response.ok) throw new Error('Saqlashda xatolik');

      addAssistantMessage(`Muvaffaqiyatli! ${extractedQuestions.length} ta test data.tsx (questions.ts) fayliga yozildi. Endi quiz qismida ularni ko'rishingiz mumkin.`);
      onQuestionsLoaded(extractedQuestions);
      setExtractedQuestions([]);
      
      // Refresh page after a delay to load new data
      setTimeout(() => window.location.reload(), 3000);
    } catch (error: any) {
      addAssistantMessage(`Xatolik: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content, timestamp: Date.now() }]);
  };

  const addAssistantMessage = (content: string, showSaveBtn = false) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content, timestamp: Date.now() }]);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const msg = input;
    setInput('');
    addUserMessage(msg);
    setIsLoading(true);
    try {
      const res = await chatWithAI(msg);
      addAssistantMessage(res);
    } catch (error) {
      addAssistantMessage('Xatolik yuz berdi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg z-50 flex items-center justify-center">
        {isOpen ? <X /> : <MessageCircle />}
      </button>

      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden"
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if(f) processFile(f); }}
        >
          {isDragging && <div className="absolute inset-0 bg-blue-600/10 backdrop-blur-sm z-50 flex items-center justify-center border-4 border-dashed border-blue-600 rounded-3xl pointer-events-none">PDF-ni tashlang</div>}
          
          <div className="bg-blue-600 p-4 text-white flex items-center gap-2"><Bot /> <span className="font-bold">AI Yordamchi</span></div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {extractedQuestions.length > 0 && !isLoading && (
              <div className="flex flex-col gap-3 justify-start bg-white p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-sm font-medium text-slate-700">Har bir variantda nechta test bo'lsin?</label>
                  <input 
                    type="number" 
                    value={variantSize} 
                    onChange={(e) => setVariantSize(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 border border-slate-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-blue-500 text-center"
                    min="1"
                  />
                </div>
                <button onClick={saveQuestions} className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-green-700 transition-all w-full">
                  <Save size={18} /> Testlarni saqlash (data.tsx)
                </button>
              </div>
            )}
            {isLoading && <Loader2 className="animate-spin text-blue-600 mx-auto" />}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t flex items-center gap-2">
            <input type="file" ref={fileInputRef} onChange={(e) => { const f = e.target.files?.[0]; if(f) processFile(f); }} accept=".pdf" className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-400 hover:text-blue-600"><FileUp /></button>
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} placeholder="Xabar..." className="flex-1 bg-slate-100 rounded-xl px-4 py-2 outline-none" />
            <button onClick={handleSend} className="p-2 bg-blue-600 text-white rounded-xl"><Send size={18} /></button>
          </div>
        </div>
      )}
    </>
  );
};
