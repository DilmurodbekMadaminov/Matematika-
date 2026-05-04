import React, { useState, useEffect, useMemo } from 'react';
import { getQuestionsByVariant, totalVariantsForSubject, subjects } from './data/questions';
import { QuizState, Question } from './types';
  // REMOVED Chat import:
  // import { Chat } from './components/Chat';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  LayoutGrid, 
  Trophy, 
  Zap, 
  ChevronRight, 
  ArrowLeft,
  MessageCircle,
  HelpCircle,
  Share2,
  Copy
} from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    selectedSubject: null,
    selectedVariant: null,
    currentQuestionIndex: 0,
    score: 0,
    showResults: false,
    userAnswers: [],
    isStarted: false,
  });

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check URL for variant parameter on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const subjectParam = params.get('subject');
    const variantParam = params.get('variant');
    if (subjectParam && variantParam) {
      const variantNum = parseInt(variantParam, 10);
      const subjectExists = subjects.some(s => s.id === subjectParam);
      if (subjectExists && !isNaN(variantNum) && variantNum > 0) {
        selectVariant(subjectParam, variantNum);
      }
    }
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyShareLink = (e: React.MouseEvent, subjectId?: string, variant?: number) => {
    e.stopPropagation();
    const baseUrl = window.location.origin + window.location.pathname;
    let shareUrl = baseUrl;
    if (subjectId && variant) shareUrl = `${baseUrl}?subject=${subjectId}&variant=${variant}`;
    else if (subjectId) shareUrl = `${baseUrl}?subject=${subjectId}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast(variant ? `Variant ${variant} havolasi nusxalandi!` : "Ilova havolasi nusxalandi!");
    }).catch(() => {
      showToast("Nusxalashda xatolik yuz berdi");
    });
  };

  // Helper to shuffle array (Fisher-Yates)
  const shuffleArray = (array: number[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // State to hold shuffled order of indices [0, 1, 2, 3]
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([0, 1, 2, 3]);

  const selectVariant = (subjectId: string, variant: number) => {
    const questions = getQuestionsByVariant(subjectId, variant);
    setState({
      selectedSubject: subjectId,
      selectedVariant: variant,
      currentQuestionIndex: 0,
      score: 0,
      showResults: false,
      userAnswers: Array(questions.length).fill(null),
      isStarted: true,
    });
    setIsAnswered(false);
    setSelectedOption(null);
  };

  const currentQuestions = state.selectedSubject && state.selectedVariant ? getQuestionsByVariant(state.selectedSubject, state.selectedVariant) : [];
  const currentQuestion = currentQuestions[state.currentQuestionIndex];

  // Shuffle options whenever the question changes
  useEffect(() => {
    if (currentQuestion) {
      setShuffledIndices(shuffleArray([0, 1, 2, 3]));
    }
  }, [currentQuestion]);

  // Handle selection based on the DISPLAYED index
  const handleOptionSelect = (displayIndex: number) => {
    if (isAnswered) return;
    if (!currentQuestion) return;
    
    // Map display index back to original index to check correctness
    const originalIndex = shuffledIndices[displayIndex];
    setSelectedOption(originalIndex);
    
    const isCorrect = originalIndex === currentQuestion.correctAnswer;
    setIsAnswered(true);
    
    if (isCorrect) {
      setState(prev => ({ ...prev, score: prev.score + 1 }));
    }

    // Auto-advance after delay
    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  const handleNext = () => {
    setState(prev => {
      if (prev.showResults || !prev.isStarted || !prev.selectedVariant || !prev.selectedSubject) return prev;
      const questions = getQuestionsByVariant(prev.selectedSubject, prev.selectedVariant);
      
      if (prev.currentQuestionIndex + 1 < questions.length) {
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1
        };
      } else {
        return { ...prev, showResults: true };
      }
    });

    setIsAnswered(false);
    setSelectedOption(null);
  };

  const resetToHome = () => {
    setState({
      selectedSubject: null,
      selectedVariant: null,
      currentQuestionIndex: 0,
      score: 0,
      showResults: false,
      userAnswers: [],
      isStarted: false,
    });
  };

  const handleQuestionsLoaded = (newQuestions: Question[]) => {
    // This will be handled by the page reload in Chat.tsx
    // but we can also update state if needed
    console.log('New questions loaded:', newQuestions.length);
  };

  // --- RENDERING VIEWS ---

  if (!state.isStarted) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] p-4 md:p-8 pb-32">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="mb-10 text-center relative">
            <div className="absolute right-0 top-0">
              <button 
                onClick={(e) => copyShareLink(e)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-xl border border-blue-100 shadow-sm hover:bg-blue-50 transition-colors font-medium text-sm"
              >
                <Share2 className="w-4 h-4" /> Ulashish
              </button>
            </div>
            <div className="inline-flex p-3 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-200">
              <Trophy className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Test Platformasi</h1>
            <p className="text-slate-500">Istalgan fandan testlarni ishlang</p>
          </header>

          {subjects.map((subject) => {
            const variantCount = totalVariantsForSubject(subject.id);
            if (variantCount === 0) return null;
            
            return (
              <div key={subject.id} className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <span className="w-4 h-8 bg-blue-600 rounded-sm inline-block"></span>
                    {subject.name}
                  </h2>
                  <span className="bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full text-sm">
                    {subject.questions.length} test
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array.from({ length: variantCount }, (_, i) => i + 1).map(v => {
                    const questionCount = getQuestionsByVariant(subject.id, v).length;
                    return (
                      <button
                        key={v}
                        onClick={() => selectVariant(subject.id, v)}
                        className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all text-left group relative"
                      >
                        <div 
                          className="absolute top-4 right-4 p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          onClick={(e) => copyShareLink(e, subject.id, v)}
                          title="Ushbu variantni ulashish"
                        >
                          <Share2 className="w-4 h-4" />
                        </div>
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
                          <LayoutGrid className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                        </div>
                        <h3 className="font-bold text-slate-800">Variant {v}</h3>
                        <p className="text-xs text-slate-400 mt-1">{questionCount} ta savol</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          
          {subjects.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              Hali hech qanday fan yoki test mavjud emas.
            </div>
          )}
        </div>
        {/* Chat removed */}
        
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-4">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  if (state.showResults) {
    const totalQ = currentQuestions.length;
    const percentage = totalQ > 0 ? Math.round((state.score / totalQ) * 100) : 0;
    return (
      <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-10 text-center">
          <div className="mb-6 inline-block p-4 bg-yellow-50 rounded-full">
            <Trophy className="w-16 h-16 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Natija Yakunlandi!</h2>
          <p className="text-slate-500 mb-8">
            {state.selectedSubject ? subjects.find(s => s.id === state.selectedSubject)?.name : ''} - Variant {state.selectedVariant} yakuniga yetdi.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-2xl font-bold text-blue-600">{state.score}/{totalQ}</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">To'g'ri</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-2xl font-bold text-slate-800">{percentage}%</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Foiz</p>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => selectVariant(state.selectedSubject!, state.selectedVariant!)}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
            >
              <RotateCcw className="w-5 h-5" /> Qayta urinish
            </button>
            <button 
              onClick={(e) => copyShareLink(e, state.selectedSubject!, state.selectedVariant!)}
              className="w-full py-4 bg-green-50 text-green-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-100 transition-all"
            >
              <Share2 className="w-5 h-5" /> Natijani yoki variantni ulashish
            </button>
            <button 
              onClick={resetToHome}
              className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
            >
              <ArrowLeft className="w-5 h-5" /> Bosh sahifa
            </button>
          </div>
        </div>
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-4">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center">
        <div className="text-slate-500">Yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-slate-200 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={resetToHome} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div className="text-center">
            <h2 className="font-bold text-slate-900">Variant {state.selectedVariant}</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Savol {state.currentQuestionIndex + 1}/{currentQuestions.length}</p>
          </div>
          <button 
            onClick={(e) => copyShareLink(e, state.selectedVariant!)}
            className="w-10 h-10 bg-blue-50 hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors"
            title="Ushbu variantni ulashish"
          >
            <Share2 className="w-5 h-5 text-blue-600" />
          </button>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-500 ease-out" 
              style={{ width: `${((state.currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question "Bubble" */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-start gap-3 mb-6">
              <div className="mt-1 shrink-0">
                <MessageCircle className="w-5 h-5 text-blue-500" />
              </div>
              <div className="w-full overflow-x-auto">
                <p className="text-lg md:text-xl font-medium text-slate-800 leading-relaxed whitespace-pre-wrap font-mono">
                  {currentQuestion.text}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {shuffledIndices.map((originalIndex, displayIndex) => {
                // Ensure option exists (safe check)
                const option = currentQuestion.options[originalIndex];
                if (!option) return null;

                const labels = ['A', 'B', 'C', 'D'];
                // We compare originalIndex (the actual answer ID) with user selection
                const isSelected = selectedOption === originalIndex;
                const isCorrect = originalIndex === currentQuestion.correctAnswer;
                
                let btnStyle = "bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-900";
                let icon = null;

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = "bg-green-50 border-green-200 ring-1 ring-green-500 text-green-700 shadow-sm";
                    icon = <CheckCircle2 className="w-5 h-5 text-green-600" />;
                  } else if (isSelected) {
                    btnStyle = "bg-red-50 border-red-200 ring-1 ring-red-500 text-red-700";
                    icon = <XCircle className="w-5 h-5 text-red-600" />;
                  }
                } else if (isSelected) {
                  btnStyle = "bg-blue-50 border-blue-200 ring-1 ring-blue-500 text-blue-700";
                }

                return (
                  <button
                    key={displayIndex}
                    disabled={isAnswered}
                    onClick={() => handleOptionSelect(displayIndex)}
                    className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between text-left group ${btnStyle}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors shrink-0 ${
                        isSelected ? 'bg-blue-600 text-white' : 
                        isAnswered && isCorrect ? 'bg-green-600 text-white' : 
                        isAnswered && isSelected ? 'bg-red-600 text-white' : 
                        'bg-white text-green-700 border border-green-200'
                      }`}>
                        {labels[displayIndex]}
                      </span>
                      <span className="font-medium text-sm md:text-base font-mono whitespace-pre-wrap">{option}</span>
                    </div>
                    {icon}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Score Badge */}
          <div className="flex justify-center">
            <div className="bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-bold text-slate-600">Jami To'g'ri: {state.score}</span>
            </div>
          </div>
        </div>
      </main>

      {/* Chat removed */}

      {/* Optional Manual Footer */}
      {isAnswered && (
        <div className="bg-white border-t border-slate-200 p-4 animate-in slide-in-from-bottom-full duration-300">
           <div className="max-w-2xl mx-auto flex justify-between items-center">
             <p className="text-xs font-bold text-slate-400 uppercase">Javob berildi</p>
             <button 
              onClick={handleNext}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 text-sm"
             >
               Keyingisi <ChevronRight className="w-4 h-4" />
             </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;