export interface Question {
  id: string;
  question: string;
  placeholder: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  content: string;
}

export interface AnswerSession {
  templateId: string;
  answers: Record<string, string>;
  lastUpdated: Date;
  isCompleted: boolean;
}
