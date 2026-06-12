
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Subject {
  id: string;
  name: string;
  variantSize?: number;
  questions: Question[];
  creator?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface QuizState {
  selectedSubject: string | null;
  selectedVariant: number | null;
  currentQuestionIndex: number;
  score: number;
  showResults: boolean;
  userAnswers: (number | null)[];
  isStarted: boolean;
}
