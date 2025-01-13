import React, { useState } from "react";
import PropTypes from "prop-types";
import "../assets/css/card.css";

const CardPreview = ({ question, answer, width, height }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const cardStyle = {
    width: `${width}px`,
    height: `${height}px`,
    fontSize: `${Math.min(width, height) / 15}px`, // Dynamically scale font size
  };

  return (
    <div
      className={`card-preview ${isFlipped ? "flipped" : ""}`}
      style={cardStyle}
      onClick={handleFlip}
    >
      <div className="card-inner">
        <div className="card-front">
          <p className="card-text">{question}</p>
        </div>
        <div className="card-back">
          <p className="card-text">{answer}</p>
        </div>
      </div>
    </div>
  );
};

CardPreview.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default CardPreview;
