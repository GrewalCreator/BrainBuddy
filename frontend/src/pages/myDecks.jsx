import React from "react";
import CardPreview from "../components/CardPreview";
import "../assets/css/myDecks.css";
import Navbar from "../components/NavBar";

const Decks = () => {
  // Sample data for demonstration
  const sampleDeck1 = [
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is the boiling point of water?", answer: "100°C" },
  ];

  const sampleDeck2 = [
    { question: "What is 3 x 3?", answer: "9" },
    { question: "What is the square root of 16?", answer: "4" },
    { question: "What is the chemical symbol for water?", answer: "H₂O" },
  ];

  return (
    <div>
      <Navbar />
      <div className="decks-container">
        <h1 className="decks-title">Your Flashcard Decks</h1>

        <div className="deck-section">
          <h2 className="deck-title">Math Basics</h2>
          <div className="deck-preview-container">
            {sampleDeck1.map((card, index) => (
              <CardPreview
                key={index}
                question={card.question}
                answer={card.answer}
                width={200}
                height={300}
              />
            ))}
          </div>
        </div>

        <div className="deck-section">
          <h2 className="deck-title">Science Fundamentals</h2>
          <div className="deck-preview-container">
            {sampleDeck2.map((card, index) => (
              <CardPreview
                key={index}
                question={card.question}
                answer={card.answer}
                width={200}
                height={300}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Decks;
