import React, { useState, useEffect } from "react";
import CardPreview from "../components/CardPreview";
import "../assets/css/myDecks.css";
import Navbar from "../components/NavBar";

const Decks = () => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await fetch("/api/getDecks");
        const data = await response.json();
        setDecks(data.decks);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };

    fetchDecks();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="decks-container">
        <h1 className="decks-title">Your Flashcard Decks</h1>
        {decks.map((deck, index) => (
          <div key={index} className="deck-section">
            <h2 className="deck-title">{deck.title}</h2>
            <div className="deck-preview-container">
              {deck.cards.map((card, cardIndex) => (
                <CardPreview
                  key={cardIndex}
                  question={card.question}
                  answer={card.answer}
                  width={200}
                  height={300}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Decks;