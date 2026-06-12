import { Question, Subject } from '../types';
import subjectsData from './subjects.json';

export const subjects: Subject[] = subjectsData as Subject[];

export const totalVariantsForSubject = (subjectId: string) => {
  const subject = subjects.find(s => s.id === subjectId);
  if (!subject) return 0;
  const vSize = subject.variantSize || 30;
  return Math.ceil(subject.questions.length / vSize);
};

export const getQuestionsByVariant = (subjectId: string, variant: number): Question[] => {
  const subject = subjects.find(s => s.id === subjectId);
  if (!subject) return [];
  const vSize = subject.variantSize || 30;
  const start = (variant - 1) * vSize;
  const end = start + vSize;
  return subject.questions.slice(start, end);
};
