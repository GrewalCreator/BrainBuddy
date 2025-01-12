// components/FlashCard.jsx
const FlashCard = ({ question, answer, onClick, showAnswer }) => {
    return (
      <div
        onClick={onClick}
        className="bg-white rounded-xl p-8 w-full max-w-2xl h-64 flex flex-col items-center justify-center cursor-pointer shadow-lg"
      >
        <h3 className="text-xl mb-4">{showAnswer ? answer : question}</h3>
        <p className="text-gray-500 text-sm">(Click the card to flip)</p>
      </div>
    );
  };

  export default FlashCard;