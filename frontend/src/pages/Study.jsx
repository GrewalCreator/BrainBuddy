// pages/Study.jsx
import { useState } from 'react';
import NavBar from '../components/NavBar';
import FlashCard from '../components/FlashCard';

const Study = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  
  const handleNextCard = () => {
    setCurrentCard((prev) => (prev + 1) % 10);
    setShowAnswer(false);
  };
  
  const handlePrevCard = () => {
    setCurrentCard((prev) => (prev - 1 + 10) % 10);
    setShowAnswer(false);
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif text-center mb-12">
          Study your flashcards
        </h1>
        
        <div className="flex flex-col items-center">
          <FlashCard
            question="Question / Term"
            answer="Answer goes here"
            showAnswer={showAnswer}
            onClick={() => setShowAnswer(!showAnswer)}
          />
          
          <div className="flex items-center space-x-8 mt-8">
            <button 
              onClick={handlePrevCard}
              className="bg-sage-600 rounded-full p-4"
            >
              ←
            </button>
            <span>{currentCard + 1}/10</span>
            <button 
              onClick={handleNextCard}
              className="bg-sage-600 rounded-full p-4"
            >
              →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Study;