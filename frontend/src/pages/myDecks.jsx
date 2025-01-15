import React, { useState, useEffect } from "react";
import CardPreview from "../components/CardPreview";
import "../assets/css/myDecks.css";

const Decks = () => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await fetch("/api/getDecks");
        if (response.status === 200) {
          const data = await response.json();
          setDecks(data.decks);
        } else if (response.status === 404) {
          setDecks(null); // Indicating no decks found
        }
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };

    fetchDecks();
  }, []);

  const extractTitle = (title) => {
    try {
      // Split the title into parts based on spaces
      const parts = title.split(" ");
      if (parts.length <= 2) {
        console.warn(`Unexpected title format: "${title}"`);
        return title; // Return the full title if it doesn't follow the expected format
      }
      // Join all parts except the last two (date and time)
      return parts.slice(0, -2).join(" ");
    } catch (error) {
      console.error(`Error extracting title from: "${title}"`, error);
      return "Untitled Deck"; // Fallback title
    }
  };

  return (
    <div>
      <div className="decks-container">
        <h1 className="decks-title">Your Flashcard Decks</h1>
        {decks === null ? (
          <div className="no-decks-message">
            <p>No decks found.</p>
            <a href="/generate" className="create-button">
              Create New Deck Here
            </a>
          </div>
        ) : (
          decks.map((deck, index) => (
            <div key={index} className="deck-section">
              <h2 className="deck-title">{extractTitle(deck.title)}</h2>
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
          ))
        )}
      </div>
    </div>
  );
};

export default Decks;
