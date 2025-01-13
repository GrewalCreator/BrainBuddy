import React from "react";
import PropTypes from "prop-types";
import CardPreview from "./CardPreview";
import "../assets/css/deckView.css";

const DeckView = ({ cards, cardSize }) => {
  return (
    <div className="deck-view">
      <div className="deck-container">
        {cards.map((card, index) => (
          <CardPreview
            key={index}
            question={card.question}
            answer={card.answer}
            width={cardSize}
            height={cardSize}
          />
        ))}
      </div>
    </div>
  );
};

DeckView.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
  cardSize: PropTypes.number.isRequired,
};

export default DeckView;
