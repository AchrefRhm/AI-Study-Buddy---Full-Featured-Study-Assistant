import React, { useState, useEffect } from 'react';
import { CreditCard, RotateCcw, Eye, EyeOff, Clock, Brain, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { FlashcardSet, Flashcard, StudySession } from '../types';
import { mockFlashcardSets } from '../utils/mockData';
import { calculateNextReview, getDueCards, getNextReviewDate } from '../utils/spacedRepetition';
import { useLocalStorage } from '../hooks/useLocalStorage';

type StudyMode = 'browse' | 'study';

export function Flashcards() {
  const [selectedSet, setSelectedSet] = useState<FlashcardSet | null>(null);
  const [studyMode, setStudyMode] = useState<StudyMode>('browse');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studiedCards, setStudiedCards] = useLocalStorage<string[]>('studiedCards', []);
  const [cardSets, setCardSets] = useLocalStorage<FlashcardSet[]>('flashcardSets', mockFlashcardSets);

  const handleSetSelect = (set: FlashcardSet) => {
    setSelectedSet(set);
    setStudyMode('study');
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  const handleResponse = (response: 'easy' | 'good' | 'hard' | 'again') => {
    if (!selectedSet) return;

    const currentCard = selectedSet.cards[currentCardIndex];
    const nextReview = calculateNextReview(currentCard, response);
    
    // Update the card with new spaced repetition data
    const updatedCard: Flashcard = {
      ...currentCard,
      interval: nextReview.interval,
      repetitions: nextReview.repetitions,
      easiness: nextReview.easiness,
      nextReview: getNextReviewDate(nextReview.interval)
    };

    // Update the card set
    const updatedSet: FlashcardSet = {
      ...selectedSet,
      cards: selectedSet.cards.map(card => 
        card.id === currentCard.id ? updatedCard : card
      )
    };

    // Update all card sets
    setCardSets(prev => prev.map(set => 
      set.id === updatedSet.id ? updatedSet : set
    ));
    
    setSelectedSet(updatedSet);

    // Track studied card
    if (!studiedCards.includes(currentCard.id)) {
      setStudiedCards(prev => [...prev, currentCard.id]);
    }

    // Move to next card or end session
    if (currentCardIndex < selectedSet.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    } else {
      // Study session complete
      alert('Study session complete! Great job! 🎉');
      setStudyMode('browse');
      setSelectedSet(null);
    }
  };

  const nextCard = () => {
    if (selectedSet && currentCardIndex < selectedSet.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    }
  };

  const previousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
    }
  };

  const backToSets = () => {
    setSelectedSet(null);
    setStudyMode('browse');
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  const createNewSet = () => {
    const newSet: FlashcardSet = {
      id: Date.now().toString(),
      title: 'New Flashcard Set',
      description: 'Custom flashcard set',
      topic: 'Custom',
      isPublic: false,
      createdBy: 'user',
      createdAt: new Date().toISOString(),
      cards: [
        {
          id: Date.now().toString() + '-1',
          front: 'Sample Question',
          back: 'Sample Answer',
          topic: 'Sample',
          difficulty: 'easy',
          nextReview: new Date().toISOString(),
          interval: 1,
          easiness: 2.5,
          repetitions: 0,
          createdAt: new Date().toISOString()
        }
      ]
    };

    setCardSets(prev => [...prev, newSet]);
    setSelectedSet(newSet);
  };

  if (studyMode === 'study' && selectedSet) {
    const currentCard = selectedSet.cards[currentCardIndex];
    const progress = ((currentCardIndex + 1) / selectedSet.cards.length) * 100;

    return (
      <div className="p-6 max-w-4xl mx-auto">
        {/* Study Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{selectedSet.title}</h2>
              <p className="text-gray-600 text-sm">
                Card {currentCardIndex + 1} of {selectedSet.cards.length}
              </p>
            </div>
            <button
              onClick={backToSets}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← Back to Sets
            </button>
          </div>
          
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
          <div 
            className="min-h-[300px] flex items-center justify-center cursor-pointer"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            <div className="text-center">
              <div className="mb-4">
                {showAnswer ? (
                  <EyeOff className="w-8 h-8 text-gray-400 mx-auto" />
                ) : (
                  <Eye className="w-8 h-8 text-gray-400 mx-auto" />
                )}
              </div>
              <div className="text-xl font-semibold text-gray-900 mb-4">
                {showAnswer ? currentCard.back : currentCard.front}
              </div>
              <p className="text-gray-500 text-sm">
                Click to {showAnswer ? 'hide' : 'reveal'} {showAnswer ? 'question' : 'answer'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation and Response Buttons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {showAnswer ? (
            <div className="space-y-4">
              <p className="text-center text-gray-600 mb-4">How well did you know this?</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => handleResponse('again')}
                  className="px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-center"
                >
                  <div className="font-medium">Again</div>
                  <div className="text-xs">Didn't know</div>
                </button>
                <button
                  onClick={() => handleResponse('hard')}
                  className="px-4 py-3 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-center"
                >
                  <div className="font-medium">Hard</div>
                  <div className="text-xs">Barely knew</div>
                </button>
                <button
                  onClick={() => handleResponse('good')}
                  className="px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-center"
                >
                  <div className="font-medium">Good</div>
                  <div className="text-xs">Knew it</div>
                </button>
                <button
                  onClick={() => handleResponse('easy')}
                  className="px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-center"
                >
                  <div className="font-medium">Easy</div>
                  <div className="text-xs">Very easy</div>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <button
                onClick={previousCard}
                disabled={currentCardIndex === 0}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>
              
              <button
                onClick={() => setShowAnswer(true)}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Show Answer
              </button>
              
              <button
                onClick={nextCard}
                disabled={currentCardIndex === selectedSet.cards.length - 1}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Flashcard Sets</h2>
          <p className="text-gray-600">Study with spaced repetition for better retention</p>
        </div>
        <button
          onClick={createNewSet}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create Set</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardSets.map((set) => {
          const dueCards = getDueCards(set.cards);
          const studiedCount = set.cards.filter(card => studiedCards.includes(card.id)).length;
          
          return (
            <div
              key={set.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleSetSelect(set)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-right">
                  {dueCards.length > 0 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      {dueCards.length} due
                    </span>
                  )}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{set.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{set.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{set.cards.length} cards</span>
                  <span className="flex items-center">
                    <Brain className="w-4 h-4 mr-1" />
                    {set.topic}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Studied: {studiedCount}/{set.cards.length}</span>
                  {dueCards.length > 0 && (
                    <span className="flex items-center text-orange-600">
                      <Clock className="w-4 h-4 mr-1" />
                      Review due
                    </span>
                  )}
                </div>
                
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(studiedCount / set.cards.length) * 100}%` }}
                  />
                </div>
              </div>
              
              <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors">
                {dueCards.length > 0 ? `Study ${dueCards.length} Cards` : 'Study Set'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}