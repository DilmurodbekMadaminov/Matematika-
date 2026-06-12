import React, { useState, useEffect, useMemo } from 'react';
import { getQuestionsByVariant as staticGetQuestionsByVariant, totalVariantsForSubject as staticTotalVariantsForSubject, subjects as backupSubjects } from './data/questions';
import { getAbsoluteApiUrl } from './services/apiConfig';
import { QuizState, Question, Subject } from './types';
import { Chat } from './components/Chat';
import { SplitScreenEditor } from './components/SplitScreenEditor';
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

  const [userEmail, setUserEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('userEmail');
      if (saved && saved.trim()) return saved;
      
      // Har bir foydalanuvchi alohida o'z darsligini ko'rishi va yuklashi uchun tasodifiy unikal qurilma ID yaratamiz
      const randId = Math.random().toString(36).substring(2, 11);
      const uniqueDeviceEmail = `user-${randId}@sinov.uz`;
      localStorage.setItem('userEmail', uniqueDeviceEmail);
      return uniqueDeviceEmail;
    }
    return 'dilnuramadaminova06@gmail.com';
  });

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
    }
  }, [userEmail]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'profil' | 'kutubxona'>('profil');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic Subjects database syncing
  const [dynamicSubjects, setDynamicSubjects] = useState<Subject[]>([]);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
  const [initiallyLoading, setInitiallyLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchSubjects = async (email?: string) => {
    try {
      const activeEmail = email || userEmail;
      const res = await fetch(getAbsoluteApiUrl(`/api/subjects?creator=${encodeURIComponent(activeEmail)}`));
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setDynamicSubjects(data);
          setIsLoadingSubjects(false);
          return data;
        }
      }
    } catch (err) {
      console.error("Error loading live subjects:", err);
    }
    // Fallback if network or file doesn't exist
    const activeEmail = email || userEmail;
    const filteredBackup = backupSubjects.filter(sub => {
      const creator = sub.creator || 'dilnuramadaminova06@gmail.com';
      return creator === activeEmail;
    });
    setDynamicSubjects(filteredBackup);
    setIsLoadingSubjects(false);
    return filteredBackup;
  };

  useEffect(() => {
    fetchSubjects(userEmail);
  }, [userEmail]);

  const subjectsList = useMemo(() => {
    const rawList = dynamicSubjects.length > 0 ? dynamicSubjects : backupSubjects;
    if (showOnlyMine) {
      return rawList.filter(sub => {
        const creator = sub.creator || 'dilnuramadaminova06@gmail.com';
        return creator === userEmail;
      });
    }
    return rawList;
  }, [dynamicSubjects, userEmail, showOnlyMine]);

  const totalVariantsForSubjectLocal = (subjectId: string) => {
    const subject = subjectsList.find(s => s.id === subjectId);
    if (!subject) return 0;
    const vSize = subject.variantSize || 30;
    return Math.ceil(subject.questions.length / vSize);
  };

  const getQuestionsByVariantLocal = (subjectId: string, variant: number): Question[] => {
    const subject = subjectsList.find(s => s.id === subjectId);
    if (!subject) return [];
    const vSize = subject.variantSize || 30;
    const start = (variant - 1) * vSize;
    const end = start + vSize;
    return subject.questions.slice(start, end);
  };

  // Filtered personal library subjects
  const librarySubjects = useMemo(() => {
    return subjectsList.filter(sub => {
      // Show only personal collections based on creator identifier
      const matchesCreator = sub.creator === userEmail;
      const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCreator && matchesSearch;
    });
  }, [subjectsList, userEmail, searchQuery]);

  const handleExportMyTestX = (subj: any) => {
    const dataStr = JSON.stringify({
      title: subj.name,
      variantSize: subj.variantSize || 30,
      questions: subj.questions.map((q: any) => ({
        id: q.id,
        text: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer
      }))
    }, null, 2);
    
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${subj.name.replace(/\s+/g, '_')}_MyTestX.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`"${subj.name}" MyTestX JSON fayli yuklab olindi!`);
  };

  const handleDeleteSubject = async (subjectId: string, subjectName: string) => {
    if (window.confirm(`Haqiqatan ham "${subjectName}" imtihon to'plamini butunlay o'chirmoqchisiz?`)) {
      try {
        const response = await fetch(getAbsoluteApiUrl('/api/delete-subject'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subjectId })
        });
        if (response.ok) {
          showToast("Kutubxonadan muvaffaqiyatli o'chirildi!");
          fetchSubjects();
        } else {
          showToast("O'chirishda xatolik yuz berdi");
        }
      } catch (err) {
        showToast("Server ulanishida xatolik");
      }
    }
  };

  // Check URL for variant parameter on mount
  useEffect(() => {
    const fetchAndSelect = async () => {
      const params = new URLSearchParams(window.location.search);
      const subjectParam = params.get('subject');
      const variantParam = params.get('variant');
      if (subjectParam && variantParam) {
        setInitiallyLoading(true);
        setLoadError(null);
        try {
          const variantNum = parseInt(variantParam, 10);
          const loadedSubjects = await fetchSubjects();
          const targetSub = loadedSubjects.find((s: any) => s.id === subjectParam);
          if (targetSub && !isNaN(variantNum) && variantNum > 0) {
            const vSize = targetSub.variantSize || 30;
            const start = (variantNum - 1) * vSize;
            const end = start + vSize;
            const questions = targetSub.questions.slice(start, end);
            
            if (questions.length === 0) {
              setLoadError(`Ushbu variantda savollar topilmadi. Variant raqami (${variantNum}) xato kiritilgan bo'lishi mumkin.`);
            } else {
              setState({
                selectedSubject: subjectParam,
                selectedVariant: variantNum,
                currentQuestionIndex: 0,
                score: 0,
                showResults: false,
                userAnswers: Array(questions.length).fill(null),
                isStarted: true,
              });
              setIsAnswered(false);
              setSelectedOption(null);
            }
          } else {
            setLoadError(`Kechirasiz, "${subjectParam}" fani yoki uning ${variantParam}-varianti topilmadi.`);
          }
        } catch (err: any) {
          setLoadError(`Havolani yuklashda xatolik yuz berdi: ${err.message || err}`);
        } finally {
          setInitiallyLoading(false);
        }
      }
    };
    fetchAndSelect();
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
    const questions = getQuestionsByVariantLocal(subjectId, variant);
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

  const currentQuestions = state.selectedSubject && state.selectedVariant ? getQuestionsByVariantLocal(state.selectedSubject, state.selectedVariant) : [];
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
      const questions = getQuestionsByVariantLocal(prev.selectedSubject, prev.selectedVariant);
      
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

  const handleQuestionsLoaded = async (newQuestions: Question[], newlySavedSubject: any) => {
    console.log('New questions loaded:', newQuestions.length);
    if (newlySavedSubject) {
      const refreshedList = await fetchSubjects();
      // find the latest subject to active it in the editing view
      const targetSub = refreshedList.find((s: any) => s.id === newlySavedSubject.id) || newlySavedSubject;
      setEditingSubject(targetSub);
      showToast(`Muvaffaqiyatli! "${newlySavedSubject.name}" darsligi yuklandi. O'zgartirishlarni tahrirlashingiz mumkin.`);
    }
  };

  // --- RENDERING VIEWS ---

  if (initiallyLoading) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-8 text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <span className="text-xl animate-spin inline-block border-2 border-t-transparent border-blue-600 rounded-full w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
              SINOV.UZ TIZIMI
            </span>
            <h2 className="text-xl font-bold text-slate-800 mt-2">Darslik Testi yuklanmoqda...</h2>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed px-2">
              Variant kesh ma'lumotlari boshqa qurilmadan xavfsiz olinmoqda. Iltimos, kuting.
            </p>
          </div>
          <div className="text-xs text-blue-600 font-mono font-bold bg-blue-50/10 py-2.5 px-4 rounded-xl border border-blue-100/50">
            Kutish kutilmoqda...
          </div>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-8 text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center" id="load-error-state">
            <HelpCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="bg-rose-100 text-rose-800 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
              YUKLASHDA XATOLIK
            </span>
            <h2 className="text-xl font-bold text-slate-800 mt-2">Test topilmadi</h2>
            <p className="text-xs text-rose-600 font-semibold leading-relaxed px-4 py-3 bg-rose-50 rounded-2xl border border-rose-100">
              {loadError}
            </p>
          </div>
          <button
            onClick={() => {
              setLoadError(null);
              window.history.pushState({}, '', window.location.pathname);
              resetToHome();
            }}
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-xs uppercase tracking-wider transition-all"
          >
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    );
  }

  if (!state.isStarted) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] p-4 md:p-8 pb-32">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="mb-10 text-center relative">
            <div className="absolute right-0 top-0 flex gap-2">
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors font-medium text-sm"
              >
                ⚙️ Sozlamalar / Profil
              </button>
              <button 
                onClick={(e) => copyShareLink(e)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-xl border border-blue-100 shadow-sm hover:bg-blue-50 transition-colors font-medium text-sm lg:flex hidden"
              >
                <Share2 className="w-4 h-4" /> Ulashish
              </button>
            </div>
            <div className="inline-flex p-3 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-200">
              <Trophy className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Test Platformasi</h1>
            <p className="text-slate-500">Istalgan fandan testlarni ishlang</p>

            <div className="mt-6 flex justify-center">
              <div className="bg-slate-200/50 p-1.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1">
                <button
                  onClick={() => setShowOnlyMine(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    !showOnlyMine 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  🌐 Barcha fanlar ({dynamicSubjects.length})
                </button>
                <button
                  onClick={() => setShowOnlyMine(true)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    showOnlyMine 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  👤 Shaxsiy darsliklarim
                </button>
              </div>
            </div>
          </header>

          {subjectsList.map((subject) => {
            const variantCount = totalVariantsForSubjectLocal(subject.id);
            if (variantCount === 0) return null;
            
            return (
              <div key={subject.id} className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 h-8 bg-blue-600 rounded-sm inline-block"></span>
                    <h2 className="text-2xl font-bold text-slate-800">
                      {subject.name}
                    </h2>
                    {subject.creator && (
                      <span className="text-[10px] bg-slate-100 text-slate-500 rounded-lg px-2.5 py-1 font-mono font-bold border border-slate-200" title={`Yuklovchi: ${subject.creator}`}>
                        by {subject.creator.includes('@') ? subject.creator.split('@')[0] : subject.creator}
                      </span>
                    )}
                    <button
                      onClick={() => setEditingSubject(subject)}
                      className="ml-2 flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-full transition-all font-bold text-xs"
                      title="Split-Screen test muharriri"
                    >
                      ✏️ Tahrirlash
                    </button>
                  </div>
                  <span className="bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full text-sm">
                    {subject.questions.length} test
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array.from({ length: variantCount }, (_, i) => i + 1).map(v => {
                    const questionCount = getQuestionsByVariantLocal(subject.id, v).length;
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
          
          {subjectsList.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              Hali hech qanday fan yoki test mavjud emas.
            </div>
          )}
        </div>
        <Chat onQuestionsLoaded={handleQuestionsLoaded} userEmail={userEmail} />
        
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-4">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Settings Overlay Dialog */}
        {isSettingsOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 flex items-center justify-center p-0 md:p-4 animate-in fade-in duration-200">
            <div className="w-full h-full md:max-w-3xl md:h-[75vh] bg-white md:rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
              <header className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-base">⚙️</span>
                  <h2 className="font-extrabold text-slate-800 text-sm">Sozlamalar va Profil</h2>
                </div>
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </header>

              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Lateral sub-tab menu - responsive stack to row */}
                <div className="w-full md:w-[30%] bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-3 md:p-4 gap-2 flex flex-row md:flex-col shrink-0">
                  <button
                    type="button"
                    onClick={() => setSettingsTab('profil')}
                    className={`flex-1 md:w-full text-center md:text-left px-3 py-2.5 md:px-4 md:py-3 rounded-xl md:rounded-2xl text-[11px] md:text-xs font-black uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5 md:gap-2 transition-all ${
                      settingsTab === 'profil' 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-100' 
                        : 'text-slate-600 hover:bg-slate-100/70 bg-slate-100 md:bg-transparent'
                    }`}
                  >
                    👤 Profil
                  </button>
                  <button
                    type="button"
                    onClick={() => setSettingsTab('kutubxona')}
                    className={`flex-1 md:w-full text-center md:text-left px-3 py-2.5 md:px-4 md:py-3 rounded-xl md:rounded-2xl text-[11px] md:text-xs font-black uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5 md:gap-2 transition-all ${
                      settingsTab === 'kutubxona' 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-100' 
                        : 'text-slate-600 hover:bg-slate-100/70 bg-slate-100 md:bg-transparent'
                    }`}
                  >
                    📚 Kutubxona
                  </button>
                </div>

                {/* Sub-tab content view */}
                <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-white flex flex-col min-h-0">
                  {settingsTab === 'profil' ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-black text-slate-800 text-base mb-1">Shaxsiy Profil</h3>
                        <p className="text-xs text-slate-400">Tizimda siz yuklagan shaxsiy darslik to'plamlarini filtrlash kaliti.</p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">Emailingiz (Creator ID)</label>
                        <input 
                          type="email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          placeholder="Emailingiz..."
                          className="w-full max-w-md border border-slate-200 rounded-2xl px-4 py-3 text-slate-700 font-bold focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                        />
                        <p className="text-[11px] text-slate-400">
                          * Ushbu email faqat siz yuklagan va saqlagan darsliklar ro'yxatini xavfsiz ko'rishda ishlatiladi.
                        </p>
                      </div>

                      <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100/50 flex gap-2">
                        <span className="text-base">💡</span>
                        <p className="text-xs text-blue-800 font-semibold leading-relaxed">
                          Yangi PDF darslik yuklaganingizda, ushbu email yaratuvchi (creator) sifatida darslik bilan birga ma'lumotlar bazasiga saqlanadi.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col overflow-hidden space-y-4 h-full">
                      <div className="flex items-center justify-between shrink-0">
                        <div>
                          <h3 className="font-black text-slate-800 text-base mb-0.5">PDF & Testlar Kutubxonasi</h3>
                          <p className="text-xs text-slate-400 font-medium">Siz yuklagan va ruxsat berilgan shaxsiy to'plamlar.</p>
                        </div>
                      </div>

                      {/* Search and filters */}
                      <div className="relative shrink-0">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Mening darsliklarimni qidirish..."
                          className="w-full border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-bold focus:border-blue-500 focus:outline-none placeholder:text-slate-400 bg-slate-50/50"
                        />
                      </div>

                      {/* List of matched collections */}
                      <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-0">
                        {librarySubjects.length === 0 ? (
                          <div className="text-center py-12 text-slate-400 text-xs font-semibold">
                            Sizning profilingizda hech qanday test to'plami aniqlanmadi.
                            <span className="text-[10px] font-normal text-slate-300 mt-2 block italic">
                              Emailingiz: <strong>{userEmail}</strong> bilan mos keladigan test mavjud emas.
                            </span>
                          </div>
                        ) : (
                          librarySubjects.map(sub => (
                            <div 
                              key={sub.id} 
                              className="p-3 md:p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 transition-all hover:bg-slate-100/50"
                            >
                              <div className="overflow-hidden">
                                <h4 className="font-bold text-slate-800 truncate text-sm">
                                  {sub.name}
                                </h4>
                                <p className="text-xs text-slate-400 font-medium mt-1">
                                  {sub.questions.length} ta umumiy savol
                                </p>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0 justify-end w-full sm:w-auto border-t sm:border-y-0 pt-2 sm:pt-0 border-slate-200/60">
                                <button
                                  onClick={() => {
                                    setEditingSubject(sub);
                                    setIsSettingsOpen(false);
                                  }}
                                  className="flex-1 sm:flex-none p-2 px-3 bg-white text-amber-700 hover:bg-amber-100 border border-amber-200 rounded-xl text-xs transition-colors flex items-center justify-center gap-1 font-bold"
                                  title="✏️ Split-Screen tahrirlashtugmasi"
                                >
                                  ✏️ Tahrir
                                </button>
                                <button
                                  onClick={() => handleExportMyTestX(sub)}
                                  className="flex-1 sm:flex-none p-2 px-3 bg-white text-blue-600 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
                                  title="📥 MyTestX formatida eksport (JSON)"
                                >
                                  📥 JSON
                                </button>
                                <button
                                  onClick={() => handleDeleteSubject(sub.id, sub.name)}
                                  className="p-2 bg-white text-rose-600 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors text-xs flex items-center justify-center font-bold"
                                  title="🗑️ To'plamni o'chirish"
                                >
                                  🗑️
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mount Split Screen Editor when selected */}
        {editingSubject && (
          <SplitScreenEditor
            subject={editingSubject}
            userEmail={userEmail}
            onClose={() => setEditingSubject(null)}
            onSaved={() => {
              setEditingSubject(null);
              showToast("Barcha o'zgarishlar saqlandi! Sahifa yangilanmoqda...");
              setTimeout(() => {
                window.location.reload();
              }, 1200);
            }}
          />
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
            {state.selectedSubject ? subjectsList.find(s => s.id === state.selectedSubject)?.name : ''} - Variant {state.selectedVariant} yakuniga yetdi.
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
            onClick={(e) => copyShareLink(e, state.selectedSubject!, state.selectedVariant!)}
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
                    className={`w-full p-3.5 sm:p-4 rounded-2xl border transition-all flex items-start justify-between text-left group ${btnStyle}`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4 flex-1">
                      <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold transition-colors shrink-0 mt-0.5 ${
                        isSelected ? 'bg-blue-600 text-white' : 
                        isAnswered && isCorrect ? 'bg-green-600 text-white' : 
                        isAnswered && isSelected ? 'bg-red-600 text-white' : 
                        'bg-white text-green-700 border border-green-200'
                      }`}>
                        {labels[displayIndex]}
                      </span>
                      <span className="font-medium text-xs sm:text-sm md:text-base font-mono whitespace-pre-wrap break-words flex-1 mt-0.5 leading-relaxed">
                        {option}
                      </span>
                    </div>
                    {icon && <span className="shrink-0 ml-2 mt-1">{icon}</span>}
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

      <Chat onQuestionsLoaded={handleQuestionsLoaded} userEmail={userEmail} />

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