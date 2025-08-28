import { Flashcard } from '../types';

export interface SpacedRepetitionResponse {
  interval: number;
  repetitions: number;
  easiness: number;
}

export function calculateNextReview(
  card: Flashcard,
  response: 'easy' | 'good' | 'hard' | 'again'
): SpacedRepetitionResponse {
  let { interval, repetitions, easiness } = card;

  // SM-2 Algorithm implementation
  if (response === 'again') {
    // Reset if answered incorrectly
    repetitions = 0;
    interval = 1;
  } else {
    repetitions += 1;
    
    // Update easiness factor based on response quality
    let responseQuality = 5; // default for 'easy'
    switch (response) {
      case 'hard':
        responseQuality = 3;
        break;
      case 'good':
        responseQuality = 4;
        break;
      case 'easy':
        responseQuality = 5;
        break;
    }
    
    const newEasiness = Math.max(1.3, easiness + (0.1 - (5 - responseQuality) * (0.08 + (5 - responseQuality) * 0.02)));
    easiness = newEasiness;
    
    // Calculate new interval
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easiness);
    }
  }

  return { interval, repetitions, easiness };
}

export function getDueCards(cards: Flashcard[]): Flashcard[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return cards.filter(card => {
    const dueDate = new Date(card.nextReview);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate <= today;
  });
}

export function getNextReviewDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString();
}