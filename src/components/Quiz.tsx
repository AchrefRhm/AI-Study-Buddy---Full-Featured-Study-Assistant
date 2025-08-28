import React, { useState, useEffect } from 'react';
import { Brain, Clock, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { Quiz as QuizType, QuizResult, QuizAnswer } from '../types';
import { mockQuizzes } from '../utils/mockData';
import { useStudyTimer } from '../hooks/useStudyTimer';

export function Quiz() {
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const { time, isRunning, start, stop, reset, formatTime } = useStudyTimer();

  useEffect(() => {
    if (selectedQuiz && !showResult) {
      start();
    } else {
      stop();
    }
  }, [selectedQuiz, showResult, start, stop]);

  const handleQuizSelect = (quiz: QuizType) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizResult(null);
    reset();
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null || !selectedQuiz) return;

    const question = selectedQuiz.questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    const newAnswer: QuizAnswer = {
      questionId: question.id,
      selectedAnswer,
      isCorrect,
      timeSpent: 30 // Mock time per question
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz completed
      const correctAnswers = updatedAnswers.filter(a => a.isCorrect).length;
      const score = Math.round((correctAnswers / selectedQuiz.questions.length) * 100);
      
      const result: QuizResult = {
        id: Date.now().toString(),
        quizId: selectedQuiz.id,
        userId: '1',
        score,
        totalQuestions: selectedQuiz.questions.length,
        timeSpent: time,
        answers: updatedAnswers,
        completedAt: new Date().toISOString()
      };

      setQuizResult(result);
      setShowResult(true);
      stop();
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizResult(null);
    reset();
    start();
  };

  const backToQuizzes = () => {
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizResult(null);
    reset();
  };

  if (!selectedQuiz) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Library</h2>
          <p className="text-gray-600">Test your knowledge with AI-generated quizzes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleQuizSelect(quiz)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  quiz.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  quiz.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {quiz.difficulty}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{quiz.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{quiz.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{quiz.questions.length} questions</span>
                {quiz.timeLimit && (
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {quiz.timeLimit} min
                  </span>
                )}
              </div>
              
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (showResult && quizResult) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Trophy className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
            <p className="text-gray-600">{selectedQuiz.title}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">{quizResult.score}%</div>
              <div className="text-sm text-gray-600">Final Score</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {answers.filter(a => a.isCorrect).length}/{quizResult.totalQuestions}
              </div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">{formatTime()}</div>
              <div className="text-sm text-gray-600">Time Spent</div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-900">Review Answers</h3>
            {selectedQuiz.questions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer?.isCorrect;
              
              return (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-2">{question.question}</p>
                      <div className="space-y-1">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded text-sm ${
                              optionIndex === question.correctAnswer
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : optionIndex === userAnswer?.selectedAnswer && !isCorrect
                                ? 'bg-red-100 text-red-800 border border-red-200'
                                : 'bg-gray-50 text-gray-700'
                            }`}
                          >
                            {option}
                            {optionIndex === question.correctAnswer && ' ✓'}
                            {optionIndex === userAnswer?.selectedAnswer && !isCorrect && ' ✗'}
                          </div>
                        ))}
                      </div>
                      {question.explanation && (
                        <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
                          <p className="text-sm text-blue-800">{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={restartQuiz}
              className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Retake Quiz</span>
            </button>
            <button
              onClick={backToQuizzes}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Quiz Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{selectedQuiz.title}</h2>
            <p className="text-gray-600 text-sm">
              Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {formatTime()}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {currentQuestion.question}
          </h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={backToQuizzes}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back to Quizzes
          </button>
          
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {currentQuestionIndex < selectedQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
}