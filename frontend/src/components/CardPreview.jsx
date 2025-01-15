import React, { useState } from "react";
import PropTypes from "prop-types";
import "../assets/css/card.css";

const CardPreview = ({ question, answer, width, height }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  return (
    <div
      className={`card-preview ${isFlipped ? "flipped" : ""}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={handleFlip}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="card-header">Question</div>
          <div>
            <p className="card-content">{question}</p>
          </div>
          <div className="card-footer">Tap to reveal the answer</div>
        </div>


        <div className="card-back">
          <div className="card-header">Answer</div>
          <div>
            <p className="card-content">{answer}</p>
          </div>
          <div className="card-footer">Tap to go back</div>
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
