// Core Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  studyStreak: number;
  totalPoints: number;
  joinedAt: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  studyGoal: number; // minutes per day
  subjectFocus: string[];
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  reminderEnabled: boolean;
  spaceRepetitionInterval: number;
}

// Chat Types
export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  topic?: string;
  helpful?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

// Quiz Types
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number; // in minutes
  createdAt: string;
}

export interface QuizResult {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
  answers: QuizAnswer[];
  completedAt: string;
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
}

// Flashcard Types
export interface Flashcard {
  id: string;
  front: string;
  back: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  nextReview: string;
  interval: number; // days
  easiness: number;
  repetitions: number;
  createdAt: string;
}

export interface FlashcardSet {
  id: string;
  title: string;
  description: string;
  cards: Flashcard[];
  topic: string;
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
}

export interface StudySession {
  id: string;
  cardId: string;
  userId: string;
  response: 'easy' | 'good' | 'hard' | 'again';
  duration: number; // seconds
  timestamp: string;
}

// Progress Types
export interface StudyStats {
  todayMinutes: number;
  weeklyMinutes: number;
  monthlyMinutes: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  quizzesCompleted: number;
  averageScore: number;
  cardsStudied: number;
  topicsStudied: string[];
}

export interface ProgressData {
  date: string;
  studyTime: number;
  quizScore: number;
  cardsStudied: number;
  topics: string[];
}

// Leaderboard Types
export interface LeaderboardEntry {
  userId: string;
  name: string;
  avatar?: string;
  points: number;
  rank: number;
  streak: number;
  change: number; // position change from last week
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlockedAt?: string;
  progress?: number;
  target?: number;
}

// Navigation Types
export type TabType = 'dashboard' | 'chat' | 'quiz' | 'flashcards' | 'leaderboard';

// Theme Types
export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  background: string;
  surface: string;
  text: string;
}