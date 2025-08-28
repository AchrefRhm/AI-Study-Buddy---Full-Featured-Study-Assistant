import { 
  User, 
  Quiz, 
  QuizQuestion, 
  FlashcardSet, 
  Flashcard, 
  LeaderboardEntry, 
  Achievement,
  ChatSession,
  ChatMessage
} from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  studyStreak: 15,
  totalPoints: 2840,
  joinedAt: '2024-01-15T00:00:00Z',
  preferences: {
    studyGoal: 60,
    subjectFocus: ['Mathematics', 'Physics', 'Computer Science'],
    difficultyLevel: 'intermediate',
    reminderEnabled: true,
    spaceRepetitionInterval: 2
  }
};

export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of JavaScript basics including variables, functions, and objects.',
    topic: 'Programming',
    difficulty: 'easy',
    timeLimit: 15,
    createdAt: '2024-01-20T10:00:00Z',
    questions: [
      {
        id: '1',
        question: 'Which of the following is used to declare a variable in JavaScript?',
        options: ['var', 'let', 'const', 'All of the above'],
        correctAnswer: 3,
        explanation: 'In JavaScript, you can declare variables using var, let, or const keywords.',
        difficulty: 'easy',
        topic: 'JavaScript',
        points: 10
      },
      {
        id: '2',
        question: 'What does JSON stand for?',
        options: ['JavaScript Object Notation', 'Java Standard Object Notation', 'JavaScript Oriented Network', 'Java Script Object Network'],
        correctAnswer: 0,
        explanation: 'JSON stands for JavaScript Object Notation, a lightweight data interchange format.',
        difficulty: 'easy',
        topic: 'JavaScript',
        points: 10
      }
    ]
  },
  {
    id: '2',
    title: 'Advanced React Concepts',
    description: 'Challenge yourself with advanced React patterns, hooks, and optimization techniques.',
    topic: 'Programming',
    difficulty: 'hard',
    timeLimit: 25,
    createdAt: '2024-01-18T14:30:00Z',
    questions: [
      {
        id: '3',
        question: 'Which hook is used for side effects in functional components?',
        options: ['useState', 'useEffect', 'useContext', 'useReducer'],
        correctAnswer: 1,
        explanation: 'useEffect is the hook used to perform side effects in functional components.',
        difficulty: 'medium',
        topic: 'React',
        points: 15
      }
    ]
  }
];

export const mockFlashcardSets: FlashcardSet[] = [
  {
    id: '1',
    title: 'Spanish Vocabulary - Travel',
    description: 'Essential Spanish words and phrases for travelers.',
    topic: 'Languages',
    isPublic: true,
    createdBy: 'user123',
    createdAt: '2024-01-15T09:00:00Z',
    cards: [
      {
        id: '1',
        front: 'Hello',
        back: 'Hola',
        topic: 'Greetings',
        difficulty: 'easy',
        nextReview: '2024-01-25T00:00:00Z',
        interval: 1,
        easiness: 2.5,
        repetitions: 0,
        createdAt: '2024-01-15T09:00:00Z'
      },
      {
        id: '2',
        front: 'Thank you',
        back: 'Gracias',
        topic: 'Politeness',
        difficulty: 'easy',
        nextReview: '2024-01-25T00:00:00Z',
        interval: 1,
        easiness: 2.5,
        repetitions: 0,
        createdAt: '2024-01-15T09:00:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'Chemistry - Periodic Table',
    description: 'Elements, symbols, and properties from the periodic table.',
    topic: 'Science',
    isPublic: true,
    createdBy: 'user456',
    createdAt: '2024-01-20T11:00:00Z',
    cards: [
      {
        id: '3',
        front: 'What is the symbol for Gold?',
        back: 'Au (from Latin: aurum)',
        topic: 'Elements',
        difficulty: 'medium',
        nextReview: '2024-01-25T00:00:00Z',
        interval: 3,
        easiness: 2.5,
        repetitions: 1,
        createdAt: '2024-01-20T11:00:00Z'
      }
    ]
  }
];

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    userId: '1',
    name: 'Alex Johnson',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    points: 2840,
    rank: 1,
    streak: 15,
    change: 2
  },
  {
    userId: '2',
    name: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    points: 2650,
    rank: 2,
    streak: 12,
    change: -1
  },
  {
    userId: '3',
    name: 'Marcus Rodriguez',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    points: 2420,
    rank: 3,
    streak: 8,
    change: 1
  },
  {
    userId: '4',
    name: 'Emily Watson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    points: 2180,
    rank: 4,
    streak: 10,
    change: 0
  },
  {
    userId: '5',
    name: 'David Kim',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    points: 1950,
    rank: 5,
    streak: 6,
    change: -2
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first quiz',
    icon: '🎯',
    points: 50,
    unlockedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Study Streak',
    description: 'Study for 7 consecutive days',
    icon: '🔥',
    points: 100,
    unlockedAt: '2024-01-22T08:00:00Z'
  },
  {
    id: '3',
    title: 'Knowledge Explorer',
    description: 'Study 5 different topics',
    icon: '🗺️',
    points: 75,
    progress: 3,
    target: 5
  },
  {
    id: '4',
    title: 'Quiz Master',
    description: 'Score 90% or higher on 10 quizzes',
    icon: '🏆',
    points: 200,
    progress: 7,
    target: 10
  }
];

