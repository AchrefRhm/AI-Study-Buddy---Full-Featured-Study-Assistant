import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { ChatMessage, ChatSession } from '../types';
import { generateAIResponse } from '../utils/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function Chat() {
  const [currentSession, setCurrentSession] = useLocalStorage<ChatSession>('currentChatSession', {
    id: '1',
    title: 'New Chat Session',
    messages: [{
      id: '1',
      content: "Hello! I'm your AI Study Buddy. I'm here to help you learn and understand any topic. What would you like to study today?",
      isUser: false,
      timestamp: new Date().toISOString(),
      helpful: undefined
    }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession.messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString() + '-user',
      content: inputMessage,
      isUser: true,
      timestamp: new Date().toISOString()
    };

    const updatedSession: ChatSession = {
      ...currentSession,
      messages: [...currentSession.messages, newUserMessage],
      updatedAt: new Date().toISOString(),
      title: currentSession.messages.length === 1 ? inputMessage.slice(0, 50) + '...' : currentSession.title
    };

    setCurrentSession(updatedSession);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage: ChatMessage = {
        id: Date.now().toString() + '-ai',
        content: aiResponse,
        isUser: false,
        timestamp: new Date().toISOString(),
        topic: extractTopic(inputMessage)
      };

      setCurrentSession(prev => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        updatedAt: new Date().toISOString()
      }));
      
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // 1-3 seconds delay
  };

  const extractTopic = (message: string): string => {
    const topics = ['javascript', 'react', 'python', 'mathematics', 'physics', 'chemistry', 'biology', 'history'];
    const foundTopic = topics.find(topic => message.toLowerCase().includes(topic));
    return foundTopic || 'general';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const markHelpful = (messageId: string, helpful: boolean) => {
    setCurrentSession(prev => ({
      ...prev,
      messages: prev.messages.map(msg => 
        msg.id === messageId ? { ...msg, helpful } : msg
      )
    }));
  };

  const suggestedQuestions = [
    "Explain closures in JavaScript",
    "What is React's virtual DOM?",
    "How does spaced repetition work?",
    "Explain the Pythagorean theorem",
    "What are Newton's laws of motion?"
  ];

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">AI Study Assistant</h2>
            <p className="text-sm text-gray-500">Ask me anything about your studies</p>
          </div>
          <div className="ml-auto">
            <Sparkles className="w-5 h-5 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
        {currentSession.messages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-3xl ${message.isUser ? 'flex-row-reverse' : 'flex-row'} space-x-3`}>
              {/* Avatar */}
              <div className={`flex-shrink-0 ${message.isUser ? 'ml-3' : 'mr-3'}`}>
                {message.isUser ? (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Message Content */}
              <div className={`rounded-2xl p-4 ${
                message.isUser 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-900 shadow-sm border border-gray-100'
              }`}>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
                
                {/* Message Actions */}
                {!message.isUser && (
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => copyMessage(message.content)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Copy message"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => markHelpful(message.id, true)}
                        className={`p-1 transition-colors ${
                          message.helpful === true ? 'text-green-500' : 'text-gray-400 hover:text-green-500'
                        }`}
                        title="Mark as helpful"
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => markHelpful(message.id, false)}
                        className={`p-1 transition-colors ${
                          message.helpful === false ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                        }`}
                        title="Mark as not helpful"
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex flex-row space-x-3 max-w-3xl">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {currentSession.messages.length === 1 && (
        <div className="px-6 py-4 bg-white border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">Try asking about:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(question)}
                className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-6">
        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your studies..."
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-blue-500 hover:text-blue-600 disabled:text-gray-300 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}