export const mockChatSessions: ChatSession[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals Help',
    createdAt: '2024-01-24T14:30:00Z',
    updatedAt: '2024-01-24T15:45:00Z',
    messages: [
      {
        id: '1',
        content: 'Can you explain what closures are in JavaScript?',
        isUser: true,
        timestamp: '2024-01-24T14:30:00Z',
        topic: 'JavaScript'
      },
      {
        id: '2',
        content: 'A closure in JavaScript is a feature where an inner function has access to the outer (enclosing) function\'s variables. This includes:\n\n1. **Variables from the outer function scope**\n2. **Global variables**\n3. **The outer function\'s parameters**\n\nClosures are created every time a function is created. Here\'s a simple example:\n\n```javascript\nfunction outerFunction(x) {\n  // This is the outer function\'s scope\n  \n  function innerFunction(y) {\n    // This inner function has access to \'x\'\n    console.log(x + y);\n  }\n  \n  return innerFunction;\n}\n\nconst myClosure = outerFunction(10);\nmyClosure(5); // Output: 15\n```\n\nClosures are useful for:\n- Data privacy\n- Creating function factories\n- Callback functions\n- Module patterns',
        isUser: false,
        timestamp: '2024-01-24T14:32:00Z',
        topic: 'JavaScript',
        helpful: true
      }
    ]
  }
];

// AI Response Templates
export const aiResponses = {
  greetings: [
    "Hello! I'm your AI Study Buddy. What would you like to learn about today?",
    "Hi there! Ready to dive into some learning? What topic interests you?",
    "Welcome back! What can I help you study today?"
  ],
  
  programming: {
    javascript: [
      "JavaScript is a versatile programming language! What specific aspect would you like to explore?",
      "Great choice! JavaScript powers the web. Are you looking for help with basics, advanced concepts, or specific problems?",
      "Let's dive into JavaScript! Whether it's ES6 features, async programming, or DOM manipulation, I'm here to help."
    ],
    react: [
      "React is an excellent library for building user interfaces! What React concepts are you working on?",
      "React development is exciting! Are you learning about components, hooks, state management, or something else?",
      "Perfect! React has many powerful features. What specific area would you like to focus on?"
    ]
  },
  
  science: {
    physics: [
      "Physics helps us understand how the universe works! What physics topic would you like to explore?",
      "Excellent choice! Physics can be fascinating. Are you studying mechanics, thermodynamics, electromagnetism, or another area?",
      "Let's explore physics together! What specific concept or problem are you working on?"
    ],
    chemistry: [
      "Chemistry is the science of matter and its interactions! What chemistry topic interests you?",
      "Great! Chemistry explains so much about our world. Are you studying organic chemistry, inorganic chemistry, or physical chemistry?",
      "Let's dive into chemistry! What specific area or concept would you like to understand better?"
    ]
  },
  
  mathematics: [
    "Mathematics is the language of the universe! What math topic would you like to explore?",
    "Excellent! Math can be really rewarding once you understand the concepts. What area are you studying?",
    "Let's work through some math together! What specific topic or problem type are you focusing on?"
  ],
  
  fallback: [
    "That's an interesting topic! Could you provide more specific details about what you'd like to learn?",
    "I'd be happy to help! Can you tell me more about what aspect of this topic you're studying?",
    "Great question! To give you the best help, could you be more specific about what you're trying to understand?"
  ]
};

export function generateAIResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  // Greeting detection
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return aiResponses.greetings[Math.floor(Math.random() * aiResponses.greetings.length)];
  }
  
  // Programming topics
  if (message.includes('javascript') || message.includes('js')) {
    return aiResponses.programming.javascript[Math.floor(Math.random() * aiResponses.programming.javascript.length)];
  }
  
  if (message.includes('react')) {
    return aiResponses.programming.react[Math.floor(Math.random() * aiResponses.programming.react.length)];
  }
  
  // Science topics
  if (message.includes('physics')) {
    return aiResponses.science.physics[Math.floor(Math.random() * aiResponses.science.physics.length)];
  }
  
  if (message.includes('chemistry')) {
    return aiResponses.science.chemistry[Math.floor(Math.random() * aiResponses.science.chemistry.length)];
  }
  
  // Math topics
  if (message.includes('math') || message.includes('mathematics') || message.includes('calculus') || message.includes('algebra')) {
    return aiResponses.mathematics[Math.floor(Math.random() * aiResponses.mathematics.length)];
  }
  
  // Fallback response
  return aiResponses.fallback[Math.floor(Math.random() * aiResponses.fallback.length)];
}